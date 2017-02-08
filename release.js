const fs = require('fs');
const execSync = require('child_process').execSync;

function cmd(command) {
  try {
    const result = execSync(command);
    return result.toString()
  } catch (error) {
    throw(error);
  }
}

function getVersion() {
  try {
    let tag = cmd('git describe --exact-match --tags $(git rev-parse HEAD)');
    console.log('tag');
    console.log(tag);
    tag = tag.replace(/\r?\n|\r/g, '');
    if (/^\d+.\d+.\d+/.test(tag)) {
      return tag;
    }
    return null;
  } catch (e) {
    return null;
  }
}

console.log('start release prepare');

const packageInfo = JSON.parse(fs.readFileSync('package.json'));
delete packageInfo.scripts;

console.log('start release compile');
cmd('npm run compile');

packageInfo.main = 'lib/index.js';

const version = getVersion();

if (version) {
  console.log('update release version');
  packageInfo.version = version;
}

fs.writeFileSync('package.json', JSON.stringify(packageInfo, null, 2));
console.log('finish release prepare');
