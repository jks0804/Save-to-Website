if (localStorage.getItem("sitename")==null){
	var optionsUrl = chrome.extension.getURL('options.html');

	chrome.tabs.query({url: optionsUrl}, function(tabs) {
		if (tabs.length) {
			chrome.tabs.update(tabs[0].id, {active: true});
		} else {
			chrome.tabs.create({url: optionsUrl});
		}
	});
}

function https(){
  if(localStorage.no_https == 'on'){
    return 'http://'; //idk why someone would want this
  }
  return 'https://';
}

function getURL(type, request, callback, sync){
  if(request.data && sync) return request.data;
  
  if(request.data) return callback(request); //no need reconverting!
  
  if(/^data:/.test(request.url)){
    console.log('opened via data url');
    var parts = request.url.match(/^data:(.+),/)[1].split(';');
    var mime = parts[0], b64 = parts.indexOf('base64') != -1;
    var enc = request.url.substr(request.url.indexOf(',')+1);
    var data = b64 ? atob(enc) : unescape(enc);
    //data urls dont have any weird encoding issue as far as i can tell
    var name = '';
    if(request.name){
      name = request.name;
    }else{
      name = enc.substr(enc.length/2 - 6, 6) + '.' + mime.split('/')[1];
    }
    if(sync) return data;
    callback({
      data: data,
      type: mime,
      id: request.id,
      size: data.length,
      name: name
    });
    
    //callback(new dFile(data, name, mime, id, size)
  }else{
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', request.url, !sync);
    if(type == 'binary' || type == 'raw'){
      xhr.overrideMimeType('text/plain; charset=x-user-defined'); //should i loop through and do that & 0xff?
    }
    if(sync){
      xhr.send();
      return xhr.responseText;
    }
    xhr.onload = function(){
      if(!request.type) request.type = xhr.getResponseHeader("Content-Type");
    
      console.log('opened via xhr ', request.url);
      var raw = xhr.responseText, data = '';
      //for(var l = raw.length, i=0; i<l;i++){ data += String.fromCharCode(raw.charCodeAt(i) & 0xff); if(!(i%(1024 * 1024))) console.log('1mb') };
      //var data = postMessage(raw.split('').map(function(a){return String.fromCharCode(a.charCodeAt(0) & 0xff)}).join(''));
      //window.fd = data;
      
      //var obj = {id: request.id, bin: function(){return raw}, b64: function(){return btoa(data)},type: request.type, size: data.length, name: request.name}
      //callback(obj);
      //because running it here since js is single threaded causes the asynchrouously running instantInit request to be delayed, slowing it down substantially.
      //using a web worker: probably overkill.

      if(type == 'binary'){
        //*
        if(typeof WebKitBlobBuilder == 'undefined'){
        
          for(var raw = xhr.responseText, l = raw.length, i = 0, data = ''; i < l; i++) data += String.fromCharCode(raw.charCodeAt(i) & 0xff);
          
          callback({id: request.id, data: data, type: request.type, size: data.length, name: request.name});
        }else{
        
          var bb = new WebKitBlobBuilder();//this webworker is totally overkill
          bb.append("onmessage = function(e) { for(var raw = e.data, l = raw.length, i = 0, data = ''; i < l; i++) data += String.fromCharCode(raw.charCodeAt(i) & 0xff); postMessage(data) }");
          var url;
          if(window.createObjectURL){
            url = window.createObjectURL(bb.getBlob())
          }else if(window.createBlobURL){
            url = window.createBlobURL(bb.getBlob())
          }else if(window.URL && window.URL.createObjectURL){
            url = window.URL.createObjectURL(bb.getBlob())
          }else if(window.webkitURL && window.webkitURL.createObjectURL){
            url = window.webkitURL.createObjectURL(bb.getBlob())
          }
          var worker = new Worker(url);
          worker.onmessage = function(e) {
            var data = e.data;
            callback({id: request.id, data: data, type: request.type, size: data.length, name: request.name});
          };
          
          worker.postMessage(xhr.responseText);
        }
        
        //*/
      }else if(type == 'raw'){
        var data = xhr.responseText;
        callback({id: request.id, data: data, type: request.type, size: data.length, name: request.name});
      }else{
        callback({id: request.id, data: raw, type: request.type, size: data.length, name: request.name});
      }
    }
    xhr.send();
  }
}


function getText(request, callback){
  getURL('text', request, callback);
}

function getRaw(request, callback){
  getURL('raw', request, callback);
}

function getBinary(request, callback){
  getURL('binary', request, callback);
}

/* this function here needs to be changed to 1st check if the
   localstorage setting for phpURL has been saved, prompt if it hasn't, and 
   then continue on using it as the xhr.open.
*/
function saveToWebsite(subdir, file, password, callback){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", localStorage.getItem("phpurl"));  
  xhr.onload = function(){
    var json = JSON.parse(xhr.responseText);
    if(json.error){
      callback('error: '+json.error);
    }else{
      callback('direct: '+json.direct);
    }
  }
  xhr.onerror = function(){
    callback('error: uploading failed')
  }
  xhr.sendMultipart({
    "uploaded-file": file,
	"subdir": subdir,
	"password": password
  })

}

function contextClick2(info, tab) {
	var url = info.linkUrl || info.srcUrl;
	var password = localStorage.getItem("password");
	var subdirs2 = "root, "+localStorage.getItem("subdirs");
	var subdirs3 = subdirs2.replace(/\,\s/g, ',');
	var subdirs = subdirs3.split(',');
	var menuitems = localStorage.getItem("menu_ids");
	console.log(menuitems);
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

function contextClick(info, tab) {
  var url = info.linkUrl || info.srcUrl;
  var name = unescape(unescape(unescape(url))).replace(/^.*\/|\?.*$|\#.*$|\&.*$/g,'');
  var password = localStorage.getItem("password");
  upload("", url, name, password);
}


function upload(subdir, url, name, password) {
  saveToWebsite(subdir, {
    url: url,
    name: name
  }, password, function(e) {
    if(e && e.indexOf('error:') != -1){
	  console.log('failed boo', e);
      var notification = webkitNotifications.createNotification(
        'icon/64sad.png',  // icon url - can be relative
        "Aww Snap!",  // notification title
        "The file '"+name+"' could not be uploaded to "+subdir+". "+e.substr(7)  // notification body text
      );
      notification.show();
    } else {
      console.log('uploaded file yay', e);
      var notification = webkitNotifications.createNotification(
        'icon/64.png',  // icon url - can be relative
        "Uploading Complete",  // notification title
        "The file '"+name+"' has been uploaded to "+e.substr(8)  // notification body text
      );
      notification.show();
	  setTimeout(function(){
        notification.cancel();
        }, '5000');
    }
  })
}

var menu_ids = {};

var root = {
	"title": "Save to Website",
	"type": "normal",
	"contexts": ["image"]
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
console.log(menu_ids);