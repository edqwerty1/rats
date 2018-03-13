(function (main) {

    main.init = function () {
        var searchBox = document.getElementById("map-search");
        searchBox.onkeyup = main.mapSearch;
        searchBox.change = main.mapSearch;

        // Nav Bar
        var act = "";
        navHtml = "<ul>";
        maps.list.forEach((element) => {
            if (act !== element.act) {
                act = element.act;
                navHtml += `<li class="nav-act"><h3>${element.act}<h3></li>`
            }

            navHtml += `<li>
                            <button class="nav-link" value="${element.name}">
                                ${element.name}
                            </button>
                        </li> `;
        });

        navHtml += "</ul>";
        var nav = document.getElementById("map-navigation");
        nav.innerHTML = navHtml;

        var navlinks = document.getElementsByClassName("nav-link");

        Array.from(navlinks).forEach((navlink) => { navlink.onclick = main.mapSearch; });

        main.renderPageForUrl(true);
    };
    var currentMap = "";

    main.mapSearch = function (event) {
        event.preventDefault();
        console.log("map search");
        var map;
        if (!event.target.value)
            map = null;
        else
            map = maps.list.find((element) => { return element.name.toLowerCase().startsWith(event.target.value.toLowerCase()); });

        var pageTitle = map.name.trim() + " Secrets Tome/Grimoire Locations";
        console.log("push state");
        history.pushState({
            url: map.name.trim().replace(/\s/g, '-'),
            title: pageTitle
        }, pageTitle, map.name.trim().replace(/\s/g, '-'));

        document.title = pageTitle;

        main.renderPage(map);

    };

    main.renderPageForUrl = function (logHistory) {
        var url = window.location.href;
        console.log(url);
        console.log("renderPageForUrl");
        if (url.indexOf('#') > 1)
            var pageName = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('#'));
        else
            var pageName = url.substr(url.lastIndexOf('/') + 1);
        console.log(pageName);
        if (pageName)
            var map = maps.list.find((element) => { return element.name.trim().replace(/\s/g, '-').toLowerCase().startsWith(pageName.toLowerCase()); });
        else {
            var map = null;
        }


        var pageTitle = map.name.trim() + " Secrets Tome/Grimoire Locations";
        if (logHistory === true) {
            console.log("push state");
            history.pushState({
                url: map.name.trim().replace(/\s/g, '-'),
                title: pageTitle
            }, pageTitle, map.name.trim().replace(/\s/g, '-'));
        }
        document.title = pageTitle;

        main.renderPage(map);
    }

    main.renderPage = function (map) {
        console.log("render page");
        var imageHtml = "";
        var secretButtons = "";
        if (!map) {
            main.resetPage();
            return;
        }
        if (map.name === currentMap) {
            return;
        }
        currentMap = map.name;
        document.getElementById("map-name").innerText = map.name;
        document.getElementById("source").innerText = "Source: " + map.source;

        secretButtons = "<div>";
        map.secrets.forEach((secret) => {
            secretButtons += `<button class="secret-button" onclick="main.scrollTo('${secret.title.replace(/\s/g, '')}')">${secret.title}</button>`
        });
        secretButtons += "</div>"
        var secretInsert = document.getElementById("secret-buttons-insert");
        secretInsert.innerHTML = secretButtons;

        map.secrets.forEach((secret) => {

            imageHtml += `
            <div>
                <h3 id="${secret.title.replace(/\s/g, '')}">${secret.title}</h3>`
            secret.images.forEach((image) => {
                imageHtml += `
    
                    <div>${image.description}</div>
                    <image class="map-image" src="${image.url}">`
            });
            imageHtml += `</div>`;
        });

        var insert = document.getElementById("map-insert");
        insert.innerHTML = imageHtml;

        main.scrollTo('map-name');
    }

    main.resetPage = function () {
        currentMap = "";
        var insert = document.getElementById("map-insert");
        insert.innerHTML = "";
        var insert = document.getElementById("secret-buttons-insert");
        insert.innerHTML = "";
        document.getElementById("map-name").innerText = "";
        document.getElementById("source").innerText = "";

    }

    main.scrollTo = function (hash) {
        document.getElementById(hash).scrollIntoView(true);
    
}

    window.onpopstate = function (e) {
        console.log("popstate", e);
        var state = e.state;
        if (state !== null) {
            document.title = state.title;
            main.renderPageForUrl(false);
        } else {
            document.title = 'Vermintide 2 Secrets Tome/Grimoire Locations';
            main.resetPage();
        }
    };

    main.init();
})(window.main = window.main || {});