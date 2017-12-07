import { Recipe } from '../types'

/**
 * Parse one of the lines when running `just --list` into a JustRecipe.
 *
 * @param value A line of raw just output.
 */
export function parseRecipeLine(value: string): Recipe {
  // sanity check
  if (!value || typeof value !== 'string') {
    throw new Error('invalid value')
  }

  // clean up
  const clean = value.trim()

  // another sanity check
  if (clean.length === 0) {
    throw new Error('value have content')
  }

  // slice & clean
  const parts = clean.split('#').map(x => (x || '').trim())

  // assign the parts
  const name = parts[0].trim()
  const description = clean
    .replace(name, '')
    .replace(/\#/, '')
    .trim()

  // return the goods
  return { name, description }
}
