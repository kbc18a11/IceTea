var express = require('express');
var router = express.Router();
const url = require('url');
const getTweetsObj = require('../module/twitter-api');
const wordsQuestionsCombine = require('../module/wordsQuestionsCombine');

/**
 * ホーム画面へ遷移
 */
router.get('/', function (req, res, next) {

  // 質問文
  const question = req.query.question ? req.query.question : '';

  // 単語の一覧
  const words = req.query.words ? req.query.words : [];

  res.render('index',
    {
      question: question,
      words: words
    }
  );
});

/**
 * Twitterアカウントから単語を検索し、質問文を作成する
 */
router.post('/search', async (req, res, next) => {
  const accountNames = req.body.accountNames.split(/\r\n|\n/);

  // 質問文
  let question;

  // 共通の単語
  const commonWords = [
    "Swift",
    "ハッカソン",
    "JavaScript",
    "IceTea"
  ];

  try {

    // ツイートを取得
    const tweets = await getTweetsObj(accountNames);

    console.log(tweets);

    question = wordsQuestionsCombine(commonWords);
  } catch (e) {
    console.error(e);
  }

  res.redirect(url.format({
    pathname: '/',
    query: {
      question: question,
      words: commonWords
    }
  }));
});

module.exports = router;
