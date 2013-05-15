<?php
/*
Save-to-Website.php
Created by Fuzzwah
More info at: https://github.com/Fuzzwah/Save-to-Website

This php file is required by the Save to Website extension for Google's Chrome browser.
Place this file in a world readable directory on your webserver.
Somewhere else on the web server create a directory and chmod it 777 (ie: world writable)
You can make subdirectories below this if you'd like to sort images into different directories
*/

// config these
$externalURL = ""; // the full URL to the storage folder.
$internalPath = ""; // the local path to the storage folder.
$password = ""; // set a password here and then configure this in the extension
// no edited below required, but hacking is encouraged!


$externalURL = rtrim($externalURL, '/');
$internalPath = rtrim($internalPath, '/');
if ($password==$_FILES['password']) {
	$filename=$_FILES['uploaded-file']['name'];
	if (($_FILES['uploaded-file']['type']=="image/jpeg") || ($_FILES['uploaded-file']['type']=="image/gif")|| ($_FILES['uploaded-file']['type']=="image/png")) { 
		if ($_FILES['subdir']!="") {
			$externalURL=$externalURL."/".$_FILES['subdir'];
			$internalPath=$internalPath."/".$_FILES['subdir'];
		}
		$path= $internalPath."/".$_FILES['uploaded-file']['name'];
		if (is_uploaded_file($_FILES['uploaded-file']['tmp_name'])) {
			if (move_uploaded_file($_FILES['uploaded-file']['tmp_name'], $path)) {
				$out=array('direct' => $externalURL."/".$_FILES['uploaded-file']['name'],
							'size' => $_FILES['uploaded-file']['size'],
							'type' => $_FILES['uploaded-file']['type']);
			} else {
				$out=array('error'=>'Upload failed');
			}
		} else {
			$out=array('error'=>'Uploaded file doesn\'t exist?');
		}
	} else {
		$out=array('error'=>"Unsupported image type!");
	}
} else {
	$out=array('error'=>"Password failure. Check password option matches config in your Save-to-Website.php");
}
echo json_encode($out);
?>