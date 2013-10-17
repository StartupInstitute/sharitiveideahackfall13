$(document).ready(function() {
    $(".view_app").click(function(e){
        set_page_based_on_scroll("APP","open app")
        if (!jQuery.browser.mobile) {
            html = '<iframe src="' + $(this).attr("href") + '" height="480" width="320" scrolling="auto" style="border:0;"/>';
            try {
                $.modal(html, {
                    closeHTML:"",
                    containerCss:{
                            backgroundColor:"#ffffff", 
                            borderColor:"#000000", 
                            height:480, 
                            padding:0, 
                            width:320
                    },
                    overlayClose:true,  
                    onClose: function(dialog){
                        $.modal.close();
                        set_page_based_on_scroll("APP","close app");
                    }
                });
            } catch (e) {
            }
            return false;
            e.stopPropagation();
        }
    });
    
    function set_page_based_on_scroll(event,label){
        if ($("#primary_page").hasClass("isvisible") == true) {
            document_offset = $(document).scrollTop();
            document_offset = document_offset + 51;
            if (document_offset > contact_offset) {
                log_event([event,"contact" ,label]);
            } else if (document_offset > blog_offset) {
                log_event([event,"blog" ,label]);
            } else if (document_offset > about_offset) {
                log_event([event,"about" ,label]);
            }else if (document_offset > partners_offset) {
                log_event([event,"partners" ,label]);
            }else if (document_offset > intro_offset) {
                log_event([event,"intro" ,label]);
            }else{
                log_event([event,"primary" ,label]);
            }
        } else {
            log_event([event,"faq" ,label]);
        }        
    }
    
    $("nav#primary a").click(function(){
        set_page_based_on_scroll("CLICK","header: "+$(this).attr("href"));
    });

    $("nav#secondary a").click(function(){
        set_page_based_on_scroll("CLICK","footer: "+$(this).attr("href"));
    });

    var track = true;
    $("nav").localScroll({
        hash : true,
        offset: -49,
        onBefore: function() {
            track = false;
            show_page("primary_page");
        },
        onAfter: function(){
            track = true;
            setNav();
        }
    });

    var intro_offset = $("#intro").offset().top;
    var logo_offset = $("#logo").offset().top;
    var about_offset = $("#about").offset().top;
    var partners_offset = $("#partners").offset().top;
    var contact_offset = $("#contact").offset().top;
    var blog_offset = $("#blog").offset().top;

    $(document).scroll(function() {
        setNav();
    });

    var last_page = "";
    
    function setNav() {
        if ($("#primary_page").hasClass("isvisible") == true) {
            document_offset = $(document).scrollTop();
            document_offset = document_offset + 51;
            $("nav > a").removeClass("active");
            if (document_offset > contact_offset) {
                if(track && last_page != "contact"){
                    last_page = "contact";
                    log_page("contact");
                }
                $("nav > a.contact_nav").addClass("active");
            } else if (document_offset > blog_offset) {
                if(track && last_page != "blog"){
                    last_page = "blog";
                    log_page("blog");
                }
                $("nav > a.blog_nav").addClass("active");    
            } else if (document_offset > about_offset) {
                if(track && last_page != "about"){
                    last_page = "about";
                    log_page("about");
                }
                $("nav > a.about_nav").addClass("active");    
            }else if (document_offset > partners_offset) {
                if(track && last_page != "partners"){
                    last_page = "partners";
                    log_page("partners");
                }
                $("nav > a.partners_nav").addClass("active");
            }else if (document_offset > partners_offset) {
                if(track && last_page != "partners"){
                    last_page = "partners";
                    log_page("partners");
                }
                $("nav > a.partners_nav").addClass("active");
            }else if (document_offset > intro_offset) {
                if(track && last_page != "intro"){
                    last_page = "intro";
                    log_page("intro");
                }
                $("nav > a.intro_nav").addClass("active");
            }else{
                if(track && last_page != "primary"){
                    last_page = "primary";
                    log_page("primary");
                }                
            }
        } else {
            if(track && last_page != "faq"){
                last_page = "faq";
                log_page("faq");
            }
            $("nav > a").removeClass("active");
            $("nav > a.faq_nav").addClass("active");
        }
    }

    $(".faq_nav").click(function() {
        $("html, body").animate({ scrollTop: 0 },"slow");
        show_page("faq_page");
    });

    function show_page(page) {
        if ($("#" +page).hasClass("ishidden") == true) {
            $(".page").addClass("ishidden").removeClass("isvisible").fadeOut();
            $("#" + page).show();
        }
        $("#" + page).addClass("isvisible").removeClass("ishidden");
        setNav();
    }

    $("#faq_page").addClass("ishidden");
    $("#primary_page").addClass("isvisible");
    
    if (document.location.hash == "#faq") {
        show_page("faq_page");
    }else{
        setNav();       
    }
    
    
    var farthest_right = $("#contact .block").offset().left + 790;
    $(".hover_box_trigger").hover(function(e) {
        box = $(this).attr("data-box");
        overlay = $("#" + box + "_overlay");
        overlay.show();
        left = $(this).offset().left;
        if ((left + 450) > farthest_right) {
            left = farthest_right - 450;
        }
        overlay.css({top: $(this).offset().top + 85 + "px"})
        overlay.css({left: left + 85 + "px"});
    }, 
        function(e) {
        box = $(this).attr("data-box");
        overlay = $("#" + box + "_overlay");
        overlay.hide();
    });
    
    $('div#business_partner, div#nonprofit_partner').carousel({
        itemsPerPage: 4, 
        itemsPerTransition: 4,
        noOfRows: 1, 
        nextPrevLinks: true, 
        pagination: false, 
        speed: 'normal'
    });    
    
    $("#read_more_blog_100, #read_more_blog").click(function(){
        if($(this).attr("id")=="read_more_blog"){
            log_event(["CLICK","blog" ,"read all blog"]);
        }else if($(this).attr("id")=="read_more_blog_100"){
            log_event(["CLICK","blog" ,"read more"]);
        }        
    });
    
    $("#contact_content a").click(function(){
        log_event(["CLICK","contact" ,$(this).attr("href")]);
    });
});

function log_event(parameters){
    parameters.unshift('_trackEvent');
    _gas.push(parameters);
}
function log_page(page_url){
    _gas.push(['_trackPageview', page_url]);
}    