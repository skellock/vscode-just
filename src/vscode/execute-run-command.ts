import { window, OutputChannel, QuickPickItem } from 'vscode'
import { getRecipes } from '../just/get-recipes'
import { Recipe } from '../types'
import { executeRecipe } from './execute-recipe'

/**
 * Gets a list of recipes kicks off the workflow to list, then execute a recipe.
 *
 * @param outputChannel The output channel we'll write to.
 */
export async function executeRunCommand(outputChannel: OutputChannel) {
  // get the commands
  const result = await getRecipes()

  // what kind of commands did we get?
  switch (result.kind) {
    case 'ok': {
      // this is here to coerce typescript (no pattern matching ftl)
      const commands = result.kind === 'ok' && result.recipes

      // convert to a vscode quick pick list
      const qpCommands: QuickPickItem[] = commands.map(x => ({
        label: x.name,
        detail: x.description,
        description: '',
      }))

      // show the list and wait for a response
      const qp = await window.showQuickPick(qpCommands)

      if (qp) {
        // lookup the command
        const command = commands.find(x => x.name === qp.label)
        executeRecipe(command, outputChannel)
      }

      break
    }

    case 'no-just-file':
      window.showErrorMessage('Could not find a justfile.')
      break

    case 'just-parse-error':
      window.showErrorMessage('Parsing error reading justfile.')
      break

    case 'no-just':
      window.showErrorMessage('Could not find the just executable.')
      break

    case 'no-recipes':
      window.showWarningMessage('No recipes available to run.')
      break

    case 'unknown':
      window.showErrorMessage('Something really wrong happened. 💩')
      break
  }

  outputChannel.appendLine('')
}
