var angle = 0;
$('img').mouseover(function() {
    angle += 1;
    $(this).css('transform','rotate(' + angle + 'deg)');
});

$('#inputPassword').change(function ()
    {

        if($('#inputPassword').val().length >= 6)
        {
            for (var i = 0; i < $('#inputPassword').val().length; i++)
            {
                if($('#inputPassword').val()[i] ===  $('#inputPassword').val()[i].toUpperCase())
                {
                    if(($('#inputPassword').val()[i]).isNumeric);
                    {
                        $('#inputPassword').attr("class","form-control good");
                    }
                }
            }
        }
        else if($('#inputPassword').val().length >= 6){
            $('#inputPassword').attr("class","form-control moyen");
        }
        else
        {
            $('#inputPassword').attr("class","form-control bad");
        }

    }
);

$('#congirmePassword').change(function (){
    if($('#inputPassword').val() === $('#congirmePassword').val()){
        $('#congirmePassword').attr("class","form-control good");
    }
    else{
        $('#congirmePassword').attr("class","form-control bad");
    }
});

$('#email').change(function (){
    for (var i = 0; i < $('#email').val().length; i++){
        if( $('#email').val()[i] === "@"){
            $('#email').attr("class","form-control");
            i = $('#email').val().length;
        }
        else{
            $('#email').attr("class","form-control error");
        }
    }

});


