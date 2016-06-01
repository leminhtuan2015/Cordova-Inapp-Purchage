var IAP = {
  list: [ "com.hero.audio18" ]
};

IAP.load = function () {
    // Check availability of the storekit plugin
    if (!window.storekit) {
        console.log("In-App Purchases not available hehhhehehe");
        return;
    }
    
    // Initialize
    storekit.init({
                  debug:    true, // Enable IAP messages on the console
                  ready:    IAP.onReady,
                  purchase: IAP.onPurchase,
                  restore:  IAP.onRestore,
                  error:    IAP.onError
                  });
};

IAP.onReady = function () {
    // Once setup is done, load all product data.
    storekit.load(IAP.list, function (products, invalidIds) {
      IAP.products = products;
      IAP.loaded = true;
      console.log("-------------LOADED")
      renderIAPs(document.getElementById('in-app-purchase-list'));
      for (var i = 0; i < invalidIds.length; ++i) {
        console.log("Error: could not load " + invalidIds[i]);
      }
  });
};

IAP.onPurchase = function (transactionId, productId, receipt) {
    if (productId === 'cc.fovea.coins10')
        Coins.add(10);
    if (productId === 'cc.fovea.coins100')
        Coins.add(100);
    alert('Congratulation, you know own ' +
          Coins.get() + ' coins');
};

IAP.onError = function (errorCode, errorMessage) {
    alert('Error: ' + errorMessage);
};

IAP.buy = function (productId) {
    storekit.purchase(productId);
};

IAP.onRestore = function (transactionId, productId, transactionReceipt) {
    // Pseudo code that unlocks the full version.
    if (productId === 'cc.fovea.unlockfullversion') {
        FeatureManager.unlockEverything();
    }
};

IAP.restore = function () {
    storekit.restore();
};

  var renderIAPs = function (el) {

    console.log("begin");
    if (IAP.loaded) {
        var coins10  = IAP.products["cc.fovea.coins10"];
        var coins100 = IAP.products["cc.fovea.coins100"];
        var html = "<ul>";
        for (var id in IAP.products) {
            var prod = IAP.products[id];
            html += "<li>" +
            "<h3>" + prod.title + "</h3>" +
            "<p>" + prod.description + "</p>" +
            "<button type='button' " +
            "onclick='IAP.buy(\"" + prod.id + "\")'>" +
            prod.price + "</button>" +
            "</li>";
        }
        html += "</ul>";
        el.innerHTML = html;
    }
    else {
        el.innerHTML = "In-App Purchases not available. wwth";
    }

    console.log("end");
};







