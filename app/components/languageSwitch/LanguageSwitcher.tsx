"use client";

import { useLanguage }
  from "./LanguageContext";

export default function LanguageSwitcher() {
  const {
    lang,
    switchLang,
  } = useLanguage();

  return (
    <button onClick={switchLang}>
      {lang === "en"
        ? "🇸🇪 Svenska"
        : "🇬🇧 English"}
    </button>
  );
}