const util = require('util')
const path = require("path");
const downloadGitRepo = require('download-git-repo') 
const API  = require('./api')
const Inquirer = require("inquirer");
const ora = require('ora')

async function loading(message, fn, ...args) {
  const spinner = ora(message);
  spinner.start(); // 开启加载
  try {
    let executeRes = await fn(...args);
    // 加载成功
    spinner.succeed();
    return executeRes;
  } catch (error) {
    // 加载失败
    spinner.fail("request fail, refetching");
    await sleep(1000);
    // 重新拉取
    return loading(message, fn, ...args);
  }
}

function sleep(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}

class Creator {
  // 项目名称及项目路径
  constructor(name, target) {
    this.name = name;
    this.target = target;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  };
  async init() {
    let { repo } = await new Inquirer.prompt([
      {
        name: "repo",
        type: "list",
        message: "Please choose a template",
        choices: [
          'vue@3-template'
        ],
      },
    ]);
  };

  async download() {
    // 模板下载地址
    const templateUrl = "pangting/vue-template"
    await loading(
      "downloading template, please wait",
      this.downloadGitRepo,
      templateUrl,
      path.resolve(process.cwd(),this.target) // 项目创建位置
    );
  };
   // 创建项目部分
  async create() {
    await this.init()
    await this.download()
  };
  
}

module.exports = Creator;

