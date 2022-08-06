window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["shows"], async function (result) {
    inspectText(result["shows"]);
  });
});

window.onscroll = function () {
  chrome.storage.sync.get(["shows"], async function (result) {
    inspectText(result["shows"]);
  });
};

function inspectText(shows) {
  let tags = document.querySelectorAll('[data-testid="tweetText"]');

  for (var i = 0; i < tags.length; i++) {
    var element = tags[i];
    var text = element.innerText;
    if (text === undefined) continue;
    text = text.toString().toLowerCase();

    shows.forEach(function (show) {
      var newText = text.includes(show.toLowerCase());
      if (newText) {
        if (!element.classList.contains("spoiler")) {
          element.classList.add("spoiler");
          let color = window
            .getComputedStyle(document.body, null)
            .getPropertyValue("background-color");

          element.style.color = color;

          (function (the_element) {
            const button = document.createElement("button");
            button.innerHTML = `Show "${show}" spoilers`;
            button.style.backgroundColor = "red";
            button.style.color = "white";
            button.style.fontSize = "20px";
            button.addEventListener("click", () => {
              the_element.style.backgroundColor = "";

              the_element.style.removeProperty("color");

              the_element.removeChild(button);
            });
            the_element.appendChild(button);
          })(element);
        }
      }
    });
  }
}
