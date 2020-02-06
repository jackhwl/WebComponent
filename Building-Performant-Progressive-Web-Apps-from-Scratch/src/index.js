if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(registration => {
            console.log(registration);
        })
        .catch(error => console.error(error));
}

fetch("https://pluralsight-pwa-scratch.firebaseio.com/flights.json")
  .then(response => response.json())
  .then(data => {
    let html = "";
    data.forEach(flight => {
      html += `<div class="card">${flight.city}</div>`;
    });
    document.querySelector("#screen-flights").innerHTML = html;
  });

let deferredPrompt;
const button = document.querySelector("#a2hs");
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredPrompt = event;
  button.style.display = "block";
});

button.addEventListener("click", () => {
  button.style.display = "none";
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(result => {
    console.log(result.outcome);;
    //TODO: send to analytics
    deferredPrompt = null;
  });
});