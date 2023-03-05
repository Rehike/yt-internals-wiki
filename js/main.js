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

(async () => {
    let sidebar = await fetch("sidebar.json");
    let response = await sidebar.json();

    if (response)
    {
        document.querySelector("#guide").innerHTML =
        nunjucks.render("sidebar.html", response);
    }
})();

window.addEventListener("hashchange", async (e) => {
    let page = (PAGENAME_REGEX.exec(e.newURL))[1];
    let progress = document.querySelector("#progress");

    progress.style.transitionDuration = ".9s";
    progress.style.width = "75%";
    progress.style.opacity = "1";

    let response = await fetch("pages/" + page + ".html");
    let html = await response.text();

    if (response.status >= 400)
    {
        document.querySelector("#content").innerHTML = GENERIC_NOTFOUND;
    }
    else
    {
        document.querySelector("#content").innerHTML = html;
    }

    progress.style.transitionDuration = ".5s";
    progress.style.width = "100%";
    progress.addEventListener("transitionend", function temp() {
        progress.removeEventListener("transitionend", temp);
        progress.style.opacity = "0";
        progress.style.width = "0%";
    });

    if (document.querySelector(".guide-item.selected") != null)
    {
        document.querySelector(".guide-item.selected").classList.remove("selected");
    }
    
    document.querySelector(`.guide-item-link[href$="${location.hash}"]`).parentElement.classList.add("selected");
});

if (location.hash.length > 2)
(async () => {
    let page = (PAGENAME_REGEX.exec(location.hash))[1];
    let html = await fetch("pages/" + page + ".html");
    html = await html.text();
    document.querySelector("#content").innerHTML = html;

    let item = await waitForElm(`.guide-item-link[href$="${location.hash}"]`);
    item.parentElement.classList.add("selected");
})();