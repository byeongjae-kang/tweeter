/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//get DOM ready
$(document).ready(() => {

  // handle form submittion, send error message if input requirement not met, otherwise post request(server creates tweet data: name, avartar, handle, and time) and call function to render
  $('form').submit(function(event) {
    event.preventDefault();
    $('.validation').remove();

    const $serialized = $(this).serialize();
    const $text = $('#tweet-text').val().trim().length;
    const $tweetValidation = $('.new-tweet');
    const $validation = $(`<div class="validation">
          <i class="fas fa-bomb"></i>
          <p id="error-text"></p>
          <i class="fas fa-bomb"></i>
        </div>`);

    let errorMessage = '';

    if ($text < 1) {
      errorMessage = "Please write what you are humming about!!";
    } else if ($text > 140) {
      errorMessage = "maximum number of text is 140!!";
    }
    
    if (errorMessage) {
      $tweetValidation.prepend($validation);
      $(".validation p").text(errorMessage);
      return;
    }

    $.post("/tweets", $serialized)
      .then((response) => {
        renderTweets(response);
        $('textarea').val('');
      })
      .catch((error) => {
        console.error(error);
      });
  });

// fetch data from JSON and call function to rendor tweet data
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: 'GET',
      dataType: 'json'
    })
    .then((posts) => {
      renderTweets(posts);
    })
    .catch((error) => {
      console.error(error);
    })
  };
  loadTweets();


// loop through data and render each in HTML format 
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };


// prevent XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


// create HTML elements with data
  const createTweetElement = function(tweet) {
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
    const time = tweet.created_at;
    const newTime = timeago.format(time);
    const $tweet = $(` 
    <article class='tweet'>
      <header class="tweet-content">
        <div>
          <img src=${escape(avatars)}>
          <p>${escape(name)}</p>
        </div>
        <div>
          <p class='opacity'>${escape(handle)}</p>
        </div>
      </header>
      <div class="tweet-message">
        <p name="text-output" class="text-output" for="tweet-text">${escape(text)}</p>
      </div>
      <footer class="tweet-content">
        <div>
          <time class="timeago">${escape(newTime)}</time>
        </div>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `);
    return $tweet;
  };
});