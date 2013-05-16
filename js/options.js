function clone(obj){ //very shallow cloning
  var n = {};
  for(var i in obj) n[i] = obj[i]; //we are the knights who say ni!
  return n;
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
		status.innerHTML = "Closing Options Tab";
	}, 2000);

	updateMenus();

	setTimeout(function() {
		close();
	}, 3000);
	
} 

function close_tab() { 
	close();
} 

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#close').addEventListener('click', close_tab);