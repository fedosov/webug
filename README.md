![Webug](http://i.imgur.com/H5xHtGT.png) webug
=====

PHP debugging tool for Google Chrome ([FirePHP](http://www.firephp.org/) extension port).

### [Install **Webug** from **Chrome Web Store**](https://chrome.google.com/webstore/detail/webug/cjbeipenlpoeifpkjhgakejmikdhlhcj)

## Example

    <?php

    require_once('FirePHPCore/FirePHP.class.php');
    $firephp = FirePHP::getInstance(true);

    $firephp->group(array("this" => "is", "group" => "output"));

    $firephp->log("Log", "Label");
    $firephp->info("Info test '");
    $firephp->error("Error", "Err Label");
    $firephp->warn("Warning");
    $firephp->log(array(0 => "A", "Z" => "Y"));
    $firephp->log(array(1, 2, array(0 => "A", "Z" => "Y"), 4, 5));

    $firephp->groupEnd();

![Webug Output Screenshot](http://i.imgur.com/OZXjCOD.png)

## Changelog

**1.3.4**

    Fixed: Repeated log messages in console (@sserbin)

**1.3.2**

    Fixed: Prevent empty log lines (@GodLesZ)

**1.3.1**

    Add: Announce header size limitation (@weirdan)

**1.3.0**

    Add: Support for partial wildfire headers (@weirdan)

**1.2.9**

    Add: Table output

**1.2.8**

    Add: Output filename and line No in console

**1.2.7**

    Fixed: Multiline messages

**1.2.6**

    Add: Labels output

**1.2.5**

    Add: Groups output

**1.2.4**

    Add: Objects output
    Fixed: Double requests
    Fixed: Single quotes in messages

## Authors

**Mikhail Fedosov**

+ [http://github.com/fedosov](http://github.com/fedosov)

## License

> Copyright © 2010 Fedosov Mikhail (tbs.micle@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/fedosov/webug/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
