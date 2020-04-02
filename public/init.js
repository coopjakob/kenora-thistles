(function() {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://lucid-ritchie-3f6e74.netlify.com/css/app.css";
  document.querySelector("head").appendChild(link);

  var checkExist = setInterval(function() {
    if (window.ACC) {
      clearInterval(checkExist);
      console.log("found config");

      var replaceElement = document.querySelector(
        "[data-type='MOST_PURCHASED_PRODUCTS']"
      );

      if (replaceElement) {
        replaceElement.id = "app";
        replaceElement.innerHTML = "";
        replaceElement.className = "";

        var script = document.createElement("script");
        script.src = "https://lucid-ritchie-3f6e74.netlify.com/js/app.js";
        document.querySelector("head").appendChild(script);
      }
    } else {
      console.log("no config");
    }
  }, 100);
})();
