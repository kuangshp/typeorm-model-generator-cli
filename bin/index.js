#!/usr/bin/env node

const commander = require('commander');
const Printer = require('@darkobits/lolcatjs');
const shelljs = require('shelljs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const home = require('home');
const path = require('path');
const ora = require('ora');
const fs = require('fs');
const childProcess = require('child_process');

// 查看版本
commander.version(Printer.default.fromString('0.0.1'), '-v, --version');

// 定义全部的方法
const binHander = {
  init() {
    inquirer
      .prompt([
        {
          type: 'text',
          message: '请输入需要生成的目录',
          name: 'dirname',
          default: 'entities',
        },
        {
          type: 'text',
          message: '请输入数据库类型',
          name: 'dbName',
          default: 'mysql',
        },
        {
          type: 'text',
          message: '请输入数据库的地址',
          name: 'dbUrl',
          default: 'localhost',
        },
        {
          type: 'text',
          message: '请输入数据库端口',
          name: 'port',
          default: 3306,
        },
        {
          type: 'text',
          message: '请输入数据库用户名',
          name: 'username',
        },
        {
          type: 'password',
          message: '请输入数据库密码',
          name: 'password',
        },
        {
          type: 'text',
          message: '请输入数据库名',
          name: 'database',
        },
        {
          type: 'choices',
          message: '是否不生成带配置的',
          name: 'noConfig',
          default: true,
        },
        {
          type: 'list',
          message: '表示将类名转换首字母是大写的驼峰命名',
          choices: ['pascal', 'param', 'camel', 'none'],
          name: 'ce',
          default: 'pascal',
        },
        {
          type: 'list',
          message: '将数据库中的字段转驼峰',
          choices: ['pascal', 'param', 'camel', 'none'],
          name: 'cp',
          default: 'camel',
        },
      ])
      .then((answers) => {
        console.log(answers);
        const {
          dirname,
          dbName,
          dbUrl,
          database,
          port,
          username,
          password,
          noConfig,
          ce,
          cp,
        } = answers;
        const _dirname = path.join(home.resolve(), dirname);
        if (fs.existsSync(_dirname)) {
          shelljs.rm('-rf', _dirname);
        }
        shelljs.mkdir(_dirname);
        const spinner = ora('👨‍🍳正在生成中....');
        spinner.start();
        childProcess.exec(
          `npx typeorm-model-generator -h ${dbUrl} -d ${database} -p ${port} -u ${username} -x ${password} -e ${dbName} -o ${dirname} --noConfig ${noConfig} --ce ${ce} --cp ${cp}`,
        );
        spinner.stop();
      });
  },
};

commander
  .usage('[cmd] <options>')
  .arguments('<cmd> [env]')
  .action((cmd, otherParms) => {
    const hander = binHander[cmd];
    if (typeof hander === 'undefained') {
      console.log(
        `${chalk.yellow('非常遗憾')}【${chalk.red(cmd)}】${chalk.yellow(
          还没开发,
        )}`,
      );
      process.exit(1);
    } else {
      hander(otherParms);
    }
  });

commander.parse(process.argv);
