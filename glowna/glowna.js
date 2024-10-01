if (location.href.includes(".pdf") === false) {
const glownabody = document.querySelector("body");
glownabody.innerHTML += /*html*/`<main></main>`;
const glownahead = document.querySelector("head");
glownahead.innerHTML += /*html*/`<link rel="shortcut icon" href="${chrome.runtime.getURL('popup/sobol.png')}" type="image/x-icon">`;

try {
    const glownatitle = document.querySelector("title");
    const glownah1 = document.querySelector("h1");
    if (glownatitle.innerHTML === "Index of /"){
        glownatitle.innerHTML = "Isobczak: Glowna";
        glownah1.innerHTML = "<a href='https://isobczak.zsl.gda.pl/'>Isobczak: Glowna</a>";
    } else if (glownatitle.innerHTML.startsWith("Index of /")){
        glownah1.innerHTML = glownatitle.innerHTML.replace("Index of /", "<a href='https://isobczak.zsl.gda.pl/'>Isobczak: </a>");
        glownatitle.innerHTML = glownatitle.innerHTML.replace("Index of /", "Isobczak: ");
    }
} catch {
    glownahead.innerHTML += "<title></title>";
    glownahead.innerHTML += "<meta charset='UTF-8'>";
    const glownatitle = document.querySelector("title");
    let glownanewtitle = location.href.split("/").pop();
    glownatitle.innerHTML = "Isobczak: " + glownanewtitle;
}

const glownamain = document.querySelector("main");

const glownath = document.querySelectorAll("th");
glownath.forEach((element) => {
    if (element.innerHTML === /*html*/`<a href="?C=D;O=A">Description</a>` /*|| element.innerHTML === `r<a href="?C=S;O=A">Size</a>`*/){
        element.remove();
    }
});

const glownatd = document.querySelectorAll("td");
glownatd.forEach((element) => {
    if (element.innerHTML === /*html*/`  - ` /*|| element.innerHTML === `&nbsp;`*/){
        element.remove();
    }
});

let glownatrid = 0;
const glownatr = document.querySelectorAll("tr");
glownatr.forEach((elementr) => {
    if (glownatrid != 0 && glownatrid != 1){
        const elemtd = elementr.querySelectorAll("td");
        let elemid = 0;
        let elemicon = "";
        let elemname = "";
        let elemmodified = "";
        let elemsize = "";
        let elemlink = "";
        elemtd.forEach((elementd) => {
            switch (elemid) {
                case 0:
                    elemicon = elementd.innerHTML;
                    break;
                case 1:
                    elemname = elementd.innerHTML;
                    elemlink = elementd.querySelector("a").href;
                    break;
                case 2:
                    elemmodified = elementd.innerHTML;
                    break;
                case 3:
                    elemsize = elementd.innerHTML;
                    break;
                default:
                    break;
            }
            elemid += 1;
        });
        let elemmodifiedcase = false;
        let elemmodifiedtable = elemmodified.trimEnd().split(" ");
        let elemmodifieddate = elemmodifiedtable[0].split("-").reverse().join(".");
        if (elemmodified !== "&nbsp;"){
            elemmodifiedcase = true;
        }
        glownamain.innerHTML += /*html*/`
        <section lp="${glownatrid}" onclick="location.href='${elemlink}'">
            <div class="icon">${elemicon}</div>
            <div class="info">
                <h2>${elemname}</h2>
                <div class="moreinfo">
                    <p>${(elemsize !== "&nbsp;") ? elemsize+="B" : elemsize}</p>
                    <p>${elemmodifiedcase ? elemmodifiedtable[1] + " • " + elemmodifieddate : ""}</p>
                </div>
            </div>
        </section>`;
    }
    glownatrid += 1;
});

const glownatable = document.querySelector("table");
const glownalastsection = document.querySelector(`section[lp="${glownatrid-1}"]`);
try {
    glownatable.remove();
    glownalastsection.remove();
} catch (error) {
    console.log("No table or last section found")
}

// const pdficon = chrome.extension.getURL("/pdf.svg");

const glownasection = document.querySelectorAll("section");
glownasection.forEach((section) => {
    const icon = section.querySelector("img");
    const name = section.querySelector("h2");
    if (name.textContent.includes(".pdf")) {
        icon.src = chrome.runtime.getURL('icons/pdf.svg');
        icon.alt = "PDF Icon";
    }
    else if (name.textContent.includes("/")) {
        name.textContent = name.textContent.replace("/", "");
        section.style.order = "-1";
        icon.src = chrome.runtime.getURL('icons/folder.svg');
        icon.alt = "Folder Icon";
    }
    else if (name.textContent.includes("Parent Directory")) {
        section.style.order = "-1000";
        icon.src = chrome.runtime.getURL('icons/parentdirectory.svg');
        icon.alt = "Parent Directory Icon";
    }
    else if (name.textContent.includes(".txt")) {
        icon.src = chrome.runtime.getURL('icons/txt.svg');
        icon.alt = "Text File Icon";
    }
    else if (name.textContent.includes(".exe")) {
        icon.src = chrome.runtime.getURL('icons/exe.svg');
        icon.alt = "Exe File Icon";
    }
    else if (name.textContent.includes(".iso")) {
        icon.src = chrome.runtime.getURL('icons/iso.svg');
        icon.alt = "Iso File Icon";
    }
    else if (name.textContent.includes(".zip")) {
        icon.src = chrome.runtime.getURL('icons/zip.svg');
        icon.alt = "Zip File Icon";
    }
    else if (name.textContent.includes(".7z")) {
        icon.src = chrome.runtime.getURL('icons/7z.svg');
        icon.alt = "7z File Icon";
    }
    else if (name.textContent.includes(".rar")) {
        icon.src = chrome.runtime.getURL('icons/rar.svg');
        icon.alt = "RAR File Icon";
    }
    else if (name.textContent.includes(".sql")) {
        icon.src = chrome.runtime.getURL('icons/sql.svg');
        icon.alt = "SQL File Icon";
    }
    else if (name.textContent.includes(".png") || name.textContent.includes(".PNG") || name.textContent.includes(".jpg") || name.textContent.includes(".JPG") || name.textContent.includes(".jpeg")) {
        icon.src = window.location.href +"/"+ name.textContent;
        icon.alt = "Image Preview";
    }
    else {
        icon.src = chrome.runtime.getURL('icons/unknown.svg');
        icon.alt = "Unknown File Icon";
    }
});







}