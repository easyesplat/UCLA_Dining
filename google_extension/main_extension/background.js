
chrome.action.onClicked.addListener(tab => {
    let msg = {
        txt: "hello"
    }
    console.log("background script");
    //chrome.tabs.sendMessage(tab.id, "hello");
});
