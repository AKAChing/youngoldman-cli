#!/usr/bin/env node

console.log('cli-running!')
import fs from 'fs'
import { program } from 'commander'
import inquirer from 'inquirer'
import { isExists, deleteFile, deleteDir, downloadTemplate } from './utils.js'
let packageJson = JSON.parse(fs.readFileSync('./package.json'))

program.version(packageJson.version)
program
	.command('create <projectName>')
	.alias('c')
	.description('创建项目')
	.action(async projectName => {
		inquirer
			.prompt([
				{
					type: 'input',
					name: 'projectName',
					message: '请输入项目名称',
					default: projectName,
				},
				{
					type: 'list',
					name: 'framework',
					message: '请选择技术框架',
					choices: ['vue', 'react', 'uniapp'],
					default: 'vue',
				},
			])
			.then(answers => {
				if (isExists(answers.projectName)) {
          console.log('文件夹已存在!')
          return
				}
        downloadTemplate(answers.framework, answers.projectName)
				// console.log(answers)
			})
	})
program.parse(process.argv)
// import { exec, spawn } from 'child_process'
// import { input, select, confirm, search } from '@inquirer/prompts'
// const framework = await select({
// 	message: '请选择技术盏',
// 	choices: ['vue', 'react', 'uniapp'],
//   default: 'vue',
// })

// if (framework == 'vue') {
//   const projectName = await input({
//     message: '请输入项目名称',
//   })
//   if (isExists(projectName)) {
//     await confirm({
//       message: '项目已存在，是否覆盖？',
//     })
//     deleteDir(projectName)
//     fs.mkdirSync(projectName)
//     fs.writeFileSync(`./${projectName}/package.json`, '{}')
//   } else {
//     fs.mkdirSync(projectName)
//     fs.writeFileSync(`./${projectName}/package.json`, '{}')
//     // exec(`cd ${projectName} && npm init -y`)
//   }
// }
