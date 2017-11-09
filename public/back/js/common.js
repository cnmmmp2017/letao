$(document).ajaxStart(function(){

    NProgress.start();
});

$(document).ajaxStart(function(){
    setTimeout(function() {
        NProgress.done();
    }, 1000);        
});