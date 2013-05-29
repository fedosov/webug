/**
 * Webug
 * Author: Fedosov Mikhail, 2010-2013
 * URL:    https://github.com/fedosov/webug/
 */

chrome.devtools.panels.create("Webug", "assets/images/devtools-panel.png", "panel.html", function(panel)
{
	var _window;

	chrome.devtools.network.addRequestHeaders(
	{
		"X-FirePHP": "0.4.4",
		"X-FirePHP-Version": "0.4.4"
	});

	var port = chrome.extension.connect(
	{
		name: "webug.connection"
	});

	var buttonClear = panel.createStatusBarButton("assets/images/clear.png", "Clear Webug log.");
	buttonClear.onClicked.addListener(function()
	{
		_window.clearLog();
	});

	// Send headers to background script
	chrome.devtools.network.onRequestFinished.addListener(function(request)
	{
		port.postMessage({ "type": "webug.headers", "headers": request.response.headers });
	});

	var tabId = chrome.devtools.inspectedWindow.tabId;

	// Output messages
	port.onMessage.addListener(function(data)
	{
		if (data["type"] === "webug.messages")
		{
			var messages = data["messages"];
			if (messages.length === 0)
			{
				return;
			}
			for (var i = 0; i < messages.length; i++)
			{
				if (messages.hasOwnProperty(i))
				{
					var message = messages[i];
					_window.log(message);
				}
			}
		}
		else if (data["type"] === "webug.tab.updated")
		{
			if (data["tabId"] === tabId && data["changeInfo"]["status"] === "loading")
			{
				_window.clearLog();
			}
		}
	});

	// Get panel `window` instance
	panel.onShown.addListener(function tmp(panelWindow)
	{
		panel.onShown.removeListener(tmp);
		_window = panelWindow;
	});
});
