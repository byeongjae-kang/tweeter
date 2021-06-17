/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {


  $('form').submit(function(event) {
    event.preventDefault();
    const serialized = $(this).serialize();
  });


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1165116237227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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

  renderTweets(data);

});


    
    // const fetchPosts = () => {
      // $.ajax({
        // url: `/tweets`,
        // method: 'GET',
        // dataType: 'json',
        // success: (post) => {
          // console.log(post);
          // renderPosts(post);
        // },
        // error: (error) => {
          // console.error(error);
        // }
      // });
    // }
// 
    // const $postsButton = $('#fetch-posts');
// 
    // $postsButton.click(() => {
      // fetchPosts();
    // });
// 
    // const renderPosts = (posts) => {
      // grab the 'posts' div
      // const $posts = $('#posts');
      // $posts.empty();
      // create 'post' elements for each post
      // for (const id in posts) {
        // const post = posts[id];
        // console.log(post);
        // 
        // const $post = $(`<div>`).addClass('posts');
        // const $user = $('<h1>').text(post.user.name);
        // const $content = $('<h1>').text(post.content.text);
        // 
        // $post.append($user, $content);
// 
        // $posts.append($post);
      // }
      // append to the DOM
    // };






// // Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.