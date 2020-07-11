var fs = require('fs');

const project = 'hostel';

const files = ['main-es5.js', 'main-es5.js.map', 'main-es2015.js', 'main-es2015.js.map'];
const distPath = `./dist/${project}/`;
const destPath = `../HostelServer/scripts/${project}/`;

files.forEach(name => {
	fs.copyFile(`${distPath}${name}`, `${destPath}${name}`, (err) => {
		if (err) throw err;
	});
});

console.log(`${project} deployed successfully`);
