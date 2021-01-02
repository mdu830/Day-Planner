// get the time from moment.js
// apply currentDateDay to the dateSpan in index html

// create variable "time" var time = time js/api
// create static elements for every hr in the work day(html)
// apply (maybe funtion or switch) time zone and time of day options to elements
// create function for color change in those elements based on the past present and future events
// create function to clear planned event (when the user clicks a button)
// create "are you sure you want to delete this event?" confrim
// create ability to write in elements for each hr (form or other)
// save those items to the browser incase of refresh or exit (without a button?)

$(document).ready(function(){

    var currentDateDay = moment().format('dddd MMMM Do YYYY');

    var now24 = moment().format('H');

    var logger = false;


    // apply the current date and day to #dateSpan
    var $date = $("#dateSpan");
    $date.text(currentDateDay);

    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    // If plans were retrieved from localStorage, update the plan array to it
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      planTextArr = new Array(12);
    }

    var $plannerContainer = $('#plannerContainer');
    $plannerContainer.empty();

    for (var hr = 6; hr <= 17; hr++) {
        // index for array use offset from hr
        index = hr - 6;
        
        // build row components
        var $rowDiv = $('<div>');
        $rowDiv.addClass('row');
        $rowDiv.addClass('plannerRow');
        $rowDiv.attr('hr-index',hr);
      
        // Start building Time box portion of row
        var $col2TimeDiv = $('<div>');
        $col2TimeDiv.addClass('col-2');
      
        // create timeBox element (contains time)
        var $timeBoxSpn = $('<span>');
        // can use this to get value
        $timeBoxSpn.attr('class','timeBox');
        
        // format hours for display
        var displayHour = 0;
        var amPm = "";
        if (hr > 12) { 
          displayHour = hr - 12;
          amPm = "pm";
        } else {
          displayHour = hr;
          amPm = "am";
        }
        
        // populate timeBox with time
        $timeBoxSpn.text(`${displayHour} ${amPm}`);
    
        // insert into col inset into timebox
        $rowDiv.append($col2TimeDiv);
        $col2TimeDiv.append($timeBoxSpn);
        // STOP building Time box portion of row
    
        // START building input portion of row
        // build row components
        var $dailyPlanSpn = $('<input>');
    
        $dailyPlanSpn.attr('id',`input-${index}`);
        $dailyPlanSpn.attr('hr-index',index);
        $dailyPlanSpn.attr('type','text');
        $dailyPlanSpn.attr('class','dailyPlan');
    
        // access index from data array for hr 
        $dailyPlanSpn.val( planTextArr[index] );
        
        // create col to control width
        var $colInputDiv = $('<div>');
        $colInputDiv.addClass('col');
    
        // add col width and row component to row
        $rowDiv.append($colInputDiv);
        $colInputDiv.append($dailyPlanSpn);
    
        // save button/div
        var $saveDiv = $('<i>');
        $saveDiv.addClass('col-1 btn btn-primary btn-block');
        $saveDiv.attr('id',`saveid-${index}`);
        $saveDiv.attr('save-id',index);
        
        var $imgDiv = $('<img>');
        $imgDiv.attr('src', "assets/images/saveicon.png");

        $rowDiv.append($saveDiv);
        $saveDiv.append($imgDiv);
    
        function updateColor ($hourRow,hr) { 
        
            if ( hr < now24) {

              $hourRow.css("background-color","lightgrey");
              $hourRow.css("opacity", "70%");
            } else if ( hr > now24) {
              $hourRow.css("background-color","lightgreen");
              $hourRow.css("opacity", "85%");
            } else {
              $hourRow.css("background-color","tomato");
              $hourRow.css("opacity", "95%");
            }
          };
        // set row color based on time
        updateColor($rowDiv, hr);
        
        // add row to planner container
        $plannerContainer.append($rowDiv);
      };

      $(document).on('click','i', function(event) {
        event.preventDefault();  

        $index = $(this).attr('save-id');
    
        var inputId = '#input-'+ $index;
        var $value = $(inputId).val();
    
        planTextArr[$index] = $value;

        localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
      }); 


});
