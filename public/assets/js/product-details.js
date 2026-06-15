const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfJ7LmyHMDsACbDaqaBHScPe7VdDA3tMGkSQtQ1pmg0ic5ongAGkCftKpZgq4YCXZ_Bw/exec";

function getDriveImage(url) {
  if (!url) return "/assets/images/no-image.png";

  let fileId = "";

  if (url.includes("id=")) {
    fileId = url.split("id=")[1].split("&")[0];
  }

  if (url.includes("/file/d/")) {
    fileId = url.split("/file/d/")[1].split("/")[0];
  }

  if (url.includes("/d/")) {
    fileId = url.split("/d/")[1].split("/")[0];
  }

  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  return url;
}

function getProductImages(imageString) {
  if (!imageString) return ["/assets/images/no-image.png"];

  return imageString
    .split(",")
    .map(img => img.trim())
    .filter(Boolean)
    .map(img => getDriveImage(img));
}

function changeMainImage(imgUrl, thumb) {
  const mainImg = document.getElementById("mainProductImage");
  if (!mainImg) return;

  mainImg.src = imgUrl;

  document.querySelectorAll(".detail-thumb").forEach(t => {
    t.classList.remove("active");
  });

  if (thumb) thumb.classList.add("active");
}

function renderProductGallery(images, productName) {
  const detailImage = document.getElementById("detailImage");

  detailImage.innerHTML = `
    <div class="product-gallery">
      <div class="main-product-image">
        <img
          id="mainProductImage"
          src="${images[0]}"
          alt="${productName || "Product"}"
          onerror="this.onerror=null; this.src='/assets/images/no-image.png';"
        >
      </div>

      ${images.length > 1 ? `
        <div class="product-thumbs">
          ${images.map((img, index) => `
            <button
              type="button"
              class="detail-thumb ${index === 0 ? "active" : ""}"
              onclick="changeMainImage('${img}', this)"
            >
              <img
                src="${img}"
                alt="${productName || "Product"} ${index + 1}"
                onerror="this.onerror=null; this.src='/assets/images/no-image.png';"
              >
            </button>
          `).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

function loadProductDetails() {
  const id = new URLSearchParams(location.search).get("id");
  const detailBox = document.getElementById("detailBox");

  if (!id) {
    detailBox.innerHTML = `<p>Product not found.</p>`;
    return;
  }

  fetch(`${APP_SCRIPT_URL}?action=getProduct&productId=${encodeURIComponent(id)}`)
    .then(res => res.json())
    .then(data => {
      if (data.status !== "success" || !data.product) {
        detailBox.innerHTML = `<p>Product not found.</p>`;
        return;
      }

      const p = data.product;
      const images = getProductImages(p.image);

      document.title = `${p.name} | Sunexus`;

      renderProductGallery(images, p.name);

      detailBox.innerHTML = `
        <!--<span class="tag">${p.category || "Product"}</span>-->
        <h1>${p.name}</h1>
        <p>${p.description || "No description available."}</p>

        <div class="specs">
          <div><b>Product ID</b><span>${p.id}</span></div>
          <div><b>Brand/Type</b><span>${p.brand || "N/A"}</span></div>
          <div><b>Category</b><span>${p.category || "N/A"}</span></div>
          <div><b>Price</b><span>${p.price || "On Request"}</span></div>
        </div>

        <a class="btn" href="/contact.html?product=${encodeURIComponent(p.name)}">
          Send Enquiry
        </a>
      `;
    })
    .catch(err => {
      console.error(err);
      detailBox.innerHTML = `<p>Unable to load product details.</p>`;
    });
}

document.addEventListener("DOMContentLoaded", loadProductDetails);
