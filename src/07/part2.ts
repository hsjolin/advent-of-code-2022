import { Utils } from "../utils/utils";

type CommandName = "cd" | "ls";
type NodeType = "file" | "directory";

interface Node {
	parent: Node;
	type: NodeType;
	name: string;
	size: number;
	children: Node[];
}

const root: Node = {
	parent: null,
	type: "directory",
	children: [],
	name: "/",
	size: 0,
};

let currentNode = root;

let answer = root;
const totalSize = 70000000;
const updateSize = 30000000;

Utils.lineReader<string>(
	"src/07/input.txt",
	/^(?:\$ (cd|ls) ?([a-z/.]+)?)|(?:([0-9]+)\s([a-z]+\.?(?:[a-z]+)?)?)|(?:dir ([a-z]+))$/,
	match => {
		const command = match[1] as CommandName;
		const parameter = match[2];
		const fileSize = parseInt(match[3] || "0");
		const fileName = match[4];
		const directoryName = match[5];

		switch (command) {
			case "cd":
				switch (parameter) {
					case "/":
						while (currentNode.parent != null) {
							currentNode = currentNode.parent;
						}
						return `switched to directory ${currentNode.name}`;
					case "..":
						if (currentNode.parent) {
							currentNode = currentNode.parent;
						}
						return `switched to directory ${currentNode.name}`;
					default:
						let child = currentNode.children.find(c => c.name === parameter);
						currentNode = child;
						return `switched to directory ${currentNode.name}`;
				}
			case "ls":
				return `listing files at ${currentNode.name}`;
			default:
				break;
		}

		if (
			fileName &&
			fileSize &&
			!currentNode.children.find(c => c.type == "file" && c.name == fileName)
		) {
			currentNode.children.push({
				children: [],
				name: fileName,
				parent: currentNode,
				size: fileSize,
				type: "file",
			});

			let node = currentNode;
			while (true) {
				node.size += fileSize;
				node = node.parent;
				if (node == null) {
					break;
				}
			}

			return `file ${fileName} ${fileSize}`;
		}

		if (
			directoryName &&
			!currentNode.children.find(
				c => c.type == "directory" && c.name == directoryName
			)
		) {
			currentNode.children.push({
				children: [],
				name: directoryName,
				parent: currentNode,
				size: 0,
				type: "directory",
			});
			return `dir ${directoryName}`;
		}

		console.log(match);
		return "wtf?";
	},
	result => {
		analyzeResultRecursive(root);
		console.log("Finished");
	}
);

function analyzeResultRecursive(node: Node, identing = "") {
	if (
		node.type == "directory" &&
		totalSize - root.size - updateSize + node.size > 0 &&
		node.size < answer.size
	) {
		answer = node;
	}

	console.log(`${identing}- ${node.name} (${node.type}, size=${node.size})`);
	for (let i = 0; i < node.children.length; i++) {
		analyzeResultRecursive(node.children[i], `${identing}  `);
	}

	if (node == root) {
		console.log(`Free space: ${totalSize - node.size}`);
		console.log(
			`I suggest you to delete directory ${answer.name} with size ${answer.size}`
		);
	}
}
