(function (main) {

    main.init = function () {
        var searchBox = document.getElementById("map-search");
        searchBox.onkeyup = main.mapSearch;
        searchBox.change = main.mapSearch;

        var nav = document.getElementById("map-navigation");
        nav.innerHTML = navHtml;

        var navlinks = document.getElementsByClassName("nav-link");

        Array.from(navlinks).forEach((navlink) => {navlink.onclick = main.mapSearch;});
    };

    main.mapSearch = function (event) {
        console.log(event.target);
        var map = maps.list.find((element) => { return element.name.toLowerCase().startsWith(event.target.value.toLowerCase()); });

        var imageHtml = "";
        if (!event.target.value || !map) {
            var insert = document.getElementById("map-insert");
            insert.innerHTML = imageHtml;
            return;
        }

        map.secrets.forEach((secret) => {

            imageHtml += `
            <div>
                <h3>${secret.title}</h3>`
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
    navHtml = "<ul>";
    maps.list.forEach((element) => {

        navHtml += `<li>
<button class="nav-link" value="${element.name}">
   ${element.name}
</button></li>
`;

    });
    navHtml += "</ul>";

    main.init();
})(window.main = window.main || {});