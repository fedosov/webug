/**
 * Webug
 * Author: Fedosov Mikhail, 2010-2013
 * URL:    https://github.com/fedosov/webug/
 */

var isPoweredOn = true;

function processWfHeaders(headers)
{
	var messages = [];
	for (var i in headers)
	{
		if (headers.hasOwnProperty(i))
		{
			var wf_header = headers[i]["name"].match(/^X-Wf-1-(\d+)-1-(\d+)/i);
			if (wf_header)
			{
				var m = headers[i]["value"].match(/^(\d+)\|(.*)\|/i);
				messages.push(jQuery.parseJSON(m[2]))
			}
		}
	}
	return messages;
}

chrome.extension.onConnect.addListener(function(port)
{
	port.onMessage.addListener(function(message)
	{
		if (message.hasOwnProperty("type") && message["type"] === "webug.headers")
		{
			var messages = processWfHeaders(message["headers"]);
			port.postMessage(messages);
		}
	});
});

function logToTab(tabId, type, message, label)
{
	chrome.tabs.sendMessage(tabId, { type: "webug.log", log_type: type, message: message, label: label });
}

chrome.browserAction.onClicked.addListener(function(tab)
{
	chrome.browserAction.setBadgeText({'text': ''});
	isPoweredOn = !isPoweredOn;
	if (isPoweredOn)
	{
		chrome.browserAction.setIcon({ path: "assets/images/FirePHP_19.png" });
	}
	else
	{
		chrome.browserAction.setIcon({ path: "assets/images/FirePHP_19_gray.png" });
	}
});

chrome.webRequest.onBeforeSendHeaders.addListener(function(details)
{
	if (!isPoweredOn)
	{
		return {};
	}
	details.requestHeaders.push(
	{
		"name": "X-FirePHP",
		"value": "0.4.4"
	});
	details.requestHeaders.push(
	{
		"name": "X-FirePHP-Version",
		"value": "0.4.4"
	});
	return { requestHeaders: details.requestHeaders };
},
{
	urls: ["<all_urls>"],
	types: ["main_frame", "xmlhttprequest"]
},
["blocking", "requestHeaders"]);

chrome.webRequest.onHeadersReceived.addListener(function(details)
{
	if (!isPoweredOn)
	{
		return {};
	}
	var messages = processWfHeaders(details.responseHeaders);
	for (var i in messages)
	{
		if (messages.hasOwnProperty(i))
		{
			/*
			Message example:
			0: Object
				File: "/Users/admin/Sites/polygon/webug.php"
				Line: "6"
				Type: "LOG"
			1: "TEST"
			*/
			var message = messages[i]
			  , label = message[0]['Label']
			  , text = message[1]
			  , type = message[0]['Type']
			;
			switch (type)
			{
				case 'GROUP_START':
					logToTab(details.tabId, "group", label);
				break;

				case 'GROUP_END':
					logToTab(details.tabId, "groupEnd", "");
				break;

				case 'WARN':
					logToTab(details.tabId, "warn", text, label);
				break;

				case 'ERROR':
					logToTab(details.tabId, "error", text, label);
				break;

				case 'INFO':
					logToTab(details.tabId, "info", text, label);
				break;

				case 'DEBUG':
					logToTab(details.tabId, "debug", text, label);
				break;

				default:
					logToTab(details.tabId, "log", text, label);
			}
		}
	}
	return {};
},
{
	urls: ["<all_urls>"],
	types: ["main_frame", "xmlhttprequest"]
},
["responseHeaders"]);