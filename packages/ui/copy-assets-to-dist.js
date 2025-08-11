const copyfiles = require('copyfiles');

const targetDir = process.argv[2];

if (!targetDir) {
  console.error('Error: No target directory specified');
  process.exit(1);
}

const paths = ['./assets/*', `./dist/${targetDir}/assets`];

copyfiles(paths, { up: true }, (err) => {
  if (err) {
    console.error('Error occurred during copying:', err);
  } else {
    console.log(`Files and directories successfully copied to ${targetDir}`);
  }
});
