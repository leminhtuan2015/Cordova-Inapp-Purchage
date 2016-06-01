function onBodyLoad() {
    console.log("onBodyLoad");
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    console.log("Device ready");
    IAP.load();
}

