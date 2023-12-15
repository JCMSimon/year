// Get all elements that need changing
const title = document.getElementsByTagName('title')[0];
const yearText = document.getElementsByClassName('yearText')[0];
const loadingBar = document.getElementsByClassName('loadingBar')[0];
const indexText = document.getElementsByClassName('Index')[0];

function update() {
	// Update vars
	let currentYear = new Date().getFullYear();
	let currentDate = new Date();
	let startDate = new Date(currentDate.getFullYear(), 0, 1);
	let endDate = new Date(currentDate.getFullYear(), 11, 31);
	// Calculate progress
	let progress = (currentDate - startDate) / (endDate - startDate) * 100;
	// Edit elements with new values
	title.innerHTML = "Year " + currentYear + " (" + Math.floor(progress) + "%)";
	yearText.innerHTML = currentYear;
	loadingBar.style.width = progress + "%"
	indexText.innerHTML = Math.floor(progress)
}

// Call the update Function every Second
(function(){
    update();
    setTimeout(arguments.callee, 1000);
})();
