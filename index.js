const currentYear = new Date().getFullYear();
const currentDate = new Date();
const startDate = new Date(currentDate.getFullYear(), 0, 1);
const endDate = new Date(currentDate.getFullYear(), 11, 31);

let progress = (currentDate - startDate) / (endDate - startDate)	;

let title = document.getElementsByTagName('title')[0];
title.innerHTML = "Year " + currentYear + " (" + progress.toFixed(2) + "%)";

let mainText = document.getElementsByClassName('mainText');
mainText[0].innerHTML = currentYear;

let loadinBar = document.getElementsByClassName('loadingBar');
loadinBar[0].style.width = progress + "%"