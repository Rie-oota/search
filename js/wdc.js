// トップ遷移ボタンをクリックするとトップに遷移する
$(function() {
  $(".top-button").click(function(){
    $('html,body').animate({
      scrollTop: 0
    });
  });
});

// リンク先をclassで設定する
const links = document.querySelectorAll('.my-link');
  links.forEach((link) => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetClass = event.target.getAttribute('data-target');
      const targetSection = document.querySelector(`.${targetClass}`);
      targetSection.scrollIntoView({behavior: 'smooth'});
    });
  });

$(function(){
  $(window).scroll(function (){
    $("#bottom-area").each(function(){
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight + windowHeight/5){
        $(".top-button").fadeIn(400).addClass("show");
      } else {
        $(".top-button").fadeOut(400).removeClass("show");
      }
    });
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
    console.log($(".name").val());
    // メールアドレスの項目をコンソールに表示
    console.log("メールアドレス");
    // メールアドレスのテキストをコンソールに表示
    console.log($(".email").val());
    // 電話番号の項目をコンソールに表示
    console.log("電話番号");
    // 電話番号のテキストをコンソールに表示
    console.log($(".tel").val());
    // スピーカーに質問したいことの項目をコンソールに表示
    console.log("スピーカーに質問したいこと");
    // スピーカーに質問したいことのテキストをコンソールに表示
    console.log($(".question").val());
    // WDCをどちらでお知りになりましたか？の項目をコンソールに表示
    console.log("WDCをどちらでお知りになりましたか？");
    // WDCをどちらでお知りになりましたか？のvalueの値をコンソールに表示
    console.log($(".inflow").val());
  });
});