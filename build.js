const fs = require("fs");
const path = require("path");

const root = __dirname;
const outputDirectory = path.join(root, "dist");
const template = fs.readFileSync(path.join(root, "index.template.html"), "utf8");
const includePattern = /(^[ \t]*)<!-- INCLUDE: ([a-z-]+) -->[ \t]*/gm;
const includes = Array.from(template.matchAll(includePattern));

if (includes.length === 0) {
  throw new Error("No section includes were found in index.template.html.");
}

const html = template.replace(includePattern, (_, indentation, name) => {
  const sectionPath = path.join(root, `${name}.html`);

  if (!fs.existsSync(sectionPath)) {
    throw new Error(`Missing section file: ${name}.html`);
  }

  return fs
    .readFileSync(sectionPath, "utf8")
    .trimEnd()
    .split(/\r?\n/)
    .map((line) => `${indentation}${line}`)
    .join("\n");
});

if (html.includes("<!-- INCLUDE:")) {
  throw new Error("One or more section includes could not be assembled.");
}

fs.writeFileSync(path.join(root, "index.html"), html, "utf8");

const publicAssets = [
  "styles.css",
  "script.js",
  "logo.jpeg",
  "image1.jpeg",
  "image2.jpeg",
  "certificate-incorporation-redacted.png",
  "private-security-license-redacted.png",
];

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(path.join(outputDirectory, "index.html"), html, "utf8");

for (const asset of publicAssets) {
  const sourcePath = path.join(root, asset);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing public asset: ${asset}`);
  }

  fs.copyFileSync(sourcePath, path.join(outputDirectory, asset));
}

console.log(
  `Built index.html from ${includes.length} HTML files and prepared the Vercel dist/ output.`,
);
