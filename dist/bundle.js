!function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=0)}([function(e,n,r){"use strict";var t=void 0,o=void 0,c=window.indexedDB.open("myConverterDB",1);"serviceWorker"in navigator&&navigator.serviceWorker.register("serviceworker.js").then(function(e){console.log("service worker has been registered")}).catch(function(e){console.log("service worker not rtegistered",e)}),document.getElementById("convert").addEventListener("click",function(){u()});var u=function(){var e=window.document.getElementById("fromCurrency").value,n=window.document.getElementById("toCurrency").value,r=window.document.getElementById("amount").value,t=e+"_"+n;fetch("https://free.currencyconverterapi.com/api/v5/convert?q="+e+"_"+n+"&compact=ultra").then(function(c){c.json().then(function(c){var u=c[e+"_"+n],i=r*u;document.getElementById("rate").innerHTML="1 "+e+" = "+u+" "+n,document.getElementById("result").innerHTML=i+" "+n,a(),o.put(u,t)}).catch(function(e){console.log("no data in the response",e)})}).catch(function(c){a();var u=o.get(t);u.onsuccess=function(){var t=u.result,o=r*t;document.getElementById("rate").innerHTML="1 "+e+" = "+t+" "+n,document.getElementById("result").innerHTML=o+" "+n}})};c.addEventListener("error",function(e){alert("could not open DB due to error"+e.target.errorCode)}),c.addEventListener("upgradeneeded",function(e){var n=c.result;n.createObjectStore("currencyStore"),n.createObjectStore("conversionStore")});var i=function(){var e=c.result.transaction("currencyStore","readwrite");t=e.objectStore("currencyStore")},a=function(){var e=c.result.transaction("conversionStore","readwrite");o=e.objectStore("conversionStore")},d=function(e){var n="",r=document.getElementById("fromCurrency"),o=document.getElementById("toCurrency");Object.keys(e).sort().forEach(function(r,o){var c=e[r];t.put(c.currencyName,c.id),n+='<option value="'+c.id+'">'+c.currencyName+"</option>"}),r.innerHTML=n,o.innerHTML=n};window.onload=function(){fetch("https://free.currencyconverterapi.com/api/v5/currencies").then(function(e){e.json().then(function(e){var n=e.results;i(),d(n)})}).catch(function(e){i();var n=t.getAll();console.log("store",n),n.onsuccess=function(){var e=n.result;console.log("results",e),d(e).forEach(function(e){var n=currency[e];t.put({currencyName:n.currencyName,id:n.id}),options+='<option value="'+n.id+'">'+n.currencyName+"</option>"}),currency1.innerHTML=options,currency2.innerHTML=options}})}}]);