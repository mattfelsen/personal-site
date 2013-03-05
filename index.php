<?php

if ($_SERVER['HTTP_HOST'] == "www.mattfelsen.com")
	header('Location: http://mattfelsen.com' . $_SERVER['REQUEST_URI']);

$uri = explode('/', $_SERVER['REQUEST_URI']);

// Get rid of first, blank element
array_shift($uri);

// Get rid of "beta" element since the site is in development!
array_shift($uri);

$page = array_shift($uri);

// Set flag for whether this was an ajax request
// Only return content for #wrap if it was, include header & footer otherwise
$ajax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');


if (!$ajax)
	include('./views/header.html');

if ($page != 'projects') {
	include('./views/main.html');
} else {
	$project = array_shift($uri);
	if ($project)
		include("./views/projects/$project.html");
	else
		include('./views/main.html');
}

if (!$ajax)
	include('./views/footer.html');

?>