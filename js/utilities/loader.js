"use strict"

function loadTextResource(url) {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        console.log("Loading text at: ", url);
        request.onload = function() {
            if (request.status >= 200 && request.status <= 299) {
                resolve(this.response);
            } else {
                reject(this.statusText);
            }
        }
        request.onerror = function() {
            reject(this.statusText);
        }
        request.send();
    })
}

function loadImage(url) {
    return new Promise(function(resolve, reject) {
        let image = new Image();
        console.log("Loading image at: ", url);
        image.onload = function() {
            resolve(image);
        }
        image.onerror = function() {
            reject(url);
        }
        image.src = url;
    })
}

function loadJSONResource(url) {
    return new Promise(function(resolve, reject) {
        loadTextResource(url).then(function(url) {
            resolve(JSON.parse(url));
        })
    })
}
/*
var loadJSONResource = function(url, callback) {
	loadTextResource(url, function(err, result) {
		if (err) {
			callback(err);
		} else {
			try {
				callback(null, JSON.parse(result));
			} catch (e) {
				callback(e);
			}
		}
	})
}*/