

document.getElementById("parse").onclick = function () {
    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent(document.getElementById("url").value) + '&callback=?', function (data) {
        document.getElementById("insert").innerHTML = data.contents;
        var content = document.getElementById("mw-content-text");
        var titles = content.getElementsByClassName("mw-headline");
        console.log(titles);
      


        var titleRaw = document.getElementsByTagName("title")[0].innerText.trim();
        var newMap = {
            name: titleRaw.substr(0, titleRaw.indexOf('/')),
            secrets: []
        }

        titles = Array.from(titles);
        titles.shift();

        descIndex = 0;
        imageIndex = 0;
        for (i = 0; i < titles.length; i++) {
            var title = titles[i];

            var secret = {
                title: title.innerText.trim(),
                images: []
            };

            if (i +1 > titles.length){
                $(title).parent().nextUntil($('.ve-spinner-fade')).addClass( `.secret${i}` );
            }   else {
                var nextTitle = titles[i+1];
                $(title).parent().nextUntil($(nextTitle).parent()).addClass( `secret${i}` );
            }
          
            var descriptions =$(`p.secret${i}`);
            console.log(descriptions);
            var images = content.getElementsByClassName(`show-info-icon secret${i}`);
            console.log(images);

           
            for (descIndex = 0; descIndex < descriptions.length; descIndex++) {
                console.log("a", $(images[descIndex]).find("a"));
                secret.images.push({
                    description: descriptions[descIndex].innerText.trim(),
                    url: $(images[descIndex]).find("a")[0].href
                });
            }




            newMap.secrets.push(secret);
        };

        document.getElementById("insertMap").innerText = JSON.stringify(newMap);
    });



}