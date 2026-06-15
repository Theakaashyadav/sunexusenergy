const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfJ7LmyHMDsACbDaqaBHScPe7VdDA3tMGkSQtQ1pmg0ic5ongAGkCftKpZgq4YCXZ_Bw/exec";

let PRODUCTS = [];

function getDriveImage(url) {
  if (!url || url === "undefined" || url === "null") {
    return "/assets/images/no-image.png";
  }

  let fileId = "";

  if (url.includes("drive.google.com")) {
    let match = url.match(/id=([^&]+)/);
    if (match && match[1]) fileId = match[1];

    match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) fileId = match[1];

    match = url.match(/thumbnail\?id=([^&]+)/);
    if (match && match[1]) fileId = match[1];

    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
  }

  return url;
}

function productLoaderHTML() {
  return `
    <div class="product-loader">
      <div class="solar-loader"></div>
      <h3>Loading Products...</h3>
      <p>Please wait while we fetch the latest products.</p>
    </div>
  `;
}

function renderProducts(list = PRODUCTS) {
  const box = document.getElementById("productGrid");
  if (!box) return;

  if (!list || !list.length) {
    box.innerHTML = `
      <div class="product-loader">
        <h3>No Products Found</h3>
        <p>No products are available at the moment.</p>
      </div>
    `;
    return;
  }

  box.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-img">
        <img
          src="${getDriveImage(p.image)}"
          alt="${p.name || "Product"}"
          loading="lazy"
          referrerpolicy="no-referrer"
          onerror="this.onerror=null; this.src='/assets/images/no-image.png';"
        >
      </div>

      <div class="product-body">
        <!--<span class="tag">${p.category || ""}</span>-->

        <h3>${p.name || ""}</h3>

        <p>
          ${((p.description || "").length > 105)
            ? p.description.slice(0, 105) + "..."
            : (p.description || "No description available")}
        </p>

        <div class="price">
          ${p.price || "On Request"}
        </div>

        <a class="btn" href="/product-details.html?id=${p.id}">
          View Details
        </a>
      </div>
    </article>
  `).join("");
}

function setupFilters() {
  const search = document.getElementById("searchProduct");
  const category = document.getElementById("categoryFilter");

  if (category) {
    const cats = [...new Set(PRODUCTS.map(p => p.category).filter(Boolean))];

    category.innerHTML =
      `<option value="">All Categories</option>` +
      cats.map(cat => `<option value="${cat}">${cat}</option>`).join("");
  }

  function run() {
    const q = (search?.value || "").toLowerCase();
    const cat = category?.value || "";

    const filtered = PRODUCTS.filter(p => {
      const name = (p.name || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const productCat = (p.category || "").toLowerCase();
      const brand = (p.brand || "").toLowerCase();

      return (
        (!q || name.includes(q) || desc.includes(q) || productCat.includes(q) || brand.includes(q)) &&
        (!cat || p.category === cat)
      );
    });

    renderProducts(filtered);
  }

  if (search) search.addEventListener("input", run);
  if (category) category.addEventListener("change", run);

  run();
}

function loadSavedProducts(limit = null) {
  const box = document.getElementById("productGrid");

  if (box) {
    box.innerHTML = productLoaderHTML();
  }

  fetch(`${APP_SCRIPT_URL}?action=getProducts`)
    .then(res => res.json())
    .then(data => {
      if (data.status !== "success") {
        throw new Error("Unable to load products");
      }

      PRODUCTS = data.products || [];

      setTimeout(() => {
        if (limit) {
          renderProducts(PRODUCTS.slice(0, limit));
        } else {
          setupFilters();
        }
      }, 500);
    })
    .catch(err => {
      console.error(err);

      if (box) {
        box.innerHTML = `
          <div class="product-loader">
            <h3>Unable to Load Products</h3>
            <p>Please refresh the page or try again later.</p>
          </div>
        `;
      }
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const isHomePage = document.getElementById("productGrid") && !document.getElementById("searchProduct");
  const isProductsPage = document.getElementById("searchProduct");

  if (isHomePage) {
  loadSavedProducts();
}

  if (isProductsPage) {
    loadSavedProducts();
  }
});
