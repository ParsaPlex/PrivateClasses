/* ================================
   FluentPrompt Cursor Gradient Effect
   Removable / Non-invasive
================================ */

(function () {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || reducedMotion) return;

    const body = document.body;

    body.classList.add("fp-cursor-active");

    const dot = document.createElement("div");
    dot.className = "fp-cursor-dot";

    const ring = document.createElement("div");
    ring.className = "fp-cursor-ring";

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    let rafId = null;

    function updateCursor() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;

        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

        document.documentElement.style.setProperty("--fp-cursor-x", `${mouseX}px`);
        document.documentElement.style.setProperty("--fp-cursor-y", `${mouseY}px`);

        rafId = requestAnimationFrame(updateCursor);
    }

    function startAnimation() {
        if (!rafId) {
            rafId = requestAnimationFrame(updateCursor);
        }
    }

    window.addEventListener("mousemove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;

        body.classList.add("fp-cursor-visible");
        body.classList.remove("fp-cursor-hidden");

        startAnimation();
    });

    window.addEventListener("mouseleave", function () {
        body.classList.add("fp-cursor-hidden");
    });

    window.addEventListener("mouseenter", function () {
        body.classList.remove("fp-cursor-hidden");
    });

    const hoverTargets = "a, button, input, textarea, select, [role='button'], .contact-btn";

    document.addEventListener("mouseover", function (event) {
        if (event.target.closest(hoverTargets)) {
            body.classList.add("fp-cursor-hover");
        }
    });

    document.addEventListener("mouseout", function (event) {
        if (event.target.closest(hoverTargets)) {
            body.classList.remove("fp-cursor-hover");
        }
    });
})();
