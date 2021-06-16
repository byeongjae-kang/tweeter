$(document).ready(function() {
  console.log('Hello!');
});

$("#tweet-text").keydown(function() {
  const textLength = (140 - $(this).val().length);
  if (textLength < 0) {
    $('output').removeClass("counter").html(textLength);
  } else {
    $('output').addClass("counter").html(textLength);
  }
});

