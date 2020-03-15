replaceElement = document.querySelector(
  "[data-type='MOST_PURCHASED_PRODUCTS']"
);
replaceElement.id = "app";
replaceElement.innerHTML = "";
replaceElement.className = "";

var script = document.createElement("script");
script.src = "https://coop-memory.netlify.com/js/app.js";
document.querySelector("head").appendChild(script);

var link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://coop-memory.netlify.com/css/app.css";
document.querySelector("head").appendChild(link);
