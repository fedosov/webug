chrome.runtime.onMessage.addListener(function(message, sender)
{
	if (message.type === "webug.log")
	{
		var args = [];
		if (message.label)
		{
			args.push(message.label);
		}
		if (message.message)
		{
			args.push(message.message);
		}
		if (["group", "groupEnd"].indexOf(message.log_type) === -1)
		{
			console.log("%c" + message.meta.File + ":" + message.meta.Line, "color: #aaa;")
		}
		console[message.log_type].apply(console, args);
	}
});