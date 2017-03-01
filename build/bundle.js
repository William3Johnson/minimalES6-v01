/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "5656fce62b1878c55d3d"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _App = __webpack_require__(1);\n\nvar _App2 = _interopRequireDefault(_App);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = new _App2.default();\n\n/* $(document).ready(\n\tfunction(e){\n          $('.owl-carousel').owlCarousel({\n              items:1,\n              loop:true,\n              responsive : {\n                  0:{\n                      items:1\n                  }, //from zero to 600 screen\n                  601:{\n                      items:2\n                  }, //from 600 to 1050 screen\n                  1050:{\n                      items:4\n                  } //from 1050 to 1240 screen\n              }\n\n          });\n\n\t\t\n\t}\n\n\t);\n\n*/\n/**\n * Created by Edward_J_Apostol on 2016-08-29.\n */\n// this is where the \"main\" section of your app begins.\n// its like a launch pad, where you bring all your other classes\n// together for use.\n\n\n/* all the code that could be written here has\nbeen encapsulated (moved) into an 'App' class. the 'App' class\nis the application (i.e. your web site, the shopping cart project)\nitself. This is done for organization and cleanliness in code.\nSo now you only see two lines here in index.js\n *///# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanM/YmM2NiJdLCJuYW1lcyI6WyJhcHAiXSwibWFwcGluZ3MiOiI7O0FBZ0JBOzs7Ozs7QUFFQSxJQUFJQSxNQUFNLG1CQUFWOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcEJBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgRWR3YXJkX0pfQXBvc3RvbCBvbiAyMDE2LTA4LTI5LlxuICovXG4vLyB0aGlzIGlzIHdoZXJlIHRoZSBcIm1haW5cIiBzZWN0aW9uIG9mIHlvdXIgYXBwIGJlZ2lucy5cbi8vIGl0cyBsaWtlIGEgbGF1bmNoIHBhZCwgd2hlcmUgeW91IGJyaW5nIGFsbCB5b3VyIG90aGVyIGNsYXNzZXNcbi8vIHRvZ2V0aGVyIGZvciB1c2UuXG5cblxuLyogYWxsIHRoZSBjb2RlIHRoYXQgY291bGQgYmUgd3JpdHRlbiBoZXJlIGhhc1xuYmVlbiBlbmNhcHN1bGF0ZWQgKG1vdmVkKSBpbnRvIGFuICdBcHAnIGNsYXNzLiB0aGUgJ0FwcCcgY2xhc3NcbmlzIHRoZSBhcHBsaWNhdGlvbiAoaS5lLiB5b3VyIHdlYiBzaXRlLCB0aGUgc2hvcHBpbmcgY2FydCBwcm9qZWN0KVxuaXRzZWxmLiBUaGlzIGlzIGRvbmUgZm9yIG9yZ2FuaXphdGlvbiBhbmQgY2xlYW5saW5lc3MgaW4gY29kZS5cblNvIG5vdyB5b3Ugb25seSBzZWUgdHdvIGxpbmVzIGhlcmUgaW4gaW5kZXguanNcbiAqL1xuXG5cbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xuXG4vKiAkKGRvY3VtZW50KS5yZWFkeShcblx0ZnVuY3Rpb24oZSl7XG4gICAgICAgICAgJCgnLm93bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcbiAgICAgICAgICAgICAgaXRlbXM6MSxcbiAgICAgICAgICAgICAgbG9vcDp0cnVlLFxuICAgICAgICAgICAgICByZXNwb25zaXZlIDoge1xuICAgICAgICAgICAgICAgICAgMDp7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbXM6MVxuICAgICAgICAgICAgICAgICAgfSwgLy9mcm9tIHplcm8gdG8gNjAwIHNjcmVlblxuICAgICAgICAgICAgICAgICAgNjAxOntcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtczoyXG4gICAgICAgICAgICAgICAgICB9LCAvL2Zyb20gNjAwIHRvIDEwNTAgc2NyZWVuXG4gICAgICAgICAgICAgICAgICAxMDUwOntcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtczo0XG4gICAgICAgICAgICAgICAgICB9IC8vZnJvbSAxMDUwIHRvIDEyNDAgc2NyZWVuXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pO1xuXG5cdFx0XG5cdH1cblxuXHQpO1xuXG4qL1xuXG5cblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Edward_J_Apostol on 2017-01-28.\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\nvar _BestBuyWebService = __webpack_require__(2);\n\nvar _BestBuyWebService2 = _interopRequireDefault(_BestBuyWebService);\n\nvar _CatalogView = __webpack_require__(3);\n\nvar _CatalogView2 = _interopRequireDefault(_CatalogView);\n\nvar _ShoppingCart = __webpack_require__(4);\n\nvar _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar App = function () {\n    function App() {\n        _classCallCheck(this, App);\n\n        this.productData = null; // this will store all our data\n        this.products = null; // stores specifically the products\n        this.initBestBuyWebService();\n        this.catalogView = new _CatalogView2.default(); // this will display our data\n        this.shoppingCart = new _ShoppingCart2.default();\n        // call the initBestBuyWebService to initialize the\n        // BestBuy Web Service and return the data\n\n    }\n\n    _createClass(App, [{\n        key: 'initBestBuyWebService',\n        value: function initBestBuyWebService() {\n            this.bbws = new _BestBuyWebService2.default();\n            // use your own API key for this (the one from Cody)\n            this.bbws.apiKey = \"SXkiDh8lcFEAqyG6rDmJjlH4\";\n\n            // this uses 'backticks' for long multi-line strings\n            this.bbws.url = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=' + this.bbws.apiKey + '&format=json';\n\n            // pass the reference to this app to store the data\n            this.bbws.getData(this);\n        }\n    }, {\n        key: 'prepCatalog',\n        value: function prepCatalog() {\n            // use this console.log to test the data\n            // console.log(this.productData);\n\n            if (this.productData != null) {\n                // only get the products property (for now)\n                // this code was copied from SimpleHTTPRequest.html\n                this.products = this.bbws.getProducts();\n                console.log(this.products);\n            }\n\n            this.showCatalog();\n        }\n    }, {\n        key: 'showCatalog',\n        value: function showCatalog() {\n            // populate the catalog only if there are products\n            if (this.productData != null) {\n                this.catalogView.addProductsToCarousel(this.products, this);\n                // this.catalogView.showCatalog();\n            }\n        }\n    }]);\n\n    return App;\n}();\n\nexports.default = App;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvQXBwLmpzPzliZjkiXSwibmFtZXMiOlsiQXBwIiwicHJvZHVjdERhdGEiLCJwcm9kdWN0cyIsImluaXRCZXN0QnV5V2ViU2VydmljZSIsImNhdGFsb2dWaWV3Iiwic2hvcHBpbmdDYXJ0IiwiYmJ3cyIsImFwaUtleSIsInVybCIsImdldERhdGEiLCJnZXRQcm9kdWN0cyIsImNvbnNvbGUiLCJsb2ciLCJzaG93Q2F0YWxvZyIsImFkZFByb2R1Y3RzVG9DYXJvdXNlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FqQkFBQTs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJBLEc7QUFFakIsbUJBQWE7QUFBQTs7QUFDVCxhQUFLQyxXQUFMLEdBQW1CLElBQW5CLENBRFMsQ0FDZ0I7QUFDekIsYUFBS0MsUUFBTCxHQUFnQixJQUFoQixDQUZTLENBRWE7QUFDdEIsYUFBS0MscUJBQUw7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLDJCQUFuQixDQUpTLENBSTZCO0FBQ3RDLGFBQUtDLFlBQUwsR0FBb0IsNEJBQXBCO0FBQ0E7QUFDQTs7QUFLSDs7OztnREFFc0I7QUFDbkIsaUJBQUtDLElBQUwsR0FBWSxpQ0FBWjtBQUNBO0FBQ0EsaUJBQUtBLElBQUwsQ0FBVUMsTUFBVixHQUFtQiwwQkFBbkI7O0FBRUE7QUFDQSxpQkFBS0QsSUFBTCxDQUFVRSxHQUFWLG1GQUE4RixLQUFLRixJQUFMLENBQVVDLE1BQXhHOztBQUVBO0FBQ0EsaUJBQUtELElBQUwsQ0FBVUcsT0FBVixDQUFrQixJQUFsQjtBQUVIOzs7c0NBRVk7QUFDVDtBQUNBOztBQUVBLGdCQUFHLEtBQUtSLFdBQUwsSUFBa0IsSUFBckIsRUFBMEI7QUFDdEI7QUFDQTtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCLEtBQUtJLElBQUwsQ0FBVUksV0FBVixFQUFoQjtBQUNBQyx3QkFBUUMsR0FBUixDQUFZLEtBQUtWLFFBQWpCO0FBQ0g7O0FBRUQsaUJBQUtXLFdBQUw7QUFDSDs7O3NDQUVhO0FBQ1Y7QUFDQSxnQkFBSSxLQUFLWixXQUFMLElBQW9CLElBQXhCLEVBQThCO0FBQzFCLHFCQUFLRyxXQUFMLENBQWlCVSxxQkFBakIsQ0FBdUMsS0FBS1osUUFBNUMsRUFBcUQsSUFBckQ7QUFDQTtBQUNIO0FBQ0o7Ozs7OztrQkFqRGdCRixHIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgRWR3YXJkX0pfQXBvc3RvbCBvbiAyMDE3LTAxLTI4LlxuICovXG5cbmltcG9ydCBCZXN0QnV5V2ViU2VydmljZSBmcm9tICcuL0Jlc3RCdXlXZWJTZXJ2aWNlJztcbmltcG9ydCBDYXRhbG9nVmlldyBmcm9tICcuL0NhdGFsb2dWaWV3J1xuaW1wb3J0IFNob3BwaW5nQ2FydCBmcm9tICcuL1Nob3BwaW5nQ2FydCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBudWxsOyAvLyB0aGlzIHdpbGwgc3RvcmUgYWxsIG91ciBkYXRhXG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSBudWxsOyAvLyBzdG9yZXMgc3BlY2lmaWNhbGx5IHRoZSBwcm9kdWN0c1xuICAgICAgICB0aGlzLmluaXRCZXN0QnV5V2ViU2VydmljZSgpO1xuICAgICAgICB0aGlzLmNhdGFsb2dWaWV3ID0gbmV3IENhdGFsb2dWaWV3KCk7IC8vIHRoaXMgd2lsbCBkaXNwbGF5IG91ciBkYXRhXG4gICAgICAgIHRoaXMuc2hvcHBpbmdDYXJ0ID0gbmV3IFNob3BwaW5nQ2FydCgpO1xuICAgICAgICAvLyBjYWxsIHRoZSBpbml0QmVzdEJ1eVdlYlNlcnZpY2UgdG8gaW5pdGlhbGl6ZSB0aGVcbiAgICAgICAgLy8gQmVzdEJ1eSBXZWIgU2VydmljZSBhbmQgcmV0dXJuIHRoZSBkYXRhXG5cbiBcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBpbml0QmVzdEJ1eVdlYlNlcnZpY2UoKXtcbiAgICAgICAgdGhpcy5iYndzID0gbmV3IEJlc3RCdXlXZWJTZXJ2aWNlKCk7XG4gICAgICAgIC8vIHVzZSB5b3VyIG93biBBUEkga2V5IGZvciB0aGlzICh0aGUgb25lIGZyb20gQ29keSlcbiAgICAgICAgdGhpcy5iYndzLmFwaUtleSA9IFwiU1hraURoOGxjRkVBcXlHNnJEbUpqbEg0XCI7XG5cbiAgICAgICAgLy8gdGhpcyB1c2VzICdiYWNrdGlja3MnIGZvciBsb25nIG11bHRpLWxpbmUgc3RyaW5nc1xuICAgICAgICB0aGlzLmJid3MudXJsID0gYGh0dHBzOi8vYXBpLmJlc3RidXkuY29tL3YxL3Byb2R1Y3RzKChjYXRlZ29yeVBhdGguaWQ9YWJjYXQwNTAyMDAwKSk/YXBpS2V5PSR7dGhpcy5iYndzLmFwaUtleX0mZm9ybWF0PWpzb25gO1xuXG4gICAgICAgIC8vIHBhc3MgdGhlIHJlZmVyZW5jZSB0byB0aGlzIGFwcCB0byBzdG9yZSB0aGUgZGF0YVxuICAgICAgICB0aGlzLmJid3MuZ2V0RGF0YSh0aGlzKTtcblxuICAgIH1cblxuICAgIHByZXBDYXRhbG9nKCl7XG4gICAgICAgIC8vIHVzZSB0aGlzIGNvbnNvbGUubG9nIHRvIHRlc3QgdGhlIGRhdGFcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9kdWN0RGF0YSk7XG5cbiAgICAgICAgaWYodGhpcy5wcm9kdWN0RGF0YSE9bnVsbCl7XG4gICAgICAgICAgICAvLyBvbmx5IGdldCB0aGUgcHJvZHVjdHMgcHJvcGVydHkgKGZvciBub3cpXG4gICAgICAgICAgICAvLyB0aGlzIGNvZGUgd2FzIGNvcGllZCBmcm9tIFNpbXBsZUhUVFBSZXF1ZXN0Lmh0bWxcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdHMgPSB0aGlzLmJid3MuZ2V0UHJvZHVjdHMoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvZHVjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG93Q2F0YWxvZygpO1xuICAgIH1cblxuICAgIHNob3dDYXRhbG9nKCkge1xuICAgICAgICAvLyBwb3B1bGF0ZSB0aGUgY2F0YWxvZyBvbmx5IGlmIHRoZXJlIGFyZSBwcm9kdWN0c1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0RGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGFsb2dWaWV3LmFkZFByb2R1Y3RzVG9DYXJvdXNlbCh0aGlzLnByb2R1Y3RzLHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5jYXRhbG9nVmlldy5zaG93Q2F0YWxvZygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL0FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-27.\n */\n\nvar BestBuyWebService = function () {\n    function BestBuyWebService() {\n        _classCallCheck(this, BestBuyWebService);\n\n        this.url = \"\";\n        this.apiKey = \"\";\n        this.productData = null;\n        this.products = null;\n    }\n\n    _createClass(BestBuyWebService, [{\n        key: \"getData\",\n        value: function getData(theApp) {\n            console.log(theApp);\n\n            // theApp is a reference to the main app\n            // we can pass information to it, including data\n            // that is returned from this service\n\n            var serviceChannel = new XMLHttpRequest();\n            var url = this.url;\n\n            /*\n            // *** To solve the issue of passing the data back to the main app...\n            // *** and eventually, to catalogView\n            // *** You could the addEventListener to call\n            // *** a different function which will have both\n            // *** the event object and dataPlaceHolder as parameters\n            // *** see http://bit.ly/js-passmoreargsevent\n             */\n\n            serviceChannel.addEventListener(\"readystatechange\", this.resultsPreprocessor(theApp), false);\n            serviceChannel.open(\"GET\", url, true);\n            serviceChannel.send();\n        }\n    }, {\n        key: \"resultsPreprocessor\",\n        value: function resultsPreprocessor(theApp) {\n            /*the addEventListener function near line 29 requires a proper function (an event handler) to be returned so we can create one to be returned.\n            */\n            console.log(theApp); // <-- should be instance of App\n            var thisService = this; // a reference to the instance created from this class\n            var eventHandler = function eventHandler(evt) {\n                thisService.results(evt, theApp);\n            };\n            return eventHandler;\n        }\n    }, {\n        key: \"results\",\n        value: function results(evt, theApp) {\n\n            if (evt.target.readyState == 4 && evt.target.status == 200) {\n                // assign this instance's productData to be the responseText\n                this.productData = evt.target.responseText;\n                // assign the app's productData to be the responseText too\n                console.log(theApp);\n                theApp.productData = evt.target.responseText;\n                // tell the app to prepare the catalog\n                // there is another way to do it, with custom\n                // events. but this will work for now.\n                theApp.prepCatalog();\n                // console.log(evt.target.responseText);\n                // return evt.target.responseText;\n            }\n        }\n    }, {\n        key: \"getProducts\",\n        value: function getProducts() {\n            // this method explicity gets the products property\n            // from the JSON object. it assumes you have the JSON data\n            if (this.productData != null) {\n                var jsonData = JSON.parse(this.productData);\n                this.products = jsonData.products;\n                return this.products;\n            }\n\n            return; // if we have no data, return nothing\n        }\n    }]);\n\n    return BestBuyWebService;\n}();\n\nexports.default = BestBuyWebService;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvQmVzdEJ1eVdlYlNlcnZpY2UuanM/ZjQ3ZSJdLCJuYW1lcyI6WyJCZXN0QnV5V2ViU2VydmljZSIsInVybCIsImFwaUtleSIsInByb2R1Y3REYXRhIiwicHJvZHVjdHMiLCJ0aGVBcHAiLCJjb25zb2xlIiwibG9nIiwic2VydmljZUNoYW5uZWwiLCJYTUxIdHRwUmVxdWVzdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXN1bHRzUHJlcHJvY2Vzc29yIiwib3BlbiIsInNlbmQiLCJ0aGlzU2VydmljZSIsImV2ZW50SGFuZGxlciIsImV2dCIsInJlc3VsdHMiLCJ0YXJnZXQiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwicHJlcENhdGFsb2ciLCJqc29uRGF0YSIsIkpTT04iLCJwYXJzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSXFCQSxpQjtBQUVqQixpQ0FBYTtBQUFBOztBQUNULGFBQUtDLEdBQUwsR0FBVSxFQUFWO0FBQ0EsYUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNIOzs7O2dDQUdPQyxNLEVBQU87QUFDWEMsb0JBQVFDLEdBQVIsQ0FBWUYsTUFBWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQUlHLGlCQUFpQixJQUFJQyxjQUFKLEVBQXJCO0FBQ0EsZ0JBQUlSLE1BQU0sS0FBS0EsR0FBZjs7QUFFQTs7Ozs7Ozs7O0FBU0FPLDJCQUFlRSxnQkFBZixDQUFnQyxrQkFBaEMsRUFBbUQsS0FBS0MsbUJBQUwsQ0FBeUJOLE1BQXpCLENBQW5ELEVBQW9GLEtBQXBGO0FBQ0FHLDJCQUFlSSxJQUFmLENBQW9CLEtBQXBCLEVBQTBCWCxHQUExQixFQUE4QixJQUE5QjtBQUNBTywyQkFBZUssSUFBZjtBQUNIOzs7NENBRW1CUixNLEVBQU87QUFDdkI7O0FBRUFDLG9CQUFRQyxHQUFSLENBQVlGLE1BQVosRUFIdUIsQ0FHRjtBQUNyQixnQkFBSVMsY0FBYyxJQUFsQixDQUp1QixDQUlDO0FBQ3hCLGdCQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsR0FBVCxFQUFhO0FBQzVCRiw0QkFBWUcsT0FBWixDQUFvQkQsR0FBcEIsRUFBd0JYLE1BQXhCO0FBQ0gsYUFGRDtBQUdBLG1CQUFPVSxZQUFQO0FBQ0g7OztnQ0FFT0MsRyxFQUFJWCxNLEVBQU87O0FBRWYsZ0JBQUlXLElBQUlFLE1BQUosQ0FBV0MsVUFBWCxJQUF5QixDQUF6QixJQUE4QkgsSUFBSUUsTUFBSixDQUFXRSxNQUFYLElBQXFCLEdBQXZELEVBQTJEO0FBQ3ZEO0FBQ0EscUJBQUtqQixXQUFMLEdBQW1CYSxJQUFJRSxNQUFKLENBQVdHLFlBQTlCO0FBQ0E7QUFDQWYsd0JBQVFDLEdBQVIsQ0FBWUYsTUFBWjtBQUNBQSx1QkFBT0YsV0FBUCxHQUFxQmEsSUFBSUUsTUFBSixDQUFXRyxZQUFoQztBQUNBO0FBQ0E7QUFDQTtBQUNBaEIsdUJBQU9pQixXQUFQO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7OztzQ0FFWTtBQUNUO0FBQ0E7QUFDQSxnQkFBRyxLQUFLbkIsV0FBTCxJQUFrQixJQUFyQixFQUEwQjtBQUN2QixvQkFBSW9CLFdBQVdDLEtBQUtDLEtBQUwsQ0FBVyxLQUFLdEIsV0FBaEIsQ0FBZjtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCbUIsU0FBU25CLFFBQXpCO0FBQ0EsdUJBQU8sS0FBS0EsUUFBWjtBQUNGOztBQUVELG1CQVRTLENBU0Q7QUFDWDs7Ozs7O2tCQXhFZ0JKLGlCIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgRWR3YXJkX0pfQXBvc3RvbCBvbiAyMDE3LTAxLTI3LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlc3RCdXlXZWJTZXJ2aWNle1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy51cmwgPVwiXCI7XG4gICAgICAgIHRoaXMuYXBpS2V5ID0gXCJcIjtcbiAgICAgICAgdGhpcy5wcm9kdWN0RGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSBudWxsO1xuICAgIH1cblxuXG4gICAgZ2V0RGF0YSh0aGVBcHApe1xuICAgICAgICBjb25zb2xlLmxvZyh0aGVBcHApO1xuXG4gICAgICAgIC8vIHRoZUFwcCBpcyBhIHJlZmVyZW5jZSB0byB0aGUgbWFpbiBhcHBcbiAgICAgICAgLy8gd2UgY2FuIHBhc3MgaW5mb3JtYXRpb24gdG8gaXQsIGluY2x1ZGluZyBkYXRhXG4gICAgICAgIC8vIHRoYXQgaXMgcmV0dXJuZWQgZnJvbSB0aGlzIHNlcnZpY2VcblxuICAgICAgICBsZXQgc2VydmljZUNoYW5uZWwgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMudXJsO1xuXG4gICAgICAgIC8qXG4gICAgICAgIC8vICoqKiBUbyBzb2x2ZSB0aGUgaXNzdWUgb2YgcGFzc2luZyB0aGUgZGF0YSBiYWNrIHRvIHRoZSBtYWluIGFwcC4uLlxuICAgICAgICAvLyAqKiogYW5kIGV2ZW50dWFsbHksIHRvIGNhdGFsb2dWaWV3XG4gICAgICAgIC8vICoqKiBZb3UgY291bGQgdGhlIGFkZEV2ZW50TGlzdGVuZXIgdG8gY2FsbFxuICAgICAgICAvLyAqKiogYSBkaWZmZXJlbnQgZnVuY3Rpb24gd2hpY2ggd2lsbCBoYXZlIGJvdGhcbiAgICAgICAgLy8gKioqIHRoZSBldmVudCBvYmplY3QgYW5kIGRhdGFQbGFjZUhvbGRlciBhcyBwYXJhbWV0ZXJzXG4gICAgICAgIC8vICoqKiBzZWUgaHR0cDovL2JpdC5seS9qcy1wYXNzbW9yZWFyZ3NldmVudFxuICAgICAgICAgKi9cblxuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLHRoaXMucmVzdWx0c1ByZXByb2Nlc3Nvcih0aGVBcHApLGZhbHNlKTtcbiAgICAgICAgc2VydmljZUNoYW5uZWwub3BlbihcIkdFVFwiLHVybCx0cnVlKTtcbiAgICAgICAgc2VydmljZUNoYW5uZWwuc2VuZCgpO1xuICAgIH1cblxuICAgIHJlc3VsdHNQcmVwcm9jZXNzb3IodGhlQXBwKXtcbiAgICAgICAgLyp0aGUgYWRkRXZlbnRMaXN0ZW5lciBmdW5jdGlvbiBuZWFyIGxpbmUgMjkgcmVxdWlyZXMgYSBwcm9wZXIgZnVuY3Rpb24gKGFuIGV2ZW50IGhhbmRsZXIpIHRvIGJlIHJldHVybmVkIHNvIHdlIGNhbiBjcmVhdGUgb25lIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAqL1xuICAgICAgICBjb25zb2xlLmxvZyh0aGVBcHApOyAvLyA8LS0gc2hvdWxkIGJlIGluc3RhbmNlIG9mIEFwcFxuICAgICAgICBsZXQgdGhpc1NlcnZpY2UgPSB0aGlzOyAvLyBhIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2UgY3JlYXRlZCBmcm9tIHRoaXMgY2xhc3NcbiAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKGV2dCl7XG4gICAgICAgICAgICB0aGlzU2VydmljZS5yZXN1bHRzKGV2dCx0aGVBcHApXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXJcbiAgICB9O1xuXG4gICAgcmVzdWx0cyhldnQsdGhlQXBwKXtcblxuICAgICAgICBpZiAoZXZ0LnRhcmdldC5yZWFkeVN0YXRlID09IDQgJiYgZXZ0LnRhcmdldC5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgIC8vIGFzc2lnbiB0aGlzIGluc3RhbmNlJ3MgcHJvZHVjdERhdGEgdG8gYmUgdGhlIHJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGF0YSA9IGV2dC50YXJnZXQucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgLy8gYXNzaWduIHRoZSBhcHAncyBwcm9kdWN0RGF0YSB0byBiZSB0aGUgcmVzcG9uc2VUZXh0IHRvb1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhlQXBwKTtcbiAgICAgICAgICAgIHRoZUFwcC5wcm9kdWN0RGF0YSA9IGV2dC50YXJnZXQucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgLy8gdGVsbCB0aGUgYXBwIHRvIHByZXBhcmUgdGhlIGNhdGFsb2dcbiAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFub3RoZXIgd2F5IHRvIGRvIGl0LCB3aXRoIGN1c3RvbVxuICAgICAgICAgICAgLy8gZXZlbnRzLiBidXQgdGhpcyB3aWxsIHdvcmsgZm9yIG5vdy5cbiAgICAgICAgICAgIHRoZUFwcC5wcmVwQ2F0YWxvZygpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZ0LnRhcmdldC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgLy8gcmV0dXJuIGV2dC50YXJnZXQucmVzcG9uc2VUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHMoKXtcbiAgICAgICAgLy8gdGhpcyBtZXRob2QgZXhwbGljaXR5IGdldHMgdGhlIHByb2R1Y3RzIHByb3BlcnR5XG4gICAgICAgIC8vIGZyb20gdGhlIEpTT04gb2JqZWN0LiBpdCBhc3N1bWVzIHlvdSBoYXZlIHRoZSBKU09OIGRhdGFcbiAgICAgICAgaWYodGhpcy5wcm9kdWN0RGF0YSE9bnVsbCl7XG4gICAgICAgICAgIGxldCBqc29uRGF0YSA9IEpTT04ucGFyc2UodGhpcy5wcm9kdWN0RGF0YSk7XG4gICAgICAgICAgIHRoaXMucHJvZHVjdHMgPSBqc29uRGF0YS5wcm9kdWN0cztcbiAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47IC8vIGlmIHdlIGhhdmUgbm8gZGF0YSwgcmV0dXJuIG5vdGhpbmdcbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9CZXN0QnV5V2ViU2VydmljZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-28.\n */\n\n// this class is responsible for displaying the product data...\n// Perhaps in a carousel.\nvar CatalogView = function () {\n    function CatalogView() {\n        _classCallCheck(this, CatalogView);\n\n        // this.initCarousel();\n        this.theApp = null;\n        this.carousel = document.getElementsByClassName(\"owl-carousel\");\n    }\n\n    _createClass(CatalogView, [{\n        key: \"initCarousel\",\n        value: function initCarousel() {\n            console.log(\"initializing carousel\");\n            $(document).ready(function () {\n                $('.owl-carousel').owlCarousel({\n                    items: 1,\n                    loop: true,\n                    nav: true,\n                    responsive: {\n                        0: {\n                            items: 1\n                        }, //from zero to 600 screen\n                        601: {\n                            items: 2\n                        }, //from 600 to 1050 screen\n                        1050: {\n                            items: 4\n                        } //from 1050 to 1240 screen\n                    }\n\n                });\n            });\n        }\n    }, {\n        key: \"onClickCartButton\",\n        value: function onClickCartButton(theApp) {\n\n            return function (e) {\n                console.log(e.target.getAttribute.dataSku);\n                var theSku = e.target.getAttribute.dataSku;\n                console.log(theApp);\n                console.log(theApp.shoppingCart);\n                theApp.shoppingCart.addItemToCart(theSku);\n            }; //create function addItemToCart ()\n        }\n    }, {\n        key: \"addProductsToCarousel\",\n        value: function addProductsToCarousel(products, theApp) {\n\n            this.theApp = theApp;\n\n            if (products === undefined || products == null) {\n                return; // do not do anything! there is no data\n            }\n\n            /* the loop creates all the elements for each item in the carousel.\n             * it recreates the following structure\n             * <div class=\"product-wrapper\">\n             * <img src=\"images/stretch-knit-dress.jpg\" alt=\"Image of stretch knit dress\" />\n             * <p class=\"product-type\">Dresses</p>\n             * <h3>Stretch Knit Dress</h3>\n             * <p class=\"price\">$169.00</p>\n             * </div>\n              * */\n            for (var p = 0; p < products.length; p++) {\n                var product = products[p];\n                console.log(product);\n                // each product is a product object\n                // use it to create the element\n\n                // create the DIV tag with class 'product-wrapper'\n                var newDiv = document.createElement(\"div\");\n                newDiv.setAttribute(\"class\", \"product-wrapper\");\n\n                // create a new IMG tag. Suggest to add data-sku attribute here too\n                // so that if you 'click' on the image, it would pop up a quick-view\n                // window and you can use the sku.\n                var newImg = document.createElement(\"div\");\n                newImg.setAttribute(\"style\", \"background-image: url('\" + product.image + \"');height:200px; background-size:contain;background-repeat:no-repeat;background-position:center;\");\n                newImg.setAttribute(\"src\", product.image);\n                newImg.setAttribute(\"alt\", \"\" + product.name); // this works too\n                newImg.setAttribute(\"data-sku\", product.sku);\n\n                // create a new Paragraph to show a description\n                var newPara = document.createElement(\"p\");\n                newPara.setAttribute(\"class\", \"product-type\");\n                var newParaTextNode = document.createTextNode(product.manufacturer);\n                newPara.appendChild(newParaTextNode);\n\n                // create a new H3 tag to show the name\n                var newH3Tag = document.createElement(\"h3\");\n                var newH3TagTextNode = document.createTextNode(product.name);\n                newH3Tag.appendChild(newH3TagTextNode);\n\n                var newPricePara = document.createElement(\"p\");\n                newPricePara.setAttribute(\"class\", \"price\");\n                var newPriceParaTextNode = document.createTextNode(product.regularPrice);\n                newPricePara.appendChild(newPriceParaTextNode);\n\n                /* you will need similar code to create\n                an add to cart and a quick view button\n                remember that each button you create should have\n                a data-sku attribute that corresponds to the sku\n                of each product.\n                */var hr = document.createElement(\"hr\");\n\n                var quickViewButton = document.createElement(\"button\");\n                quickViewButton.setAttribute(\"class\", \"quickViewButton\");\n                quickViewButton.setAttribute(\"id\", \"qv\" + product.sku);\n                quickViewButton.setAttribute(\"data-sku\", product.sku);\n                quickViewButton.setAttribute(\"type\", \"button\");\n                var quickViewTextNode = document.createTextNode(\"Quick View\");\n                quickViewButton.appendChild(quickViewTextNode);\n\n                var addToCartButton = document.createElement(\"button\");\n                addToCartButton.setAttribute(\"class\", \"addToCartButton\");\n                addToCartButton.setAttribute(\"id\", \"cart_\" + product.sku);\n                addToCartButton.setAttribute(\"data-sku\", product.sku);\n                addToCartButton.setAttribute(\"type\", \"button\");\n                var addCartTextNode = document.createTextNode(\"Add To Cart\");\n                addToCartButton.appendChild(addCartTextNode);\n                addToCartButton.addEventListener(\"click\", this.onClickCartButton(this.theApp), false);\n\n                newDiv.appendChild(newImg);\n                newDiv.appendChild(newPara);\n                newDiv.appendChild(hr);\n                newDiv.appendChild(newH3Tag);\n                newDiv.appendChild(newPricePara);\n                newDiv.appendChild(quickViewButton); // added new quickView Button\n                newDiv.appendChild(addToCartButton); // added new addToCartButton\n                /*\n                * <div>\n                    <img src=\"somepicfrombestbuy\"></img.\n                    <p>buy me now</p>\n                    <h3>Dell Inspirion 12\"</h3>\n                    <p>299.99</p>\n                    <button id=\"qv_${product.sku}\" data-sku\" type=\"button\">Quick View</button>\n                    <button id = \"cart_${product.sku}\" data-sku=\"\" type =\"button\">Add To Cart</button>\n                    </div>\n                         */\n                // document.getElementById('carousel').appendChild(newDiv);\n                this.carousel[0].appendChild(newDiv);\n            }\n            this.initCarousel();\n        }\n    }]);\n\n    return CatalogView;\n}();\n\nexports.default = CatalogView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvQ2F0YWxvZ1ZpZXcuanM/OTBmMSJdLCJuYW1lcyI6WyJDYXRhbG9nVmlldyIsInRoZUFwcCIsImNhcm91c2VsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY29uc29sZSIsImxvZyIsIiQiLCJyZWFkeSIsIm93bENhcm91c2VsIiwiaXRlbXMiLCJsb29wIiwibmF2IiwicmVzcG9uc2l2ZSIsImUiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJkYXRhU2t1IiwidGhlU2t1Iiwic2hvcHBpbmdDYXJ0IiwiYWRkSXRlbVRvQ2FydCIsInByb2R1Y3RzIiwidW5kZWZpbmVkIiwicCIsImxlbmd0aCIsInByb2R1Y3QiLCJuZXdEaXYiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwibmV3SW1nIiwiaW1hZ2UiLCJuYW1lIiwic2t1IiwibmV3UGFyYSIsIm5ld1BhcmFUZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwibWFudWZhY3R1cmVyIiwiYXBwZW5kQ2hpbGQiLCJuZXdIM1RhZyIsIm5ld0gzVGFnVGV4dE5vZGUiLCJuZXdQcmljZVBhcmEiLCJuZXdQcmljZVBhcmFUZXh0Tm9kZSIsInJlZ3VsYXJQcmljZSIsImhyIiwicXVpY2tWaWV3QnV0dG9uIiwicXVpY2tWaWV3VGV4dE5vZGUiLCJhZGRUb0NhcnRCdXR0b24iLCJhZGRDYXJ0VGV4dE5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGlja0NhcnRCdXR0b24iLCJpbml0Q2Fyb3VzZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBO0FBQ0E7SUFDcUJBLFc7QUFFakIsMkJBQWE7QUFBQTs7QUFDVDtBQUNBLGFBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQkMsU0FBU0Msc0JBQVQsQ0FBZ0MsY0FBaEMsQ0FBaEI7QUFFSDs7Ozt1Q0FHYTtBQUNYQyxvQkFBUUMsR0FBUixDQUFZLHVCQUFa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Q0FBbUJDLFFBQW5CO0FBQ0FaLHVCQUFPVyxXQUFQLENBQW1CRyxZQUFuQjtBQUNBZCx1QkFBT1csV0FBUCxDQUFtQk8sZUFBbkIsRUFqRWlDLENBaUVJO0FBQ3JDbEIsdUJBQU9XLFdBQVAsQ0FBbUJTLGVBQW5CLEVBbEVpQyxDQWtFSTtBQUNyQzs7Ozs7Ozs7OztBQVdBO0FBQ0EscUJBQUs1QyxRQUFMLENBQWMsQ0FBZCxFQUFpQm1DLFdBQWpCLENBQTZCWCxNQUE3QjtBQUNDO0FBQ0QsaUJBQUt3QixZQUFMO0FBRVA7Ozs7OztrQkF0SmdCbEQsVyIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgb24gMjAxNy0wMS0yOC5cbiAqL1xuXG4vLyB0aGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIHRoZSBwcm9kdWN0IGRhdGEuLi5cbi8vIFBlcmhhcHMgaW4gYSBjYXJvdXNlbC5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGFsb2dWaWV3e1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgLy8gdGhpcy5pbml0Q2Fyb3VzZWwoKTtcbiAgICAgICAgdGhpcy50aGVBcHAgPSBudWxsO1xuICAgICAgICB0aGlzLmNhcm91c2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm93bC1jYXJvdXNlbFwiKTtcblxuICAgIH1cblxuXG4gICAgaW5pdENhcm91c2VsKCl7XG4gICAgICAgY29uc29sZS5sb2coXCJpbml0aWFsaXppbmcgY2Fyb3VzZWxcIik7XG4gICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICAgICAgICQoJy5vd2wtY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XG4gICAgICAgICAgICAgIGl0ZW1zOjEsXG4gICAgICAgICAgICAgIGxvb3A6dHJ1ZSxcbiAgICAgICAgICAgICAgbmF2OnRydWUsXG4gICAgICAgICAgICAgIHJlc3BvbnNpdmUgOiB7XG4gICAgICAgICAgICAgICAgIDA6e1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOjFcbiAgICAgICAgICAgICAgICAgIH0sIC8vZnJvbSB6ZXJvIHRvIDYwMCBzY3JlZW5cbiAgICAgICAgICAgICAgICAgIDYwMTp7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbXM6MlxuICAgICAgICAgICAgICAgICAgfSwgLy9mcm9tIDYwMCB0byAxMDUwIHNjcmVlblxuICAgICAgICAgICAgICAgICAgMTA1MDp7XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbXM6NFxuICAgICAgICAgICAgICAgICAgfSAvL2Zyb20gMTA1MCB0byAxMjQwIHNjcmVlblxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KTtcbiAgICAgIH0pOyBcblxuXG5cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBvbkNsaWNrQ2FydEJ1dHRvbih0aGVBcHApe1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmdldEF0dHJpYnV0ZS5kYXRhU2t1KTtcbiAgICAgICAgICAgIGxldCB0aGVTa3UgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUuZGF0YVNrdTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZUFwcCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGVBcHAuc2hvcHBpbmdDYXJ0KTtcbiAgICAgICAgICAgIHRoZUFwcC5zaG9wcGluZ0NhcnQuYWRkSXRlbVRvQ2FydCh0aGVTa3UpO1xuICAgICAgIH0gLy9jcmVhdGUgZnVuY3Rpb24gYWRkSXRlbVRvQ2FydCAoKVxuICAgIH0gICBcblxuICAgIFxuICAgICAgICBhZGRQcm9kdWN0c1RvQ2Fyb3VzZWwocHJvZHVjdHMsIHRoZUFwcCl7XG5cbiAgICAgICAgICAgIHRoaXMudGhlQXBwID0gdGhlQXBwO1xuXG4gICAgICAgIGlmIChwcm9kdWN0cyA9PT0gdW5kZWZpbmVkIHx8IHByb2R1Y3RzID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuIDsgLy8gZG8gbm90IGRvIGFueXRoaW5nISB0aGVyZSBpcyBubyBkYXRhXG4gICAgICAgIH1cblxuICAgICAgICAvKiB0aGUgbG9vcCBjcmVhdGVzIGFsbCB0aGUgZWxlbWVudHMgZm9yIGVhY2ggaXRlbSBpbiB0aGUgY2Fyb3VzZWwuXG4gICAgICAgICAqIGl0IHJlY3JlYXRlcyB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZVxuICAgICAgICAgKiA8ZGl2IGNsYXNzPVwicHJvZHVjdC13cmFwcGVyXCI+XG4gICAgICAgICAqIDxpbWcgc3JjPVwiaW1hZ2VzL3N0cmV0Y2gta25pdC1kcmVzcy5qcGdcIiBhbHQ9XCJJbWFnZSBvZiBzdHJldGNoIGtuaXQgZHJlc3NcIiAvPlxuICAgICAgICAgKiA8cCBjbGFzcz1cInByb2R1Y3QtdHlwZVwiPkRyZXNzZXM8L3A+XG4gICAgICAgICAqIDxoMz5TdHJldGNoIEtuaXQgRHJlc3M8L2gzPlxuICAgICAgICAgKiA8cCBjbGFzcz1cInByaWNlXCI+JDE2OS4wMDwvcD5cbiAgICAgICAgICogPC9kaXY+XG4gICAgICAgICAgKiAqL1xuICAgICAgICBmb3IgKGxldCBwPTA7IHA8cHJvZHVjdHMubGVuZ3RoOyBwKyspe1xuICAgICAgICAgICAgbGV0IHByb2R1Y3QgPSBwcm9kdWN0c1twXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3QpO1xuICAgICAgICAgICAgLy8gZWFjaCBwcm9kdWN0IGlzIGEgcHJvZHVjdCBvYmplY3RcbiAgICAgICAgICAgIC8vIHVzZSBpdCB0byBjcmVhdGUgdGhlIGVsZW1lbnRcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBESVYgdGFnIHdpdGggY2xhc3MgJ3Byb2R1Y3Qtd3JhcHBlcidcbiAgICAgICAgICAgIGxldCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgbmV3RGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcm9kdWN0LXdyYXBwZXJcIik7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBJTUcgdGFnLiBTdWdnZXN0IHRvIGFkZCBkYXRhLXNrdSBhdHRyaWJ1dGUgaGVyZSB0b29cbiAgICAgICAgICAgIC8vIHNvIHRoYXQgaWYgeW91ICdjbGljaycgb24gdGhlIGltYWdlLCBpdCB3b3VsZCBwb3AgdXAgYSBxdWljay12aWV3XG4gICAgICAgICAgICAvLyB3aW5kb3cgYW5kIHlvdSBjYW4gdXNlIHRoZSBza3UuXG4gICAgICAgICAgICBsZXQgbmV3SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcke3Byb2R1Y3QuaW1hZ2V9Jyk7aGVpZ2h0OjIwMHB4OyBiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YCk7XG4gICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIHByb2R1Y3QuaW1hZ2UpO1xuICAgICAgICAgICAgbmV3SW1nLnNldEF0dHJpYnV0ZShcImFsdFwiLCBgJHtwcm9kdWN0Lm5hbWV9YCk7IC8vIHRoaXMgd29ya3MgdG9vXG4gICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIixwcm9kdWN0LnNrdSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBQYXJhZ3JhcGggdG8gc2hvdyBhIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICBsZXQgbmV3UGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgbmV3UGFyYS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwicHJvZHVjdC10eXBlXCIpO1xuICAgICAgICAgICAgbGV0IG5ld1BhcmFUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHByb2R1Y3QubWFudWZhY3R1cmVyKTtcbiAgICAgICAgICAgIG5ld1BhcmEuYXBwZW5kQ2hpbGQobmV3UGFyYVRleHROb2RlKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IEgzIHRhZyB0byBzaG93IHRoZSBuYW1lXG4gICAgICAgICAgICBsZXQgbmV3SDNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgICAgICBsZXQgbmV3SDNUYWdUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHByb2R1Y3QubmFtZSk7XG4gICAgICAgICAgICBuZXdIM1RhZy5hcHBlbmRDaGlsZChuZXdIM1RhZ1RleHROb2RlKTtcblxuICAgICAgICAgICAgbGV0IG5ld1ByaWNlUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgbmV3UHJpY2VQYXJhLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcmljZVwiKTtcbiAgICAgICAgICAgIGxldCBuZXdQcmljZVBhcmFUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHByb2R1Y3QucmVndWxhclByaWNlKTtcbiAgICAgICAgICAgIG5ld1ByaWNlUGFyYS5hcHBlbmRDaGlsZChuZXdQcmljZVBhcmFUZXh0Tm9kZSk7XG5cbiAgICAgICAgICAgIC8qIHlvdSB3aWxsIG5lZWQgc2ltaWxhciBjb2RlIHRvIGNyZWF0ZVxuICAgICAgICAgICAgYW4gYWRkIHRvIGNhcnQgYW5kIGEgcXVpY2sgdmlldyBidXR0b25cbiAgICAgICAgICAgIHJlbWVtYmVyIHRoYXQgZWFjaCBidXR0b24geW91IGNyZWF0ZSBzaG91bGQgaGF2ZVxuICAgICAgICAgICAgYSBkYXRhLXNrdSBhdHRyaWJ1dGUgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgc2t1XG4gICAgICAgICAgICBvZiBlYWNoIHByb2R1Y3QuXG4gICAgICAgICAgICAqL2xldCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHF1aWNrVmlld0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBxdWlja1ZpZXdCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJxdWlja1ZpZXdCdXR0b25cIik7XG4gICAgICAgICAgICBxdWlja1ZpZXdCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgYHF2JHtwcm9kdWN0LnNrdX1gKTtcbiAgICAgICAgICAgIHF1aWNrVmlld0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiLCBwcm9kdWN0LnNrdSk7XG4gICAgICAgICAgICBxdWlja1ZpZXdCdXR0b24uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIGxldCBxdWlja1ZpZXdUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiUXVpY2sgVmlld1wiKTtcbiAgICAgICAgICAgIHF1aWNrVmlld0J1dHRvbi5hcHBlbmRDaGlsZChxdWlja1ZpZXdUZXh0Tm9kZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICBsZXQgYWRkVG9DYXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAoXCJidXR0b25cIik7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhZGRUb0NhcnRCdXR0b25cIik7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgYGNhcnRfJHtwcm9kdWN0LnNrdX1gKTtcbiAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiLCBwcm9kdWN0LnNrdSk7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiLCk7XG4gICAgICAgICAgICBsZXQgYWRkQ2FydFRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJBZGQgVG8gQ2FydFwiKTtcbiAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5hcHBlbmRDaGlsZChhZGRDYXJ0VGV4dE5vZGUpO1xuICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2tDYXJ0QnV0dG9uKHRoaXMudGhlQXBwKSxmYWxzZSk7XG5cbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdJbWcpO1xuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKG5ld1BhcmEpO1xuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKGhyKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdIM1RhZyk7XG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3UHJpY2VQYXJhKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChxdWlja1ZpZXdCdXR0b24pOyAvLyBhZGRlZCBuZXcgcXVpY2tWaWV3IEJ1dHRvblxuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKGFkZFRvQ2FydEJ1dHRvbik7IC8vIGFkZGVkIG5ldyBhZGRUb0NhcnRCdXR0b25cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAqIDxkaXY+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJzb21lcGljZnJvbWJlc3RidXlcIj48L2ltZy5cbiAgICAgICAgICAgICAgICA8cD5idXkgbWUgbm93PC9wPlxuICAgICAgICAgICAgICAgIDxoMz5EZWxsIEluc3BpcmlvbiAxMlwiPC9oMz5cbiAgICAgICAgICAgICAgICA8cD4yOTkuOTk8L3A+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInF2XyR7cHJvZHVjdC5za3V9XCIgZGF0YS1za3VcIiB0eXBlPVwiYnV0dG9uXCI+UXVpY2sgVmlldzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gaWQgPSBcImNhcnRfJHtwcm9kdWN0LnNrdX1cIiBkYXRhLXNrdT1cIlwiIHR5cGUgPVwiYnV0dG9uXCI+QWRkIFRvIENhcnQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nhcm91c2VsJykuYXBwZW5kQ2hpbGQobmV3RGl2KTtcbiAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWxbMF0uYXBwZW5kQ2hpbGQobmV3RGl2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5pdENhcm91c2VsKCk7XG5cbiAgICB9XG5cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL0NhdGFsb2dWaWV3LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-29.\n */\n\nvar ShoppingCart = function () {\n    function ShoppingCart() {\n        _classCallCheck(this, ShoppingCart);\n\n        console.log(\"creating shopping cart\");\n        if (Storage) {\n            // you can create a shoppingCart!\n            this.initShoppingCart();\n        } else {\n            console.log(\"Error! SessionStorage not supported in your browser!\");\n        }\n    }\n\n    _createClass(ShoppingCart, [{\n        key: \"initShoppingCart\",\n        value: function initShoppingCart() {\n            // create the sessionStorage object that will be used\n            // to store the items.\n            console.log(\"finished creating shopping cart\");\n        }\n    }, {\n        key: \"addItemToCart\",\n        value: function addItemToCart(sku) {\n            var numMatches = 0;\n            for (var i = 0; 0 < sessionStorage.length; i++) {\n                if (sessionStorage.key(i) == sku) {\n                    var newVal = sessionStorage.getItem(sku);\n                    sessionStorage.setItem(sku, parseInt(newVal) + 1);\n                    numMatches = 1;\n                }\n            }\n\n            if (numMatches == 0) {\n                sessionStorage.setItem(sku, 1);\n                //addItemToCart(1);\n                console.log('addingItem to Cart');\n            }\n        }\n    }, {\n        key: \"removeItemFromCart\",\n        value: function removeItemFromCart() {}\n    }, {\n        key: \"updateQuantityofItemInCart\",\n        value: function updateQuantityofItemInCart(sku, qty) {}\n    }, {\n        key: \"clearCart\",\n        value: function clearCart() {\n            // clear the entire cart\n        }\n    }]);\n\n    return ShoppingCart;\n}();\n\nexports.default = ShoppingCart;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvU2hvcHBpbmdDYXJ0LmpzPzkyYTUiXSwibmFtZXMiOlsiU2hvcHBpbmdDYXJ0IiwiY29uc29sZSIsImxvZyIsIlN0b3JhZ2UiLCJpbml0U2hvcHBpbmdDYXJ0Iiwic2t1IiwibnVtTWF0Y2hlcyIsImkiLCJzZXNzaW9uU3RvcmFnZSIsImxlbmd0aCIsImtleSIsIm5ld1ZhbCIsImdldEl0ZW0iLCJzZXRJdGVtIiwicGFyc2VJbnQiLCJxdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztJQUlxQkEsWTtBQUVqQiw0QkFBYTtBQUFBOztBQUNUQyxnQkFBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0EsWUFBR0MsT0FBSCxFQUFXO0FBQ1A7QUFDQSxpQkFBS0MsZ0JBQUw7QUFDSCxTQUhELE1BR087QUFDSEgsb0JBQVFDLEdBQVIsQ0FBWSxzREFBWjtBQUNIO0FBQ0o7Ozs7MkNBRWlCO0FBQ2Q7QUFDQTtBQUNBRCxvQkFBUUMsR0FBUixDQUFZLGlDQUFaO0FBQ0g7OztzQ0FFZUcsRyxFQUFJO0FBQ2hCLGdCQUFJQyxhQUFhLENBQWpCO0FBQ0EsaUJBQUksSUFBSUMsSUFBSSxDQUFaLEVBQWUsSUFBRUMsZUFBZUMsTUFBaEMsRUFBd0NGLEdBQXhDLEVBQTRDO0FBQ3hDLG9CQUFHQyxlQUFlRSxHQUFmLENBQW1CSCxDQUFuQixLQUF5QkYsR0FBNUIsRUFBZ0M7QUFDN0Isd0JBQUlNLFNBQVNILGVBQWVJLE9BQWYsQ0FBdUJQLEdBQXZCLENBQWI7QUFDQ0csbUNBQWVLLE9BQWYsQ0FBdUJSLEdBQXZCLEVBQTRCUyxTQUFTSCxNQUFULElBQWlCLENBQTdDO0FBQ0FMLGlDQUFhLENBQWI7QUFDSDtBQUNKOztBQUVELGdCQUFJQSxjQUFjLENBQWxCLEVBQW9CO0FBQ2hCRSwrQkFBZUssT0FBZixDQUF1QlIsR0FBdkIsRUFBNEIsQ0FBNUI7QUFDQTtBQUNBSix3QkFBUUMsR0FBUixDQUFZLG9CQUFaO0FBQ0g7QUFFSjs7OzZDQUNtQixDQUVuQjs7O21EQUUwQkcsRyxFQUFJVSxHLEVBQUksQ0FFbEM7OztvQ0FFVTtBQUNQO0FBQ0g7Ozs7OztrQkE3Q2dCZixZIiwiZmlsZSI6IjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgRWR3YXJkX0pfQXBvc3RvbCBvbiAyMDE3LTAxLTI5LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BwaW5nQ2FydHtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRpbmcgc2hvcHBpbmcgY2FydFwiKTtcbiAgICAgICAgaWYoU3RvcmFnZSl7XG4gICAgICAgICAgICAvLyB5b3UgY2FuIGNyZWF0ZSBhIHNob3BwaW5nQ2FydCFcbiAgICAgICAgICAgIHRoaXMuaW5pdFNob3BwaW5nQ2FydCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciEgU2Vzc2lvblN0b3JhZ2Ugbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXIhXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdFNob3BwaW5nQ2FydCgpe1xuICAgICAgICAvLyBjcmVhdGUgdGhlIHNlc3Npb25TdG9yYWdlIG9iamVjdCB0aGF0IHdpbGwgYmUgdXNlZFxuICAgICAgICAvLyB0byBzdG9yZSB0aGUgaXRlbXMuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmluaXNoZWQgY3JlYXRpbmcgc2hvcHBpbmcgY2FydFwiKTtcbiAgICB9XG5cbiAgICAgYWRkSXRlbVRvQ2FydCAoc2t1KXtcbiAgICAgICAgbGV0IG51bU1hdGNoZXMgPSAwO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyAwPHNlc3Npb25TdG9yYWdlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmtleShpKSA9PSBza3Upe1xuICAgICAgICAgICAgICAgbGV0IG5ld1ZhbCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc2t1KTtcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHNrdSwgcGFyc2VJbnQobmV3VmFsKSsxKTtcbiAgICAgICAgICAgICAgICBudW1NYXRjaGVzID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAobnVtTWF0Y2hlcyA9PSAwKXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oc2t1LCAxKTtcbiAgICAgICAgICAgIC8vYWRkSXRlbVRvQ2FydCgxKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmdJdGVtIHRvIENhcnQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJlbW92ZUl0ZW1Gcm9tQ2FydCgpe1xuXG4gICAgfVxuXG4gICAgdXBkYXRlUXVhbnRpdHlvZkl0ZW1JbkNhcnQoc2t1LHF0eSl7XG5cbiAgICB9XG5cbiAgICBjbGVhckNhcnQoKXtcbiAgICAgICAgLy8gY2xlYXIgdGhlIGVudGlyZSBjYXJ0XG4gICAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9TaG9wcGluZ0NhcnQuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);