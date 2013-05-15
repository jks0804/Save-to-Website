function clone(obj){ //very shallow cloning
  var n = {};
  for(var i in obj) n[i] = obj[i]; //we are the knights who say ni!
  return n;
}

function contextClick2(info, tab) {
	var url = info.linkUrl || info.srcUrl;
	var subdirs2 = " , "+localStorage.getItem("subdirs");
	var subdirs = subdirs2.split(', ');
	var subdir = subdirs[info.menuItemId-2];
	var name = prompt("What would you like to save the file as?",unescape(unescape(unescape(url))).replace(/^.*\/|\?.*$|\#.*$|\&.*$|\.\w+$/g,''));
	if(name){
		var ext = url.match(/(\.\w+$)/);
		upload(subdir, url, name+ext[1]);
	}
}

function updateMenus(){
	if(typeof menu_ids != "undefined") {
	// this isnt working!
		console.log("menu_ids exist!");
		Object.keys(menu_ids).reverse().forEach(function(item){
			console.log(item);
			chrome.contextMenus.remove(parseInt(item));
			delete menu_ids;
		});
	}

	var menu_ids = {};

	var root = {
		  "title" : "Save to Website",
		  "type" : "normal",
		  "contexts" : ["image"]
	};

	var subdirs2 = localStorage.getItem("sitename")+", "+localStorage.getItem("subdirs");
	var subdirs3 = subdirs2.replace(/\,\s/g, ',');
	var sorted = subdirs3.split(',');
	for(var i = 1; i < sorted.length; i++){
		var prop = {
			"title": +sorted[i],
			"onclick": contextClick2,
			"contexts": ["image"],
		};
		menu_ids[chrome.contextMenus.create(prop)] = sorted[i].trim();
	}

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