import abbreviation from "../src/functions/abbreviation";
import { OB } from "./observations.mock";
import { assert, assertShallowEquals } from "./testUtils";

export function testAbbreviation (): boolean {
  const obd1 = [
    new OB().str._,
    new OB().vl._,
  ];

  const obd2 = [
    new OB()._,
    new OB()._,
  ];

  return assert(
    assertShallowEquals(abbreviation(new OB()._), "0", "dry no menstruation no stretch -> 0"),
    assertShallowEquals(abbreviation(new OB().vl._), "VL 0", "dry very-light -> VL 0"),
    assertShallowEquals(abbreviation(new OB().l._), "L 0", "dry light -> L 0"),
    assertShallowEquals(abbreviation(new OB().m._), "M", "dry medium -> M"),
    assertShallowEquals(abbreviation(new OB().h._), "H", "dry heavy -> H"),
    assertShallowEquals(abbreviation(new OB().vh._), "VH", "dry very-heavy -> VH"),
    assertShallowEquals(abbreviation(obd1[0], obd1), "VL 10", "stretchy very-light different observations -> VL 10"),
    assertShallowEquals(abbreviation(new OB().vl.r._), "VLR 0", "dry very-light red -> VLR 0"),
    assertShallowEquals(abbreviation(new OB().vl.b._), "VLB 0", "dry very-light brown -> VLB 0"),
    assertShallowEquals(abbreviation(new OB().sh._), "4S", "dry shiny -> 4S"),
    assertShallowEquals(abbreviation(new OB().w._), "2W", "dry wet -> 2W"),
    assertShallowEquals(abbreviation(new OB().d._), "2D", "dry damp -> 2D"),
    assertShallowEquals(abbreviation(new OB().sh.lub._), "10SL", "dry shiny lubricative -> 10SL"),
    assertShallowEquals(abbreviation(new OB().w.lub._), "10WL", "dry wet lubricative -> 10WL"),
    assertShallowEquals(abbreviation(new OB().d.lub._), "10DL", "dry damp lubricative -> 10DL"),
    assertShallowEquals(abbreviation(new OB().st._), "6", "dry sticky -> 6"),
    assertShallowEquals(abbreviation(new OB().t._), "8", "dry tacky -> 8"),
    assertShallowEquals(abbreviation(new OB().str._), "10", "dry stretchy -> 10"),
    assertShallowEquals(abbreviation(obd2[0], obd2), "0AD", "dry all day -> 0AD"),
    assertShallowEquals(abbreviation(new OB().cw._), "0", "color without stretch -> 0"),
    assertShallowEquals(abbreviation(new OB().st.cw._), "6C", "sticky cloudy white -> 6C"),
    assertShallowEquals(abbreviation(new OB().st.b._), "VLB 6B", "sticky brown -> VLB 6B"),
    assertShallowEquals(abbreviation(new OB().st.cc._), "6C/K", "sticky cloudy clear -> 6C/K"),
    assertShallowEquals(abbreviation(new OB().st.c._), "6K", "sticky clear -> 6K"),
    assertShallowEquals(abbreviation(new OB().st.y._), "6Y", "sticky yellow -> 6Y"),
    assertShallowEquals(abbreviation(new OB().st.r._), "VLR 6R", "sticky red -> VLR 6R"),
    assertShallowEquals(abbreviation(new OB().g._), "0", "consistency without stretch or appearance -> 0"),
    assertShallowEquals(abbreviation(new OB().st.g._), "6G", "sticky gummy -> 6G"),
    assertShallowEquals(abbreviation(new OB().st.p._), "6P", "sticky pasty -> 6P"),
    assertShallowEquals(abbreviation(new OB().sh.g._), "4SG", "shiny gummy -> 4SG"),
    assertShallowEquals(abbreviation(new OB().sh.p._), "4SP", "shiny pasty -> 4SP"),
    assertShallowEquals(abbreviation(new OB().lub._), "10L", "lubricative -> 10L"),
  );
};
