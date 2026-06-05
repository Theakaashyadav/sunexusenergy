document.addEventListener("DOMContentLoaded", () => {
    loadComp("header", "/components/header.html");
    loadComp("footer", "/components/footer.html");
});

async function loadComp(id, url) {
    const el = document.getElementById(id);
    if (!el) return;

    el.innerHTML = await fetch(url).then(r => r.text());

    if (id === "header") {
        setupMobileMenu();
    }
}

function setupMobileMenu() {
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navbar = document.querySelector(".navbar");

    if (!menuBtn || !navLinks || !navbar) return;

    menuBtn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        navLinks.classList.toggle("show");
    };

    navLinks.onclick = function (e) {
        e.stopPropagation();
    };

    document.onclick = function (e) {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove("show");
        }
    };

    window.onresize = function () {
        if (window.innerWidth > 980) {
            navLinks.classList.remove("show");
        }
    };
}

function imgForPage(name) {
    return name;
}


const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfJ7LmyHMDsACbDaqaBHScPe7VdDA3tMGkSQtQ1pmg0ic5ongAGkCftKpZgq4YCXZ_Bw/exec";

document.addEventListener("DOMContentLoaded", function () {
  loadSidebar();

  if (document.getElementById("totalProducts")) loadDashboard();
  if (document.getElementById("adminProducts")) loadProducts();
  if (document.title.includes("Enquiries")) loadEnquiries();
  if (document.title.includes("Settings")) loadSettings();

  const addForm = document.querySelector("#addProductForm");
  if (addForm) addForm.addEventListener("submit", saveProduct);

  const settingsForm = document.querySelector("#settingsForm");
  if (settingsForm) settingsForm.addEventListener("submit", saveSettings);

  const editForm = document.querySelector("#editProductForm");
if (editForm) {
  loadEditProduct();
  editForm.addEventListener("submit", updateProduct);
}
});

function adminRegister(event) {
  event.preventDefault();

  const form = document.getElementById("registerForm");
  const button = form.querySelector("button");

  button.innerText = "Processing...";
  button.disabled = true;

  const inputs = document.querySelectorAll("#registerForm input");

  const name = inputs[0].value.trim();
  const phone = inputs[1].value.trim();
  const password = inputs[2].value.trim();

  fetch(`${APP_SCRIPT_URL}?action=register&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`)
    .then(res => res.json())
    .then(data => {
      alert(data.message);

      if (data.status === "success") {
        toggleAuthForm();
      }
    })
    .catch(() => {
      alert("Something went wrong. Please try again.");
    })
    .finally(() => {
      button.innerText = "Register";
      button.disabled = false;
    });
}

function adminLogin(event) {
  event.preventDefault();

  const form = document.getElementById("loginForm");
  const button = form.querySelector("button");

  button.innerText = "Processing...";
  button.disabled = true;

  const inputs = document.querySelectorAll("#loginForm input");

  const phone = inputs[0].value.trim();
  const password = inputs[1].value.trim();

  fetch(`${APP_SCRIPT_URL}?action=login&phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`)
    .then(res => res.json())
    .then(data => {
      alert(data.message);

      if (data.status === "success") {
        localStorage.setItem("adminUser", JSON.stringify(data));
        window.location.href = "/admin/dashboard.html";
      }
    })
    .catch(() => {
      alert("Something went wrong. Please try again.");
    })
    .finally(() => {
      button.innerText = "Login";
      button.disabled = false;
    });
}

function loadDashboard() {
  fetch(`${APP_SCRIPT_URL}?action=dashboard`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("totalProducts").innerText = data.totalProducts;
      document.getElementById("totalCategories").innerText = data.totalCategories;
      document.getElementById("activeProducts").innerText = data.activeProducts;
      document.getElementById("totalOrders").innerText = data.totalOrders;
    });
}

function loadProducts() {
  fetch(`${APP_SCRIPT_URL}?action=getProducts`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("adminProducts");
      tbody.innerHTML = "";

      data.products.forEach(product => {
        tbody.innerHTML += `
          <tr>
            <td>
             <img 
  src="${getFirstProductImage(product.image)}" 
  alt="${product.name}"
  class="product-thumb"
  referrerpolicy="no-referrer"
  onerror="this.onerror=null; this.src='/assets/images/no-image.png';"
>
            </td>

            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.brand}</td>

            <td>
              <a class="btn" href="/admin/edit-product.html?id=${product.id}">
                Edit
              </a>

              <button 
                class="btn danger" 
                onclick="deleteProduct('${product.id}', this)">
                Delete
              </button>
            </td>
          </tr>
        `;
      });
    });
}

