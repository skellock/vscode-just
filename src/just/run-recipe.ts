import * as execa from 'execa'
import { ExecaError } from 'execa'
import { EOL } from 'os'
import { cwd } from 'process'
import { Recipe, RunRecipeResult } from '../types'

/**
 * Gets a list of commands you can run from a justfile.
 */
export async function runRecipe(recipe: Recipe): Promise<RunRecipeResult> {
  try {
    // make the call to just
    const execaResult = await execa('just', [recipe.name])

    // successful call to the executable?
    if (execaResult.code === 0) {
      // split up the result
      return {
        kind: 'ok',
        stdout: execaResult.stdout && execaResult.stdout.trim(),
      }
    }
  } catch (e) {
    // runtime check for an execa error
    if (e.cmd) {
      const error = e as ExecaError

      return {
        kind: 'error',
        stderr: error.stderr && error.stderr.trim(),
        stdout: error.stdout && error.stdout.trim(),
      }
    } else {
      return { kind: 'unknown' }
    }
  }
}
