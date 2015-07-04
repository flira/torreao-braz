$('#main-menu-btn').click(function(e) {
  if ($('#main-menu-encap').hasClass('show')) {
    $('#main-menu-encap, .blurheader').addClass('hide');
    $('#main-menu-encap, .blurheader').removeClass('show');
  }
  else {
    $('#main-menu-encap, .blurheader').addClass('show');
    $('#main-menu-encap, .blurheader').removeClass('hide');
  }
});