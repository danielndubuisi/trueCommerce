const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ProductDetails-D1tDIxDW.js","assets/utils-as6mqNxt.js"])))=>i.map(i=>d[i]);
import{P as _}from"./ProductList-DpdOpC2D.js";import{g as h,c as p,r as f,s as y,d as $,l as b}from"./utils-as6mqNxt.js";const S="modulepreload",P=function(n){return"/trueCommerce/"+n},w={},g=function(t,e,s){let a=Promise.resolve();if(e&&e.length>0){let i=function(o){return Promise.all(o.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),m=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));a=i(e.map(o=>{if(o=P(o),o in w)return;w[o]=!0;const d=o.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${u}`))return;const l=document.createElement("link");if(l.rel=d?"stylesheet":S,d||(l.as="script"),l.crossOrigin="",l.href=o,m&&l.setAttribute("nonce",m),document.head.appendChild(l),d)return new Promise((E,L)=>{l.addEventListener("load",E),l.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${o}`)))})}))}function c(i){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=i,window.dispatchEvent(r),!r.defaultPrevented)throw i}return a.then(i=>{for(const r of i||[])r.status==="rejected"&&c(r.reason);return t().catch(c)})};function q(n){if(n.ok)return n.json();throw new Error(`Bad response: ${n.status} ${n.statusText}`)}const C="https://fakestoreapi.com/";class v{constructor(t){this.category=t,this.path=`${C}products`}async getData(){try{const t=await fetch(this.path);return await q(t)}catch(t){return console.error("Error loading data:",t),[]}}async findProductById(t){return(await this.getData()).find(s=>String(s.id)===String(t))}}const k=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));class D{constructor(t,e){this.key=t,this.listElement=e}init(){this.renderCartContents(),this.addEventListeners()}cartItemTemplate(t){return`
      <li class="cart-card divider">
        <a href="/trueCommerce/product_pages/?product=${t.id}" class="cart-card__image">
          <img src="${t.image}" alt="${t.title}" />
        </a>
        <div class="cart-card__info">
          <a href="/trueCommerce/product_pages/?product=${t.id}">
            <h2 class="card__name">${t.title}</h2>
          </a>
        </div>
        <div class="cart-actions">
          <div class="quantity-control">
            <button class="qty-btn add" data-id="${t.id}">+</button>
            <span class="qty-text">${t.quantity}</span>
            <button class="qty-btn subtract" data-id="${t.id}">-</button>
            <button class="qty-btn remove" data-id="${t.id}">🗑</button>
          </div>
          <p class="cart-card__price">$${(t.price*t.quantity).toFixed(2)}</p>
        </div>
      </li>
    `}renderCartContents(){if(!this.listElement)return;const t=h(this.key)||[];this.listElement.innerHTML="",document.querySelector(".summary-items").textContent=t.length,t.length>0?(this.listElement.innerHTML=t.map(e=>this.cartItemTemplate(e)).join(""),this.calculateCartTotal(t)):(this.listElement.innerHTML="<p>Your cart is empty.</p>",this.calculateCartTotal(null))}calculateCartTotal(t){const e=document.querySelector(".cart-footer");if(!e)return;if(!t||t.length===0){e.classList.add("hide");return}let s=0;t.forEach(c=>{const i=parseFloat(c.price||0),r=c.quantity||1;s+=i*r});const a=document.querySelector(".cart-total");a&&(a.textContent=`$${s.toFixed(2)}`,e.classList.remove("hide"))}changeQuantity(t,e){let s=h(this.key)||[],a=p(s,"id",e);if(!(a<0)){switch(t){case"add":s[a].quantity+=1;break;case"subtract":s[a].quantity===1?s.splice(a,1):s[a].quantity-=1;break}s.length===0?f(this.key):y(this.key,s),this.renderCartContents()}}removeItem(t){let e=h(this.key)||[],s=p(e,"id",t);s>-1&&(e.splice(s,1),e.length===0?f(this.key):y(this.key,e)),this.renderCartContents()}addEventListeners(){this.listElement&&this.listElement.addEventListener("click",t=>{if(t.target.classList.contains("qty-btn")){t.preventDefault();const e=t.target.dataset.id;t.target.classList.contains("add")&&this.changeQuantity("add",e),t.target.classList.contains("subtract")&&this.changeQuantity("subtract",e),t.target.classList.contains("remove")&&this.removeItem(e)}})}}class T{constructor(t){this.listElement=t,this.apiKey="86f2d904176a424cb95b59055e628b90",this.apiUrl=`https://newsapi.org/v2/top-headlines?country=us&category=music&apiKey=${this.apiKey}`}async init(){try{const t=await this.fetchNewsData();this.renderNewsList(t.articles)}catch(t){console.error("Error initializing News:",t)}}async fetchNewsData(){const t=await fetch(this.apiUrl);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const e=await t.json();return{...e,articles:e.articles.slice(0,8)}}renderNewsList(t){$(this.newsArticleTemplate,this.listElement,t)}newsArticleTemplate(t){return`<li class="news-item">
                <img src="${t.urlToImage||"https://shorturl.at/GKBnr"}" alt="Image for ${t.title}" />
                <article class="news-article">
                    <h2 class="news-title">${t.title}</h2>
                    <span>By ${t.author||"Unknown"}</span>
                    <p class="news-summary">
                        ${t.description}   
                    </p>
                    <p class="news-date">Published on ${new Date(t.publishedAt).toLocaleDateString()}</p>
                    <a href="${t.url}" class="read-more" target="_blank" rel="noopener">Read More</a>
                </article>
            </li>`}}document.addEventListener("DOMContentLoaded",async()=>{await b();const n=window.location.pathname;if(n.includes("cart")){const t=document.querySelector(".cart-list");t&&new D("so-cart",t).init()}if(n.includes("product_listing")){const e=new URLSearchParams(window.location.search).get("category"),s=new v(e),a=document.querySelector(".product-list");a&&new _(e,s,a).init()}if(n.includes("product_pages")){const{default:t}=await g(async()=>{const{default:i}=await import("./ProductDetails-D1tDIxDW.js");return{default:i}},__vite__mapDeps([0,1])),e=(await g(async()=>{const{default:i}=await Promise.resolve().then(()=>k);return{default:i}},void 0)).default,s=new URLSearchParams(window.location.search),a=s.get("product"),c=s.get("category");if(a){const i=new e(c);new t(a,i).init()}}if(n.includes("news")){const t=document.querySelector(".news-list");t&&new T(t).init()}});
