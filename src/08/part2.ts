import { Grid, GridNode } from "../utils/grid";
import { Utils } from "../utils/utils";

let answer = 0;
let map = new Grid<Tree>();
let y = 0;

interface Coord {
  x: number;
  y: number;
}

interface Tree extends Coord, GridNode {
  height: number;
  visible: boolean;
  scenicScore: number;
}

Utils.lineReader<number>(
  "src/08/input.txt",
  /^(\d+)$/,
  (match) => {
    const row = match[1];
    for (let x = 0; x < row.length; x++) {
      const tree: Tree = {
        x,
        y,
        height: parseInt(row[x]),
        visible: false,
        scenicScore: 0,
        column: x,
        row: y,
      };
      map.set(x, y, tree);
    }
    y++;

    return null;
  },
  (result) => {
    const treeWithHighestScenicScore = getTreeWithHighestScenicScore();
    answer = treeWithHighestScenicScore.scenicScore;

    map.print((t) =>
      t == treeWithHighestScenicScore ? `[${t.height}]` : ` ${t.height} `
    );
    console.log(`Highest scenic score: ${answer}`);
  }
);

function getTreeWithHighestScenicScore(): Tree {
  let treeWithHighestScenicScore: Tree = null;

  for (let r = 0; r < map.rows; r++) {
    const row = map.getRowAt(r);
    for (let c = 0; c < map.columns; c++) {
      const tree = map.getItemAt(c, r);
      calculateScenicScore(tree, row, map.getColumnAt(c));
      if (
        treeWithHighestScenicScore == null ||
        tree.scenicScore > treeWithHighestScenicScore.scenicScore
      ) {
        treeWithHighestScenicScore = tree;
      }
    }
  }

  return treeWithHighestScenicScore;
}

function calculateScenicScore(t: Tree, row: Tree[], column: Tree[]): void {
  let viewingDistanceLeft = 0;
  let viewingDistanceRight = 0;
  let viewingDistanceUp = 0;
  let viewingDistanceDown = 0;

  // Left
  for (let i = t.x - 1; i > 0; i--) {
    viewingDistanceLeft++;
    if (row[i].height >= t.height) {
      break;
    }
  }

  // Right
  for (let i = t.x + 1; i < row.length; i++) {
    viewingDistanceRight++;
    if (row[i].height >= t.height) {
      break;
    }
  }

  // Up
  for (let i = t.y - 1; i > 0; i--) {
    viewingDistanceUp++;
    if (column[i].height >= t.height) {
      break;
    }
  }

  // Down
  for (let i = t.y + 1; i < column.length; i++) {
    viewingDistanceDown++;
    if (column[i].height >= t.height) {
      break;
    }
  }

  t.scenicScore =
    viewingDistanceLeft *
    viewingDistanceRight *
    viewingDistanceUp *
    viewingDistanceDown;
}
