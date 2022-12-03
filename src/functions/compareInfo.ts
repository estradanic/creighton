import { Info } from "./infoForDay";

function compareInfo(a: Info, b: Info): number {
  if (a.stamp.includes("yellow") && !b.stamp.includes("yellow")) {
    return -1;
  } else if (!a.stamp.includes("yellow") && b.stamp.includes("yellow")) {
    return 1;
  }

  if (a.stamp.includes("red") && !b.stamp.includes("red")) {
    return -1;
  } else if (!a.stamp.includes("red") && b.stamp.includes("red")) {
    return 1;
  }

  if (a.abbreviation.includes("10") && !b.abbreviation.includes("10")) {
    return -1;
  } else if (!a.abbreviation.includes("10") && b.abbreviation.includes("10")) {
    return 1;
  }

  if (a.stamp.includes("white") && !b.stamp.includes("white")) {
    return -1;
  } else if (!a.stamp.includes("white") && b.stamp.includes("white")) {
    return 1;
  }

  // sort fourth on days after peak day
  if (a.stamp.includes("p-plus") && !b.stamp.includes("p-plus")) {
    return -1;
  } else if (!a.stamp.includes("p-plus") && b.stamp.includes("p-plus")) {
    return 1;
  }

  return a.abbreviation.localeCompare(b.abbreviation);
}

export default compareInfo;
