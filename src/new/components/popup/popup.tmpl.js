function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}export function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (isOpen, popupClassName, position, style, width) {
      pug_mixins["popupView"] = pug_interp = function(style, popupClassName, openClassName, styleAtr){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Csection" + (pug_attr("class", pug_classes([style.root+' '+popupClassName], [true]), false, false)+pug_attr("style", pug_style(styleAtr), true, false)) + "\u003E\u003Cdiv" + (pug_attr("class", pug_classes([style.inner+' '+openClassName], [true]), false, false)+pug_attr("sytle", width, true, false)+" data-parent-for=\"content\"") + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
};
pug_mixins["popupOpenable"] = pug_interp = function(style, popupClassName, isOpen, styleAtr){
var block = (this && this.block), attributes = (this && this.attributes) || {};
switch (isOpen){
case true:
pug_mixins["popupView"](style, popupClassName, style.inner_open, styleAtr);
  break;
case false:
pug_mixins["popupView"](style, popupClassName, '', styleAtr);
  break;
}
};
switch (position){
case 'top':
pug_mixins["popupOpenable"](style, popupClassName, isOpen, 'bottom: calc(100% + 22px); width: '+width+';');
  break;
case 'bottom':
pug_mixins["popupOpenable"](style, popupClassName, isOpen, 'top: calc(100% + 22px); right: 0; '+width+';');
  break;
}
    }.call(this, "isOpen" in locals_for_with ?
        locals_for_with.isOpen :
        typeof isOpen !== 'undefined' ? isOpen : undefined, "popupClassName" in locals_for_with ?
        locals_for_with.popupClassName :
        typeof popupClassName !== 'undefined' ? popupClassName : undefined, "position" in locals_for_with ?
        locals_for_with.position :
        typeof position !== 'undefined' ? position : undefined, "style" in locals_for_with ?
        locals_for_with.style :
        typeof style !== 'undefined' ? style : undefined, "width" in locals_for_with ?
        locals_for_with.width :
        typeof width !== 'undefined' ? width : undefined));
    ;;return pug_html;}