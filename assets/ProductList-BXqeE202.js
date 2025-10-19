import{e as s,f as r}from"./utils-NA_0DrL0.js";function c(t){const i=t.price<(t.SuggestedRetailPrice||t.price);return`<li class="product-card">
              <a href="/product_pages/?product=${t.id}" class="card-link">
                <div class="card-media">
                  <img src="${t.image}" alt="Image of ${t.title} class="card-image" />
                </div>
                <div class="card-details">
                  <h3 class="card-name">${t.title}</h3>
                  <p class="card-description">${s(t.description.length>100?t.description.slice(0,100)+"...":t.description)}</p>
                  <p class="card-category">${s(t.category)}</p>
                  <p class="card-price">
                    $${t.price}
                    ${i?'<span class="discount-flag">Discount!</span>':""}
                  </p>
                  <button class='btn btn-primary'>View Item</button>
                </div>
              </>
            </li>`}class n{constructor(i,e,a){this.category=i,this.dataSource=e,this.listElement=a}async init(){try{const i=await this.dataSource.getData(this.category);this.renderList(i);const e=document.querySelector(".title");e&&(e.textContent=s(this.category))}catch(i){console.error("Error initializing ProductList:",i)}}renderList(i){r(c,this.listElement,i)}}export{n as P};
