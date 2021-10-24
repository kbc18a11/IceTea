
import natural from "natural"
import TinySegmenter from "tiny-segmenter" 
import fs from "fs"

const tinySegmenter = new TinySegmenter();
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

// リンクと数字、絵文字を削除、改行コードを半角スペースに変換
var formatStr = function (str) {
    const regEmoji = new RegExp(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/, 'g');
    return str.replace(/(http|https)([a-zA-Z]|[.-/:-@\[-~]|[0-9])*/g, '').replace(/[0-9]/g, '').replace(regEmoji, '').replace(/\n/g, ' ');
}

// 漢字、ひらがな、カタカナ、英数字のまとまりを単語として切り分ける関数
const wordSplit = function(str){
    //str = "マイクロソフト Bluetoothキーボード Windows/Androidタブレット/iPad, iPhone対応 Universal Mobile Keyboard グレー P2Z-00051 "
    //str = "After Effectsでレイヤーが積みあがっていくの何とかしてほしい。"
    return str.match(/[一-龠]+|[ぁ-ん]+|[ァ-ヴー]+|[a-zA-Z0-9]+|[ａ-ｚＡ-Ｚ０-９]+/g)//returns string array
}

const preprocess = function(Str) {
    let result
    // wordSplitを使うパターン
    // result =  wordSplit(formatStr(Str));
    // TinySegmenterを使うパターン
    result = tinySegmenter.segment(formatStr(Str));

    // 1文字以下の単語を削除
    for(let i=0;i<result.length;i++) {
        if (result[i].length <= 1) {
            result.splice(i, 1);
        }
    }
    return result
}

// 単語集合のリストを受け取り、共通する単語の集合を返す関数
const intersection = (set_list) => {
    if(set_list.length == 0) {
        return null;
    } else if (set_list.length == 1) {
        return set_list[0];
    } else {
        let setA = set_list.pop();
        let setB = intersection(set_list)
        let _intersection = new Set()
        for (let elem of setB) {
            if (setA.has(elem)) {
                _intersection.add(elem)
            }
        }
        return _intersection
    }
    
}

// ユーザのツイートを受け取り、共通する単語を返す関数
const extractCommonTopic = function(tweets_obj) {
    const corpus = fs.readFileSync('corpus.txt', 'utf8').split(/\r\n|\n/);
    let termSetList = [];

    for (let key in tweets_obj){
        termSetList.push(new Set(preprocess(tweets_obj[key].join(''))));
    }
    let commonTopic = Array.from(intersection(termSetList));

    for (let i = 0;i<corpus.length;i++) {
        let corpus_ary = preprocess(corpus[i]);
        tfidf.addDocument(corpus_ary);
    }
    tfidf.addDocument(commonTopic);
    

    let count = 0;
    let item_list = [];
    tfidf.listTerms(0).forEach(function(item) {
        item_list.push(item);
    });

    //オブジェクトの降順ソート
    item_list.sort(function(a,b){
        return (b.idf - a.idf);
    });
    

    let result = {mostWordIndex: 0, words:[]};
    for (let i=0;i<item_list.length&&i<20;i++) {
        result.words.push(item_list[i].term)
    }

    return result
}

// 検証用（本番はコメントアウト）
var dummy1 = fs.readFileSync('dummy1.txt', 'utf8').split(/\r\n|\n/);
var dummy2 = fs.readFileSync('dummy2.txt', 'utf8').split(/\r\n|\n/);
const tweets_obj = {user0: dummy1, user1: dummy2};
console.log(extractCommonTopic(tweets_obj));
