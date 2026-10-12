const BOOKS = [
  { id: 1, name: "Genesis", aliases: ["gen", "gn"] },
  { id: 2, name: "Exodus", aliases: ["exo", "ex", "exod"] },
  { id: 3, name: "Leviticus", aliases: ["lev", "lv"] },
  { id: 4, name: "Numbers", aliases: ["num", "nm", "nb"] },
  { id: 5, name: "Deuteronomy", aliases: ["deut", "dt", "deu"] },
  { id: 6, name: "Joshua", aliases: ["josh", "jos", "jsh"] },
  { id: 7, name: "Judges", aliases: ["judg", "jdg", "jg", "jdgs"] },
  { id: 8, name: "Ruth", aliases: ["ruth", "rth", "ru"] },
  { id: 9, name: "1 Samuel", aliases: ["1sam", "1sm", "1sa", "1s"] },
  { id: 10, name: "2 Samuel", aliases: ["2sam", "2sm", "2sa", "2s"] },
  { id: 11, name: "1 Kings", aliases: ["1kgs", "1ki", "1king", "1kings"] },
  { id: 12, name: "2 Kings", aliases: ["2kgs", "2ki", "2king", "2kings"] },
  { id: 13, name: "1 Chronicles", aliases: ["1chr", "1ch", "1chron"] },
  { id: 14, name: "2 Chronicles", aliases: ["2chr", "2ch", "2chron"] },
  { id: 15, name: "Ezra", aliases: ["ezra", "ezr", "ez"] },
  { id: 16, name: "Nehemiah", aliases: ["neh", "ne"] },
  { id: 17, name: "Esther", aliases: ["esth", "est", "es"] },
  { id: 18, name: "Job", aliases: ["job", "jb"] },
  { id: 19, name: "Psalms", aliases: ["psalm", "psalms", "ps", "psa", "psm", "pss"] },
  { id: 20, name: "Proverbs", aliases: ["prov", "pro", "prv", "pr"] },
  { id: 21, name: "Ecclesiastes", aliases: ["eccl", "ecc", "eccles"] },
  { id: 22, name: "Song of Solomon", aliases: ["songofsolomon", "songofsongs", "song", "sos", "sg"] },
  { id: 23, name: "Isaiah", aliases: ["isa", "is"] },
  { id: 24, name: "Jeremiah", aliases: ["jer", "je", "jr"] },
  { id: 25, name: "Lamentations", aliases: ["lam", "la"] },
  { id: 26, name: "Ezekiel", aliases: ["ezek", "eze", "ezk"] },
  { id: 27, name: "Daniel", aliases: ["dan", "da", "dn"] },
  { id: 28, name: "Hosea", aliases: ["hos", "ho"] },
  { id: 29, name: "Joel", aliases: ["joel", "jl"] },
  { id: 30, name: "Amos", aliases: ["amos", "am"] },
  { id: 31, name: "Obadiah", aliases: ["obad", "ob"] },
  { id: 32, name: "Jonah", aliases: ["jonah", "jon", "jnh"] },
  { id: 33, name: "Micah", aliases: ["mic", "mc"] },
  { id: 34, name: "Nahum", aliases: ["nah", "na"] },
  { id: 35, name: "Habakkuk", aliases: ["hab", "hb"] },
  { id: 36, name: "Zephaniah", aliases: ["zeph", "zep", "zp"] },
  { id: 37, name: "Haggai", aliases: ["hag", "hg"] },
  { id: 38, name: "Zechariah", aliases: ["zech", "zec", "zc"] },
  { id: 39, name: "Malachi", aliases: ["mal", "ml"] },
  { id: 40, name: "Matthew", aliases: ["matt", "mat", "mt"] },
  { id: 41, name: "Mark", aliases: ["mark", "mrk", "mk", "mr"] },
  { id: 42, name: "Luke", aliases: ["luke", "luk", "lk"] },
  { id: 43, name: "John", aliases: ["john", "jhn", "jn", "joh"] },
  { id: 44, name: "Acts", aliases: ["acts", "act", "ac"] },
  { id: 45, name: "Romans", aliases: ["rom", "ro", "rm"] },
  { id: 46, name: "1 Corinthians", aliases: ["1cor", "1co"] },
  { id: 47, name: "2 Corinthians", aliases: ["2cor", "2co"] },
  { id: 48, name: "Galatians", aliases: ["gal", "ga"] },
  { id: 49, name: "Ephesians", aliases: ["eph", "ephes"] },
  { id: 50, name: "Philippians", aliases: ["phil", "php", "pp"] },
  { id: 51, name: "Colossians", aliases: ["col", "co"] },
  { id: 52, name: "1 Thessalonians", aliases: ["1thess", "1th", "1thes"] },
  { id: 53, name: "2 Thessalonians", aliases: ["2thess", "2th", "2thes"] },
  { id: 54, name: "1 Timothy", aliases: ["1tim", "1ti", "1tm"] },
  { id: 55, name: "2 Timothy", aliases: ["2tim", "2ti", "2tm"] },
  { id: 56, name: "Titus", aliases: ["titus", "tit", "ti"] },
  { id: 57, name: "Philemon", aliases: ["phlm", "phm", "pm", "philem"] },
  { id: 58, name: "Hebrews", aliases: ["heb", "he"] },
  { id: 59, name: "James", aliases: ["james", "jas", "jm"] },
  { id: 60, name: "1 Peter", aliases: ["1pet", "1pe", "1pt"] },
  { id: 61, name: "2 Peter", aliases: ["2pet", "2pe", "2pt"] },
  { id: 62, name: "1 John", aliases: ["1john", "1jn", "1jhn"] },
  { id: 63, name: "2 John", aliases: ["2john", "2jn", "2jhn"] },
  { id: 64, name: "3 John", aliases: ["3john", "3jn", "3jhn"] },
  { id: 65, name: "Jude", aliases: ["jude", "jud", "jd"] },
  { id: 66, name: "Revelation", aliases: ["rev", "re", "rv", "revelations"] }
];

