import { OutputChannel } from 'vscode'
import { runRecipe } from '../just/run-recipe'
import { Recipe } from '../types'

/**
 * Attempts to run a just recipe.
 *
 * @param recipe the command to run
 */
export async function executeRecipe(recipe: Recipe, outputChannel: OutputChannel) {
  // create an output channel & log it
  const preserveFocus = true
  outputChannel.show(preserveFocus)
  outputChannel.appendLine(`🤖 Running: just ${recipe.name}`)

  // run the command
  const runResult = await runRecipe(recipe)

  switch (runResult.kind) {
    // we ran it successfully
    case 'ok':
      if (runResult.stdout) {
        outputChannel.appendLine(runResult.stdout)
      } else {
        outputChannel.appendLine(`Ran ${recipe.name} successfully.`)
      }
      break

    // there was an error
    case 'error':
      outputChannel.appendLine(`Error`)
      if (runResult.stdout) {
        outputChannel.appendLine(runResult.stdout)
      }
      if (runResult.stderr) {
        outputChannel.appendLine(runResult.stderr)
      }
      break

    // this shouldn't happen
    case 'unknown':
      outputChannel.appendLine(`Something bad happened running ${recipe.name}.`)
      break
  }
}
