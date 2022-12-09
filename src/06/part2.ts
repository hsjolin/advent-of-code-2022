import StringReader from "../utils/stringReader";
import { Utils } from "../utils/utils";

const numberOfUniqueCharacters = 14;

Utils.lineReader<number>(
	"src/06/input.txt",
	/(.*)/,
	match => {
		const string = new StringReader(match[1]);

		while (true) {
			const characters = new StringReader(
				string.read(numberOfUniqueCharacters)
			);

			if (string.isEOL()) {
				break;
			}

			characters.readUntil(
				c => characters.string.lastIndexOf(c) > characters.position
			);

			if (characters.isEOL()) {
				break;
			}

			string.position -= numberOfUniqueCharacters - 1;
		}

		return string.position;
	},
	result => {
		console.log(result[0]);
		console.log("Finished");
	}
);
