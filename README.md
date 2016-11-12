# readFile
A wrapper around `fs.readFile` that allows to use promises instead of callbacks.

## signature
    readFile(filename<String>, options<{encoding, flag}>): Promise<Buffer | String>

## use
    readFile(filename)
      .then(data => // consume data)
      .catch(err => // process error)