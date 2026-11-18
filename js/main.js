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

const heroVideo = document.querySelector(".hero-video");
const heroVideoSource = heroVideo?.dataset.videoSrc;
if (heroVideo && heroVideoSource) {
  fetch(heroVideoSource, { method: "HEAD" })
    .then((response) => {
      if (response.ok) {
        heroVideo.src = heroVideoSource;
        heroVideo.load();
      }
    })
    .catch(() => {});
}
