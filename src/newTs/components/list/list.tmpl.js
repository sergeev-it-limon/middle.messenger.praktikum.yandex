function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;export function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (childrenKeys) {
      pug_html = pug_html + "\u003Cul data-state=\"class:ulClassName\"\u003E";
// iterate childrenKeys
;(function(){
  var $$obj = childrenKeys;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var key = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli data-state=\"class:liClassName\"\u003E\u003Cdiv" + (pug_attr("data-component", key, true, false)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var key = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli data-state=\"class:liClassName\"\u003E\u003Cdiv" + (pug_attr("data-component", key, true, false)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
    }.call(this, "childrenKeys" in locals_for_with ?
        locals_for_with.childrenKeys :
        typeof childrenKeys !== 'undefined' ? childrenKeys : undefined));
    ;;return pug_html;}