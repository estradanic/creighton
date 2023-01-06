import {
  blurryCompareObservations, compareObservationsForAbbreviation, compareObservationsForStamp, compareOnDetails,
} from "../src/functions/compareObservations";
import { OB as O } from "./observations.mock";
import { assert, assertFalsy, assertIsGreater, assertIsLess, assertShallowEquals } from "./testUtils";

export function testBlurryCompareObservations (): boolean {
  return assert(
    assertFalsy(blurryCompareObservations(new O().yo._, new O().yo._), "yellow stamp = yellow stamp"),
    assertFalsy(blurryCompareObservations(new O().yo._, new O()._), "yellow stamp = dry"),
    assertFalsy(blurryCompareObservations(new O()._, new O().yo._), "dry = yellow stamp"),
    assertFalsy(blurryCompareObservations(new O().vl._, new O().vl._), "menstruation = menstruation"),
    assertFalsy(blurryCompareObservations(new O().vl._, new O()._), "menstruation = dry"),
    assertFalsy(blurryCompareObservations(new O()._, new O().vl._), "dry = menstruation"),
    assertIsLess(blurryCompareObservations(new O().lub._, new O()._), 0, "lubricative < dry"),
    assertIsLess(blurryCompareObservations(new O().str._, new O()._), 0, "stretchy < dry"),
    assertIsLess(blurryCompareObservations(new O().t._, new O()._), 0, "tacky < dry"),
    assertIsLess(blurryCompareObservations(new O().st._, new O()._), 0, "sticky < dry"),
    assertIsLess(blurryCompareObservations(new O().str._, new O().st._), 0, "stretchy < sticky"),
    assertIsLess(blurryCompareObservations(new O().str._, new O().t._), 0, "stretchy < tacky"),
    assertShallowEquals(blurryCompareObservations(new O().str._, new O().str._), 0, "stretchy = stretchy"),
    assertIsLess(blurryCompareObservations(new O().t._, new O().st._), 0, "tacky < sticky"),
    assertShallowEquals(blurryCompareObservations(new O().t._, new O().t._), 0, "tacky = tacky"),
    assertShallowEquals(blurryCompareObservations(new O().st._, new O().st._), 0, "sticky = sticky"),
    assertIsLess(blurryCompareObservations(new O().lub._, new O().str._), 0, "lubricative < stretchy"),
    assertShallowEquals(blurryCompareObservations(new O().str._, new O().c._), 0, "stretchy = clear"),
    assertShallowEquals(blurryCompareObservations(new O().str._, new O().r._), 0, "stretchy = red"),
    assertShallowEquals(blurryCompareObservations(new O().str._, new O().b._), 0, "stretchy = brown"),
    assertShallowEquals(blurryCompareObservations(new O().str._, new O().cc._), 0, "stretchy = cloudyClear"),
    assertIsLess(blurryCompareObservations(new O().lub._, new O().str.c._), 0, "lubricative < stretchy clear"),
    assertShallowEquals(blurryCompareObservations(new O()._, new O().cw._), 0, "dry = cloudyWhite"),
  );
};

export function testCompareObservationsForStamp (): boolean {
  return assert(
    assertIsLess(compareObservationsForStamp(new O().yo._, new O()._), 0, "yellow stamp < dry"),
    assertIsGreater(compareObservationsForStamp(new O()._, new O().yo._), 0, "dry > yellow stamp"),
    assertShallowEquals(compareObservationsForStamp(new O().yo._, new O().yo._), 0, "yellow stamp = yellow stamp"),
    assertIsLess(compareObservationsForStamp(new O().vl._, new O()._), 0, "menstruation < dry"),
    assertIsGreater(compareObservationsForStamp(new O()._, new O().vl._), 0, "dry > menstruation"),
    assertShallowEquals(compareObservationsForStamp(new O().vl._, new O().vl._), 0, "menstruation = menstruation"),
  );
}

export function testCompareObservationsForAbbreviation (): boolean {
  return assert(
    assertShallowEquals(compareObservationsForAbbreviation(new O().yo._, new O()._), 0, "yellow stamp = dry"),
    assertShallowEquals(compareObservationsForAbbreviation(new O()._, new O().yo._), 0, "dry = yellow stamp"),
    assertIsLess(compareObservationsForAbbreviation(new O().vl._, new O()._), 0, "menstruation < dry"),
    assertIsGreater(compareObservationsForAbbreviation(new O()._, new O().vl._), 0, "dry > menstruation"),
  );
}

export function testCompareOnDetails (): boolean {
  return assert(
    assertShallowEquals(compareOnDetails(new O()._, new O()._), 0, "dry = dry"),
    assertIsLess(compareOnDetails(new O().d._, new O()._), 0, "damp < dry"),
    assertShallowEquals(compareOnDetails(new O().d._, new O().w._), 0, "damp = wet"),
    assertShallowEquals(compareOnDetails(new O().w._, new O().w._), 0, "wet = wet"),
    assertIsLess(compareOnDetails(new O().sh._, new O().w._), 0, "shiny < wet"),
    assertShallowEquals(compareOnDetails(new O().g._, new O().p._), 0, "gummy = pasty"),
    assertIsLess(compareOnDetails(new O().rp._, new O().g._), 0, "ropey < gummy"),
    assertIsLess(compareOnDetails(new O().stgy._, new O().rp._), 0, "stringy < ropey"),
    assertIsLess(compareOnDetails(new O().cw._, new O()._), 0, "cloudy white < dry"),
    assertIsLess(compareOnDetails(new O().y._, new O().cw._), 0, "yellow < cloudy white"),
    assertIsLess(compareOnDetails(new O().cc._, new O().y._), 0, "cloudy clear < yellow"),
    assertIsLess(compareOnDetails(new O().c._, new O().cc._), 0, "clear < cloudy clear"),
    assertShallowEquals(compareOnDetails(new O().c._, new O().b._), 0, "clear = brown"),
    assertShallowEquals(compareOnDetails(new O().c._, new O().r._), 0, "clear = red"),
    assertIsLess(compareOnDetails(new O().st._, new O()._), 0, "sticky < dry"),
    assertIsLess(compareOnDetails(new O().t._, new O().st._), 0, "tacky < sticky"),
    assertIsLess(compareOnDetails(new O().str._, new O().t._), 0, "stretchy < tacky"),
    assertIsLess(compareOnDetails(new O().l._, new O().vl._), 0, "light < very-light"),
    assertIsLess(compareOnDetails(new O().m._, new O().l._), 0, "medium < light"),
    assertIsLess(compareOnDetails(new O().h._, new O().m._), 0, "heavy < medium"),
    assertIsLess(compareOnDetails(new O().vh._, new O().h._), 0, "very-heavy < heavy"),
    assertIsLess(compareOnDetails(new O().sm._, new O()._), 0, "smooth < dry"),
    assertIsLess(compareOnDetails(new O().lub._, new O().sm._), 0, "lubricative < smooth"),
    assertIsLess(compareOnDetails(new O().stgy._, new O().sh._), 0, "stringy < shiny"),
    assertIsLess(compareOnDetails(new O().c._, new O().sh.stgy._), 0, "clear < shiny stringy"),
    assertIsLess(compareOnDetails(new O().str._, new O().c.sh.stgy._), 0, "stretchy < clear shiny stringy"),
    assertIsLess(compareOnDetails(new O().lub._, new O().str.c.sh.stgy._), 0,
      "lubricative < stretchy clear shiny stringy"),
  );
}
