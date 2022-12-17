import StringReader from "../utils/stringReader";
import { Utils } from "../utils/utils";

let numbers: string[] = [];
let answer = 0;

Utils.lineReader<string[]>(
  "src/13/input.txt",
  /^([\[\]0-9,]+)$/,
  (match) => {
    const str = match[1];
    numbers.push(str);

    if (numbers.length == 2) {
      const pair = numbers;
      numbers = [];

      return pair;
    }
    return null;
  },
  (result) => {
    for (let i = 0; i < result.length; i++) {
      if (compareNumbers(result[i][0], result[i][1])) {
        answer += i + 1;
      }
    }
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

    if (leftChar == "[") {
      makeArray(rightReader);
    } else if (rightChar == "[") {
      makeArray(leftReader);
    } else if (leftChar.match(/\d/) && rightChar.match(/\d/)) {
      leftReader.position--;
      rightReader.position--;
      const left = parseInt(leftReader.readUntil((c) => !c.match(/\d/)));
      const right = parseInt(rightReader.readUntil((c) => !c.match(/\d/)));
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
	reader.position--;
  const originalPosition = reader.position;
  reader.write("[");
  reader.readUntil((c) => "],".includes(c));
  reader.write("]");
  reader.position = originalPosition;
}
