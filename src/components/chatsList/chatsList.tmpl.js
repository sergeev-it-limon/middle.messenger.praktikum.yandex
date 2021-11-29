function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;export function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (itemIds, style) {
      pug_html = pug_html + "\u003Csection" + (pug_attr("class", pug_classes([style.root], [true]), false, false)) + "\u003E\u003Cul" + (pug_attr("class", pug_classes([style.list], [true]), false, false)) + "\u003E";
// iterate itemIds
;(function(){
  var $$obj = itemIds;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var id = $$obj[pug_index0];
pug_html = pug_html + "\u003Chr" + (pug_attr("class", pug_classes([style.divider], [true]), false, false)) + "\u002F\u003E\u003Cdiv" + (pug_attr("class", pug_classes([style.itemWrapper], [true]), false, false)) + "\u003E\u003Cdiv" + (pug_attr("data-component", 'item_'+id, true, false)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var id = $$obj[pug_index0];
pug_html = pug_html + "\u003Chr" + (pug_attr("class", pug_classes([style.divider], [true]), false, false)) + "\u002F\u003E\u003Cdiv" + (pug_attr("class", pug_classes([style.itemWrapper], [true]), false, false)) + "\u003E\u003Cdiv" + (pug_attr("data-component", 'item_'+id, true, false)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003Chr" + (pug_attr("class", pug_classes([style.divider], [true]), false, false)) + "\u002F\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E";
    }.call(this, "itemIds" in locals_for_with ?
        locals_for_with.itemIds :
        typeof itemIds !== 'undefined' ? itemIds : undefined, "style" in locals_for_with ?
        locals_for_with.style :
        typeof style !== 'undefined' ? style : undefined));
    ;;return pug_html;}