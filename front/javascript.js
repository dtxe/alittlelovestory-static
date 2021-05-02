/**
 * Handle single page navigation: load new HTML
 * @param {String} page 
 */
function load_content(page) {
    // nav bar styling
    $('.nav-item').removeClass('active');
    $('.nav-link').removeClass('disabled');

    if (page == 'home' || page == '') {
        // save the date
        $('#maincontent').load('pages/home.html', function() {
            $(`#btnlivestream`).on('click', function (e) {
                e.preventDefault();
                var top = $('#rowstream').offset().top;
                $("html,body").animate({ scrollTop: top }, 300);
            });
        });

        // navbar styling
        $(`.nav-link[href='#home']`).addClass('disabled').closest('.nav-item').addClass('active');


    } else if (page == 'story' || page == 'bridalparty') {
        // love story page
        $('#maincontent').load('pages/story.html', function() {
            // if bridal party was clicked, scroll there
            if (page == 'bridalparty') {
                var top = $('#bridal-party').offset().top;
                $("html,body").animate({ scrollTop: top }, 300);
            }
        });

        // navbar styling
        $(`.nav-link[href='#story']`).addClass('disabled').closest('.nav-item').addClass('active');
    }
}

// Document ready
$(function() {
    // ///// Hash navigation /////
    if (window.location.hash) {
        load_content(window.location.hash.substring(1));
    } else {
        load_content("home");
    }
    $(window).on('hashchange', function(e) {
        e.preventDefault();
        load_content(window.location.hash.substring(1));
    });

    // handle bridal party link edge case
    $('#nav-bridal').on('click', function() {
        if (window.location.hash && window.location.hash.substring(1) == 'bridalparty') {
            var top = $('#bridal-party').offset().top;
            $("html,body").animate({ scrollTop: top }, 300);
        }
    });

    // ///// Back to top /////
    // When the user scrolls down 20px from the top of the document, show the button
    var topbutton = $('#topBtn');
    $(document).on('scroll', function() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            topbutton.css('display', "block");
        } else {
            topbutton.css('display', "none");
        }
    });

    // When the user clicks on the button, scroll to the top of the document
    topbutton.on('click', function() {
        $("html,body").animate({ scrollTop: 0 }, 500);
    });

    // ///// Copy email button /////
    var clipboard = new ClipboardJS('#btnCopyLoveEmail');
    clipboard.on('success', function(e) {
        // show feedback
        $('#love-email-copied').animate({ opacity: 1 }, 100);
        setTimeout(function() {
            $('#love-email-copied').animate({ opacity: 0 }, 250);
        }, 3000);
    });



});