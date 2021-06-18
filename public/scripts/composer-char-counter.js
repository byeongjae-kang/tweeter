$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    const textLength = (140 - $(this).val().trim().length);
    const $counter = $('.counter');
    
    if (textLength < 0) {
      $counter.addClass("red");
    } else {
      $counter.removeClass("red");
    }
    $counter.html(textLength);
  });

});

