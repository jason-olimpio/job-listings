(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const y=({activeFilters:t,onRemove:s,onClear:i})=>{const n=document.createElement("div");return n.className="filters-container",n.innerHTML=`
    <div class="filter-tags">
      ${t.map(e=>`
        <div class="filter-pill">
          <span class="tag-name">${e}</span>

          <button class="remove-btn" data-tag="${e}">
            <img src="./images/icon-remove.svg" alt="remove" width="10" height="10">
          </button>
        </div>
      `).join("")}
    </div>

    <button class="clear-btn">Clear</button>
  `,n.querySelector(".clear-btn").onclick=i,n.querySelectorAll(".remove-btn").forEach(e=>{e.onclick=()=>s(e.dataset.tag)}),n},w=({company:t,logo:s,position:i,postedAt:n,contract:e,location:r,keywords:a,featured:v,new:g},b)=>{const l=document.createElement("article");return l.className=`job-card ${g?"new":""}`,l.innerHTML=`
    <div class="job-info">
      <img class="logo" src="${s}" alt="${t}" width="80" height="80"/>

      <div class="details">
        <div class="company-row">
          <span class="company-name">${t}</span>
          ${g?'<span class="badge new">NEW!</span>':""}
          ${v?'<span class="badge featured">FEATURED</span>':""}
        </div>

        <h2 class="position">${i}</h2>
        <p class="meta">${n} • ${e} • ${r}</p>
      </div>
    </div>

    <div class="tags">
      ${a.map(d=>`<button class="tag">${d}</button>`).join("")}
    </div>
  `,l.querySelectorAll(".tag").forEach(d=>d.onclick=()=>b(d.textContent)),l};let f=[],o=[],c=4;const m=4;let u;document.querySelector("#app").innerHTML=`
  <header>
    <picture>
      <source media="(max-width: 500px)" srcset="images/bg-header-mobile.svg">
      <img src="images/bg-header-desktop.svg" alt="Header Background">
    </picture>
  </header>

  <main>
    <div id="filters-wrapper"></div>
    <div id="jobs-list"></div>
    <div id="jobs-sentinel" aria-hidden="true"></div>
  </main>
`;const E=async()=>{const t=await fetch("./data.json");if(!t.ok)throw new Error("Failed to load data.json");return(await t.json()).map(({role:i,level:n,languages:e=[],tools:r=[],...a})=>({...a,role:i,level:n,languages:e,tools:r,keywords:[i,n,...e,...r]}))},$=()=>o.length?f.filter(t=>o.every(s=>t.keywords.includes(s))):f,j=()=>{const t=document.getElementById("filters-wrapper");if(t.innerHTML="",o.length===0)return;const s=y({activeFilters:o,onRemove:i=>{o=o.filter(n=>n!==i),c=m,p()},onClear:()=>{o=[],c=m,p()}});t.appendChild(s)},h=t=>{const s=document.getElementById("jobs-list");s.innerHTML="",t.slice(0,c).forEach(n=>{const e=w(n,r=>{o.includes(r)||(o.push(r),c=m,p())});s.appendChild(e)})},L=t=>{const s=document.getElementById("jobs-sentinel");u&&u.disconnect(),u=new IntersectionObserver(i=>{i[0].isIntersecting&&c<t.length&&(c=Math.min(c+m,t.length),h(t))},{root:null,rootMargin:"200px",threshold:0}),u.observe(s)},p=()=>{j();const t=$();h(t),L(t)};f=await E();p();
