var express = require('express');
var router = express.Router();
const url = require('url');

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
router.post('/search', function (req, res, next) {
  res.redirect(url.format({
    pathname: '/',
    query: {
      question: 'この単語をいつ知りましたか？',
      words: [
        'プログラミング',
        '授業',
        'ゲーム',
        '野菜'
      ]
    }
  }));
});

module.exports = router;
