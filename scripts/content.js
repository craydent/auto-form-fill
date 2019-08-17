var query = window.location.search;
var $d = document;
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
        let el = $d.getElementById(key) || $d.querySelector(key);
        el && el[value]();
      } else {
        try {
          let el = $d.getElementById(key) || do$$d.querySelector(key);
          if (el && el.value !== undefined) {
            el.value = value;
            var evt = $d.createEvent("Events");
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
function getSelector(el, tail) {
  tail = tail || "";
  if (el.id && !containsUUID(el.id)) {
    return tail ? `#${el.id + tail}` : el.id;
  }
  for (let attr in el) {
    if (attr == "className") { attr = "class"; }

    let value = el.getAttribute(attr);
    if (!value || containsUUID(value) || attr == "value") { continue; }

    let selector = `[${attr}="${value}"] ${tail}`;
    if ($d.querySelectorAll(selector).length === 1) {
      return selector;
    }
  }
  if (!el.parentElement) { return null; }
  return getSelector(el.parentElement, ` ${el.tagName.toLowerCase() + tail}`);
}
function containsUUID(text) {
  return /[a-fA-F0-9]{8,}-[a-fA-F0-9]{4,}-[a-fA-F0-9]{4,}-[a-fA-F0-9]{4,}-[a-fA-F0-9]{12,}/.test(text);
}
function generateURLFromDOMForAutoFormFill() {
  var inputs = $d.querySelectorAll("input");
  var values = [];
  for (var i = 0, len = inputs.length; i < len; i++) {
    var input = inputs[i];
    if (!input.value || input.type == "hidden") {
      continue;
    }
    var selector = getSelector(input);
    if (selector) {
      values.push(`${encodeURIComponent(selector)}=${encodeURIComponent(input.value)}`);
    }

  }
  var formquery = values.join('&');

  var query = window.location.query || "";
  if (query && query.length > 1) {
    query += `&${formquery}`;
  } else if (!query && formquery) {
    query = `?${formquery}`;
  }
  var ta = $d.createElement('textarea');
  ta.value = window.location.origin + window.location.pathname + query + window.location.hash;
  ta.id = "copy";
  $d.body.appendChild(ta);
  ta.select();
  $d.execCommand("copy");
  $d.body.removeChild(ta);
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
init();