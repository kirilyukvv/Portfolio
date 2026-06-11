(function () {
  var STORAGE_KEY = "portfolio_auth";
  var LOGIN_FILE = "login.html";

  if (/login\.html$/i.test(window.location.pathname)) {
    return;
  }

  var loginPath = window.location.pathname.indexOf("/projects/") !== -1
    ? "../" + LOGIN_FILE
    : LOGIN_FILE;

  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      return;
    }
  } catch (error) {
    return;
  }

  var next = window.location.pathname + window.location.search + window.location.hash;
  window.location.replace(loginPath + "?next=" + encodeURIComponent(next));
})();
