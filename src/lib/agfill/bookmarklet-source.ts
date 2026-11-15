/**
 * The fill-the-AG-form bookmark's exact source, run on the AG complaint page.
 * bookmarklet.ts swaps in the UI messages (M) and the config (C: form id and
 * URL, the handoff page URL, upload field names), then turns it into a
 * javascript: link. Keep it plain ES2017 with no imports, no backticks, no
 * backslashes, no comments inside the code and no personal data.
 *
 * Flow on the AG form: open the site's handoff page in a small popup, wait
 * for its message (answers plus the optional evidence PDF) from exactly the
 * handoff page's origin, fill the fields, attach the PDF. If the popup is
 * blocked or nothing arrives in time, show a paste box for the copied
 * answers instead. It never submits the form and never writes HTML.
 */
export const BOOKMARKLET_SOURCE = String.raw`(function () {
  var M = { __AB578_MESSAGES__: 1 };
  var C = { __AB578_CONFIG__: 1 };
  var PREFIX = "AB578-AGFILL:v1:";
  var BOX_ID = "ab578-agfill";
  var SITE_ORIGIN = new URL(C.handoffUrl).origin;

  var old = document.getElementById(BOX_ID);
  if (old) old.parentNode.removeChild(old);

  var form = document.getElementById(C.formId);
  if (!form) {
    var marker = document.querySelector(
      '[name="submitted[complaint][complaint_description]"]',
    );
    form = marker ? marker.form : null;
  }

  var box = document.createElement("div");
  box.id = BOX_ID;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-live", "polite");
  var s = box.style;
  s.position = "fixed";
  s.zIndex = "2147483647";
  s.top = "16px";
  s.right = "16px";
  s.width = "min(380px, calc(100vw - 32px))";
  s.boxSizing = "border-box";
  s.padding = "18px";
  s.background = "#ffffff";
  s.color = "#15171a";
  s.border = "3px solid #1d4ed8";
  s.borderRadius = "14px";
  s.boxShadow = "0 12px 40px rgba(0,0,0,0.3)";
  s.font = "17px/1.45 system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  s.textAlign = "left";

  var title = document.createElement("p");
  title.textContent = "AB 578";
  title.style.margin = "0 0 6px";
  title.style.font = "700 13px/1.2 system-ui, sans-serif";
  title.style.letterSpacing = "0.06em";
  title.style.color = "#1d4ed8";
  box.appendChild(title);

  var msg = document.createElement("p");
  msg.style.margin = "0 0 12px";
  msg.style.fontWeight = "600";
  box.appendChild(msg);

  var close = document.createElement("button");
  close.type = "button";
  close.textContent = M.close;
  close.style.font = "inherit";
  close.style.fontSize = "15px";
  close.style.padding = "8px 14px";
  close.style.border = "1px solid #c5c9d0";
  close.style.borderRadius = "10px";
  close.style.background = "#ffffff";
  close.style.color = "#15171a";
  close.style.cursor = "pointer";
  close.onclick = function () {
    if (box.parentNode) box.parentNode.removeChild(box);
  };

  function say(text) {
    msg.textContent = text;
  }

  document.body.appendChild(box);

  if (!form) {
    say(M.wrongPage);
    var link = document.createElement("a");
    link.href = C.formUrl;
    link.textContent = M.openForm;
    link.style.display = "inline-block";
    link.style.margin = "0 12px 12px 0";
    link.style.color = "#1d4ed8";
    link.style.fontWeight = "700";
    box.appendChild(link);
    box.appendChild(close);
    return;
  }

  box.appendChild(close);

  function fire(el, type) {
    el.dispatchEvent(new Event(type, { bubbles: true }));
  }

  function find(name) {
    var all = form.elements;
    var out = [];
    for (var i = 0; i < all.length; i++) {
      if (all[i].name === name) out.push(all[i]);
    }
    return out;
  }

  function setOne(name, value) {
    var els = find(name);
    if (!els.length) return false;
    var el = els[0];
    if (el.type === "radio") {
      for (var i = 0; i < els.length; i++) {
        if (els[i].value === value) {
          if (!els[i].checked) els[i].click();
          return true;
        }
      }
      return false;
    }
    if (el.type === "checkbox") {
      if (!el.checked) el.click();
      return true;
    }
    if (el.type === "file") return false;
    if (el.disabled) return false;
    if (el.tagName === "SELECT") {
      el.value = value;
      fire(el, "change");
      return el.value === value;
    }
    el.value = value;
    fire(el, "input");
    fire(el, "change");
    return true;
  }

  function attach(evidence) {
    if (!evidence || !evidence.bytes) return false;
    setOne(C.upload.question, C.upload.questionYes);
    var input = find(C.upload.file)[0];
    if (!input) return false;
    try {
      var transfer = new DataTransfer();
      transfer.items.add(
        new File([evidence.bytes], String(evidence.name || "evidence.pdf"), {
          type: "application/pdf",
        }),
      );
      input.files = transfer.files;
      fire(input, "change");
    } catch (error) {
      return false;
    }
    if (!input.files || !input.files.length) return false;
    setOne(C.upload.description, C.upload.descriptionText);
    setOne(C.upload.secondQuestion, C.upload.secondQuestionNo);
    return true;
  }

  var done = false;
  var area = null;

  function apply(pairs, evidence) {
    if (done) return;
    done = true;
    var count = 0;
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      if (pair && setOne(String(pair[0]), String(pair[1]))) count++;
    }
    var attached = attach(evidence);
    var text = attached ? M.doneFile : M.done;
    say(text.replace("{count}", String(count)));
    if (area && area.parentNode) area.parentNode.removeChild(area);
    if (form.scrollIntoView) form.scrollIntoView({ block: "start" });
  }

  function fromPaste(text) {
    if (done) return;
    text = String(text || "").trim();
    if (!text) return;
    var data = null;
    if (text.indexOf(PREFIX) === 0) {
      try {
        data = JSON.parse(text.slice(PREFIX.length));
      } catch (error) {
        data = null;
      }
    }
    if (!data || !data.f || !data.f.length) {
      say(M.notKit);
      area.value = "";
      return;
    }
    apply(data.f, null);
  }

  function showPaste(text) {
    if (done || area) return;
    say(text || M.prompt);
    area = document.createElement("textarea");
    area.setAttribute("aria-label", M.pasteLabel);
    area.placeholder = M.pasteLabel;
    area.rows = 2;
    var a = area.style;
    a.display = "block";
    a.width = "100%";
    a.boxSizing = "border-box";
    a.margin = "0 0 12px";
    a.padding = "10px";
    a.font = "inherit";
    a.fontSize = "15px";
    a.border = "2px dashed #1d4ed8";
    a.borderRadius = "10px";
    a.background = "#eef2fb";
    a.color = "#15171a";
    box.insertBefore(area, close);
    area.addEventListener("paste", function (event) {
      var clip = event.clipboardData || window.clipboardData;
      if (!clip) return;
      var pasted = clip.getData("text");
      if (pasted) {
        event.preventDefault();
        fromPaste(pasted);
      }
    });
    area.addEventListener("input", function () {
      fromPaste(area.value);
    });
    area.focus();
  }

  var timer = null;
  function onMessage(event) {
    if (event.origin !== SITE_ORIGIN) return;
    var data = event.data;
    if (!data || data.type !== C.messageType) return;
    window.removeEventListener("message", onMessage);
    if (timer) clearTimeout(timer);
    if (data.error || !data.pairs || !data.pairs.length) {
      showPaste(M.noHandoff);
      return;
    }
    apply(data.pairs, data.evidence || null);
  }

  say(M.waiting);
  window.addEventListener("message", onMessage);
  var popup = null;
  try {
    popup = window.open(C.handoffUrl, "ab578agfill", "width=460,height=360");
  } catch (error) {
    popup = null;
  }
  if (!popup) {
    window.removeEventListener("message", onMessage);
    showPaste(M.prompt);
  } else {
    timer = setTimeout(function () {
      window.removeEventListener("message", onMessage);
      showPaste(M.noHandoff);
    }, 8000);
  }
})();
`;
