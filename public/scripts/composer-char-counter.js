$(document).ready(function() {
  
  console.log("ready");

  $("#tweet-text").on('input', function() {
    const textLength = (140 - $(this).val().length);
    const $counter = $('.counter');
    let isRed = false;
    
    if (textLength < 0 && !isRed) {
      $counter.addClass("red");
      isRed = true;
    } else if (textLength >= 0 && isRed){
      $counter.removeClass("red");
      isRed = false;
    }
    $counter.html(textLength);
  });

});

