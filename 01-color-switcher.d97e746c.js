let t=null;const e=document.querySelector("[data-start]"),l=document.querySelector("[data-stop]");e.addEventListener("click",(()=>{null===t&&(e.disabled=!0,t=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}),1e3))})),l.addEventListener("click",(()=>{clearInterval(t),t=null,e.disabled=!1}));
//# sourceMappingURL=01-color-switcher.d97e746c.js.map
