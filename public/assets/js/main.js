document.addEventListener("DOMContentLoaded", () => { loadComp("header", "/components/header.html"); loadComp("footer", "/components/footer.html"); }); async function loadComp(id, url) { const el = document.getElementById(id); if (!el) return; el.innerHTML = await fetch(url).then(r => r.text()); setTimeout(() => { const b = document.querySelector('.menu-btn'), n = document.querySelector('.nav-links'); if (b && n) b.onclick = () => n.classList.toggle('show'); }, 50) } function imgForPage(name) { return name }

fetch('floating.html')
.then(response => response.text())
.then(data => {
    document.getElementById('floating-button').innerHTML = data;
});

document.addEventListener("DOMContentLoaded", () => {
    loadComp("header", "/components/header.html");
    loadComp("footer", "/components/footer.html");
});

async function loadComp(id, url) {
    const el = document.getElementById(id);
    if (!el) return;

    el.innerHTML = await fetch(url).then(r => r.text());

    setTimeout(() => {
        const menuBtn = document.querySelector(".menu-btn");
        const navLinks = document.querySelector(".nav-links");

        if (!menuBtn || !navLinks) return;

        // Toggle menu
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("show");
        });

        // Prevent closing when clicking inside menu
        navLinks.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        // Close menu when clicking outside
        document.addEventListener("click", () => {
            navLinks.classList.remove("show");
        });

        // Close menu on window resize
        window.addEventListener("resize", () => {
            if (window.innerWidth > 980) {
                navLinks.classList.remove("show");
            }
        });

    }, 50);
}

function imgForPage(name) {
    return name;
}