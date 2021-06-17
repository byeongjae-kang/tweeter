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
    const $text = $('#tweet-text').val();
    const $tweetValidation = $('.new-tweet');
    const $validation = $(`<div class="validation">
          <i class="fas fa-bomb"></i>
          <p></p>
          <i class="fas fa-bomb"></i>
        </div>`);

    
    if ($text.length < 1 || !$text) {
      const errorMessage = "Please write what you are humming about!!";
      $tweetValidation.prepend($validation);
      $(".validation p").text(errorMessage);
      return 
    }
    if ($text.length > 140) {
      const errorMessage = "maximum number of text is 140!!";
      $tweetValidation.prepend($validation);
      $(".validation p").text(errorMessage);
      return 
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



  // const  = function (str) {
    // let div = document.createElement("div");
    // div.appendChild(document.createTextNode(str));
    // return div.innerHTML;
  // };


  
  const createTweetElement = function(tweet) {
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
    const time = tweet.created_at;
    const newTime = timeago.format(time);
    const $tweet = $(` 
    <article class='tweet'>
      <header class="tweet-content">
        <div>
          <img src=${(avatars)}>
          <p>${(name)}</p>
        </div>
        <div>
          <p class='opacity'>${(handle)}</p>
        </div>
      </header>
      <div class="tweet-message">
        <p name="text-output" class="text-output" for="tweet-text">${(text)}</p>
      </div>
      <footer class="tweet-content">
        <div>
          <time class="timeago">${(newTime)}</time>
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