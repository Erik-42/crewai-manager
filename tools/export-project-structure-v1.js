// Si vous souhaitez exporter la structure du projet
// Entrez dans le terminal: node export -file - project-structure.json

// si vous ne souhaitez pas installez Node.js suivez les instructions suivantes:
// npm install -g pkg
// pkg export-project-structure-v1.js
// ./export-project-structure-linux

const fs = require("fs");
const path = require("path");

function readDirRecursive(dir) {
	let results = [];
	const list = fs.readdirSync(dir);

	list.forEach(function (file) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat && stat.isDirectory()) {
			results.push({
				name: file,
				type: "directory",
				children: readDirRecursive(filePath),
			});
		} else {
			results.push({
				name: file,
				type: "file",
			});
		}
	});

	return results;
}

const dirPath = path.join("./"); // Change this to your desired directory
const structure = readDirRecursive(dirPath);

fs.writeFileSync(
	"project-structure-extraction.json",
	JSON.stringify(structure, null, 2)
);
console.log("Structure exported to project-structure-extraction.json");
