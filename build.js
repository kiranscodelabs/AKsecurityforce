const fs = require("fs");
const path = require("path");

const root = __dirname;
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
console.log(`Built index.html from ${includes.length} HTML files in the project root.`);