function getFirstProductImage(images) {
  if (!images) return "/assets/images/no-image.png";

  const firstImage = images.split(",")[0].trim();
  return getDriveImage(firstImage);
}

function saveProduct(event) {
  event.preventDefault();

  const form = event.target;
  const button = form.querySelector("button");
  const imageFiles = form.querySelector("[name='imageFile']").files;

  if (!imageFiles.length) {
    alert("Please select product images");
    return;
  }

  button.innerText = "Processing...";
  button.disabled = true;

  readMultipleImages(imageFiles, function (imagesData) {
    submitProductForm(form, button, "addProduct", imagesData, false);
  });
}

function getDriveImage(url) {
  if (!url || url === "undefined" || url === "null") {
    return "/assets/images/no-image.png";
  }

  let fileId = "";

  let match = url.match(/id=([^&]+)/);
  if (match && match[1]) fileId = match[1];

  match = url.match(/\/d\/([^/]+)/);
  if (match && match[1]) fileId = match[1];

  match = url.match(/thumbnail\?id=([^&]+)/);
  if (match && match[1]) fileId = match[1];

  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  return url;
}

function deleteProduct(productId, btn) {
  if (!confirm("Delete this product?")) return;

  const oldText = btn.innerText;

  btn.innerText = "Processing...";
  btn.disabled = true;

  fetch(`${APP_SCRIPT_URL}?action=deleteProduct&productId=${encodeURIComponent(productId)}`)
    .then(res => res.json())
    .then(data => {
      alert(data.message);

      if (data.status === "success") {
        loadProducts();
      } else {
        btn.innerText = oldText;
        btn.disabled = false;
      }
    })
    .catch(() => {
      alert("Something went wrong. Please try again.");

      btn.innerText = oldText;
      btn.disabled = false;
    });
}

function loadEnquiries() {
  fetch(`${APP_SCRIPT_URL}?action=getEnquiries`)
    .then(res => res.json())
    .then(data => {
      const table = document.querySelector("table");

      table.innerHTML = `
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Product</th>
          <th>Status</th>
        </tr>
      `;

      if (data.enquiries.length === 0) {
        table.innerHTML += `<tr><td colspan="4">No enquiry yet.</td></tr>`;
        return;
      }

      data.enquiries.forEach(enquiry => {
        table.innerHTML += `
          <tr>
            <td>${enquiry.name}</td>
            <td>${enquiry.phone}</td>
            <td>${enquiry.product}</td>
            <td>${enquiry.status}</td>
          </tr>
        `;
      });
    });
}

function loadSettings() {
  fetch(`${APP_SCRIPT_URL}?action=getSettings`)
    .then(res => res.json())
    .then(data => {
      const form = document.querySelector("#settingsForm");
      if (!form) return;

      form.querySelector("[name='company']").value = data.settings.company;
      form.querySelector("[name='email']").value = data.settings.email;
      form.querySelector("[name='phone']").value = data.settings.phone;
      form.querySelector("[name='address']").value = data.settings.address;
    });
}

function saveSettings(event) {
  event.preventDefault();

  const form = event.target;

  const company = form.querySelector("[name='company']").value;
  const email = form.querySelector("[name='email']").value;
  const phone = form.querySelector("[name='phone']").value;
  const address = form.querySelector("[name='address']").value;

  fetch(`${APP_SCRIPT_URL}?action=saveSettings&company=${encodeURIComponent(company)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}`)
    .then(res => res.json())
    .then(data => {
      alert(data.message);
    });
}

function loadSidebar() {
  const sidebar = document.getElementById("adminSidebar");

  if (!sidebar) return;

  sidebar.innerHTML = `
    <button class="admin-menu-btn" onclick="toggleAdminSidebar()" type="button">
      <i class="fa-solid fa-bars"></i>
    </button>

    <aside class="admin-sidebar">

      <div class="admin-logo">
        <img
          src="/assets/images/logo1.jpeg"
          alt="Sunexus Logo"
          onerror="this.src='/assets/images/logo.png'"
        >
      </div>

      <a href="/admin/dashboard.html">Dashboard</a>
      <a href="/admin/products.html">Manage Products</a>
      <a href="/admin/add-product.html">Add Product</a>
      
      <!-- <a href="/admin/orders.html">Enquiries</a>
      <a href="/admin/categories.html">Categories</a>
    <a href="/admin/settings.html">Settings</a> -->
      <a href="/index.html" target="_blank">View Website</a>
      <a href="#" onclick="logoutAdmin()">Logout</a>

    </aside>
  `;
}

