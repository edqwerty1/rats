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

    };
    var currentMap = "";
    main.mapSearch = function (event) {
        var map = maps.list.find((element) => { return element.name.toLowerCase().startsWith(event.target.value.toLowerCase()); });

        var imageHtml = "";
        var secretButtons = "";
        if (!event.target.value || !map) {
            currentMap = "";
            var insert = document.getElementById("map-insert");
            insert.innerHTML = imageHtml;
            var insert = document.getElementById("secret-buttons-insert");
            insert.innerHTML = imageHtml;
            document.getElementById("map-name").innerText = "";
            document.getElementById("source").innerText = "";
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
    };




    main.scrollTo = function (hash) {
        if (location.hash === '#map-name' && hash === 'map-name' )
            location.hash = "";
        location.hash = "#" + hash;
    }

    main.init();
})(window.main = window.main || {});