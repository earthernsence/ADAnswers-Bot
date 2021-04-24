/* eslint-disable no-negated-condition */
/* eslint-disable complexity */
/* eslint-disable max-len */
"use strict";

Array.prototype.pushAll = function(...entries) {
  entries.forEach(a => this.push(a));
  return this;
};

const PRE_SPLIT_EARLY = "11,21,33,31,41";
const PRE_SPLIT = "11,22,32,42,51,61";
const EXTRA = "21,31,41,33,62";
const ANTIMATTER = "71,81,91,101";
const INFINITY = "72,82,92,102";
const TIME = "73,83,93,103";
const ACTIVE = "121,131,141";
const PASSIVE = "122,132,142";
const IDLE = "123,133,143";
const POST_SPLIT = "151,161,171,181,162";

function toPath(str = "active") {
  switch (str.toLowerCase()) {
  case "active": return ACTIVE;
  case "passive": return PASSIVE;
  case "idle": return IDLE;
  default: throw `Unknown argument: Expected path name (\`active\`, \`passive\`, \`idle\`) but found: --> ${str} <--`;
  }
}

// 0 TTs to 53 TTs
function earlyEternity(theorem) {
  if (theorem <= 13) {
    return [PRE_SPLIT_EARLY];
  }
  if (theorem <= 39) {
    return [PRE_SPLIT, ANTIMATTER, 21, 33];
  }
  if (theorem <= 44) {
    return [PRE_SPLIT, INFINITY, 21, 33, 31];
  }
  if (theorem <= 51) {
    return [PRE_SPLIT, ANTIMATTER, 111, 21, 33, 31];
  }
  return [PRE_SPLIT, INFINITY, 111];
}

// 54 TTs to 120 TTs
function secondSplit(theorem, path) {
  if (theorem <= 69) {
    return [PRE_SPLIT, ANTIMATTER, 111, path, 21, 31];
  }
  if (theorem <= 70) {
    return [PRE_SPLIT, INFINITY, 111, path, 21, 33, 31, 41];
  }
  if (theorem <= 84) {
    return [PRE_SPLIT, ANTIMATTER, 111, path, 151, 161, 21, 33, 31];
  }
  if (theorem <= 99) {
    return [PRE_SPLIT, INFINITY, 111, path, 151, 161, 162, 21, 33, 31];
  }
  return [PRE_SPLIT, TIME, 111, path, 151, 161, 171, 162, EXTRA];
}

// 901 TTs+
function lightDark(theorem) {
  const BASE = [PRE_SPLIT, TIME, 111, ACTIVE, POST_SPLIT, EXTRA];
  if (theorem <= 1292) {
    return BASE.pushAll(191, 212, 193, 214, 211, 213);
  }
  if (theorem <= 2142) {
    return BASE.pushAll(193, 214, 228, 234);
  }
  if (theorem <= 2272) {
    return BASE.pushAll(191, 212, 223, 232);
  }
  if (theorem <= 2692) {
    return BASE.pushAll(191, 212, 223, 232, 193, 214, 211, 213);
  }
  if (theorem <= 3542) {
    return BASE.pushAll(191, 211, 212, 223, 232, 192, 193, 214);
  }
  if (theorem <= 3712) {
    return BASE.pushAll(191, 211, 222, 212, 224, 232, 193, 214);
  }
  if (theorem <= 3925) {
    return BASE.pushAll(191, 212, 223, 232, 192, 201, INFINITY, 211, 193, 214, 213);
  }
  if (theorem <= 4945) {
    return BASE.pushAll(191, 211, 222, 212, 224, 232, 192, 201, 71, 81, 91, 102, 193, 214, 213, 228);
  }
  return BASE.pushAll(191, 211, 222, 212, 224, 232, 192, 201, INFINITY, 193, 214, 228, 234, 213, 226);
}

function generateTree(theorem, path) {
  let tree, desc = null;
  if (theorem < 54) {
    tree = earlyEternity(theorem);
  } else if (theorem < 121) {
    tree = secondSplit(theorem, path);
  } else if (theorem < 318) {
    tree = [PRE_SPLIT, TIME, 111, ACTIVE, POST_SPLIT, EXTRA];
    desc = "At 900 Total TT, this flips over into EC10 territory.";
  } else if (theorem < 901) {
    tree = [PRE_SPLIT, TIME, 111, ACTIVE, POST_SPLIT, EXTRA, 191, 212, 211];
    desc = "Do note: EC10 is done between this list and the previous.";
  } else {
    tree = lightDark(theorem);
    desc = "If you can't get the last TT, to unlock dilation, use \`++dilationgrind\`.";
  }
  return `${desc === null ? "" : `${desc} `}\`${tree.join(",")}|0\``;
}

const config = require("../config.json");

module.exports = {
  number: 4,
  name: "studytree",
  description: `Generates a Time Study tree based on your total Time Theorems.
  Args: your total Time Theorems. Beginning at 54 TT (and until 120 TT), the command will take a second argument: \`active\`, \`passive\`, or \`idle\`. The argument is optional, and the default value is \`active\`.`,
  execute(message, args, id) {
    if (config.ids.botCommands.includes(id) || config.ids.common.includes(id) || config.ids.ecs.includes(id) || config.ids.earlyEternity.includes(id)) {
      try {
        if (args[0] === "") {
          throw `Error: Argument missing for command \`++${this.name}\``;
        }
        const theorem = Math.abs(Math.floor(args[0]));
        if (isNaN(theorem)) {
          throw `Unknown argument: Expected Number for command \`++${this.name}\` but found: --> ${args[0]} <--`;
        }
        const path = toPath(args[1]);
        message.channel.send(generateTree(theorem, path));
      } catch (e) {
        message.channel.send(e);
      }
    } else {
      message.channel.send("This command only works in bot commands, common channels, or EC channels!");
    }
  }
};
