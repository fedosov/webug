/**
 * Webug
 * Author: Fedosov Mikhail, 2010-2013
 * URL:    https://github.com/fedosov/webug/
 */

function log(item)
{
	/*
	LOG: "log",
	DEBUG: "debug",
	INFO: "info",
	WARN: "warn",
	ERROR: "error",
	GROUP: "group",
	GROUP_COLLAPSED: "groupCollapsed",
	GROUP_END: "groupEnd"
	*/

	var entries = $("#entries");
	var entry = $("<li class='entries__item'></li>").addClass("entry_type__" + item[0]["Type"]);

	var entry__message = $("<pre class='entry__message'></pre>").text(item[1]);
	hljs.highlightBlock(entry__message[0]);
	entry.append(entry__message);
	entry.append($("<div class='entry__source'></div>").html(item[0]["File"] + ":<strong>" + item[0]["Line"] + "</strong>"));

	entries.append(entry);
}

function clearLog()
{
	$("#entries").html("");
}