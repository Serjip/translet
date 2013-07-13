$(document).ready(function(){

    getLangs("ru");

    

    $(document).on("click", "ul:first a", function(){
        var lang=$(this).attr("href");
        $(this).parent().parent().parent().find('b').text(lang[1]+lang[2]);

        getLangs(lang[1]+lang[2], null);
    });


    $(document).on("click", "ul:last a", function(){
        var lang=$(this).attr("href");
        $(this).parent().parent().parent().find('b').text(lang[1]+lang[2]);
    });

    //Switch
    $("form #switch").click(function(eO){
        
        $('input:first').focus();

        var first=$("b:first").text();
        var last= $("b:last").text();
        
        $("b:first").text(last);
        
        getLangs( last , first);

    });

    //Translate
    $('input').keydown(function(e){ 
        
        var code = e.which; // recommended to use e.which, it's normalized across browsers
        
        if(code==13)e.preventDefault();
        
        if(code==32||code==13){
        
            translate();
        
        }
    });

});

function getLangs( lang , checkChoise ){

    $.getJSON('https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20130712T190923Z.a2e7430f401fe564.0c45398bb1c49532aee8be7b8bba4043d97410d2&ui='+lang, function(data) {
        
        var languagesFrom='';

        $.each(data.langs, function(key, val) {
            languagesFrom=languagesFrom+'<li><a href="#'+ key +'">' + val + '</a></li>';
        });

        $("ul:first").html(languagesFrom);

        var from = new Array(); 
        var to= new Array();
        
        $.each(data.dirs, function(i,val) {
            
            from[i] = val[0]+val[1];           
            to[i] = val[3]+val[4];
        
        });

        var languagesTo='';
        
        $.each(from, function(i,val) {
            
            if (val == $("b:first").text().toLowerCase() ){
                if (checkChoise==null) {checkChoise=to[i];}
                languagesTo=languagesTo+'<li><a href="#'+ to[i] +'">' + data.langs[to[i]] + '</a></li>';
            } 

        });

        $("ul:last").html(languagesTo);
        $("b:last").text(checkChoise);

    });
}

function translate(){

    var from=$('b:first').text();
    var to=$('b:last').text();

    var text=$('input').first().val();

    $.getJSON('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20130712T190923Z.a2e7430f401fe564.0c45398bb1c49532aee8be7b8bba4043d97410d2&lang='+from+'-'+to+'&text='+text, function(data) {
        
        $('input').last().val(data.text);

    });
}