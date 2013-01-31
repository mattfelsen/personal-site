<?php

$uri = explode('/', $_SERVER['REQUEST_URI']);

// Get rid of first, blank element
array_shift($uri);

// Get rid of "beta" element since the site is in development!
array_shift($uri);

$page = array_shift($uri);

include('./views/header.html');

if ($page != 'projects') {
	include('./views/main.html');
} else {
	$project = array_shift($uri);
	include("./views/$project.html");
}

include('./views/footer.html');

?>