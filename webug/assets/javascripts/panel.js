/**
 * Webug
 * Author: Fedosov Mikhail, 2010-2013
 * URL:    https://github.com/fedosov/webug/
 */

function log(item)
{
	var entries = $("#entries");
	var entry = $("<li class='entries__item'></li>").addClass("entry_type__" + item[0]["Type"]);

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

	entry.append($("<div class='entry__message'></div>").text(item[1]));
	entry.append($("<div class='entry__source'></div>").html(item[0]["File"] + ":<strong>" + item[0]["Line"] + "</strong>"));

	entries.append(entry);
}

function clearLog()
{
	$("#entries").html("");
}