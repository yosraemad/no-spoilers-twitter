console.log("Running popup");
const form = document.querySelector("#form");

chrome.storage.sync.get(["shows"], function (result) {
  if (result["shows"]) {
    const body = document.querySelector("body");
    const p = document.createElement("p");
    p.appendChild(document.createTextNode("Current Shows: "));
    body.appendChild(p);
    const ul = document.createElement("ul");
    body.appendChild(ul);
    let i = 0;
    for (show of result["shows"]) {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.appendChild(document.createTextNode(show));
      li.appendChild(p);
      const button = document.createElement("button");
      button.innerHTML = "Remove";
      (function (index) {
        button.addEventListener("click", function () {
          result["shows"].splice(index, 1);
          console.log(result["shows"]);
          chrome.storage.sync.set({ shows: result["shows"] }, function () {
            console.log("Success!");
          });
          window.location.reload();
        });
      })(i);
      li.appendChild(button);
      ul.appendChild(li);
      i++;
    }
  }
});

form.addEventListener("submit", function (event) {
  let show = document.querySelector("#show").value;
  chrome.storage.sync.get(["shows"], function (result) {
    if (Object.keys(result).length === 0) {
      chrome.storage.sync.set({ shows: [show] }, function () {
        console.log("Success!");
      });
    } else {
      console.log(result);
      result["shows"].push(show);
      chrome.storage.sync.set({ shows: result["shows"] }, function () {
        console.log("Success!");
      });
    }
  });
});
