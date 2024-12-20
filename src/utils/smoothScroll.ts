export function initSmoothScroll() {
  const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      if (!href) return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
} 