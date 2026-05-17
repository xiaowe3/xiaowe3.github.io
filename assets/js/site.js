(() => {
  const storageKey = "site-lang";
  const buttons = document.querySelectorAll("[data-lang-toggle]");
  const signatureEls = document.querySelectorAll("[data-signature]");
  const signatures = [
    "写下思考，也收藏灵感。",
    "以小见大，持续迭代。",
    "记录过程，输出结果。",
    "把复杂讲清楚，把经验留下来。",
    "让每一次试验都有回声。",
    "让系统更稳定，让表达更清晰。",
    "把问题拆开，把答案拼回。",
    "日拱一卒，长期主义。"
  ];

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

  if (signatureEls.length > 0 && signatures.length > 0) {
    const index = Math.floor(Math.random() * signatures.length);
    signatureEls.forEach((el) => {
      el.textContent = signatures[index];
    });
  }

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
