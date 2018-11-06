const COLORS = {
  blue: ["#1E88E5", "#90CAF9"],
  brown: ["#6D4C41", "#D7CCC8"],
  gray: ["#212121", "#BDBDBD"],
  green: ["#388E3C", "#A5D6A7"],
  red: ["#E53935", "#EF9A9A"],
  orange: ["#F4511E", "#FFAB91"],
  purple: ["#8E24AA", "#E1BEE7"],
  yellow: ["#FFD600", "#FFF59D"]
};

export const print = Object.entries(COLORS).reduce(
  (api, [name, colors]) => ({
    [name]: (shortLabel, longerMessage, optionalSuffix = "") =>
      /* eslint-disable */
      console.log(
        /* eslint-enable */

        `%c${shortLabel}%c${longerMessage}%c${optionalSuffix}`,
        `background-color: ${
          colors[0]
        }; color: #fff; padding: 2px 4px; font-weight: bold;`,
        `background-color: ${colors[1]}; color: #000; padding: 2px 4px;`,
        optionalSuffix !== ""
          ? `background-color: ${
              colors[0]
            }; color: #fff; padding: 2px 4px; font-weight: bold;`
          : ""
      ),
    ...api
  }),
  {}
);

export function UpdateQueryString(key, value, url) {
  if (!url) url = window.location.href;
  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
    hash;

  if (re.test(url)) {
    if (typeof value !== "undefined" && value !== null)
      return url.replace(re, "$1" + key + "=" + value + "$2$3");
    else {
      hash = url.split("#");
      url = hash[0].replace(re, "$1$3").replace(/(&|\?)$/, "");
      if (typeof hash[1] !== "undefined" && hash[1] !== null)
        url += "#" + hash[1];
      return url;
    }
  } else {
    if (typeof value !== "undefined" && value !== null) {
      var separator = url.indexOf("?") !== -1 ? "&" : "?";
      hash = url.split("#");
      url = hash[0] + separator + key + "=" + value;
      if (typeof hash[1] !== "undefined" && hash[1] !== null)
        url += "#" + hash[1];
      return url;
    } else return url;
  }
}

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
