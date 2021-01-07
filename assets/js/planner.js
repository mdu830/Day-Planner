//This is the planner javascript for "Business Day Planner"

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
        $row.addClass('planRow');
        $row.attr('hr-index',hr);
      
        //col and time
        var $time = $('<div>');
        $time.addClass('col-2');

        var $timeSpan = $('<span>');
        $timeSpan.attr('class','time');
        
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
        $planSpanner.attr('class','dailyEvent');
    
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
        function rowColor ($hrRow,hr) { 
        
            if ( hr < now) {

              $hrRow.css("background-color","lightgrey");
              $hrRow.css("opacity", "70%");
              $hrRow.css("-webkit-opacity", "0.7");

            } else if ( hr > now) {

              $hrRow.css("background-color","lightgreen");
              $hrRow.css("opacity", "100%");
              $hrRow.css("-webkit-opacity", "0.8");

            } else {
              $hrRow.css("background-color","tomato");
              $hrRow.css("opacity", "95%");
              $hrRow.css("-webkit-opacity", "0.9");
            }
          };

        rowColor($row, hr);
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
