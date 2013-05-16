function clone(obj){ //very shallow cloning
  var n = {};
  for(var i in obj) n[i] = obj[i]; //we are the knights who say ni!
  return n;
}

function contextClick2(info, tab) {
	var url = info.linkUrl || info.srcUrl;
	var password = localStorage.getItem("password");
	var subdirs2 = "root, "+localStorage.getItem("subdirs");
	var subdirs3 = subdirs2.replace(/\,\s/g, ',');
	var subdirs = subdirs3.split(',');
	var menuitems = localStorage.getItem(menu_ids);
	menu_ids = menuitems.split(',');
	var subdir = menu_ids[info.menuItemId];
	var name = prompt("What would you like to save the file as?",unescape(unescape(unescape(url))).replace(/^.*\/|\?.*$|\#.*$|\&.*$|\.\w+$/g,''));
	if(name){
		var ext = url.match(/(\.\w+$)/);
		if(subdir=="root"){
			sudbir = "";
		}
		upload(subdir, url, name+ext[1], password);
	}
}

function updateMenus(){
	chrome.contextMenus.removeAll();
	var menu_ids = {};

	var root = {
		  "title" : "Save to Website",
		  "type" : "normal",
		  "contexts" : ["image"]
	};
		 
	var parent = chrome.contextMenus.create(root);

	var subdirs2 = localStorage.getItem("sitename")+", "+localStorage.getItem("subdirs");
	var subdirs3 = subdirs2.replace(/\,\s/g, ',');
	var subdirs4 = subdirs3.replace(/\,$/,'');
	var sorted = subdirs4.split(',');
	for(var i = 0; i < sorted.length; i++){
		console.log(sorted[i]);
		var prop = {
			"title": sorted[i],
			"onclick": contextClick2,
			"contexts": ["image"],
			"parentId": parent
		};
		menu_ids[chrome.contextMenus.create(prop)] = sorted[i];
	}
	localStorage.setItem("menu_ids", menu_ids);
	console.log(menu_ids);
}

function restore_options() { 
	document.getElementById("phpurl").value = localStorage.getItem("phpurl"); 
	document.getElementById("sitename").value = localStorage.getItem("sitename"); 
	document.getElementById("password").value = localStorage.getItem("password");
	document.getElementById("subdirs").value = localStorage.getItem("subdirs"); 
}

function save_options() { 
	localStorage.setItem("sitename", document.getElementById("sitename").value);
	localStorage.setItem("password", document.getElementById("password").value);
	localStorage.setItem("phpurl", document.getElementById("phpurl").value);
	localStorage.setItem("subdirs", document.getElementById("subdirs").value);

	var status = document.getElementById("status");
	status.innerHTML = "Settings Saved";
	setTimeout(function() {
		status.innerHTML = "";
	}, 2000);

	updateMenus();
} 

function close_tab() { 
	close();
} 

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#close').addEventListener('click', close_tab);