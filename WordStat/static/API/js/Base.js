/*--------------------------------------------------------------------------------------------------
|
| -> Global
|
|-------------------------------------------------------------------------------------------------*/

var gl = {
// GetElementById
    id: function(ID) {
        return document.getElementById(ID);
    },
    
// Remove
    remove: function(elem) {
        if (elem && elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }
        elem = null;
    },
    
// Rand
    rand: function(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
};

/*--------------------------------------------------------------------------------------------------
|
| -> $
|
|-------------------------------------------------------------------------------------------------*/

var $ = {};

/*--------------------------------------------------------------------------------------------------
|
| -> Для создания динамических классов
|
|-------------------------------------------------------------------------------------------------*/

$.CT = function(){var h=function(a,d,b,c){var e=a.__lookupGetter__(b),f=a.__lookupSetter__(b);e||f?(e&&d.__defineGetter__(b,c?c(e):e),f&&d.__defineSetter__(b,c?c(f):f)):d[b]=c?c(a[b]):a[b]},l=function(a){for(var d=[{},{},{},{}],b={"public":0,"protected":1,"private":2},c=0;c<a.length;c++){for(var e in a[c]);if("static"==e){for(var f in a[c][e]);for(var g in a[c][e][f]);d[0][g]=b[f];h(a[c][e][f],d[1],g)}else{for(g in a[c][e]);d[2][g]=b[e];h(a[c][e],d[3],g)}}return d},m=function(a){for(var d=[[{},{},{}],[{},{},{}],[{},{},{}],[{},{},{}]],b=0;2>=b;b+=2)for(var c in a[1+b]){var e=a[1+b],f=c;"function"==typeof e[f]||e.__lookupGetter__(f)||e.__lookupSetter__(f)?h(a[1+b],d[b][a[b][c]],c):h(a[1+b],d[1+b][a[b][c]],c)}return d},n=function(a,d,b){for(var c in a)h(a,d,c,b)},k=function(a,d){for(var b=0;b<a.length;b++)n(a[b],d)},t=function(a,d,b){var c={};Object.defineProperty(c,"self",{value:c});Object.defineProperty(d.prototype,"self",{value:c});k(b[0],d.prototype.self);k(b[1],d.prototype.self);n(b[0][0],a,function(a){return function(){return a.apply(c,arguments)}});for(var e in b[1][0])(function(b){a.__defineGetter__(b,function(){return c[b]});a.__defineSetter__(b,function(a){c[b]=a})})(e)},p=function(a,d,b,c,e){n(b[2][0],a.prototype,function(a){return function(){return a.apply(this[c](e),arguments)}});for(var f in b[3][0])(function(b){a.prototype.__defineGetter__(b,function(){return this[c](e)[b]});a.prototype.__defineSetter__(b,function(a){this[c](e)[b]=a})})(f);k(b[2],d.prototype)},q=function(a,d,b){for(var c=0;2>=c;c+=2)for(var e in a[1+c])a[c][e]==b||e in d[c]||(d[c][e]=a[c][e],h(a[1+c],d[1+c],e))},r=function(a,d){var b=Math.random(),c=Math.random(),e=function(){},f=function(){var d=new e;k(a[3],d);this[b]=function(a){if(a==c)return d};"function"==typeof d.constructor&&d.constructor.apply(d,arguments)};t(f,e,a);p(f,e,a,b,c);f.trait=function(){var g=l(arguments);q(d,g,-1);a=m(g);p(f,e,a,b,c)};f.extend=function(){var a=l(arguments);q(d,a,2);return r(m(a),a)};return f};return{extend:function(){var a=l(arguments);return r(m(a),a)}}}();

/*--------------------------------------------------------------------------------------------------
|
| -> Для создания статических классов
|
|-------------------------------------------------------------------------------------------------*/

$.extend = function() {
    return new ($.CT.extend.apply($.CT, arguments));
};

//--------------------------------------------------------------------------------------------------