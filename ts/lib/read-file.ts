import * as fs from 'fs'

interface IcreateReadFile {
  (readFileAsync: typeof fs.readFile): IreadFile
}

interface IreadFile {
  (filename: string, options?: {encoding?: string, flag?: string} | string): Promise<string | Buffer>
}

const createReadFile: IcreateReadFile = (readFileAsync) =>
  (filename, options) => new Promise((resolve, reject) => options
    ? readFileAsync(
        filename,
        options,
        (err, data) => err ? reject(err) : resolve(data)
      )
    : readFileAsync(
        filename,
        (err, data) => err ? reject(err) : resolve(data)
      )
  )

const readFile = createReadFile(fs.readFile)

export {
  createReadFile,
  readFile
}