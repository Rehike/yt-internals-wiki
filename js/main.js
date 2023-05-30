const PAGENAME_REGEX = /#!\/(.*)/;
const GENERIC_NOTFOUND = `
<h1>Nothing to see here!</h1>
<p>That page doesn't exist! Did you enter the link right?</p>
`;

nunjucks.configure("template", {
    trimBlocks: true,
    autoescape: true
});

async function waitForElm(q)
{
    while (document.querySelector(q) == null)
    {
        await new Promise(r => requestAnimationFrame(r));
    }
    return document.querySelector(q);
}

function renderPageMarkdown(mdDoc)
{
    var markdownit = window.markdownit({
        html: true
    });
    return markdownit.render(mdDoc);
}

async function downloadAndRefreshPage(showProgressBar = false) {
    let page = (PAGENAME_REGEX.exec(e.newURL))[1];
    
    if (showProgressBar)
    {
        let progress = document.querySelector("#progress");

        progress.style.transitionDuration = ".9s";
        progress.style.width = "75%";
        progress.style.opacity = "1";
    }

    let response = await fetch("pages/" + page + ".md");
    let responseText = await response.text();

    if (response.status >= 400)
    {
        document.querySelector("#content").innerHTML = GENERIC_NOTFOUND;
    }
    else
    {
        document.querySelector("#content").innerHTML = renderPageMarkdown(responseText);
    }
    
    if (showProgressBar)
    {
        progress.style.transitionDuration = ".5s";
        progress.style.width = "100%";
        progress.addEventListener("transitionend", function temp() {
            progress.removeEventListener("transitionend", temp);
            progress.style.opacity = "0";
            progress.style.width = "0%";
        });
    }

    if (document.querySelector(".guide-item.selected") != null)
    {
        document.querySelector(".guide-item.selected").classList.remove("selected");
    }
    
    document.querySelector(`.guide-item-link[href$="${location.hash}"]`).parentElement.classList.add("selected");
}

(async () => {
    let sidebar = await fetch("sidebar.json");
    let response = await sidebar.json();

    if (response)
    {
        document.querySelector("#guide").innerHTML =
            nunjucks.render("sidebar.html", response);
    }
})();

window.addEventListener("hashchange", async e => await downloadAndRefreshPage(true));

if (location.hash.length > 2)
(async () => {
    downloadAndRefreshPage();
})();
