const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("cssnano");
const rename = require("gulp-rename");
var uglify = require('gulp-uglify');

function style() {
  let plugins = [cssnano()];

  return (
    gulp
      .src("./assets/scss/*.scss")
      .pipe(sass().on('error', sass.logError)) // Log Sass errors
      .pipe(sass())
      .pipe(postcss(plugins))
      // .pipe(rename("style.css"))
      .pipe(gulp.dest("./dist/css"))
  );
}

function js() {
  return gulp.src('./assets/js/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('./dist/js'))
}


const devWatch = () => {
  gulp.watch("./assets/scss/*.scss", style);
  gulp.watch("./assets/js/*.js", js);
};

exports.style = style;
exports.devWatch = devWatch;