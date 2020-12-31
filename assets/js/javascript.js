// get the time from moment.js
// apply currentDate to the dateSpan in index html

// create variable "time" var time = time js/api
// create static elements for every hour in the work day(html)
// apply (maybe funtion or switch) time zone and time of day options to elements
// create function for color change in those elements based on the past present and future events
// create function to clear planned event (when the user clicks a button)
// create "are you sure you want to delete this event?" confrim
// create ability to write in elements for each hour (form or other)
// save those items to the browser incase of refresh or exit (without a button?)

$(document).ready(function(){

    currentDate = moment().format('dddd MMMM Do YYYY');

    var $date = $("#dateSpan");
    $date.text(currentDate);

});
