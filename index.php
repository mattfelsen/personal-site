<?php

if ($_SERVER['HTTP_HOST'] == "www.mattfelsen.com")
	header('Location: http://mattfelsen.com' . $_SERVER['REQUEST_URI']);

// Added to deal with weird requests coming in for the /projects/img/projects/...
if ($_SERVER['REQUEST_URI'] == '/projects/img/projects/spiros/spiro10.jpg') {
	header("Location: http://mattfelsen.com/img/projects/spiros/spiro10.jpg");
	die();
}

$uri = explode('/', $_SERVER['REQUEST_URI']);

// Get rid of first, blank element
array_shift($uri);

// Check if this is running on localhost and exists at localhost/beta
// If so get rid of that element too
if ($_SERVER['SERVER_NAME'] == 'localhost') {
	array_shift($uri);
}

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
	if ($project) {
		//if ($project == 'img') {
			//mail("mattfelsen@gmail.com", "Include error", "\$_SERVER looks like...\n\n" . json_encode($_SERVER));
		//}
		include("./views/projects/$project.html");
	} else {
		include('./views/main.html');
	}
}

if (!$ajax)
	include('./views/footer.html');

?>