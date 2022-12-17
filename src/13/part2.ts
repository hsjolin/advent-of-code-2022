import StringReader from "../utils/stringReader";
import { Utils } from "../utils/utils";

let answer = 0;

Utils.lineReader<string>(
	"src/13/input.txt",
	/^([\[\]0-9,]+)$/,
	match => {
		return match[1];
	},
	result => {
		const dividerPacket1 = "[[2]]";
		const dividerPacket2 = "[[6]]";

		result.push(dividerPacket1);
		result.push(dividerPacket2);

		result.sort((left, right) => {
			if (compareNumbers(left, right)) {
				return -1;
			} else {
				return 1;
			}
		});

		answer =
			(result.indexOf(dividerPacket1) + 1) * (result.indexOf(dividerPacket2) + 1);
		console.log(answer);
	}
);

function compareNumbers(left: string, right: string): boolean {
	const leftReader = new StringReader(left);
	const rightReader = new StringReader(right);

	while (true) {
		if (rightReader.isEOL()) {
			return false;
		} else if (leftReader.isEOL()) {
			return true;
		}

		let leftChar = leftReader.read(1);
		let rightChar = rightReader.read(1);

		while (leftChar == "[" && rightChar == "[") {
			leftChar = leftReader.read(1);
			rightChar = rightReader.read(1);
		}

		if (leftChar == "[" && rightChar.match(/\d/)) {
			makeArray(rightReader);
		} else if (rightChar == "[" && leftChar.match(/\d/)) {
			makeArray(leftReader);
		} else if (leftChar.match(/\d/) && rightChar.match(/\d/)) {
			leftReader.position--;
			rightReader.position--;
			const left = parseInt(leftReader.readUntil(c => !c.match(/\d/)));
			const right = parseInt(rightReader.readUntil(c => !c.match(/\d/)));
			if (left != right) {
				return left < right;
			}
		} else if (rightChar == "]" && leftChar != "]") {
			return false;
		} else if (leftChar == "]" && rightChar != "]") {
			return true;
		}
	}
}

function makeArray(reader: StringReader) {
	const originalPosition = reader.position;
	reader.position--;
	reader.write("[");
	reader.readUntil(c => "],".includes(c));
	reader.write("]");
	reader.position = originalPosition;
}
