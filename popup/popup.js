const autologincheckbox = document.getElementById("autologin");
const savepreferences = document.getElementById("savepreferences");

autologincheckbox.addEventListener("input", () => {
    const prefs = {
        autologin: autologincheckbox.checked
    }
    chrome.runtime.sendMessage({ event: "onSave", prefs });
})

savepreferences.onclick = () => {
    const prefs = {
        autologin: autologincheckbox.checked
    }
    chrome.runtime.sendMessage({ event: "onSave", prefs });
}

chrome.storage.local.get(["autologin"], (result) => {
    const { autologin } = result;

    autologincheckbox.checked = autologin;
})

const sobolimg = document.getElementById("sobolimg");
sobolimg.onclick = () => {
    window.open(chrome.runtime.getURL('popup/sobol.png'), '_blank', 'noopener, noreferrer');
    // window.open("https://isobczak.zsl.gda.pl/", '_blank', 'noopener, noreferrer');
};