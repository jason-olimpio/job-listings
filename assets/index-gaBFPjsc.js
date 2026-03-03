(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const g=({activeFilters:s,onRemove:a,onClear:n})=>{const r=document.createElement("div");return r.className="filters-container",r.innerHTML=`
    <div class="filter-tags">
      ${s.map(e=>`
        <div class="filter-pill">
          <span class="tag-name">${e}</span>

          <button class="remove-btn" data-tag="${e}">
            <img src="./images/icon-remove.svg" alt="remove" width="10" height="10">
          </button>
        </div>
      `).join("")}
    </div>

    <button class="clear-btn">Clear</button>
  `,r.querySelector(".clear-btn").onclick=n,r.querySelectorAll(".remove-btn").forEach(e=>{e.onclick=()=>a(e.dataset.tag)}),r},h=({company:s,logo:a,position:n,postedAt:r,contract:e,location:t,keywords:i,featured:m,new:p},f)=>{const c=document.createElement("article");return c.className=`job-card ${p?"new":""}`,c.innerHTML=`
    <div class="job-info">
      <img class="logo" src="${a}" alt="${s}" width="80" height="80"/>

      <div class="details">
        <div class="company-row">
          <span class="company-name">${s}</span>
          ${p?'<span class="badge new">NEW!</span>':""}
          ${m?'<span class="badge featured">FEATURED</span>':""}
        </div>

        <h2 class="position">${n}</h2>
        <p class="meta">${r} • ${e} • ${t}</p>
      </div>
    </div>

    <div class="tags">
      ${i.map(l=>`<button class="tag">${l}</button>`).join("")}
    </div>
  `,c.querySelectorAll(".tag").forEach(l=>l.onclick=()=>f(l.textContent)),c};let u=[],o=[];document.querySelector("#app").innerHTML=`
  <header>
    <picture>
      <source media="(max-width: 500px)" srcset="images/bg-header-mobile.svg">
      <img src="images/bg-header-desktop.svg" alt='Header Background'>
    </picture>
  </header>

  <main>
    <div id='filters-wrapper'></div>
    <div id='jobs-list'></div>
  </main>
`;const v=async()=>{const s=await fetch("/data.json");if(!s.ok)throw new Error("Failed to load data.json");return(await s.json()).map(({role:n,level:r,languages:e=[],tools:t=[],...i})=>({...i,role:n,level:r,languages:e,tools:t,keywords:[n,r,...e,...t]}))},d=()=>{const s=document.getElementById("filters-wrapper"),a=document.getElementById("jobs-list"),n=o.length?u.filter(r=>o.every(e=>r.keywords.includes(e))):u;if(s.innerHTML="",o.length>0){const r=g({activeFilters:o,onRemove:e=>{o=o.filter(t=>t!==e),d()},onClear:()=>{o=[],d()}});s.appendChild(r)}a.innerHTML="",n.forEach(r=>{const e=h(r,t=>{o.includes(t)||(o.push(t),d())});a.appendChild(e)})};u=await v();d();
