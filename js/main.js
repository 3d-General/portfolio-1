(function($) {

    "use strict";

    /*---------------------------------------------------- */
    /* Preloader
    ------------------------------------------------------ */ 
    $(window).load(function() {
        $("#loader").fadeOut("slow", function() {
            $("#preloader").delay(300).fadeOut("slow");
        });       
    });

    /*---------------------------------------------------- */
    /* FitText Settings
    ------------------------------------------------------ */
    setTimeout(function() {
        $('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });
    }, 100);

    /*---------------------------------------------------- */
    /* FitVids
    ------------------------------------------------------ */ 
    $(".fluid-video-wrapper").fitVids();

    /*---------------------------------------------------- */
    /* Owl Carousel
    ------------------------------------------------------ */ 
    $("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom: [
            [0, 1],
            [700, 2],
            [960, 3]
        ],
        navigationText: false
    });

    /*----------------------------------------------------- */
    /* Alert Boxes
    ------------------------------------------------------- */
    $('.alert-box').on('click', '.close', function() {
        $(this).parent().fadeOut(500);
    });    

    /*---------------------------------------------------- */
    /* Stat Counter
    ------------------------------------------------------- */
    var statSection = $("#stats"),
        stats = $(".stat-count");

    statSection.waypoint({
        handler: function(direction) {
            if (direction === "down") {        
                stats.each(function () {
                    var $this = $(this);
                    $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function (curValue) {
                            $this.text(Math.ceil(curValue));
                        }
                    });
                });
            } 
            // trigger once only
            this.destroy();      
        },
        offset: "90%"
    });

    /*---------------------------------------------------- */
    /* Masonry
    ------------------------------------------------------ */
    var containerProjects = $('#folio-wrapper');
    containerProjects.imagesLoaded( function() {
        containerProjects.masonry({
            itemSelector: '.folio-item',
            resize: true
        });
    });

    /*----------------------------------------------------*/
    /* Modal Popup
    ------------------------------------------------------ */
    $('.item-wrap a').magnificPopup({
        type:'inline',
        fixedContentPos: false,
        removalDelay: 300,
        showCloseBtn: false,
        mainClass: 'mfp-fade'
    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    /*-----------------------------------------------------*/
    /* Navigation Menu
    ------------------------------------------------------ */  
    var toggleButton = $('.menu-toggle'),
        nav = $('.main-navigation');

    toggleButton.on('click', function(e) {
        e.preventDefault();
        toggleButton.toggleClass('is-clicked');
        nav.slideToggle();
    });

    nav.find('li a').on("click", function() {   
        toggleButton.toggleClass('is-clicked'); 
        nav.fadeOut();       
    });

    /*---------------------------------------------------- */
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------ */
    var sections = $("section"),
        navigation_links = $("#main-nav-wrap li a");    

    sections.waypoint( {
        handler: function(direction) {
            var active_section;
            active_section = $('section#' + this.element.id);
            if (direction === "up") active_section = active_section.prev();
            var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');            
            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");
        }, 
        offset: '25%'
    });

    /*---------------------------------------------------- */
    /* Smooth Scrolling
    ------------------------------------------------------ */
    $('.smoothscroll').on('click', function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });
    });  

    /*---------------------------------------------------- */
    /* Placeholder Plugin Settings
    ------------------------------------------------------ */ 
    $('input, textarea, select').placeholder();

    /*---------------------------------------------------- */
    /* Contact Form (with EmailJS)
    ------------------------------------------------------ */
    emailjs.init("IsH-Yi48Xm9gmCDHl"); // Initialize EmailJS with your user ID

    $('#contactForm').on('submit', function(event) {
        event.preventDefault();

        // Show loader while sending email
        const sLoader = $('#submit-loader');
        sLoader.fadeIn();

        // Collect form data
        const formData = {
            name: $('#contactName').val(),
            email: $('#contactEmail').val(),
            subject: $('#contactSubject').val(),
            message: $('#contactMessage').val()
        };
		console.log(formData,'formData')

        // Send email with EmailJS
        emailjs.send("service_wv4jpyr", "template_8s0kpq9", formData)
            .then(function(response) {
				console.log('Success:', response);
                // Hide loader and show success message
                sLoader.fadeOut();
                $('#message-warning').hide();
                $('#contactForm').fadeOut();
                $('#message-success').fadeIn();
            }, function(error) {
                // Hide loader and show error message
				console.error('Failed to send email:', error);
                sLoader.fadeOut();
                $('#message-warning').html("Something went wrong. Please try again.");
                $('#message-warning').fadeIn();
            });
    });

    /*----------------------------------------------------- */
    /* Back to top
    ------------------------------------------------------- */ 
    var pxShow = 300, // height on which the button will show
        fadeInTime = 400, // how slow/fast you want the button to show
        fadeOutTime = 400, // how slow/fast you want the button to hide
        scrollSpeed = 300; // how slow/fast you want the button to scroll to top

    // Show or hide the sticky footer button
    $(window).scroll(function() {
        if (!( $("#header-search").hasClass('is-visible'))) {
            if ($(window).scrollTop() >= pxShow) {
                $("#go-top").fadeIn(fadeInTime);
            } else {
                $("#go-top").fadeOut(fadeOutTime);
            }
        }        
    });

})(jQuery);
