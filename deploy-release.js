const { exec } = require("child_process");
var colors = require("colors");

exec("git push --tags", (error, stdout, stderr) => {
  if (error) {
    console.log(colors.red(`error: ${error.message}`));
    return;
  }
  if (stderr) {
    console.log(colors.red(`stderr: ${stderr}`));
    return;
  }
  console.log(
    colors.green("Deployment started.")
  );
});
