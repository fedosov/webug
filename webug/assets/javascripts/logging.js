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
		console[message.log_type].apply(console, args);
	}
});