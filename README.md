Gullwings
---------

Draw curly braces in canvas, by [@groenroos](http://twitter.com/groenroos).

* Draws a curly brace in the given space
* Can draw it in any direction
* Customize color, stroke thickness, and point placement
* No dependencies
* 973 bytes minified and gzipped


### Usage

Include `gullwings.min.js`. Then simply do;

    Gullwings.init(".gullwings");

For the `init` method, you can pass either a query string, or an element object.


#### Available methods

* `init` &mdash; draw some curly braces. First argument is either a query string or an element object that you want to turn into curly braces; second argument is an optional settings object.
* `destroy` &mdash; destroys instances of Gullwings. Pass either a query string or an element object as an argument to destroy specific instances, or pass nothing to destroy everything.


#### Available options

You can pass an object as the second argument for the `.init()` call, to override the default settings.

* `direction` &mdash; the direction the curly brace should face. Either "left", "right", "up" or "down". Default: *left*
* `thickness` &mdash; thickness of the stroke. Default: *1*
* `point` &mdash; the position of the point of the curly brace. If the value is a float from 0 to 1, Gullwings treats it as a percentage (0.5 is 50%). If you pass an integer larger than 1, it's treated as a pixel value. Default: *0.5*
* `color` &mdash; the color of the curly brace in HEX. Default: `#212121`
* `sharpness` &mdash; how tight the curve radius should be. The larger the number, the smaller the curves. Default: `1.5`


### Bugs & Support

Developed by [@groenroos](http://twitter.com/groenroos). Please list all bugs and feature requests in the [Github issue tracker](https://github.com/groenroos/gullwings/issues).

Licensed under the MIT license.
