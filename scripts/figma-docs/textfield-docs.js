// TextField Documentation — Figma Dev Console Script
// Paste this entire script into the Figma Dev Console (Plugins > Development > Open Console)
// Target file: atoms (b79qv459pnXaypgNQfNXuc) — TextField page
//
// Creates: Overview, Variants (aligned matrix), Anatomy (with dashed lines), Specs

(async () => {
  // ─── Constants ───────────────────────────────────────────────────────
  const DOC_W = 984;
  const SEC_W = 904;
  const SEC_GAP = 24;
  const SEC_PAD = 40;

  const GREEN_BG  = { r: 232/255, g: 245/255, b: 233/255 };
  const GREEN_TXT = { r: 56/255,  g: 142/255, b: 60/255  };
  const BLUE      = { r: 51/255,  g: 102/255, b: 229/255 };
  const DARK      = { r: 26/255,  g: 26/255,  b: 26/255  };
  const GRAY_BG   = { r: 247/255, g: 247/255, b: 250/255 };
  const MED_GRAY  = { r: 150/255, g: 150/255, b: 150/255 };
  const WHITE     = { r: 1, g: 1, b: 1 };
  const LIGHT_BOR = { r: 200/255, g: 200/255, b: 210/255 };
  const RED       = { r: 186/255, g: 26/255,  b: 26/255  };

  // ─── Helpers ─────────────────────────────────────────────────────────
  function solid(color) {
    return [{ type: "SOLID", color }];
  }

  function text(parent, str, x, y, fontSize, color, fontWeight) {
    const t = figma.createText();
    t.x = x; t.y = y;
    t.fontName = { family: "Inter", style: fontWeight || "Regular" };
    t.fontSize = fontSize;
    t.characters = str;
    t.fills = solid(color);
    parent.appendChild(t);
    return t;
  }

  function rect(parent, x, y, w, h, fills, cornerRadius, strokes, strokeWeight) {
    const r = figma.createRectangle();
    r.x = x; r.y = y;
    r.resize(w, h);
    r.fills = fills || [];
    if (cornerRadius) r.cornerRadius = cornerRadius;
    if (strokes) { r.strokes = strokes; r.strokeWeight = strokeWeight || 1; }
    parent.appendChild(r);
    return r;
  }

  function dashedLine(parent, x1, y1, x2, y2, color) {
    const v = figma.createVector();
    v.vectorNetwork = {
      vertices: [
        { x: 0, y: 0, strokeCap: "NONE", strokeJoin: "MITER", cornerRadius: 0, handleMirroring: "NONE" },
        { x: x2 - x1, y: y2 - y1, strokeCap: "NONE", strokeJoin: "MITER", cornerRadius: 0, handleMirroring: "NONE" }
      ],
      segments: [{ start: 0, end: 1, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } }],
      regions: []
    };
    v.x = x1; v.y = y1;
    v.strokes = solid(color || BLUE);
    v.strokeWeight = 1;
    v.dashPattern = [4, 4];
    v.fills = [];
    parent.appendChild(v);
    return v;
  }

  function numberedCallout(parent, num, x, y) {
    const circle = figma.createEllipse();
    circle.resize(20, 20);
    circle.x = x; circle.y = y;
    circle.fills = solid(BLUE);
    parent.appendChild(circle);
    const t = text(parent, String(num), x + (num < 10 ? 6 : 3), y + 3, 11, WHITE, "Bold");
    return { circle, text: t };
  }

  // Draw a text field representation
  function drawTextField(parent, x, y, w, h, opts) {
    opts = opts || {};
    const borderColor = opts.error ? RED : opts.focused ? BLUE : LIGHT_BOR;
    const borderWeight = opts.focused ? 2 : 1;

    // Container
    const container = rect(parent, x, y, w, h, solid(WHITE), 4, solid(borderColor), borderWeight);

    // Label (floating above or inside)
    if (opts.label !== false) {
      const labelColor = opts.error ? RED : opts.focused ? BLUE : MED_GRAY;
      const labelY = opts.hasValue || opts.focused ? y - 8 : y + 16;
      const labelSize = opts.hasValue || opts.focused ? 11 : 14;
      text(parent, opts.labelText || "Label", x + 12, labelY, labelSize, labelColor, "Medium");
    }

    // Input text
    if (opts.hasValue) {
      text(parent, opts.valueText || "Input text", x + 12, y + 14, 14, DARK, "Regular");
    }

    // Helper / Error text
    if (opts.helperText) {
      const helperColor = opts.error ? RED : MED_GRAY;
      text(parent, opts.helperText, x, y + h + 4, 11, helperColor, "Regular");
    }

    // Leading icon placeholder
    if (opts.leadingIcon) {
      rect(parent, x + 12, y + (h - 18) / 2, 18, 18, solid(MED_GRAY), 2);
    }

    // Trailing icon placeholder
    if (opts.trailingIcon) {
      rect(parent, x + w - 30, y + (h - 18) / 2, 18, 18, solid(MED_GRAY), 2);
    }

    return container;
  }

  // ─── Find page & sections ───────────────────────────────────────────
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

  const page = figma.root.children.find(p => p.name.toLowerCase().includes("text field") || p.name.toLowerCase().includes("textfield"));
  if (!page) { console.error("TextField page not found"); return; }
  await figma.setCurrentPageAsync(page);

  // Find Documentation section
  let docSection = page.children.find(n => n.name === "Documentation" && n.type === "SECTION");
  if (!docSection) {
    // Create Documentation section
    docSection = figma.createSection();
    docSection.name = "Documentation";
    docSection.resizeWithoutConstraints(DOC_W, 3000);
    docSection.x = 1200; docSection.y = 0;
    page.appendChild(docSection);
  }

  // Clear existing content in Documentation section
  for (const child of [...docSection.children]) {
    child.remove();
  }

  let currentY = SEC_PAD;

  // ─── 1. OVERVIEW ────────────────────────────────────────────────────
  const overviewSection = figma.createSection();
  overviewSection.name = "Overview";
  overviewSection.resizeWithoutConstraints(SEC_W, 280);
  overviewSection.x = SEC_GAP; overviewSection.y = currentY;
  docSection.appendChild(overviewSection);

  // Status badge
  rect(overviewSection, 20, 16, 80, 24, solid(GREEN_BG), 12);
  text(overviewSection, "Ready", 38, 20, 12, GREEN_TXT, "Semi Bold");

  // Title + description
  text(overviewSection, "Text Field", 20, 52, 24, DARK, "Bold");
  text(overviewSection, "Text fields allow users to enter and edit text. They typically appear in forms\nand dialogs. MD3 text fields come in two variants: filled and outlined.", 20, 86, 14, MED_GRAY, "Regular");

  // Demo row — 3 text fields showing key states
  const demoY = 140;
  drawTextField(overviewSection, 20, demoY, 260, 48, { label: true, labelText: "Label", focused: false });
  drawTextField(overviewSection, 310, demoY, 260, 48, { label: true, labelText: "Label", focused: true, hasValue: true, valueText: "Input text" });
  drawTextField(overviewSection, 600, demoY, 260, 48, { label: true, labelText: "Label", error: true, hasValue: true, valueText: "Input text", helperText: "Error message" });

  // Labels under demos
  text(overviewSection, "Default", 115, demoY + 56, 11, MED_GRAY, "Medium");
  text(overviewSection, "Focused", 405, demoY + 56, 11, MED_GRAY, "Medium");
  text(overviewSection, "Error", 700, demoY + 56, 11, MED_GRAY, "Medium");

  currentY += 280 + SEC_GAP;

  // ─── 2. VARIANTS ────────────────────────────────────────────────────
  const variantsSection = figma.createSection();
  variantsSection.name = "Variants";
  variantsSection.resizeWithoutConstraints(SEC_W, 520);
  variantsSection.x = SEC_GAP; variantsSection.y = currentY;
  docSection.appendChild(variantsSection);

  text(variantsSection, "Variants", 20, 16, 20, DARK, "Bold");

  // Matrix: rows = [Filled, Outlined], cols = [Default, Focused, With Value, Disabled, Error]
  const vRows = ["Filled", "Outlined"];
  const vCols = ["Default", "Focused", "With Value", "Disabled", "Error"];
  const cellW = 155;
  const cellH = 70;
  const startX = 100;
  const startY = 60;
  const gapX = 10;
  const gapY = 20;

  // Column headers
  vCols.forEach((col, ci) => {
    text(variantsSection, col, startX + ci * (cellW + gapX) + 30, startY, 11, MED_GRAY, "Semi Bold");
  });

  // Row headers + cells
  vRows.forEach((row, ri) => {
    const rowY = startY + 24 + ri * (cellH + gapY + 30);
    text(variantsSection, row, 20, rowY + 20, 12, MED_GRAY, "Semi Bold");

    vCols.forEach((col, ci) => {
      const cellX = startX + ci * (cellW + gapX);
      const cellY = rowY;
      const isFilled = row === "Filled";
      const opts = {
        label: true,
        labelText: "Label",
        focused: col === "Focused",
        hasValue: col === "With Value" || col === "Error",
        valueText: "Input text",
        error: col === "Error",
        helperText: col === "Error" ? "Error message" : undefined,
      };

      // Filled variant has gray background
      if (isFilled) {
        const bg = rect(variantsSection, cellX, cellY, cellW, 48, solid(GRAY_BG), 4);
        // Bottom border only for filled
        const bottomLine = rect(variantsSection, cellX, cellY + 47, cellW, opts.focused ? 2 : 1,
          solid(opts.error ? RED : opts.focused ? BLUE : LIGHT_BOR));
        if (opts.label) {
          const labelColor = opts.error ? RED : opts.focused ? BLUE : MED_GRAY;
          const labelY2 = opts.hasValue || opts.focused ? cellY + 6 : cellY + 16;
          text(variantsSection, "Label", cellX + 12, labelY2, opts.hasValue || opts.focused ? 11 : 14, labelColor, "Medium");
        }
        if (opts.hasValue) {
          text(variantsSection, "Input text", cellX + 12, cellY + 24, 14, DARK, "Regular");
        }
      } else {
        drawTextField(variantsSection, cellX, cellY, cellW, 48, opts);
      }

      // Disabled overlay
      if (col === "Disabled") {
        const overlay = rect(variantsSection, cellX, cellY, cellW, 48, [{ type: "SOLID", color: WHITE, opacity: 0.5 }], 4);
        overlay.opacity = 0.5;
      }
    });
  });

  // Second matrix: rows = [With Icons], cols = [Leading, Trailing, Both]
  const iconRowY = startY + 24 + vRows.length * (cellH + gapY + 30) + 30;
  text(variantsSection, "With Icons", 20, iconRowY + 10, 12, MED_GRAY, "Semi Bold");

  const iconCols = ["Leading Icon", "Trailing Icon", "Both Icons"];
  iconCols.forEach((label, ci) => {
    const cellX = startX + ci * (cellW + gapX + 40);
    text(variantsSection, label, cellX + 20, iconRowY - 14, 11, MED_GRAY, "Semi Bold");
    drawTextField(variantsSection, cellX, iconRowY, 180, 48, {
      label: true, labelText: "Label", hasValue: true, valueText: "Input",
      leadingIcon: label.includes("Leading") || label.includes("Both"),
      trailingIcon: label.includes("Trailing") || label.includes("Both"),
    });
  });

  currentY += 520 + SEC_GAP;

  // ─── 3. ANATOMY ─────────────────────────────────────────────────────
  const anatomySection = figma.createSection();
  anatomySection.name = "Anatomy";
  anatomySection.resizeWithoutConstraints(SEC_W, 480);
  anatomySection.x = SEC_GAP; anatomySection.y = currentY;
  docSection.appendChild(anatomySection);

  text(anatomySection, "Anatomy", 20, 16, 20, DARK, "Bold");

  // Gray diagram area
  const diagX = 20, diagY = 52, diagW = SEC_W - 40, diagH = 280;
  rect(anatomySection, diagX, diagY, diagW, diagH, solid(GRAY_BG), 8);

  // Central text field for anatomy
  const tfX = diagX + (diagW - 300) / 2;
  const tfY = diagY + 80;
  drawTextField(anatomySection, tfX, tfY, 300, 56, {
    label: true, labelText: "Label", hasValue: true, valueText: "Input text",
    leadingIcon: true, trailingIcon: true, helperText: "Supporting text"
  });

  // Anatomy callouts + dashed lines
  const parts = [
    { num: 1, label: "Container",       cx: tfX + 150, cy: tfY + 28,   lx: tfX - 80,      ly: diagY + 20 },
    { num: 2, label: "Label text",       cx: tfX + 40,  cy: tfY - 8,    lx: tfX - 80,      ly: diagY + 50 },
    { num: 3, label: "Input text",       cx: tfX + 120, cy: tfY + 20,   lx: tfX + 340,     ly: diagY + 20 },
    { num: 4, label: "Leading icon",     cx: tfX + 21,  cy: tfY + 19,   lx: tfX - 80,      ly: diagY + 100 },
    { num: 5, label: "Trailing icon",    cx: tfX + 282, cy: tfY + 19,   lx: tfX + 340,     ly: diagY + 60 },
    { num: 6, label: "Supporting text",  cx: tfX + 60,  cy: tfY + 64,   lx: tfX + 340,     ly: diagY + 100 },
  ];

  parts.forEach(p => {
    // Dashed line from component part to callout position
    dashedLine(anatomySection, p.cx, p.cy, p.lx, p.ly, BLUE);
    // Numbered callout at end of line
    numberedCallout(anatomySection, p.num, p.lx - 10, p.ly - 10);
  });

  // Legend below diagram
  const legendY = diagY + diagH + 16;
  parts.forEach((p, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const lx = 40 + col * 290;
    const ly = legendY + row * 24;

    // Number circle (small)
    const circle = figma.createEllipse();
    circle.resize(16, 16);
    circle.x = lx; circle.y = ly;
    circle.fills = solid(BLUE);
    anatomySection.appendChild(circle);
    text(anatomySection, String(p.num), lx + (p.num < 10 ? 5 : 2), ly + 2, 10, WHITE, "Bold");

    text(anatomySection, p.label, lx + 22, ly + 1, 12, DARK, "Medium");
  });

  currentY += 480 + SEC_GAP;

  // ─── 4. SPECS ───────────────────────────────────────────────────────
  const specsSection = figma.createSection();
  specsSection.name = "Specs";
  specsSection.resizeWithoutConstraints(SEC_W, 320);
  specsSection.x = SEC_GAP; specsSection.y = currentY;
  docSection.appendChild(specsSection);

  text(specsSection, "Specs", 20, 16, 20, DARK, "Bold");

  // Spec table
  const specs = [
    ["Property",         "Value"],
    ["Height",           "56dp (default), 48dp (dense)"],
    ["Corner radius",    "4dp (top) — outlined; 4dp (top), 0dp (bottom) — filled"],
    ["Label font",       "Body Small (12sp) — floating; Body Large (16sp) — resting"],
    ["Input font",       "Body Large (16sp)"],
    ["Padding (horiz.)", "16dp"],
    ["Padding (vert.)",  "8dp (top), 16dp (bottom)"],
    ["Icon size",        "24dp"],
    ["Helper font",      "Body Small (12sp)"],
    ["Helper spacing",   "4dp below container"],
    ["Border (outlined)","1dp default, 2dp focused"],
    ["Border (filled)",  "1dp bottom default, 2dp bottom focused"],
  ];

  const colWidths = [200, 660];
  specs.forEach((row, ri) => {
    const ry = 52 + ri * 22;
    const isHeader = ri === 0;
    text(specsSection, row[0], 20, ry, 12, isHeader ? MED_GRAY : DARK, isHeader ? "Semi Bold" : "Medium");
    text(specsSection, row[1], 20 + colWidths[0], ry, 12, isHeader ? MED_GRAY : DARK, isHeader ? "Semi Bold" : "Regular");
    if (ri > 0) {
      rect(specsSection, 20, ry - 4, SEC_W - 40, 1, [{ type: "SOLID", color: { ...LIGHT_BOR }, opacity: 0.3 }]);
    }
  });

  // Resize doc section to fit
  docSection.resizeWithoutConstraints(DOC_W, currentY + 320 + SEC_PAD);

  console.log("✅ TextField documentation created successfully!");
  figma.notify("TextField documentation created!");
})();
