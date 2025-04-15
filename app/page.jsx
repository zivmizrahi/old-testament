"use client";

import { useEffect, useState } from "react";

const BOOKS = [
  { en: "Genesis", he: "בראשית" },
  { en: "Exodus", he: "שמות" },
  { en: "Leviticus", he: "ויקרא" },
  { en: "Numbers", he: "במדבר" },
  { en: "Deuteronomy", he: "דברים" },
  { en: "Joshua", he: "יהושע" },
  { en: "Judges", he: "שופטים" },
  { en: "Ruth", he: "רות" },
  { en: "1 Samuel", he: "שמואל א׳" },
  { en: "2 Samuel", he: "שמואל ב׳" },
  { en: "1 Kings", he: "מלכים א׳" },
  { en: "2 Kings", he: "מלכים ב׳" },
  { en: "1 Chronicles", he: "דברי הימים א׳" },
  { en: "2 Chronicles", he: "דברי הימים ב׳" },
  { en: "Ezra", he: "עזרא" },
  { en: "Nehemiah", he: "נחמיה" },
  { en: "Esther", he: "אסתר" },
  { en: "Job", he: "איוב" },
  { en: "Psalms", he: "תהילים" },
  { en: "Proverbs", he: "משלי" },
  { en: "Ecclesiastes", he: "קהלת" },
  { en: "Song of Songs", he: "שיר השירים" },
  { en: "Isaiah", he: "ישעיהו" },
  { en: "Jeremiah", he: "ירמיהו" },
  { en: "Lamentations", he: "איכה" },
  { en: "Ezekiel", he: "יחזקאל" },
  { en: "Daniel", he: "דניאל" },
  { en: "Hosea", he: "הושע" },
  { en: "Joel", he: "יואל" },
  { en: "Amos", he: "עמוס" },
  { en: "Obadiah", he: "עובדיה" },
  { en: "Jonah", he: "יונה" },
  { en: "Micah", he: "מיכה" },
  { en: "Nahum", he: "נחום" },
  { en: "Habakkuk", he: "חבקוק" },
  { en: "Zephaniah", he: "צפניה" },
  { en: "Haggai", he: "חגי" },
  { en: "Zechariah", he: "זכריה" },
  { en: "Malachi", he: "מלאכי" }
];

export default function OldTestamentApp() {
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState([]);
  const [language, setLanguage] = useState("he"); // 'he' or 'en'

  useEffect(() => {
    const fetchSefariaText = async () => {
      const res = await fetch(
        `https://www.sefaria.org/api/texts/${book}.${chapter}?lang=${language}&context=0&commentary=0`
      );
      const data = await res.json();
      const raw = (language === "he" ? data.he : data.text) || [];
      const clean = raw.map((v) =>
        v
          .replace(/<[^>]*>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&thinsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
      );
      setVerses(clean);
    };

    fetchSefariaText();
  }, [book, chapter, language]);

  return (
    <div className="min-h-screen p-4 bg-white text-black dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">📖 {book} {chapter}</h1>

      <div className="mb-4">
        <select
          className="w-full p-2 border rounded"
          value={book}
          onChange={(e) => {
            setBook(e.target.value);
            setChapter(1);
          }}
        >
          {BOOKS.map((b) => (
            <option key={b.en} value={b.en}>{language === "he" ? b.he : b.en}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={() => setChapter((c) => Math.max(1, c - 1))}
        >
          ←
        </button>
        <span className="self-center">Chapter {chapter}</span>
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={() => setChapter((c) => c + 1)}
        >
          →
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className={`px-2 py-1 rounded border ${language === "en" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          className={`px-2 py-1 rounded border ${language === "he" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => setLanguage("he")}
        >
          עברית
        </button>
      </div>

      <div className="h-[60vh] overflow-y-auto pr-2">
        <div className={`space-y-2 ${language === "he" ? "text-right" : "text-left"}`}>
          {verses.map((v, i) => (
            <p key={i} className="text-base">
              <span className="font-bold">{i + 1}.</span> {v}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
