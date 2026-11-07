// モンスターの画像
const monsterImages = [
  "https://kekeirasuto.com/wp-content/themes/upload/svg/mahoutsukai_tsue_color.svg",   // 杖を持った魔法使い
  "https://kekeirasuto.com/wp-content/themes/upload/svg/christmas_santa_color.svg",   // サンタクロース
  "https://kekeirasuto.com/wp-content/themes/upload/svg/dracula_color.svg",   // ドラキュラ
  "https://kekeirasuto.com/wp-content/themes/upload/svg/clown_color.svg",  //ピエロ
  "https://kekeirasuto.com/wp-content/themes/upload/svg/mahoutsukai_houki_color.svg" ,  // ほうきに乗った魔法使い
];

// 最初にページを開いたとき、ランダムなモンスターをセットする
window.onload = function() {
  changeRandomMonster();
};

// ランダムにモンスターを選ぶ関数
function changeRandomMonster() {
  const randomIndex = Math.floor(Math.random() * monsterImages.length);
  document.getElementById("monster-image").src = monsterImages[randomIndex];
}

// じゃんけんの処理
function playJanken(myHand) {
  const pcHand = Math.floor(Math.random() * 3);

  const handsText = ["グー", "チョキ", "パー"];
  document.getElementById("pc-hand").innerText = "モンスターの手：" + handsText[pcHand];

  // 判定
  let result = "";
  if (myHand === pcHand) {
    result = "あいこ！もう一度！";
  } else if (
    (myHand === 0 && pcHand === 1) ||
    (myHand === 1 && pcHand === 2) ||
    (myHand === 2 && pcHand === 0)
  ) {
    result = "あなたの勝ち！";
  } else {
    result = "あなたの負け…";
  }

  document.getElementById("judgment").innerText = result;

  // ★勝った時だけ「ゲットチャンス」のボタンを画面に出す
  if (result === "あなたの勝ち！") {
    document.getElementById("catch-stage").style.display = "block";
  } else {
    document.getElementById("catch-stage").style.display = "none";
  }
}

// ゲットチャレンジ
function tryCatch() {
  const randomNum = Math.floor(Math.random() * 2); // 50%の確率

  if (randomNum === 0) {
    document.getElementById("catch-msg").innerText = "🎉 やったー！仲間になった！";
    
    // 仲間リストに画像を追加
    const imgUrl = document.getElementById("monster-image").src;
    document.getElementById("party-list").innerHTML += '<img class="party-img" src="' + imgUrl + '">';
  } else {
    // 捕獲失敗の時
    document.getElementById("catch-msg").innerText = "💨 逃げられてしまった…！";
  }

  // 1.5秒後に自動で次のモンスターを呼ぶ
  setTimeout(function() {
    document.getElementById("catch-stage").style.display = "none";
    document.getElementById("judgment").innerText = "手をえらんでね！";
    document.getElementById("pc-hand").innerText = "野生のモンスターがあらわれた！";
    document.getElementById("catch-msg").innerText = "✨ ゲットチャンス！";
    
    // ここで次のモンスターをランダムに変える
    changeRandomMonster();
  }, 1500);
}