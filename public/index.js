function f(n){if(!n?.buttons||!Array.isArray(n.buttons))throw"Invalid config type syntax!";return n}var d=document.querySelector("#btnWrapper"),m=document.querySelector("#svgArrow");function p(n){let s=((i)=>{function o(t){if(t=t.replace(/#/g,""),t.length===3)t=t.replace(/(.)/g,"$1$1");return t}i=o(i);let l=parseInt(i.slice(0,2),16),u=parseInt(i.slice(2,4),16),g=parseInt(i.slice(4,6),16),c=(t)=>{return t/=255,t<=0.03928?t/12.92:((t+0.055)/1.055)**2.4};return 0.2126*c(l)+0.7152*c(u)+0.0722*c(g)})(n),e=s/0.05,a=1.05/s;return e>a?"#000":"#fff"}fetch("./config.json").then((n)=>n.json()).then((n)=>{f(n),n.buttons.forEach((r)=>{let s=p(r.color),e=document.createElement("a");e.setAttribute("href",r.href),e.setAttribute("target","_blank"),e.setAttribute("style",`background-color: ${r.color}; color: ${s}; fill: ${s}`),e.innerHTML=`
        <img src="${r.icon}" alt="btn-icon" aria-hidden="true"/>
        <div>${r.name}</div>
        <div>${m.innerHTML}</div>
      `,d.appendChild(e)})});
