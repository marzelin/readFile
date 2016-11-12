import { stub } from 'sinon'

import { createReadFile } from '../lib/read-file'

describe('readFile', function () {
  let readFile: Function
  let fsReadFileStub: Sinon.SinonStub

  beforeEach(function () {
    fsReadFileStub = stub()
    readFile = createReadFile(fsReadFileStub)
  })
  
  it('should return a promise', function () {
    readFile('file').should.be.a('promise')
  })

  it('should pass filename as first argument to ' +
     'original function', function () {

    const filename = 'filename'
    fsReadFileStub.callsArgAsync(1)

    return readFile(filename).then(() => 
      fsReadFileStub.should.be.calledWith(filename)
    )
  })

  it('should pass options as the second argument ' +
     'to original function', function () {
  
    fsReadFileStub.callsArgAsync(2)
    const filename = 'filename'
    const options = { encoding: 'utf8' }

    return readFile(filename, options).then(() =>
      fsReadFileStub.should.be.calledWith(filename, options)
    )
  })

  it('should resolve with file content when ' +
     'original function succeeded' ,function () {

    const filename = 'filename'
    const data = 'file contents'
    fsReadFileStub.callsArgWithAsync(1, undefined, data)

    return readFile(filename).then((data: string) =>
      data.should.equal(data)
    )
  })

  it('should reject with error when ' +
     'original function fails', function () {

    const filename = 'filename'
    const error = new Error('file read error')
    fsReadFileStub.callsArgWithAsync(1, error)
    
    return readFile(filename).catch((err: Error) =>
      err.should.equal(error)
    )
  })
})