chrome.runtime.onMessage.addListener(function(message, sender, sendResponse)
{
	if (message.type === "webug.log")
	{
		sendResponse({ "ack": true });

		var args = [];
		if (["group", "groupEnd"].indexOf(message.log_type) === -1 && message.meta.File.length > 0)
		{
			console.log("%c" + message.meta.File + ":" + (message.meta.Line ? message.meta.Line : '<unknown>'), "color: #aaa;")
		}
		if (message.log_type === "table")
		{
			if (message.label)
			{
				console.log("%c" + message.label, "color: #555;");
			}
			if (message.message && message.message.length > 0)
			{
				if (console.table)
				{
					console.table(tableCreateObject(message.message));
				}
				else
				{
					var col_count = tableGetColCount(message.message)
					  , col_widths = tableGetColWidths(message.message)
					;
					message.message.forEach(function(row)
					{
						var row_string = "|";
						for (var i = 0; i < col_count; i++)
						{
							var col_value = "";
							if (row.hasOwnProperty(i))
							{
								col_value = row[i];
							}
							row_string += pad(" " + col_value, col_widths[i] + 2);
							row_string += "|";
						}
						console.log(row_string);
					});
				}
			}
		}
		else
		{
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
	}
});

function tableCreateObject(table)
{
	var result = [];
	if (table.length > 1)
	{
		table.forEach(function(row, i)
		{
			if (i > 0)
			{
				var result_row = {};
				table[0].forEach(function(col_title, ii)
				{
					result_row[col_title] = row[ii];
				});
				result.push(result_row);
			}
		});
	}
	else
	{
		result = table;
	}
	return result;
}

function tableGetColCount(table)
{
	var col_count = 0;
	table.forEach(function(row)
	{
		col_count = Math.max(col_count, row.length);
	});
	return col_count;
}

function tableGetColWidths(table)
{
	var col_widths = new Array(tableGetColCount(table));
	table.forEach(function(row)
	{
		row.forEach(function(col, i)
		{
			if (!isNaN(col_widths[i]))
			{
				col_widths[i] = Math.max(col_widths[i], col.length);
			}
			else
			{
				col_widths[i] = col.length;
			}
		});
	});
	return col_widths;
}

function pad(str, length)
{
	while (str.length < length)
	{
		str += ' ';
	}
	return str;
}
