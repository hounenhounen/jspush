$(
  function() {
  var client_key = window.prompt("クライアントキーを入力してください", "");
  if (client_key == '') {
    alert("クライアントキーが入力されていませんので利用できません");
    return false;
  }
  //ニフティクラウド mobile backendを初期化しています
  var client_key = "client_key";
  NCMB.initialize("App_key","client_key");
  // フォームの送信時のイベントを取得しています
  $("form").on("submit", function(e) {
    var message;
    e.preventDefault();
    message = $("#message").val();

    // ここからがプッシュ作成処理になります
    NCMB.Push.send({
      message: message,
      immediateDeliveryFlag: true,
      target: ['android'], // 今回はiOS限定としています。Androidも追加する場合は 'android'を配列の要素に追加します
      searchCondition: {"deviceToken": "deviceToken"}
    }).then(function(e) {
      // 処理がうまくいった場合はこちら
      $(".message").addClass("alert alert-success").html("作成されました");
      setTimeout(function(e) {
        $(".message").removeClass("alert alert-success").html("");
      }, 3000);
    }, function(e) {
      // エラーだった場合はこちら
      console.error("error", e);
    });
  });
});