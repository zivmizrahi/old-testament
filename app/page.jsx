"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOKS = [
  { en: "Genesis", he: "בראשית", chapters: 50 },
  { en: "Exodus", he: "שמות", chapters: 40 },
  { en: "Leviticus", he: "ויקרא", chapters: 27 },
  { en: "Numbers", he: "במדבר", chapters: 36 },
  { en: "Deuteronomy", he: "דברים", chapters: 34 },
  { en: "Joshua", he: "יהושע", chapters: 24 },
  { en: "Judges", he: "שופטים", chapters: 21 },
  { en: "Ruth", he: "רות", chapters: 4 },
  { en: "1 Samuel", he: "שמואל א׳", chapters: 31 },
  { en: "2 Samuel", he: "שמואל ב׳", chapters: 24 },
  { en: "1 Kings", he: "מלכים א׳", chapters: 22 },
  { en: "2 Kings", he: "מלכים ב׳", chapters: 25 },
  { en: "1 Chronicles", he: "דברי הימים א׳", chapters: 29 },
  { en: "2 Chronicles", he: "דברי הימים ב׳", chapters: 36 },
  { en: "Ezra", he: "עזרא", chapters: 10 },
  { en: "Nehemiah", he: "נחמיה", chapters: 13 },
  { en: "Esther", he: "אסתר", chapters: 10 },
  { en: "Job", he: "איוב", chapters: 42 },
  { en: "Psalms", he: "תהילים", chapters: 150 },
  { en: "Proverbs", he: "משלי", chapters: 31 },
  { en: "Ecclesiastes", he: "קהלת", chapters: 12 },
  { en: "Song of Songs", he: "שיר השירים", chapters: 8 },
  { en: "Isaiah", he: "ישעיהו", chapters: 66 },
  { en: "Jeremiah", he: "ירמיהו", chapters: 52 },
  { en: "Lamentations", he: "איכה", chapters: 5 },
  { en: "Ezekiel", he: "יחזקאל", chapters: 48 },
  { en: "Daniel", he: "דניאל", chapters: 12 },
  { en: "Hosea", he: "הושע", chapters: 14 },
  { en: "Joel", he: "יואל", chapters: 4 },
  { en: "Amos", he: "עמוס", chapters: 9 },
  { en: "Obadiah", he: "עובדיה", chapters: 1 },
  { en: "Jonah", he: "יונה", chapters: 4 },
  { en: "Micah", he: "מיכה", chapters: 7 },
  { en: "Nahum", he: "נחום", chapters: 3 },
  { en: "Habakkuk", he: "חבקוק", chapters: 3 },
  { en: "Zephaniah", he: "צפניה", chapters: 3 },
  { en: "Haggai", he: "חגי", chapters: 2 },
  { en: "Zechariah", he: "זכריה", chapters: 14 },
  { en: "Malachi", he: "מלאכי", chapters: 3 }
];

export default function OldTestamentApp() {
  const [darkMode, setDarkMode] = useState(true);
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState([]);
  const [language, setLanguage] = useState("he");

  const currentBookData = BOOKS.find(b => b.en === book);
  const maxChapter = currentBookData?.chapters || 1;

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
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
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
          className={`px-2 py-1 rounded border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀ Light' : '🌙 Dark'} Mode
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={() => setChapter((c) => Math.max(1, c - 1))}
          disabled={chapter <= 1}
        >
          ←
        </button>
        <span className="self-center">Chapter {chapter}</span>
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={() => setChapter((c) => Math.min(maxChapter, c + 1))}
          disabled={chapter >= maxChapter}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={`${book}-${chapter}-${language}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`space-y-2 ${language === "he" ? "text-right" : "text-left"}`}
          >
            {verses.map((v, i) => (
              <p key={i} className="text-base">
                <span className="font-bold">{i + 1}.</span> {v}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
