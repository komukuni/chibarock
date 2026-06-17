const modal = document.querySelector("#artist-modal");
const modalImage = modal.querySelector(".modal-image");
const modalTitle = modal.querySelector("#modal-title");
const modalDescription = modal.querySelector("#modal-description");
const modalClose = modal.querySelector(".modal-close");
const artistButtons = document.querySelectorAll(".artist-photo");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const revealTargets = document.querySelectorAll(
  ".section-label, .section-content, .artist-card, .info-list > div, .venue-media, .timeline li, .site-footer"
);

let lastFocusedElement = null;

function closeMenu() {
  siteHeader.classList.remove("is-menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "メニューを開く");
}

function toggleMenu() {
  const isOpen = siteHeader.classList.toggle("is-menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
}

menuToggle.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

if ("IntersectionObserver" in window) {
  revealTargets.forEach((target) => target.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px 12% 0px",
      threshold: 0.08,
    }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

function openModal(button) {
  lastFocusedElement = button;
  modalTitle.textContent = button.dataset.artist;
  modalDescription.textContent = button.dataset.copy;
  modalImage.src = button.dataset.image;
  modalImage.alt = `${button.dataset.artist}の拡大写真`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

artistButtons.forEach((button) => {
  button.addEventListener("click", () => openModal(button));
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }

  if (event.key === "Escape" && siteHeader.classList.contains("is-menu-open")) {
    closeMenu();
    menuToggle.focus();
  }
});
