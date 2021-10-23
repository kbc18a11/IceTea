const Twitter = require("twitter");
//import dotenv from 'dotenv'
//dotenv.config();

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

// let user_list = ["matsu_bouzu", "ariyoshihiroiki"];

const getTweets = async (user_name) => {
  let tweets = await client.get("statuses/user_timeline", {
    screen_name: user_name,
  });
  return tweets;
};

const getTweetsObj = async (user_list) => {
  console.log(user_list);
  let tweets_obj = {};
  let user_name;
  let tweets;

  for (let i = 0; i < user_list.length; i++) {
    user_name = user_list[i];
    tweets = await getTweets(user_name);
    tweets_obj[user_name] = [];
    for (let j = 0; j < tweets.length; j++) {
      tweets_obj[user_name].push(tweets[j].text);
    }
    return tweets_obj;
  }
};

module.exports = getTweetsObj;
