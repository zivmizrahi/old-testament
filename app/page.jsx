"use client";

import { useEffect, useState } from "react";

const BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
  "Ezra", "Nehemiah", "Esther", "Job", "Psalms",
  "Proverbs", "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
  "Amos", "Obadiah", "Jonah", "Micah", "Nahum",
  "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
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

      <div className="flex gap-2 flex-wrap mb-4">
        {BOOKS.map((b) => (
          <button
            key={b}
            className={`px-2 py-1 rounded border ${b === book ? "bg-black text-white" : "bg-white text-black"}`}
            onClick={() => {
              setBook(b);
              setChapter(1);
            }}
          >
            {b}
          </button>
        ))}
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
