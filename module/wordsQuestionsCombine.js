const commonWords = [
  "Swift",
  "ハッカソン",
  "JavaScript",
  "IceTea"
];

const questions = [
  "をどこで知りましたか？",
  "をいつ知りましたか？",
  "をなぜ知りましたか？",
  "は人生における優先度はどれぐらいですか？",
  "を人に例えるなら？",
  "の第一印象は？",
  "の良いところはなんですか？",
  "の魅力を語ってください。"
];

function combineWordAndQuestion(word, question) {
  return word + question;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

let word = getRandomElement(commonWords);
let question = getRandomElement(questions);
let combinedText = combineWordAndQuestion(word, question)
console.log(combinedText);