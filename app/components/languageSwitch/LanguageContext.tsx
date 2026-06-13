"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { translations } from "../../lib/locales/translations";

type Language = "en" | "sv";

type LanguageContextType = {
    lang: Language;
    t: typeof translations.en;
    switchLang: () => void;
};

const LanguageContext =
    createContext<LanguageContextType | null>(null);

export function LanguageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [lang, setLang] =
        useState<Language>("en");

    useEffect(() => {
        const saved =
            (localStorage.getItem("lang") as Language) ||
            "en";

        setLang(saved);
    }, []);

    const switchLang = () => {
        const newLang =
            lang === "en" ? "sv" : "en";

        setLang(newLang);
        localStorage.setItem("lang", newLang);
    };

    return (
        <LanguageContext.Provider
            value={{
                lang,
                t: translations[lang],
                switchLang,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );
    }

    return context;
}