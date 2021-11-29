function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;export function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (iconClassName) {
      pug_mixins["buttonAddFileIcon"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Csvg" + (pug_attr("class", pug_classes([iconClassName], [true]), false, false)+" xmlns=\"http:\u002F\u002Fwww.w3.org\u002F2000\u002Fsvg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\"") + "\u003E\u003Cpath fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.18661 13.5L14.7628 5.92389L15.7056 6.8667L8.12942 14.4428L7.18661 13.5Z\" fill=\"#999999\"\u003E\u003C\u002Fpath\u003E\u003Cpath fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.70065 16.014L17.2768 8.43781L18.2196 9.38062L10.6435 16.9568L9.70065 16.014Z\" fill=\"#999999\"\u003E\u003C\u002Fpath\u003E\u003Cpath fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.0433 21.3567L22.6194 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z\" fill=\"#999999\"\u003E\u003C\u002Fpath\u003E\u003Cpath fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.5573 23.8706L25.1335 16.2945L26.0763 17.2373L18.5001 24.8134L17.5573 23.8706Z\" fill=\"#999999\"\u003E\u003C\u002Fpath\u003E\u003Cpath fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10829 23.8919C5.50479 21.2884 5.51421 17.0579 8.12933 14.4428L7.18652 13.5C4.04838 16.6381 4.03708 21.7148 7.16127 24.839C10.2855 27.9632 15.3621 27.9518 18.5002 24.8137L17.5574 23.8709Z\" fill=\"#999999\"\u003E\u003C\u002Fpath\u003E\u003Cpath fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48304 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z\" fill=\"#999999\"\u003E\u003C\u002Fpath\u003E\u003Cpath fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.70093 16.0144C7.95752 17.7578 7.95123 20.5782 9.6869 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41895 20.1518 9.42335 18.1776 10.6437 16.9572L9.70093 16.0144Z\" fill=\"#999999\"\u003E\u003C\u002Fpath\u003E\u003C\u002Fsvg\u003E";
};
pug_html = pug_html + "\u003Cbutton type=\"button\" data-state=\"class:className\" data-actions=\"click:handleClick\"\u003E";
pug_mixins["buttonAddFileIcon"]();
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
    }.call(this, "iconClassName" in locals_for_with ?
        locals_for_with.iconClassName :
        typeof iconClassName !== 'undefined' ? iconClassName : undefined));
    ;;return pug_html;}