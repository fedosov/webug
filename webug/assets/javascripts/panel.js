/**
 * Webug
 * Author: Fedosov Mikhail, 2010-2013
 * URL:    https://github.com/fedosov/webug/
 */

function log(item)
{
	/*
	document.body.appendChild(document.createTextNode(item[0]["File"]));
	document.body.appendChild(document.createTextNode(item[0]["Line"]));
	document.body.appendChild(document.createTextNode(item[0]["Type"]));
	document.body.appendChild(document.createTextNode(item[1]));
	*/
	var entries = document.getElementById("entries");
	var entry = document.createElement("li");
	entry.className = "entries__item entry_type__" + item[0]["Type"];

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

	var entry__message = document.createElement("div");
	entry__message.className = "entry__message";
	entry__message.innerHTML = item[1];
	entry.appendChild(entry__message);

	var entry__source = document.createElement("div");
	entry__source.className = "entry__source";
	entry__source.innerHTML = item[0]["File"] + ":<strong>" + item[0]["Line"] + "</strong>";
	entry.appendChild(entry__source);

	entries.appendChild(entry);
}

function clearLog()
{
	var entries = document.getElementById("entries");
	entries.innerHTML = "";
}