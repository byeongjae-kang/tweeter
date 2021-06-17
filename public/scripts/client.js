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
      console.log(posts);
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
    const $textLength = $('#tweet-text').val().length;
    if ($textLength < 1) {
      return alert("Please write what you are humming about!!");
    }
    if ($textLength > 140) {
      return alert("maximum number of text is 140!!");
    }
    
  });

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  }

  const createTweetElement = function(tweet) {
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
    const time = tweet.created_at;
    const newTime = timeago.format(time);

    const $tweet = $(` 
    <article class='tweet'>
      <header class="tweet-content">
        <div>
          <img src=${avatars}>
          <p>${name}</p>
        </div>
        <div>
          <p class='opacity'>${handle}</p>
        </div>
      </header>
      <div class="tweet-message">
        <p name="text-output" class="text-output" for="tweet-text">${text}</p>
      </div>
      <footer class="tweet-content">
        <div>
          <time class="timeago">${newTime}</time>
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