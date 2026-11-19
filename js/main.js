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

document.querySelectorAll(".image-carousel").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll(".carousel-dots button")];
  let currentSlide = 0;
  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === currentSlide);
      slide.setAttribute("aria-hidden", String(i !== currentSlide));
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentSlide);
      if (i === currentSlide) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  };
  carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => showSlide(currentSlide - 1));
  carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => showSlide(currentSlide + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let timer = window.setInterval(() => showSlide(currentSlide + 1), 5200);
    carousel.addEventListener("mouseenter", () => window.clearInterval(timer));
    carousel.addEventListener("mouseleave", () => { window.clearInterval(timer); timer = window.setInterval(() => showSlide(currentSlide + 1), 5200); });
    carousel.addEventListener("focusin", () => window.clearInterval(timer));
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) { window.clearInterval(timer); timer = window.setInterval(() => showSlide(currentSlide + 1), 5200); }
    });
  }
  showSlide(0);
});

const sectionVideos = [...document.querySelectorAll("[data-section-video]")];
sectionVideos.forEach((card) => {
  const video = card.querySelector("video");
  const playButton = card.querySelector("[data-video-play]");
  playButton?.addEventListener("click", () => {
    if (video.ended) video.currentTime = 0;
    video.play().catch(() => card.classList.remove("is-playing"));
  });
  video?.addEventListener("play", () => {
    sectionVideos.forEach((otherCard) => {
      const otherVideo = otherCard.querySelector("video");
      if (otherVideo !== video) otherVideo.pause();
    });
    card.classList.add("is-playing");
  });
  video?.addEventListener("pause", () => card.classList.remove("is-playing"));
  video?.addEventListener("ended", () => card.classList.remove("is-playing"));
});
