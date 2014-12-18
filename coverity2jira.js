// ==UserScript==
// @name         Import Coverity issues to Jira
// @namespace    http://01.org/
// @version      0.1
// @description  This adds a button to jira that allows you to import list of coverity issues from an exported csv file.  It then gives you an option to create new bug reports with this data.
// @author       Terri Oda
// @match        https://crosswalk-project.org/jira/*
// @grant        none
// ==/UserScript==

// Add a button for importing coverity issues
var createMenu = document.getElementById("create-menu");
var coverityMenu = document.createElement("li");
coverityMenu.innerHTML = '<a id="import_link" class="aui-button aui-button-primary aui-style import-issue " title="Import a new issue / bug / feature request / etc ( Type \'I\' )" href="#" accesskey="I">Import Coverity issue: <input type="file" id="fileInput"></a>';
createMenu.parentNode.insertBefore(coverityMenu, createMenu.nextSibling);

var fileInput = document.getElementById('fileInput');

document.addEventListener('DOMContentLoaded', function () {
  coverityMenu.addEventListener('click', importIssues);
  fileInput.addEventListener('change', importIssues);
});


// Load the .csv file provided by the user
function importIssues() {
	var file = fileInput.files[0];
	var textType = /text.*/;
    var csvText;

	if (file.type.match(textType)) {
		var reader = new FileReader();

		reader.onload = function(e) {
			csvText = reader.result;
            alert("Got the file " + csvText);
            displayFile(csvText);
		}

		reader.readAsText(file);
	} else {
		alert("File not supported!");
	}
}

// Display the issues so you can select which ones to report
function displayFile(csvText) {
    var shadowBox = document.createElement('div')
    shadowBox.innerHTML = '<div id="create-issue-dialog" class="jira-dialog box-shadow jira-dialog-open popup-width-custom jira-dialog-content-ready" style="width: 810px; margin-left: -406px; margin-top: -207.5px;">'
}

// Report issue

