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

	// Output messages
	port.onMessage.addListener(function(messages)
	{
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
	});

	// Get panel `window` instance
	panel.onShown.addListener(function tmp(panelWindow)
	{
		panel.onShown.removeListener(tmp);
		_window = panelWindow;
	});
});
