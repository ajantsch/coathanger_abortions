const { exec } = require("child_process");
var generate = require("project-name-generator");
var colors = require("colors");

var releaseName = generate().dashed;
var tag = `release/${releaseName}`;

exec(`git tag -a ${tag} -m ${releaseName}`, (error, stdout, stderr) => {
  if (error) {
    console.log(colors.red(`${error.message}`));
    return;
  }
  if (stderr) {
    console.log(colors.red(`${stderr}`));
    return;
  }
  console.log(
    colors.green("Created new release named"),
    colors.green.bold(releaseName)
  );
});
