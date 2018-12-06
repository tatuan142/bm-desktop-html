/*
* TABLE OF CONTENTS
*
* List JS file
* filter-soccer
* datepicker
* soccer-miniTab
*/

/* > List JS file */

// '/vendor/jquery-3.1.1.js',
// '/vendor/jquery.bxslider.js', //  slider 
/* > filter-soccer*/
function soccerFilterBy(buttonActive, zoneActive) {
    var allButton = ".soccer-filter .btn";
    var allContentHidden = ".soccer-filter .hidden-tab";
    $(buttonActive).click(function() {
        if ($(buttonActive).hasClass('is-active')) {
            $(allButton).removeClass('is-active');
            $(allContentHidden).removeClass('is-active');
        } else {
            $(allButton).removeClass('is-active');
            $(allContentHidden).removeClass('is-active');
            $(zoneActive).addClass('is-active');
            $(buttonActive).addClass('is-active');
        }
    });
}
soccerFilterBy(".btn-round", '.round .list');
soccerFilterBy(".btn-date", '.date .calendar');

/* > datepicker*/
var highlight_dates = ['1-5-2018', '7-5-2018', '18-5-2018', '28-5-2018'];
$('#datepicker').datepicker(
{
    minDate: new Date('1-3-2018'),
    maxDate: new Date('8-3-2018'),
    firstDay : 1,
    beforeShowDay: function(date) {
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var day = date.getDate();

        // Change format of date
        var newdate = day + "-" + month + '-' + year;

        // Check date in Array
        if (jQuery.inArray(newdate, highlight_dates) != -1) {
            return [true, "highlight"];
        }
        return [true];
    },
});


/* > soccer-miniTab */
// tab and slider
// location : 11-soccer-mini.html

$('#slider-schedule .wrap').bxSlider({
    pager: false,
    minSlides: 1,
    maxSlides: 5,
    moveSlides: 4,
    slideWidth: 200,
    auto : false,
    hideControlOnEnd : true,
    infiniteLoop : false
});