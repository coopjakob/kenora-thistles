var div = document.createElement("div");
div.id = "app";
insertInElement = document.querySelector(".o-start-module.three-cols");
insertInElement.parentNode.insertBefore(div, insertInElement.nextSibling);

var script = document.createElement("script");
script.src = "/js/app.js";
document.querySelector("head").appendChild(script);

var link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/css/app.css";
document.querySelector("head").appendChild(link);
