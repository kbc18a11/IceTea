import Twitter from "twitter";

const client = new Twitter({
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: "",
});

// let user_list = ["matsu_bouzu", "ariyoshihiroiki"];

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

const clickBtn = () => {
  let tweets_obj = {};
  let text = document.getElementById("text").value;
  let user_list = text.split(/\r\n|\n/);

  tweets_obj = getTweetsObj(user_list);
  tweets_obj.then((tweets_obj) => {
    console.log(tweets_obj);
  });
}
