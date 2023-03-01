import { Trees } from "../utils/types";
import { getAffordableStudiesFromStudyList } from "../functions/studies";
import { trees } from "../functions/trees";

export class Tree {
  theorems: number;
  path: string;
  trees: Trees[];
  mobile: boolean;
  constructor(theorems: number, path?: string, mobile?:boolean) {
    this.theorems = Math.max(theorems, 0);
    this.path = path === undefined ? "active" : path;
    this.trees = trees(this.path);
    this.mobile = mobile === undefined ? false : mobile;
  }

  get realPath(): string {
    switch (this.path.toLowerCase()) {
      case "active": return "121,131,141";
      case "passive": return "122,132,142";
      case "idle": return "123,133,143";
      default: throw `Unknown argument: Expected path name (\`active\`, \`passive\`, \`idle\`) but found: --> ${this.path} <--`;
    }
  }

  generateTree(): string {
    for (const tree of this.trees) {
      if (this.theorems >= tree.requirement) {
        const affordableStudies = getAffordableStudiesFromStudyList(tree.ts, this.theorems);
        if (this.mobile) {
          return `${tree.desc === undefined
            ? ""
            : `${tree.desc} `}${affordableStudies.join(",")}|0`;
        }
        return `${tree.desc === undefined
          ? ""
          : `${tree.desc} `}\`${affordableStudies.join(",")}|0\``;
      }
    }
    return "Oh no! This message should never appear. Please submit a bug report to earth so that he can fix this.";
  }
}
