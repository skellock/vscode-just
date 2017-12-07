import * as assert from 'assert'
import * as vscode from 'vscode'
import * as myExtension from '../extension'

const LAZY = true

suite('just extension', () => {
  test('should i write tests?', () => {
    assert.equal(LAZY, true)
  })
})
