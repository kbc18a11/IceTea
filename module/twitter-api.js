import Twitter from "twitter";
import dotenv from 'dotenv'
dotenv.config();

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const getTweets = async (user_name) => {
  let tweets = await client.get("statuses/user_timeline", {
    count: 200,
    screen_name: user_name,
  });
  return tweets;
};

const getTweetsObj = async (user_list) => {
  let tweets_obj = {};
  let user_name;
  let tweets;

  for (let i = 0; i < user_list.length; i++) {
    user_name = user_list[i];
    tweets = await getTweets(user_name);
    tweets_obj["user" + i] = [];
    for (let j = 0; j < tweets.length; j++) {
      tweets_obj["user" + i].push(tweets[j].text);
    }
  }
  return tweets_obj;
};

const clickBtn = () => {
  let tweets_obj = {};
  let text = document.getElementById("text").value;
  let user_list = text.split(/\r\n|\n/);

  tweets_obj = getTweetsObj(user_list);
  tweets_obj.then((tweets_obj) => {
    console.log(tweets_obj);
  });
}

// 検証用（本番ではコメントアウト）
// let user_list = ["matsu_bouzu", "ariyoshihiroiki"];
// let tweets_obj = {};

// tweets_obj = getTweetsObj(user_list);
// tweets_obj.then((tweets_obj) => {
// console.log(tweets_obj)
// });
