"use client";

import { useLanguage } from "../languageSwitch/LanguageContext";
import WidgetLoader from "../WidgetLoader";
import "./ClientHome.css";

export default function ClientHome() {
    const { t, lang, switchLang } = useLanguage();

    return (
        <>
            <nav>
                <div>
                   🤖 | adD LOGO 
                </div>
                <button className="button-nav" onClick={switchLang}>
                    {lang === "en"
                        ? "🇸🇪 Svenska"
                        : "🇬🇧 English"}
                </button>
            </nav>
            {/* hero section of the application */}
            <div className="container-1-col">
                <h1>{t.title}</h1>
                <p>{t.subtitle}</p>
            </div>
            {/* Adding the simple to do part of text */}
            <section className="section">
                <h2>{t.how}</h2>
                <div className="grid">
                    <div className="box">
                        <h2>{t.step1Title}</h2>
                        <p>{t.step1Text}</p>
                    </div>

                    <div className="box">
                        <h2>{t.step2Title}</h2>
                        <p>{t.step2Text}</p>
                    </div>

                    <div className="box">
                        <h2>{t.step3Title}</h2>
                        <p>{t.step3Text}</p>
                    </div>
                </div>
                {/* A sliding banner info for attaction */}
                <div className="css-banner">
                    <div className="banner-text">
                        {t.banner}
                    </div>
                </div>
            </section >

            <WidgetLoader />

            <footer>
                {t.footer}
            </footer>
        </>
    );
}