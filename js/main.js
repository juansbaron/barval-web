const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  navigation?.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Abrir menú");
    navigation.classList.remove("is-open");
  });
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const heroBackdrop = document.querySelector(".hero-backdrop");
const heroVideoSource = heroBackdrop?.dataset.videoSrc;
if (heroBackdrop && heroVideoSource) {
  fetch(heroVideoSource, { method: "HEAD" })
    .then((response) => {
      if (response.ok) {
        const video = document.createElement("video");
        video.className = "hero-video";
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute("aria-hidden", "true");
        video.src = heroVideoSource;
        heroBackdrop.prepend(video);
        video.play().catch(() => {});
      }
    })
    .catch(() => {});
}
