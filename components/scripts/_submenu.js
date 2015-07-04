$('#options-list a').click(function(e) {
  e.preventDefault();
  if (!$(this).hasClass("selected")) {
    var id = $(this).attr('href');
    $('#options-list .selected, .options-content .selected').removeClass('selected');
    $('[href=' + id + '], ' + id).addClass('selected');
  }
});