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

	chrome.extension.getBackgroundPage().window.location.reload();

	var status = document.getElementById("status");
	status.innerHTML = "Settings Saved";
} 

function close_tab() { 
	close();
} 

function save_close() {
	save_options();
	var status = document.getElementById("status");
	setTimeout(function() {
		status.innerHTML = "Closing Options Tab";
	}, 2000);

	setTimeout(function() {
		status.innerHTML = "Closing Options Tab.";
	}, 2100);

	setTimeout(function() {
		status.innerHTML = "Closing Options Tab..";
	}, 2200);

	setTimeout(function() {
		status.innerHTML = "Closing Options Tab...";
	}, 2300);

	setTimeout(function() {
		status.innerHTML = "Closing Options Tab....";
	}, 2400);

	setTimeout(function() {
		status.innerHTML = "Closing Options Tab.....";
	}, 2500);

	setTimeout(function() {
		status.innerHTML = "Closing Options Tab......";
	}, 2600);

	setTimeout(function() {
		status.innerHTML = "Closing Options Tab.......";
	}, 2700);

	setTimeout(function() {
		status.innerHTML = "Closing Options Tab........";
	}, 2800);

	setTimeout(function() {
		status.innerHTML = "Closing Options Tab.........";
	}, 2900);

	setTimeout(function() {
		close();
	}, 3000);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#save_close').addEventListener('click', save_close);
document.querySelector('#close').addEventListener('click', close_tab);