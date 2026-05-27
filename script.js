document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const revealElements = document.querySelectorAll(
    "section, .package-card, .process-item, .faq-item, .portfolio-card, .floating-card"
  );
  const faqItems = document.querySelectorAll(".faq-item");
  const yearElement = document.querySelector("[data-year]");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const handleHeaderScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll);

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });

  faqItems.forEach((item) => {
    const title = item.querySelector("h3");
    const answer = item.querySelector("p");

    if (!title || !answer) return;

    item.classList.add("faq-clickable");
    answer.style.maxHeight = "0px";
    answer.style.overflow = "hidden";
    answer.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
    answer.style.opacity = "0";

    title.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");

      if (isOpen) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.opacity = "1";
      } else {
        answer.style.maxHeight = "0px";
        answer.style.opacity = "0";
      }
    });
  });

  document.querySelectorAll('a[href*="wa.me"]').forEach((button) => {
    button.addEventListener("click", () => {
      console.log("CTA WhatsApp clicado:", button.textContent.trim());
    });
  });
});
