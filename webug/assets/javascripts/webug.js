var isPoweredOn = true;

function processWfHeaders(headers)
{
	var messages = [];
	for (var i in headers)
	{
		if (headers.hasOwnProperty(i))
		{
			var isWf = headers[i]["name"].match(/^X-Wf-1-(\d+)-1-(\d+)/i);
			if (isWf)
			{
				var m = headers[i]["value"].match(/^(\d+)\|(.*)\|/i);
				messages.push(jQuery.parseJSON(m[2]))
			}
			/*
			var m = headers[i]["name"].match(/^X-Wf-1-(\d+)-1-(\d+): (\d+)\|(.*)\|/i);
			if (m)
			{
				// m:
				// 1 - группа
				// 2 - id в группе
				// 3 - длинна данных
				// 4 - данные
				headersWf.push([m[1], m[2], m[3], eval(m[4])]);
			}
			*/
		}
	}
	return messages;
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
			0: Object
				File: "/Users/admin/Sites/polygon/webug.php"
				Line: "6"
				Type: "LOG"
			1: "TEST"
			*/
			var message = messages[i]
			  , label = message[0]['Label']
			  , text = "JSON.parse('" + (JSON.stringify(message[1])).replace(/'/g, "\\'") + "')"
			  , type = message[0]['Type']
			;
			if (label)
			{
				if (typeof(label) !== "String")
				{
					label = "JSON.parse('" + (JSON.stringify(label)).replace(/'/g, "\\'") + "')"
				}
				else
				{
					label = "'" + label.replace(/'/g, "\\'") + "'";
				}
			}
			switch (type)
			{
				case 'GROUP_START':
					chrome.tabs.executeScript(details.tabId, { code: "console.group("+label+");" });
				break;

				case 'GROUP_END':
					chrome.tabs.executeScript(details.tabId, { code: "console.groupEnd();" });
				break;

				case 'WARN':
					chrome.tabs.executeScript(details.tabId, { code: "console.warn("+text+");" });
				break;

				case 'ERROR':
					chrome.tabs.executeScript(details.tabId, { code: "console.error("+text+");" });
				break;

				case 'INFO':
					chrome.tabs.executeScript(details.tabId, { code: "console.info("+text+");" });
				break;

				case 'DEBUG':
					chrome.tabs.executeScript(details.tabId, { code: "console.debug("+text+");" });
				break;

				default:
					chrome.tabs.executeScript(details.tabId, { code: "console.log("+text+");" });
			}
		}
	}
},
{
	urls: ["<all_urls>"],
	types: ["main_frame", "xmlhttprequest"]
},
["responseHeaders"]);