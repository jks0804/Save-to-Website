function restore_options() { 
	document.getElementById("phpurl").value = localStorage.getItem("phpurl"); 
	document.getElementById("sitename").value = localStorage.getItem("sitename"); 
	document.getElementById("password").value = localStorage.getItem("password");
	document.getElementById("subdirs").value = localStorage.getItem("subdirs"); 
}

function reqListener () {
	console.log(this.status);
	if(this.status!="200"){
		alert("Check URL setting.\n\n Web Server responded with status: "+this.status+" "+this.statusText);
	}
};

function check_url(url){
	var tmp = new XMLHttpRequest();
	tmp.onload = reqListener;
	tmp.open("get", url, true);
	tmp.send(null);
	tmp.onreadystatechange=function() {
		if (tmp.readyState==4 && tmp.status==200) {
			localStorage.setItem("urlerror","0");
			save_options();
		}else if (tmp.readyState==4 && tmp.status!=200)	{
			var status = document.getElementById("status");
			status.innerHTML = "Please confirm and fix URL";
			localStorage.setItem("urlerror","1");
		}
	}
	return;
}

function save() {
	check_url(document.getElementById("phpurl").value);
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
	save();
	if (localStorage.getItem("urlerror")!=1){
		var status = document.getElementById("status");
		setTimeout(function() {
			status.innerHTML = "Closing Options Tab";
		}, 2000);

		setTimeout(function() {
			status.innerHTML = "Closing Options Tab.";
		}, 2100);

		setTimeout(function() {
			status.innerHTML = "Closing Options Tab.";
		}, 2200);

		setTimeout(function() {
			status.innerHTML = "Closing Options Tab...";
		}, 2300);

		setTimeout(function() {
			status.innerHTML = "Closing Options Tab.......";
		}, 2400);

		setTimeout(function() {
			status.innerHTML = "Closing Options Tab..........";
		}, 2500);

		setTimeout(function() {
			status.innerHTML = "Closing Options Tab.............";
		}, 2600);

		setTimeout(function() {
			status.innerHTML = "Closing Options Tab................";
		}, 2700);

		setTimeout(function() {
			status.innerHTML = "Closing Options Tab...................";
		}, 2800);

		setTimeout(function() {
			status.innerHTML = "Closing Options Tab......................";
		}, 2900);

		setTimeout(function() {
			close();
		}, 3000);
	}

}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save);
document.querySelector('#save_close').addEventListener('click', save_close);
document.querySelector('#close').addEventListener('click', close_tab);