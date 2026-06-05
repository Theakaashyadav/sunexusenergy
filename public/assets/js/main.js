document.addEventListener("DOMContentLoaded", () => {
    loadComp("header", "/components/header.html");
    loadComp("footer", "/components/footer.html");
    loadFloatingButton();
});

async function loadComp(id, url) {
    const el = document.getElementById(id);
    if (!el) return;

    el.innerHTML = await fetch(url).then(r => r.text());

    if (id === "header") {
        initMobileMenu();
    }
}

function initMobileMenu() {
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
        });
    });

    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove("show");
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
            navLinks.classList.remove("show");
        }
    });
}

function loadFloatingButton() {
    const floatingBox = document.getElementById("floating-button");
    if (!floatingBox) return;

    fetch("/floating.html")
        .then(response => response.text())
        .then(data => {
            floatingBox.innerHTML = data;
        });
}

function imgForPage(name) {
    return name;
}
