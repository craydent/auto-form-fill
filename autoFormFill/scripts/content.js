function fillElements() {
  var query = window.location.search;
  if (query) {
    query = query.replace(/^\?(.*)/, '$1');
    var keyVal = query.split('&');
    for (var i = 0, len = keyVal.length; i < len; i++) {
      var parts = keyVal[i].split('=');
      let key = decodeURIComponent(parts[0]);
      let value = parts[1];
      debugger;
      if (key.startsWith("affaction.")) {
        key = key.replace("affaction.", "");
        let el = document.getElementById(key) || document.querySelector(key);
        el && el[value]();
      } else {
        try {
          let el = document.getElementById(key) || document.querySelector(key);
          if (el && el.nodeName && el.nodeName.toLowerCase() == "input") {
            el.value = decodeURIComponent(value);
          }
        } catch (e) { }
      }
    }
  }
}

fillElements();

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
