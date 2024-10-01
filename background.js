const updatelistener = (tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
        if (tab.url === "https://isobczak.zsl.gda.pl/") {
            chrome.tabs.create({ url: "https://isobczak:glowna@isobczak.zsl.gda.pl/" });
            chrome.tabs.query({ url: "https://isobczak.zsl.gda.pl/" }, (tabs) => {
                if (tabs.length > 0) {
                    let tabId = tabs[0].id;
                // console.log("ID taba:", tabId);
                    chrome.tabs.remove(tabId);
                } else {
                    console.log("Nie znaleziono taba z podanym URL-em.");
                }
            });
        }
    }
}

chrome.runtime.onMessage.addListener(data => {
    const { event, prefs } = data;
    switch(event){
        case "onSave":
            handleSave(prefs);
            break;
        case "onStop":
            // handleStop();
            break;
        default:
            break;
    }
    if (prefs.autologin){
        chrome.tabs.onUpdated.addListener(updatelistener);
    } else {
        chrome.tabs.onUpdated.removeListener(updatelistener);
    }
});

const handleSave = (prefs) => {
    chrome.storage.local.set(prefs);
}
