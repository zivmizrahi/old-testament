import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        `https://www.sefaria.org/api/texts/${book}.${chapter}?lang=${language}`
      );
      const data = await res.json();
      setVerses(data.text || data.he || []);
    };

    fetchSefariaText();
  }, [book, chapter, language]);

  return (
    <div className="min-h-screen p-4 bg-white text-black dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">📖 {book} {chapter}</h1>

      <div className="flex gap-2 flex-wrap mb-4">
        {BOOKS.map(b => (
          <Button
            key={b}
            variant={b === book ? "default" : "outline"}
            onClick={() => {
              setBook(b);
              setChapter(1);
            }}
          >
            {b}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <Button onClick={() => setChapter(c => Math.max(1, c - 1))}>←</Button>
        <span className="self-center">Chapter {chapter}</span>
        <Button onClick={() => setChapter(c => c + 1)}>→</Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button onClick={() => setLanguage("en")} variant={language === "en" ? "default" : "outline"}>English</Button>
        <Button onClick={() => setLanguage("he")} variant={language === "he" ? "default" : "outline"}>עברית</Button>
      </div>

      <ScrollArea className="h-[60vh] pr-2">
        <div className={\`space-y-2 \${language === "he" ? "text-right" : "text-left"}\`}>
          {verses.map((v, i) => (
            <p key={i} className="text-base">
              <span className="font-bold">{i + 1}.</span> {v}
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}