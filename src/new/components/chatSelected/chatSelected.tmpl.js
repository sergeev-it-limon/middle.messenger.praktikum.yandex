function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;export function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (messagesMeta, style) {
      pug_html = pug_html + "\u003Csection" + (pug_attr("class", pug_classes([style.root], [true]), false, false)) + "\u003E\u003Cheader" + (pug_attr("class", pug_classes([style.header], [true]), false, false)) + "\u003E\u003Cdiv data-parent-for=\"imageAvatar\"\u003E\u003C\u002Fdiv\u003E\u003Ch1" + (pug_attr("class", pug_classes([style.headerText], [true]), false, false)) + "\u003EЧат\u003C\u002Fh1\u003E\u003Cdiv" + (pug_attr("class", pug_classes([style.actions], [true]), false, false)+" data-parent-for=\"popupChatActions\"") + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E\u003Cdiv data-parent-for=\"dividerHeader\"\u003E\u003C\u002Fdiv\u003E\u003Csection" + (pug_attr("class", pug_classes([style.chat], [true]), false, false)) + "\u003E";
// iterate messagesMeta
;(function(){
  var $$obj = messagesMeta;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var meta = $$obj[pug_index0];
switch (meta.type){
case 'message':
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([style.messageWrapper], [true]), false, false)+pug_attr("data-parent-for", 'message_'+meta.id, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
  break;
case 'myMessage':
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([style.myMessageWrapper], [true]), false, false)+pug_attr("data-parent-for", 'message_'+meta.id, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
  break;
case 'date':
pug_html = pug_html + "\u003Ch3" + (pug_attr("class", pug_classes([style.date], [true]), false, false)) + "\u003E" + (pug_escape(null == (pug_interp = meta.dateValue) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
  break;
}
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var meta = $$obj[pug_index0];
switch (meta.type){
case 'message':
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([style.messageWrapper], [true]), false, false)+pug_attr("data-parent-for", 'message_'+meta.id, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
  break;
case 'myMessage':
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([style.myMessageWrapper], [true]), false, false)+pug_attr("data-parent-for", 'message_'+meta.id, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
  break;
case 'date':
pug_html = pug_html + "\u003Ch3" + (pug_attr("class", pug_classes([style.date], [true]), false, false)) + "\u003E" + (pug_escape(null == (pug_interp = meta.dateValue) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
  break;
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fsection\u003E\u003Cdiv data-parent-for=\"dividerFooter\"\u003E\u003C\u002Fdiv\u003E\u003Cfooter" + (pug_attr("class", pug_classes([style.footer], [true]), false, false)+" data-parent-for=\"sendMessageForm\"") + "\u003E\u003C\u002Ffooter\u003E\u003C\u002Fsection\u003E";
    }.call(this, "messagesMeta" in locals_for_with ?
        locals_for_with.messagesMeta :
        typeof messagesMeta !== 'undefined' ? messagesMeta : undefined, "style" in locals_for_with ?
        locals_for_with.style :
        typeof style !== 'undefined' ? style : undefined));
    ;;return pug_html;}