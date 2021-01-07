//This is the planner javascript for "Dusiness Day Planner"

$(document).ready(function(){

    var currentDateDay = moment().format('dddd MMMM Do YYYY');

    var now = moment().format('H');


    // apply the current date and day to #dateAndDayTitle
    var $date = $("#dateAndDayTitle");
    $date.text(currentDateDay);

    var storedEvents = JSON.parse(localStorage.getItem("storedEvents"));
  
    // If plans were retrieved from localStorage, update the plan array to it
    if (storedEvents !== null) {

      inputArr = storedEvents;
    } else {

      inputArr = new Array(12);
    }

    var $planContainer = $('#planContainer');

    $planContainer.empty();

    for (var hr = 6; hr <= 17; hr++) {

        index = hr - 6;
        
        // rows
        var $row = $('<div>');
        $row.addClass('row');
        $row.addClass('plannerRow');
        $row.attr('hr-index',hr);
      
        //col and time
        var $time = $('<div>');
        $time.addClass('col-2');

        var $timeSpan = $('<span>');
        $timeSpan.attr('class','timeDiv');
        
        // AM or PM time of day
        var displayHour = 0;
        var midDay = "";

        if (hr > 12) { 

          displayHour = hr - 12;
          midDay = "pm";

        } else {

          displayHour = hr;
          midDay = "am";

        }
        
        // put time in time
        $timeSpan.text(`${displayHour} ${midDay}`);
    
        $row.append($time);
        $time.append($timeSpan);
        
        //input column for event 
        var $planSpanner = $('<input>');
    
        $planSpanner.attr('id',`input-${index}`);
        $planSpanner.attr('hr-index',index);
        $planSpanner.attr('type','text');
        $planSpanner.attr('class','dailyPlan');
    
        $planSpanner.val( inputArr[index] );
        
        var $userInputSection = $('<div>');

        $userInputSection.addClass('col');

        $row.append($userInputSection);
        $userInputSection.append($planSpanner);
    
        // save button/div
        var $saveBtn = $('<saveIt>');
        $saveBtn.addClass('col-1 btn btn-primary btn-block');
        $saveBtn.attr('id',`saveid-${index}`);
        $saveBtn.attr('save-id',index);
        $saveBtn.attr("alt", "Save Event");
        $saveBtn.attr("title", "Save Event")
        
        var $imgDiv = $('<img>');
        $imgDiv.attr('src', "assets/images/saveicon.png");

        $row.append($saveBtn);
        $saveBtn.append($imgDiv);
    
        //change row color according to past present or future time
        function updateColor ($hourRow,hr) { 
        
            if ( hr < now) {

              $hourRow.css("background-color","lightgrey");
              $hourRow.css("opacity", "70%");
              $hourRow.css("-webkit-opacity", "0.7");

            } else if ( hr > now) {

              $hourRow.css("background-color","lightgreen");
              $hourRow.css("opacity", "100%");
              $hourRow.css("-webkit-opacity", "0.8");

            } else {
              $hourRow.css("background-color","tomato");
              $hourRow.css("opacity", "95%");
              $hourRow.css("-webkit-opacity", "0.9");
            }
          };

        updateColor($row, hr);
        $planContainer.append($row);
      };

      $(document).on('click','saveIt', function(event) {
        event.preventDefault();  

        $index = $(this).attr('save-id');
    
        var id = '#input-'+ $index;

        var $value = $(id).val();
    
        inputArr[$index] = $value;

        localStorage.setItem("storedEvents", JSON.stringify(inputArr));
      }); 

});
