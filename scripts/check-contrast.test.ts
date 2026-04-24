import {
  compositeOver,
  contrastRatio,
  parseHex,
  relativeLuminance,
} from "./check-contrast";

describe("parseHex", () => {
  it("parses 6-char hex with implicit alpha 1", () => {
    expect(parseHex("#FFFFFF")).toEqual({ r: 1, g: 1, b: 1, a: 1 });
    expect(parseHex("#000000")).toEqual({ r: 0, g: 0, b: 0, a: 1 });
  });

  it("parses 8-char hex with alpha", () => {
    const { a } = parseHex("#00000080");
    expect(a).toBeCloseTo(128 / 255, 5);
  });

  it("throws on malformed hex", () => {
    expect(() => parseHex("#FFF")).toThrow();
    expect(() => parseHex("notacolor")).toThrow();
  });
});

describe("relativeLuminance", () => {
  // Reference values per WCAG 2.1 formula
  it("white is 1", () => {
    expect(relativeLuminance({ r: 1, g: 1, b: 1 })).toBeCloseTo(1, 5);
  });

  it("black is 0", () => {
    expect(relativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 5);
  });

  it("matches a known sRGB reference", () => {
    // #808080 → luminance ≈ 0.2159
    const gray = parseHex("#808080");
    expect(relativeLuminance(gray)).toBeCloseTo(0.2159, 3);
  });
});

describe("contrastRatio", () => {
  it("white on black is 21:1", () => {
    const ratio = contrastRatio({ r: 1, g: 1, b: 1 }, { r: 0, g: 0, b: 0 });
    expect(ratio).toBeCloseTo(21, 5);
  });

  it("identical colors give 1:1", () => {
    const c = { r: 0.5, g: 0.5, b: 0.5 };
    expect(contrastRatio(c, c)).toBeCloseTo(1, 5);
  });

  it("is symmetric", () => {
    const a = { r: 1, g: 1, b: 1 };
    const b = { r: 0, g: 0, b: 0 };
    expect(contrastRatio(a, b)).toBeCloseTo(contrastRatio(b, a), 5);
  });
});

describe("compositeOver", () => {
  it("fully opaque fg returns fg", () => {
    const fg = { r: 1, g: 0, b: 0, a: 1 };
    const bg = { r: 0, g: 0, b: 1 };
    expect(compositeOver(fg, bg)).toEqual({ r: 1, g: 0, b: 0 });
  });

  it("fully transparent fg returns bg", () => {
    const fg = { r: 1, g: 0, b: 0, a: 0 };
    const bg = { r: 0, g: 0, b: 1 };
    expect(compositeOver(fg, bg)).toEqual({ r: 0, g: 0, b: 1 });
  });

  it("50% alpha blends halfway", () => {
    const fg = { r: 1, g: 0, b: 0, a: 0.5 };
    const bg = { r: 0, g: 0, b: 1 };
    const out = compositeOver(fg, bg);
    expect(out.r).toBeCloseTo(0.5, 5);
    expect(out.g).toBeCloseTo(0, 5);
    expect(out.b).toBeCloseTo(0.5, 5);
  });
});
