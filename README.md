![Webug](http://i.imgur.com/H5xHtGT.png) webug
=====

PHP debugging tool for Google Chrome ([FirePHP](http://www.firephp.org/) extension port).

### [Install **Webug** from **Chrome Web Store**](https://chrome.google.com/webstore/detail/webug/cjbeipenlpoeifpkjhgakejmikdhlhcj)

### Example

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

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/fedosov/webug/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

