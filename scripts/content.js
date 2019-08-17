var query = window.location.search;
function fillElements() {
  query = query.replace(/^\?(.*)/, '$1');
  var keyVal = query.split('&');
  var actionCount = 0;
  var delay = 0;
  var delayRegex = /.*?affdelay=(\d*)?.*/;
  if (delayRegex.test(query)) {
    delay = parseInt(query.replace(delayRegex, "$1")) || delay;
  }
  for (let i = 0, len = keyVal.length; i < len; i++) {
    let parts = keyVal[i].split('=');
    setTimeout(function () {
      let key = decodeURIComponent(parts[0]);
      let value = decodeURIComponent(parts[1]);
      if (key.startsWith("affaction.")) {
        key = key.replace("affaction.", "");
        let el = document.getElementById(key) || document.querySelector(key);
        el && el[value]();
      } else {
        try {
          let el = document.getElementById(key) || document.querySelector(key);
          if (el && el.value !== undefined) {
            el.value = value;
            var evt = document.createEvent("Events");
            evt.initEvent("change", true, true);
            el.dispatchEvent(evt);
          }
        } catch (e) { }
      }
    }, delay * actionCount++);
  }
}
function init() {
  var initDelayRegex = /.*?affinitdelay=(\d*)?.*/;

  if (query) {
    var initDelay = 0;
    if (initDelayRegex.test(query)) {
      initDelay = parseInt(query.replace(initDelayRegex, "$1")) || initDelay;
      if (initDelay) {
        return setTimeout(fillElements, initDelay);
      }
    }
    fillElements();
  }
}
init();
function generateURLFromDOMForAutoFormFill() {
  var inputs = document.querySelectorAll("input");
  var values = [];
  for (var i = 0, len = inputs.length; i < len; i++) {
    var input = inputs[i];
    if (!input.value || !input.id || input.type == "hidden") {
      continue;
    }
    values.push(encodeURIComponent(input.id) + "=" + encodeURIComponent(input.value));

  }
  var formquery = values.join('&');

  var query = window.location.query || "";
  if (query && query.length > 1) {
    query += "&" + formquery;
  } else if (!query && formquery) {
    query = "?" + formquery;
  }
  var ta = document.createElement('textarea');
  ta.value = window.location.origin + window.location.pathname + query + window.location.hash;
  ta.id = "copy";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  return ta.value;
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "generateURLFromDOMForAutoFormFill") {
    sendResponse({ url: generateURLFromDOMForAutoFormFill() });
  } else if (request.action == "populateFromURL") {
    fillElements();
    sendResponse({});
  } else {
    sendResponse({});
  }
});