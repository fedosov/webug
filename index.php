<?php
include('fb.php');
for ($i = 0; $i < 5; $i++)
{
	fb('test112312');
}
FB::error("I'm a bug!");
?>
<script type="text/javascript">

var req = new XMLHttpRequest();
req.open("GET", window.location, false);
req.setRequestHeader("X-FirePHP", "0.4");
req.onload = processHeaders;
req.send(null);

function processHeaders()
{
	var headersRaw = req.getAllResponseHeaders();
	var headers = headersRaw.split("\n");
	var headerWf = [];
	for (var i in headers)
	{
		var m = headers[i].match(/^X-Wf-1-(\d+)-1-(\d+): (\d+)\|(.*)\|$/i);
		if (m)
		{
			/*
			* m:
			* 1 - группа
			* 2 - id в группе
			* 3 - длинна данных
			* 4 - данные
			*/
			headerWf.push([m[1], m[2], m[3], eval(m[4])]);
		}
	}
	console.dir(headerWf);
}

</script>