import Twitter from "twitter";

const client = new Twitter({
  consumer_key: "1r66do2VeoTPoltqO1LG3TtFo",
  consumer_secret: "7NkeMaW1swbAt28tfmwvz4UPCOcbQ5sTyQ7jolinG9bY0SXFaQ",
  access_token_key: "1399630378718023681-IOU8M8ZnI7l0ZztcP9jxxWLSDhJVKV",
  access_token_secret: "T5eqFitmS7Ofjk7hMig5ZfVdupgIsyLnX8n8E8kQFJMHo",
});

let user_list = ["matsu_bouzu", "ariyoshihiroiki"];
let tweets_obj = {};

const getTweets = async (user_name) => {
  let tweets = await client.get("statuses/user_timeline", {
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
    return tweets_obj;
  }
};

tweets_obj = getTweetsObj(user_list);
tweets_obj.then((tweets_obj) => {
  console.log(tweets_obj);
});