function findBook(rawBook) {
  const key = String(rawBook || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!key) return null;

  for (const book of BOOKS) {
    const nameKey = book.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (nameKey === key || book.aliases.includes(key)) {
      return book;
    }
  }

  if (key.length >= 3) {
    for (const book of BOOKS) {
      const nameKey = book.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (nameKey.startsWith(key)) {
        return book;
      }
    }
  }

  return null;
}

function parseVerseSet(versePart) {
  if (!versePart) return null;
  const targetVerses = new Set();
  const segments = versePart.split(",");

  for (const seg of segments) {
    const nums = seg.match(/\d+/g);
    if (!nums) continue;
    if (nums.length >= 2) {
      const start = parseInt(nums[0], 10);
      const end = parseInt(nums[1], 10);
      for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
        targetVerses.add(i);
      }
    } else if (nums.length === 1) {
      targetVerses.add(parseInt(nums[0], 10));
    }
  }
  return targetVerses.size > 0 ? targetVerses : null;
}

function cleanVerseHtml(html) {
  return (html || "")
    .replace(/<S>.*?<\/S>/gi, "")
    .replace(/<sup[^>]*>.*?<\/sup>/gi, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseReference(rawRef) {
  if (!rawRef) return null;

  // Convert any dash/separator between digits into "-", strip non-ASCII/invisible chars, and normalize spaces
  const s = String(rawRef)
    .replace(/(\d+)\s*[^a-zA-Z0-9,\s:]+\s*(\d+)/g, "\$1-\$2")
    .replace(/[^a-zA-Z0-9:,\-]+/g, " ")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*-\s*/g, "-")
    .replace(/\s*,\s*/g, ",")
    .replace(/^([1-3])([a-zA-Z])/i, "\$1 \$2")
    .replace(/([a-zA-Z])(\d)/g, "\$1 \$2")
    .replace(/\s+/g, " ")
    .trim();

  const extracted = s.match(
    /(?:[1-3]\s+)?(?:song of solomon|song of songs|[a-zA-Z]+)\s+\d+(?::[0-9,\-]+)?/i
  );
  const target = extracted ? extracted[0] : s;

  const parts = target.split(" ");
  if (parts.length < 2) return null;

  const chapterVersePart = parts[parts.length - 1];
  const bookPart = parts.slice(0, -1).join(" ");

  const book = findBook(bookPart);
  if (!book) return null;

  const cvSplit = chapterVersePart.split(":");
  const chapter = parseInt(cvSplit[0], 10);
  if (isNaN(chapter)) return null;

  const verseSpec = cvSplit[1] || null;
  const verseSet = parseVerseSet(verseSpec);

  return {
    book,
    chapter,
    verseSpec,
    verseSet,
    formattedRef: `${book.name} ${chapter}${verseSpec ? ":" + verseSpec : ""}`
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchVerse") {
    const parsed = parseReference(request.reference);
    if (!parsed) {
      sendResponse({
        success: false,
        error: `Could not recognize reference: "${request.reference}"`
      });
      return false;
    }

    const translation = (request.translation || "ESV").toUpperCase();
    const url = `https://bolls.life/get-text/${translation}/${parsed.book.id}/${parsed.chapter}/`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch from translation server.");
        return res.json();
      })
      .then((chapterVerses) => {
        if (!Array.isArray(chapterVerses) || chapterVerses.length === 0) {
          throw new Error("Chapter not found.");
        }

        const filtered = parsed.verseSet
          ? chapterVerses.filter((v) => parsed.verseSet.has(Number(v.verse)))
          : chapterVerses;

        if (filtered.length === 0) {
          throw new Error("Requested verse number not found in this chapter.");
        }

        const verses = filtered.map((v) => ({
          verse: v.verse,
          text: cleanVerseHtml(v.text)
        }));

        sendResponse({
          success: true,
          data: {
            reference: parsed.formattedRef,
            verses
          }
        });
      })
      .catch((err) => sendResponse({ success: false, error: err.message }));

    return true;
  }
});