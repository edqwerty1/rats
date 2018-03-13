


document.getElementById("parse").onclick = function () {
    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent(document.getElementById("url").value) + '&callback=?', function (data) {
        document.getElementById("insert").innerHTML = data.contents;
     
        var content = document.getElementsByClassName("post-container")[0];
        var titles = content.getElementsByClassName("post-image-container");
   



        var titleRaw = document.getElementsByClassName("post-title")[0].innerText.trim();
        var newMap = {
            name: titleRaw.replace(/book locations/g, '').replace(/\[Vermintide 2\]/g, ''),
            source: document.getElementById("url").value,
            act: "",
            secrets: []
        }

        titles = Array.from(titles);
        var currentSecret = "";

        var secret = {
            title: "",
            images: []
        };

        for (i = 0; i < titles.length; i++) {
            var title = titles[i];
            console.log($(title).find(".post-image-description")[0]);
            console.log($($(title).find(".post-image-placeholder")[0]));
if ($(title).find(".post-image-description")[0]){
            var description = $(title).find(".post-image-description")[0].innerText.trim();}
            else 
            var description = "";
            var newSecretDescrition = description.substr(0, description.indexOf(':'));
            if (currentSecret !== newSecretDescrition && description.indexOf(':') > 0) {
                currentSecret = newSecretDescrition
                secret = {
                    title: "",
                    images: []
                };

                secret.title  = newSecretDescrition;
                secret.images = []
              
                newMap.secrets.push(secret);
            };

        var imgSrc = "";
                if ($(title).find(".post-image-placeholder")[0])
                imgSrc = $($(title).find(".post-image-placeholder")[0])[0].src;

                secret.images.push({
                    description: description.substr(description.indexOf(':') +1 , description.length),
                    url: imgSrc.replace(/file/g, 'http')
                });
            };
        
        document.getElementById("insertMap").innerText = JSON.stringify(newMap);
    });



}