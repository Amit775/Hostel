var fs = require('fs');

const project = 'hostel';

const files = ['main-es2015.js', 'main-es2015.js.map'];
const distPath = `./dist/${project}/`;
const destPath = `../main/src/assets/elements/${project}/`;

const formData = new FormData();

files.forEach(name => {
	formData.append(name, fs.createReadStream(`${distPath}${name}`));
	fs.copyFile(`${distPath}${name}`, `${destPath}${name}`, (err) => {
		if (err) throw err;
	});
});

fetch(`http://localhost:44395/script/${project}`, { method: 'POST', body: formData }).then(
	console.log(`${project} deployed successfully`),
	console.error('something went wrong')
)

