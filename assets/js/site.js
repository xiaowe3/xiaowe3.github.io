(() => {
  const storageKey = "site-lang";
  const buttons = document.querySelectorAll("[data-lang-toggle]");

  const applyLang = (lang) => {
    document.body.classList.toggle("lang-zh", lang === "zh");
    document.body.classList.toggle("lang-en", lang === "en");

    buttons.forEach((button) => {
      const isActive = button.getAttribute("data-lang-toggle") === lang;
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  const detectLang = () => {
    if (navigator.language && navigator.language.toLowerCase().startsWith("en")) {
      return "en";
    }
    return "zh";
  };

  let initialLang = "zh";
  try {
    initialLang = localStorage.getItem(storageKey) || detectLang();
  } catch (error) {
    initialLang = detectLang();
  }

  applyLang(initialLang);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang-toggle");
      applyLang(lang);
      try {
        localStorage.setItem(storageKey, lang);
      } catch (error) {
        // Ignore write errors for private browsing mode.
      }
    });
  });
})();
