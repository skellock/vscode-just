/**
 * A runnable just recipe.
 */
export interface Recipe {
  /**
   * The name of the recipe.
   */
  name: string
  /**
   * A description of what the recipe does.
   */
  description?: string
}

/**
 * The types of results you can get frmo running a recipe.
 */
export type RunRecipeResult =
  | { kind: 'ok'; stdout?: string }
  | { kind: 'error'; stdout?: string; stderr?: string }
  | { kind: 'unknown' }

/**
 * The types of results you can get from calling getCommands.
 */
export type GetRecipesResult =
  | { kind: 'ok'; recipes: Recipe[] }
  | { kind: 'no-recipes' }
  | { kind: 'no-just-file' }
  | { kind: 'no-just' }
  | { kind: 'just-parse-error' }
  | { kind: 'unknown' }
