import fs from 'fs'
import download from 'download-git-repo'
import ora from 'ora'
import { rimraf, rimrafSync } from 'rimraf'
import repos from './repos.js'
const loading = ora('正在下载模板...')

export const isExists = (path) => {
  return fs.existsSync(path)
}

export const deleteDir = (path) => {
  rimrafSync(path)
}

export const deleteFile = (path) => {
  rimrafSync(path)
}

export const downloadTemplate = (templateName, projectName) => {
  return new Promise((resolve, reject) => {
    loading.start()
    download(`direct:${repos[templateName]}`, projectName, { clone: true }, err => {
      if (err) {
        reject(err)
        loading.fail('下载失败!')
      } else {
        resolve()
        loading.succeed('下载完成!')
      }
    })
  })
}