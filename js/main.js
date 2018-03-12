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

        main.renderPageForUrl();
    };
    var currentMap = "";

    main.mapSearch = function (event) {
        var map = maps.list.find((element) => { return element.name.toLowerCase().startsWith(event.target.value.toLowerCase()); });
        main.renderPage(map);

    };

    main.renderPageForUrl = function(){
        var url = window.location.href;
        var pageName = url.substr(url.lastIndexOf('/') + 1);
        var map = maps.list.find((element) => { return element.name.trim().replace(/\s/g, '-').toLowerCase().startsWith(pageName.toLowerCase()); });
        main.renderPage(map);
    }

    main.renderPage = function(map){
        var imageHtml = "";
        var secretButtons = "";
        if (!event.target.value || !map) {
            main.resetPage();
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

        var pageTitle = map.name.trim() + " Secrets Tome/Grimoire Locations";

        history.pushState({
            url: map.name.trim().replace(/\s/g, '-'),
            title: pageTitle
        }, pageTitle, map.name.trim().replace(/\s/g, '-'));

        document.title = pageTitle;

        main.scrollTo('map-name');
    }

    main.resetPage = function(){
        currentMap = "";
        var insert = document.getElementById("map-insert");
        insert.innerHTML = "";
        var insert = document.getElementById("secret-buttons-insert");
        insert.innerHTML = "";
        document.getElementById("map-name").innerText = "";
        document.getElementById("source").innerText = "";
        return;
    }

    main.scrollTo = function (hash) {
        if (location.hash === '#map-name' && hash === 'map-name' )
            location.hash = "";
        location.hash = "#" + hash;
    }

    window.onpopstate = function (e) {
        var state = e.originalEvent.state;
        if (state !== null) {
            document.title = state.title;
            main.renderPageForUrl();
        } else {
            document.title = 'Vermintide 2 Secrets Tome/Grimoire Locations';
            main.resetPage();
        }
    };

    main.init();
})(window.main = window.main || {});