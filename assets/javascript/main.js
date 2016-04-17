$(document).ready(function() {
  $('.get-started').on('click', function(){
    $(this).hide();
    $('.toggle-hide').slideToggle('fast');
  });
});
