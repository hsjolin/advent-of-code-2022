import StringReader from "../utils/stringReader";
import { Utils } from "../utils/utils";

Utils.lineReader<number>(
	"src/06/input.txt",
	/(.*)/,
	match => {
		const string = new StringReader(match[1]);

		while (true) {
			const fourCharString = new StringReader(string.read(4));
			if (string.isEOL()) {
				break;
			}

			fourCharString.readUntil(c => fourCharString.string.lastIndexOf(c) > fourCharString.position);

			if (fourCharString.isEOL()) {
				break;
			}

			string.position -= 3; 
		}

		return string.position;
	},
	result => {
		console.log(result[0]);
		console.log("Finished");
	}
);
