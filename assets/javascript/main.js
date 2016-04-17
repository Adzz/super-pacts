$(document).ready(function() {
  $('.get-started').on('click', function(){
    $(this).hide();
    $('.toggle-hide').slideToggle('fast');
  });

  $('.make-pledge').on('click', function(){
    $('#form-submit').click();
  });
});
