function generateURLFromDOMForAutoFormFill() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "generateURLFromDOMForAutoFormFill" },
      function () {
        debugger;
        var el = document.querySelector('.checkmark');
        el.className = "checkmark";
        el.style.opacity = 1;
        setTimeout(fade, 700);
      });
  });
}
function fade() {
  var el = document.querySelector('.checkmark');
  if (el.style.opacity <= 0) { return; }
  el.style.opacity -= 0.1
  setTimeout(fade, 100);
}
document.getElementById("btnGenerate").addEventListener('click', generateURLFromDOMForAutoFormFill);