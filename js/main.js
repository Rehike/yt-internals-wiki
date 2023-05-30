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

function getEditUrl()
{
    return "https://github.com/Rehike/yt-internals-wiki/tree/main/pages/" + location.hash.replace("#!/", "") + ".md";
}

function renderTemplate(name, context = null)
{
    return new Promise((resolve, reject) => {
        function handleResult(err, res)
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve(res);
            }
        }

        if (context != null)
        {
            nunjucks.render(name, context, handleResult);
        }
        else
        {
            nunjucks.render(name, handleResult);
        }
    });
}

function updatePageTitle()
{
    if (document.querySelector(".wiki-page-header .title"))
    {
        var title = document.querySelector(".wiki-page-header .title");
        document.title = title.textContent + " - YouTube Internals Wiki";
    }
    else
    {
        document.title = "YouTube Internals Wiki";
    }
}

async function renderPageMarkdown(mdDoc)
{
    var markdownit = window.markdownit({
        html: true,
        linkify: true
    })
        .use(window.markdownitFootnote);

    markdownit.renderer.rules.footnote_block_open = () => 
        "<section class=\"footnotes\">" +
        "<ol>";

    var mdHtml = markdownit.render(mdDoc);

    var domParser = (new DOMParser()).parseFromString(mdHtml, "text/html").body;

    console.log(domParser);

    if (domParser.children[0].tagName == "H1")
    {
        domParser.children[0].outerHTML = await renderTemplate(
            "wiki_page_header.html", {
                title: domParser.children[0].textContent,
                editUrl: getEditUrl()
            }
        );
    }

    return domParser.outerHTML;
}

async function downloadAndRefreshPage(url, showProgressBar = false) {
    let page = (PAGENAME_REGEX.exec(url))[1];
    
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
        document.querySelector("#content").innerHTML = await renderPageMarkdown(responseText);
    }

    updatePageTitle();
    
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
    
    if (document.querySelector(`.guide-item-link[href$="${location.hash}"]`))
    {
        document.querySelector(`.guide-item-link[href$="${location.hash}"]`).parentElement.classList.add("selected");
    }
}

async function loadSidebar() {
    let sidebar = await fetch("sidebar.json");
    let response = await sidebar.json();

    if (response)
    {
        document.querySelector("#guide").innerHTML =
            await renderTemplate("sidebar.html", response);
    }
}

async function main()
{
    loadSidebar();

    if (location.hash.length > 2)
    {
        downloadAndRefreshPage(location.hash);
    }

    window.addEventListener("hashchange", async e => await downloadAndRefreshPage(e.newURL, true));
}

main();