/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {


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
  }
  loadTweets();


  $('form').submit(function(event) {
    event.preventDefault();
    const $serialized = $(this).serialize();
    const $text = $('#tweet-text').val().trim();
    const $tweetValidation = $('.new-tweet');
    const $validation = $(`<div class="validation">
          <i class="fas fa-bomb"></i>
          <p id="error-text"></p>
          <i class="fas fa-bomb"></i>
        </div>`);
    let errorMessage = '';

    if ($text.length < 1 ) {
      errorMessage = "Please write what you are humming about!!";
    } else if ($text.length > 140) {
      errorMessage = "maximum number of text is 140!!";
    }
    
    if (errorMessage) {
      $('.validation').remove();
      $tweetValidation.prepend($validation);
      $(".validation p").text(errorMessage);
      return;
    }

    $('.validation').remove();

    $.post("/tweets", $serialized)
      .then(() => {
        loadTweets();
        $('textarea').val('');
      })
      .catch((error) => {
        console.error(error);
      });
  });


  const renderTweets = function(tweets) {
    const $tweets = $('#tweets-container');
    $tweets.empty();
    
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }



  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  
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
  }
});