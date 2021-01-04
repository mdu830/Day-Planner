//This is the planner javascript for "Dusiness Day Planner"

$(document).ready(function(){

    var currentDateDay = moment().format('dddd MMMM Do YYYY');

    var now24 = moment().format('H');

    //for console logging
    
    //if (logger) { console.log(); }
    //var logger = false;


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

        index = hr - 6;
        
        // rows
        var $rowDiv = $('<div>');
        $rowDiv.addClass('row');
        $rowDiv.addClass('plannerRow');
        $rowDiv.attr('hr-index',hr);
      
        //col and timeDiv
        var $col2TimeDiv = $('<div>');
        $col2TimeDiv.addClass('col-2');
        var $timeSpan = $('<span>');
        $timeSpan.attr('class','timeDiv');
        
        // AM or PM time of day
        var displayHour = 0;
        var amPm = "";
        if (hr > 12) { 
          displayHour = hr - 12;
          amPm = "pm";
        } else {
          displayHour = hr;
          amPm = "am";
        }
        
        // put time in timeDiv
        $timeSpan.text(`${displayHour} ${amPm}`);
    
    
        $rowDiv.append($col2TimeDiv);
        $col2TimeDiv.append($timeSpan);
        
        //input column for event 
        var $dailyPlanSpn = $('<input>');
    
        $dailyPlanSpn.attr('id',`input-${index}`);
        $dailyPlanSpn.attr('hr-index',index);
        $dailyPlanSpn.attr('type','text');
        $dailyPlanSpn.attr('class','dailyPlan');
    
        $dailyPlanSpn.val( planTextArr[index] );
        
        var $colInputDiv = $('<div>');
        $colInputDiv.addClass('col');

        $rowDiv.append($colInputDiv);
        $colInputDiv.append($dailyPlanSpn);
    
        // save button/div
        var $saveDiv = $('<i>');
        $saveDiv.addClass('col-1 btn btn-primary btn-block');
        $saveDiv.attr('id',`saveid-${index}`);
        $saveDiv.attr('save-id',index);
        $saveDiv.attr("alt", "Save Event");
        $saveDiv.attr("title", "Save Event")
        
        var $imgDiv = $('<img>');
        $imgDiv.attr('src', "assets/images/saveicon.png");

        $rowDiv.append($saveDiv);
        $saveDiv.append($imgDiv);
    
        //change row color according to past present or future time
        function updateColor ($hourRow,hr) { 
        
            if ( hr < now24) {

              $hourRow.css("background-color","lightgrey");
              $hourRow.css("opacity", "70%");
              $hourRow.css("-webkit-opacity", "0.7");
            } else if ( hr > now24) {
              $hourRow.css("background-color","lightgreen");
              $hourRow.css("opacity", "100%");
              $hourRow.css("-webkit-opacity", "0.8");
            } else {
              $hourRow.css("background-color","tomato");
              $hourRow.css("opacity", "95%");
              $hourRow.css("-webkit-opacity", "0.9");
            }
          };

        updateColor($rowDiv, hr);
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

      $(window).scroll(function() {
        var scrolledY = $(window).scrollTop();
        $('#container').css('background-position', 'left ' + ((scrolledY)) + 'px');
      });

});
