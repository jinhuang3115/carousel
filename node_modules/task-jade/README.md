# Task-Jade

Compiles and watches Jade-files.


``npm install --save task-jade``

If you have any idea on other tasks that you need in your project, just tell me and I will most likely create it for you :).

## Configurations

Task will have the name ``'jade:watch'`` and ``jade:build``.

Build will build one time.
Watch will build on change.

##### rootFile

The index file of you project.

##### output

Glop for the destination of the html.

##### watch

Glop for watcher.


*Example:*

```
require("task-jade")(gulp, {
  rootFile: './src/index.jade',
  output: dest,
  watch: './src/**/*.jade'
})
```

### Advanced

Add this line to your gulp object:

```
gulp.isProduction = true
```

The html is rendered pretty as default, with the production flag it gets minified.
