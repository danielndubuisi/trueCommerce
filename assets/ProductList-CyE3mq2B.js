import{d as s,e as r}from"./utils-BZZFremJ.js";function c(t){const e=t.price<(t.SuggestedRetailPrice||t.price);return`<li class="product-card">
              <a href="/trueCommerce/product_pages/?product=${t.id}" class="card-link">
                <div class="card-media">
                  <img src="${t.image}" alt="Image of ${t.title} class="card-image" />
                </div>
                <div class="card-details">
                  <h3 class="card-name">${t.title}</h3>
                  <p class="card-description">${s(t.description.length>100?t.description.slice(0,100)+"...":t.description)}</p>
                  <p class="card-category">${s(t.category)}</p>
                  <p class="card-price">
                    $${t.price}
                    ${e?'<span class="discount-flag">Discount!</span>':""}
                  </p>
                  <button class='btn btn-primary'>View Item</button>
                </div>
              </>
            </li>`}class n{constructor(e,i,a){this.category=e,this.dataSource=i,this.listElement=a}async init(){try{const e=await this.dataSource.getData(this.category);this.renderList(e);const i=document.querySelector(".title");i&&(i.textContent=s(this.category))}catch(e){console.error("Error initializing ProductList:",e)}}renderList(e){r(c,this.listElement,e)}}export{n as P};
