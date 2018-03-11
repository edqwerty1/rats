(function (main) {

    main.init = function () {
        var searchBox = document.getElementById("map-search");
        searchBox.onkeyup = main.mapSearch;
        searchBox.change = main.mapSearch;

        var nav = document.getElementById("map-navigation");
        nav.innerHTML = navHtml;

        var navlinks = document.getElementsByClassName("nav-link");

        Array.from(navlinks).forEach((navlink) => { navlink.onclick = main.mapSearch; });
    };

    main.mapSearch = function (event) {
        console.log(event.target);
        var map = maps.list.find((element) => { return element.name.toLowerCase().startsWith(event.target.value.toLowerCase()); });

        var imageHtml = "";
        var secretButtons = "";
        if (!event.target.value || !map) {
            var insert = document.getElementById("map-insert");
            insert.innerHTML = imageHtml;
            var insert = document.getElementById("map-insert");
            insert.innerHTML = imageHtml;
            document.getElementById("map-name").innerText = "";
            return;
        }

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
    };

    // Nav Bar
    var act = "";
    navHtml = "<ul>";
    maps.list.forEach((element) => {
        if (act !== element.act) {
            act = element.act;
            navHtml += `<li>${element.act}</li>`
        }

        navHtml += `<li>
<button class="nav-link" value="${element.name}">
   ${element.name}
</button></li>
`;

    });
    navHtml += "</ul>";


    main.scrollTo = function (hash) {
        console.log(hash);
        location.hash = "#" + hash;
    }

    main.init();
})(window.main = window.main || {});