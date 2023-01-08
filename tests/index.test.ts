import * as assertions from "./assertions.test";
import * as abbreviation from "./abbreviation.test";
import * as byCycle from "./byCycle.test";
import * as byDay from "./byDay.test";
import * as compareObservations from "./compareObservations.test";
import * as cycleDay from "./cycleDay.test";
import * as findPeakDay from "./findPeakDay.test";
import * as infoForDay from "./infoForDay.test";
import { ok, error, info, TEST_LEVEL, MODULE_LEVEL } from "./testUtils";

let allSuccess = true;

function testModule (name: string, module: any): void {
  info(MODULE_LEVEL, "Testing module", name);
  for (const test of Object.keys(module)) {
    info(TEST_LEVEL, `Testing ${test}`);
    const result = module[test]();
    if (result) {
      ok(TEST_LEVEL, test, "...OK");
    } else {
      error(TEST_LEVEL, test, "...FAIL");
      allSuccess = false;
    }
  }
  console.log();
}

console.log("RUNNING TESTS...HOLD ONTO YOUR BUTTS!\n".rainbow.underline.italic.bold);
testModule("assertions", assertions);
testModule("abbreviation", abbreviation);
testModule("byCycle", byCycle);
testModule("byDay", byDay);
testModule("compareObservations", compareObservations);
testModule("cycleDay", cycleDay);
testModule("findPeakDay", findPeakDay);
testModule("infoForDay", infoForDay);
// TODO: infoForDay, mucusScore, postPeakDays, stamp, virtualize, throwError

if (allSuccess) {
  console.log("OK! YOU ROCK!".white.underline.italic.bgGreen.bold);
} else {
  console.log("FAIL! YOU SUCK!".white.underline.italic.bgRed.bold);
}
