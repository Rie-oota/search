// トップ遷移ボタンをクリックするとトップに遷移する
$(function() {
  $(".top-button").click(function(){
    $('html,body').animate({
      scrollTop: 0
    });
  });
});

// speakerセクション以下が表示領域に入ったら
$(function () {
  $('.bottom-area').on("inview", function () {
    // トップ遷移ボタンにshowクラスを追加して表示
    $(".top-button").fadeIn(400).addClass('show');
  });
});

// speakerセクション以上が表示領域に入ったら
$(function () {
  $('.top-area').on("inview", function () {
    // トップ遷移ボタンからshowクラスを削除して非表示
    $(".top-button").fadeOut(400).removeClass('show');
  });
});

// WDCをどちらでお知りになりましたか？の選択項目
function Color(inflow){
  // 選択する前は初期値（グレー）で表示する
  if( inflow.value == 0 ){
    inflow.style.color = '';
  // 選択すると黒字で表示される
  }else{
    inflow.style.color = 'black';
  }
}

$(function () {
  // アカウント作成ボタンがクリックされたときに実行する処理
  $(".btn_submit").on("click", function () {
    // ご職業の項目をコンソールに表示
    console.log("ご職業");
    // ご職業のvalueの値をコンソールに表示
    console.log($('[name="work"]:checked').val());
    // お名前の項目をコンソールに表示
    console.log("お名前");
    // お名前のテキストをコンソールに表示
    console.log($("#name").val());
    // メールアドレスの項目をコンソールに表示
    console.log("メールアドレス");
    // メールアドレスのテキストをコンソールに表示
    console.log($("#email").val());
    // 電話番号の項目をコンソールに表示
    console.log("電話番号");
    // 電話番号のテキストをコンソールに表示
    console.log($("#tel").val());
    // スピーカーに質問したいことの項目をコンソールに表示
    console.log("スピーカーに質問したいこと");
    // スピーカーに質問したいことのテキストをコンソールに表示
    console.log($("#question").val());
    // WDCをどちらでお知りになりましたか？の項目をコンソールに表示
    console.log("WDCをどちらでお知りになりましたか？");
    // WDCをどちらでお知りになりましたか？のvalueの値をコンソールに表示
    console.log($(".inflow").val());
  });
});