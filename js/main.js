(function (main) {

    main.init = function () {
        var searchBox = document.getElementById("map-search");
        searchBox.onkeyup = main.mapSearch;
        searchBox.change = main.mapSearch;

        var nav = document.getElementById("map-navigation");
        nav.innerHTML = navHtml;
    };

    main.mapSearch = function (event) {
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
    navHtml = "";
    maps.list.forEach((element) => {

        navHtml += `
<a href="www.google.com">
   ${element.name}
</a>
`;
    });


    main.init();
})(window.main = window.main || {});