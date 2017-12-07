import * as execa from 'execa'
import { ExecaError } from 'execa'
import { EOL } from 'os'
import { cwd } from 'process'
import { Recipe, GetRecipesResult } from '../types'
import { parseRecipeLine } from './parse-recipe-line'

/**
 * Gets a list of recipes you can run from a justfile.
 */
export async function getRecipes(justfile?: string): Promise<GetRecipesResult> {
  try {
    // make the call to just
    const execaResult = await execa('just', ['--list'])

    // successful call to the executable?
    if (execaResult.code === 0) {
      // split up the result
      const lines = (execaResult.stdout || '').split(EOL)

      // nothing should never happen
      if (lines.length === 0) {
        return { kind: 'unknown' }
      }

      // 1 line means there are no recipes
      if (lines.length === 1) {
        return { kind: 'no-recipes' }
      }

      // more than 1 line?
      if (lines.length > 1) {
        const tail = lines.splice(1, lines.length - 1)
        const recipes = tail.map(parseRecipeLine)
        return { kind: 'ok', recipes }
      }
    }
  } catch (e) {
    // runtime check for an execa error
    if (e.cmd) {
      const error = e as ExecaError
      const { code, stderr = '' } = error

      // different types of errors we know of
      const noJustFile = code === 1 && stderr.trim() === 'No justfile found.'
      const parseError = code === 1 && stderr.trim().startsWith('error: ')

      if (noJustFile) {
        return { kind: 'no-just-file' }
      } else if (parseError) {
        return { kind: 'just-parse-error' }
      } else {
        return { kind: 'unknown' }
      }
    } else {
      return { kind: 'unknown' }
    }
  }
}