function toggleAdminSidebar() {
  document.body.classList.toggle("admin-menu-open");

  const icon = document.querySelector(".admin-menu-btn i");

  if (icon) {
    icon.className = document.body.classList.contains("admin-menu-open")
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
  }
}

function logoutAdmin() {
  localStorage.removeItem("adminUser");
  window.location.href = "/admin/login.html";
}

function loadEditProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    alert("Product ID missing");
    window.location.href = "/admin/products.html";
    return;
  }

  fetch(`${APP_SCRIPT_URL}?action=getProduct&productId=${encodeURIComponent(productId)}`)
    .then(res => res.json())
    .then(data => {
      if (data.status !== "success") {
        alert(data.message || "Product not found");
        window.location.href = "/admin/products.html";
        return;
      }

      const product = data.product;
      const form = document.querySelector("#editProductForm");

      form.querySelector("[name='productId']").value = product.id || "";
      form.querySelector("[name='name']").value = product.name || "";
      form.querySelector("[name='category']").value = product.category || "";
      form.querySelector("[name='brand']").value = product.brand || "";
      form.querySelector("[name='price']").value = product.price || "";
      form.querySelector("[name='description']").value = product.description || "";

      // Multiple Images Preview
      const previewWrap = document.getElementById("editPreviewWrap");

      if (previewWrap) {
        previewWrap.innerHTML = "";

        if (product.image) {
          const images = product.image.split(",");

          previewWrap.innerHTML = images
            .map(img => `
              <img
                src="${getDriveImage(img.trim())}"
                style="
                  width:90px;
                  height:90px;
                  object-fit:cover;
                  border-radius:8px;
                  border:1px solid #ddd;
                  margin:5px;
                "
              >
            `)
            .join("");
        }
      }
    })
    .catch(() => {
      alert("Failed to load product details");
    });
}

function updateProduct(event) {
  event.preventDefault();

  const form = event.target;
  const button = form.querySelector("button");
  const imageInput = form.querySelector("[name='imageFile']");
  const imageFiles = imageInput ? imageInput.files : [];

  button.innerText = "Updating...";
  button.disabled = true;

  if (imageFiles.length) {
    readMultipleImages(imageFiles, function (imagesData) {
      submitProductForm(form, button, "updateProduct", imagesData, true);
    });
  } else {
    submitProductForm(form, button, "updateProduct", [], true);
  }
}

function readMultipleImages(files, callback) {
  const imagesData = [];
  let loaded = 0;

  Array.from(files).forEach(file => {
    const reader = new FileReader();

    reader.onload = function () {
      imagesData.push({
        base64: reader.result,
        type: file.type
      });

      loaded++;

      if (loaded === files.length) {
        callback(imagesData);
      }
    };

    reader.onerror = function () {
      loaded++;

      if (loaded === files.length) {
        callback(imagesData);
      }
    };

    reader.readAsDataURL(file);
  });
}

function submitProductForm(form, button, action, imagesData, isUpdate = false) {
  let iframe = document.getElementById("uploadFrame");

  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = "uploadFrame";
    iframe.id = "uploadFrame";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }

  const hiddenForm = document.createElement("form");
  hiddenForm.method = "POST";
  hiddenForm.action = APP_SCRIPT_URL;
  hiddenForm.target = "uploadFrame";
  hiddenForm.style.display = "none";

  const fields = {
    action: action,
    productId: form.querySelector("[name='productId']")?.value.trim() || "",
    name: form.querySelector("[name='name']").value.trim(),
    category: form.querySelector("[name='category']").value.trim(),
    brand: form.querySelector("[name='brand']").value.trim(),
    price: form.querySelector("[name='price']").value.trim(),
    description: form.querySelector("[name='description']").value.trim(),
    imagesData: JSON.stringify(imagesData)
  };

  for (let key in fields) {
    const input = document.createElement("textarea");
    input.name = key;
    input.value = fields[key];
    hiddenForm.appendChild(input);
  }

  document.body.appendChild(hiddenForm);
  hiddenForm.submit();

  setTimeout(() => {
    hiddenForm.remove();
    alert(isUpdate ? "Product updated successfully" : "Product submitted successfully");

    if (isUpdate) {
      window.location.href = "/admin/products.html";
    } else {
      form.reset();
      button.innerText = "Save Product";
      button.disabled = false;
    }
  }, 3500);
}