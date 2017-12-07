import { ExtensionContext, window, OutputChannel, commands } from 'vscode'
import { executeRunCommand } from './vscode/execute-run-command'

/**
 * The channel we'll be writing our output to.
 */
const OUTPUT_CHANNEL_NAME = 'just'

/**
 * The command key for running a just recipe.
 * 
 * This needs to match up in two places in our `package.json`.
 */
const RUN_RECIPE_COMMAND_KEY = 'just.run'

/**
 * Fires the first time our extension loads.
 *
 * @param context The vscode context.
 */
export function activate(context: ExtensionContext) {
  // the output channel we'll be writing to when we run tasks
  const outputChannel = window.createOutputChannel(OUTPUT_CHANNEL_NAME)

  // register a command which will allow us to run a recipe
  context.subscriptions.push(
    commands.registerCommand(RUN_RECIPE_COMMAND_KEY, async () => {
      await executeRunCommand(outputChannel)
    })
  )
}

/**
 * Fires when our extension dies.
 */
export function deactivate() {
  // nothing to do
}
