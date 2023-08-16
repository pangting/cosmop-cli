#! /usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
// 配置指令
program
  .name("cosmop-cli")
  .usage(`<command> [option]`)
  .version(`cosmop-cli ${require("../package.json").version}`)

program
  .command("create <project-name>") 
  .description("create a new project") 
  .option("-f, --force", "overwrite target directory if it exists") 
  .action((projectName, cmd) => {
    // create 指令的执行文件
    require("../lib/create")(projectName, cmd);
  });

program
  .command("config [value]")
  .description('inspect and modify the config')
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys);
  });

  program.on("--help", function () {
    // 前后两个空行调整格式，更舒适
    console.log();
    console.log(
      `Run ${chalk.cyan('cosmop-cli <command>')} --help for detailed usage of given command.`
    );
    console.log();
  });


program.parse(process.argv)
// 美化工具
// console.log(`hello ${chalk.blue("world")}`);
// console.log(chalk.blue.bgRed.bold("Hello world!"));
// console.log(
//   chalk.green(
//     "I am a green line " +
//       chalk.blue.underline.bold("with a blue substring") +
//       " that becomes green again!"
//   )
// );

