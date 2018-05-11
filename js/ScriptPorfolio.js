$('img').mouseover(function()
{
    $(this).height(this.height+25);
    $(this).width(this.width+25);
});


$('img').mouseleave(function () {
    $(this).height(this.height-25);
    $(this).width(this.width-25);
});
