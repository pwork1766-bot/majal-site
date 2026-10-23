/* Loads the encrypted site data (data.enc.js), decrypts it in the browser, then starts the app. */
(function () {
  var K = "wbGX3ntXXskDUd1I98QyhogBQZK5r406";
  var b64 = function (s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); };
  var fail = function (m) { document.getElementById("app").innerHTML = '<p style="padding:60px 20px;text-align:center;font-family:sans-serif">' + m + "</p>"; };
  var E = window.__DATA_ENC; delete window.__DATA_ENC;
  if (!E || !window.crypto || !crypto.subtle) return fail("يرجى فتح الموقع عبر HTTPS (أو localhost). / Please open this site over HTTPS.");
  crypto.subtle.importKey("raw", new TextEncoder().encode(K), "PBKDF2", false, ["deriveKey"]).then(function (base) {
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt: b64(E.s), iterations: 150000, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
  }).then(function (key) {
    return crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(E.i) }, key, b64(E.c));
  }).then(function (buf) {
    window.DATA = JSON.parse(new TextDecoder().decode(buf));
    var s = document.createElement("script"); s.src = "assets/js/app.js"; document.body.appendChild(s);
  }).catch(function () { fail("تعذر تحميل بيانات الموقع. / Could not load site data."); });
})();
