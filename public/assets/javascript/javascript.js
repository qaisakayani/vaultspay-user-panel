$(document).ready(function()
{
    function tab_btn(evt, order) 
    {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(order).style.display = "block";
        evt.currentTarget.className += " active";
    }
    

	// Currency change button
//    $('body').on('click', '#currency_changer', function(event)
//    {
//        $(this).toggleClass("active");
//        $(this).find("#currency_dropdown").toggle();
//        event.stopPropagation();
//    });
//    function deactivateCurrencyChanger()
//    {
//        if ($("#currency_changer").hasClass("active")) 
//        {
//            $("#currency_changer").toggleClass("active");
//            $("#currency_dropdown").toggle();
//        }
//    }
//	
//	$(document).click(function(event)
//    {
//        deactivateCurrencyChanger();
//        deActivateToggleDots();
//    });
//	
	
    
// Notification Icon dropdown
  
 $('body').on('click', '#notification-icon', function(event)
    {
		event.preventDefault();
        $("#notification-icon").toggleClass("active");
        $(".custom_drop_down").slideToggle();
        event.stopPropagation();
    });
    function deactivateNotificationIcon()
    {
        if ($("#notification-icon").hasClass("active")) 
        {
            $("#notification-icon").find(".custom_drop_down").toggle();
            $("#notification-icon").toggleClass("active");
        }
    }
	
	    $(document).click(function(event)
    {
        deactivateNotificationIcon();
//        deactivateCurrencyChanger();
        deActivateToggleDots();
    });
	
	
	// For profile drop down
  
	     $('body').on('click', '#drop-down', function(event)
    {
		event.preventDefault();
        $(this).toggleClass("active");
        $(".hide").slideToggle();
        event.stopPropagation();
    });
	
    function deactivateDropDown()
    {
        if ($("#drop-down").hasClass("active")) 
        {
            $("#drop-down").toggleClass("active");
            $("#drop-down").find(".hide").toggle();
        }
    }
	
	$(document).click(function(event)
    {
        deactivateNotificationIcon();
//        deactivateCurrencyChanger();
        deActivateToggleDots();
        deactivateDropDown();
    });

	
	
    // Universal Toggler
    $('body').on('click', '.more-action', function(event){
		event.preventDefault();
//        deActivateToggleDots();
        $(this).toggleClass("active");
        $(this).find('.action_details').slideToggle();
        event.stopPropagation();
    });
	
    $(document).click(function(event)
    {
        deActivateToggleDots();
    });
    function deActivateToggleDots()
    {
        $(document).find(".more-action.active").find(".action_details").slideToggle();
        $(document).find(".more-action.active").toggleClass("active");
		
    }
    // End universal toggler
    
//	export btn drop down
	
	$('body').on('click', '.export', function(){
        event.preventDefault();
        $(this).toggleClass("active");
        $(".expor-detail").slideToggle();
    });
	
//	show_entries dropdown
//    
//   
//		$('body').on('click', '.show_entries', function(){
//		event.preventDefault();
//        $(this).toggleClass("active");
//        $(".all-entries").slideToggle(event);
//    });
//	
//  filter dropdown //
	
	$('body').on('click', '.filters', function(){
		event.preventDefault();
        $(this).toggleClass("active");
        $("#all_show_filter").slideToggle();
    });
});


//modal popup

$('body').on('click', '.canopen.my_btn', function() {
    event.preventDefault();
    $(this).parent().find('.modal').show();
});

$('body').on('click', '.close', function() {
	event.preventDefault();
    $('.modal').hide();
	});

window.onclick = function(event) {
    var target = $(event.target);
    if (target.is("div.modal")) {
        $('.modal').hide();
       
    }};

//payment links fields

	   $('body').on('click', '#advance', function(){
		event.preventDefault();
        $(this).toggleClass("active");
        $("#hide-content").slideToggle();
    });

//
//checkbox click change border color
	$('input:checkbox').change(function(event){
		
	let btn =document.getElementById('agreement-2')
    if($(this).is(":checked")) {
		this.parentElement.classList.add("active");

		
    } else {
//     
		this.parentElement.classList.remove("active");
		
    }
});


//	tab


function tab_btn(evt, order) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(order).style.display = "block";
  evt.currentTarget.className += " active";
}
