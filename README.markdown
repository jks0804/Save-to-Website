Save to Website 
======================================
###### by Rob "Fuzzwah" Crouch 

### Overview

An extension for Google Chrome which adds a "save to website" option 
to the menu when you right click on images on web pages.

### Requirements

Along with this extension you'll also need your own webserver and 
enough nerd points to be able to save and configure a php script 
that this extension interfaces with. Its super simple, but you'd 
better know where your web accessible paths are.

### Installation

Firstly, create a world writable directory on your webserver 
(ie: chmod 777 it). Create subfolders below this if you want to 
enable saving into a few different groups.

You will need to save a copy of, and configure, the 
Save-to-Website.php file to somewhere world readable on your 
webserver. In the php file you'll find 3 variables which need to be
configured:

    // the full URL to the storage folder.
    $externalURL = "http://yoursite.com/path/to/images";

    // the relative path to storage folder compared to the php file
    $internalPath = ""; 

    // set a password here and then configure this in the extension
    $password = ""; 
    
You can either grab the files from here on github, or use this link
and install it from [the Chrome Store](http://bit.ly/18MejN5). Using
the Chrome Store is recommended as the extension will then be auto
updated if/when I make changes.

### Credits and Props

This extension is a stripped down hack of antimatter15's 
cloudsave: https://github.com/antimatter15/cloudsave

Props to the crazy88 for putting up with my testing.

Thanks to lexpex for pointing out that this old extension wasn't 
working any more.

### Version Info

#### v 0.3.6 (16th May 2013)

* split functions out into seperate js to avoid duplication
* have to force options tab to close else weird things happen

- - - - 
#### v 0.3.5 (16th May 2013)

* now require the upload function in both background and options

- - - - 
#### v 0.3.3 (16th May 2013)

* php file can now be located in same directory as image storage
* Fixed another menu creation issue

- - - - 
#### v 0.3.2 (15th May 2013)

* Fixed duplicate menus being made if options were resaved

- - - - 
#### v 0.3.0 (15th May 2013) 

* Fixed issue when no sub-directories were set 

- - - - 
#### v 0.2.0 (15th May 2013) 

* Updated to manifest version 2 
* Fixed WebKitBlob changes 
* Reworked options saving / loading 
* Reworked sudbir menu system 
* Reworked password system (I don't see how it was ever working) 
* Generally took this a bit more seriously because someone else is 
actually trying to use it!

- - - - 
#### v 0.1.0 (18th Mar 2011) 

* Extension working as planned.