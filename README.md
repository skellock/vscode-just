# just

A `Just` language syntax for colourizing your `justfile`s and running recipes.

![Just in Code](images/just-demo.gif)

# Running A Recipe

* `cmd + shift + p` then type `Just: Run Recipe`
* choose a recipe and press enter

# What is Just?

Just is a task/command/recipe runner. It's a single binary with no dependencies. Small & fast.

[Read more](https://github.com/casey/just) about it on their github page.

# Roadmap

* [x] syntax highlighting
* [x] run recipe
* [ ] pass arguments to recipes
* [ ] choose a non-default justfile
* [ ] tree extension showing recipies and dependencies

# About Just

You:

* create a file in your project directory called `justfile`
* add some recipes
* then run with `just my-recipe` from the command line

Here's a super quick and unhelpful example of a `justfile`:

```just
# behold a recipe
fun:
  echo "hi" > tmp.txt
  cat tmp.txt
  rm tmp.txt

# they can have dependencies
superfun: fun
  echo "woah that was fun!"

# and support other inline scripts
js:
  #!/usr/bin/env node
  console.log('woah, seriously?')

# great for pulling of things that are hard in the shell
ruby:
  #!/usr/bin/env ruby
  puts "yep."
```
