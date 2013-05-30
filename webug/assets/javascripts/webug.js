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

function logToTab(tabId, meta, type, message, label)
{
	chrome.tabs.sendMessage(tabId, { type: "webug.log", meta: meta, log_type: type, message: message, label: label });
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
					logToTab(details.tabId, message[0], "group", label);
				break;

				case 'GROUP_END':
					logToTab(details.tabId, message[0], "groupEnd", "");
				break;

				case 'WARN':
					logToTab(details.tabId, message[0], "warn", text, label);
				break;

				case 'ERROR':
					logToTab(details.tabId, message[0], "error", text, label);
				break;

				case 'INFO':
					logToTab(details.tabId, message[0], "info", text, label);
				break;

				case 'DEBUG':
					logToTab(details.tabId, message[0], "debug", text, label);
				break;

				default:
					logToTab(details.tabId, message[0], "log", text, label);
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