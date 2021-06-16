$(document).ready(function() {
  console.log('Hello!');
});

$("#tweet-text").keydown(function() {
  const textLength = (140 - $(this).val().length);
  if (textLength < 0) {
    $('.counter').addClass("red").html(textLength);
  } else {
    $('.counter').removeClass("red").html(textLength);
  }
});

