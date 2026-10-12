const BOOKS = [
  { id: 1, name: "Genesis", bhSlug: "genesis", aliases: ["gen", "gn"] },
  { id: 2, name: "Exodus", bhSlug: "exodus", aliases: ["exo", "ex", "exod"] },
  { id: 3, name: "Leviticus", bhSlug: "leviticus", aliases: ["lev", "lv"] },
  { id: 4, name: "Numbers", bhSlug: "numbers", aliases: ["num", "nm", "nb"] },
  { id: 5, name: "Deuteronomy", bhSlug: "deuteronomy", aliases: ["deut", "dt", "deu"] },
  { id: 6, name: "Joshua", bhSlug: "joshua", aliases: ["josh", "jos", "jsh"] },
  { id: 7, name: "Judges", bhSlug: "judges", aliases: ["judg", "jdg", "jg", "jdgs"] },
  { id: 8, name: "Ruth", bhSlug: "ruth", aliases: ["ruth", "rth", "ru"] },
  { id: 9, name: "1 Samuel", bhSlug: "1_samuel", aliases: ["1sam", "1sm", "1sa", "1s"] },
  { id: 10, name: "2 Samuel", bhSlug: "2_samuel", aliases: ["2sam", "2sm", "2sa", "2s"] },
  { id: 11, name: "1 Kings", bhSlug: "1_kings", aliases: ["1kgs", "1ki", "1king", "1kings"] },
  { id: 12, name: "2 Kings", bhSlug: "2_kings", aliases: ["2kgs", "2ki", "2king", "2kings"] },
  { id: 13, name: "1 Chronicles", bhSlug: "1_chronicles", aliases: ["1chr", "1ch", "1chron"] },
  { id: 14, name: "2 Chronicles", bhSlug: "2_chronicles", aliases: ["2chr", "2ch", "2chron"] },
  { id: 15, name: "Ezra", bhSlug: "ezra", aliases: ["ezra", "ezr", "ez"] },
  { id: 16, name: "Nehemiah", bhSlug: "nehemiah", aliases: ["neh", "ne"] },
  { id: 17, name: "Esther", bhSlug: "esther", aliases: ["esth", "est", "es"] },
  { id: 18, name: "Job", bhSlug: "job", aliases: ["job", "jb"] },
  { id: 19, name: "Psalms", bhSlug: "psalms", aliases: ["psalm", "psalms", "ps", "psa", "psm", "pss"] },
  { id: 20, name: "Proverbs", bhSlug: "proverbs", aliases: ["prov", "pro", "prv", "pr"] },
  { id: 21, name: "Ecclesiastes", bhSlug: "ecclesiastes", aliases: ["eccl", "ecc", "eccles"] },
  { id: 22, name: "Song of Solomon", bhSlug: "songs", aliases: ["songofsolomon", "songofsongs", "song", "sos", "sg"] },
  { id: 23, name: "Isaiah", bhSlug: "isaiah", aliases: ["isa", "is"] },
  { id: 24, name: "Jeremiah", bhSlug: "jeremiah", aliases: ["jer", "je", "jr"] },
  { id: 25, name: "Lamentations", bhSlug: "lamentations", aliases: ["lam", "la"] },
  { id: 26, name: "Ezekiel", bhSlug: "ezekiel", aliases: ["ezek", "eze", "ezk"] },
  { id: 27, name: "Daniel", bhSlug: "daniel", aliases: ["dan", "da", "dn"] },
  { id: 28, name: "Hosea", bhSlug: "hosea", aliases: ["hos", "ho"] },
  { id: 29, name: "Joel", bhSlug: "joel", aliases: ["joel", "jl"] },
  { id: 30, name: "Amos", bhSlug: "amos", aliases: ["amos", "am"] },
  { id: 31, name: "Obadiah", bhSlug: "obadiah", aliases: ["obad", "ob"] },
  { id: 32, name: "Jonah", bhSlug: "jonah", aliases: ["jonah", "jon", "jnh"] },
  { id: 33, name: "Micah", bhSlug: "micah", aliases: ["mic", "mc"] },
  { id: 34, name: "Nahum", bhSlug: "nahum", aliases: ["nah", "na"] },
  { id: 35, name: "Habakkuk", bhSlug: "habakkuk", aliases: ["hab", "hb"] },
  { id: 36, name: "Zephaniah", bhSlug: "zephaniah", aliases: ["zeph", "zep", "zp"] },
  { id: 37, name: "Haggai", bhSlug: "haggai", aliases: ["hag", "hg"] },
  { id: 38, name: "Zechariah", bhSlug: "zechariah", aliases: ["zech", "zec", "zc"] },
  { id: 39, name: "Malachi", bhSlug: "malachi", aliases: ["mal", "ml"] },
  { id: 40, name: "Matthew", bhSlug: "matthew", aliases: ["matt", "mat", "mt"] },
  { id: 41, name: "Mark", bhSlug: "mark", aliases: ["mark", "mrk", "mk", "mr"] },
  { id: 42, name: "Luke", bhSlug: "luke", aliases: ["luke", "luk", "lk"] },
  { id: 43, name: "John", bhSlug: "john", aliases: ["john", "jhn", "jn", "joh"] },
  { id: 44, name: "Acts", bhSlug: "acts", aliases: ["acts", "act", "ac"] },
  { id: 45, name: "Romans", bhSlug: "romans", aliases: ["rom", "ro", "rm"] },
  { id: 46, name: "1 Corinthians", bhSlug: "1_corinthians", aliases: ["1cor", "1co"] },
  { id: 47, name: "2 Corinthians", bhSlug: "2_corinthians", aliases: ["2cor", "2co"] },
  { id: 48, name: "Galatians", bhSlug: "galatians", aliases: ["gal", "ga"] },
  { id: 49, name: "Ephesians", bhSlug: "ephesians", aliases: ["eph", "ephes"] },
  { id: 50, name: "Philippians", bhSlug: "philippians", aliases: ["phil", "php", "pp"] },
  { id: 51, name: "Colossians", bhSlug: "colossians", aliases: ["col", "co"] },
  { id: 52, name: "1 Thessalonians", bhSlug: "1_thessalonians", aliases: ["1thess", "1th", "1thes"] },
  { id: 53, name: "2 Thessalonians", bhSlug: "2_thessalonians", aliases: ["2thess", "2th", "2thes"] },
  { id: 54, name: "1 Timothy", bhSlug: "1_timothy", aliases: ["1tim", "1ti", "1tm"] },
  { id: 55, name: "2 Timothy", bhSlug: "2_timothy", aliases: ["2tim", "2ti", "2tm"] },
  { id: 56, name: "Titus", bhSlug: "titus", aliases: ["titus", "tit", "ti"] },
  { id: 57, name: "Philemon", bhSlug: "philemon", aliases: ["phlm", "phm", "pm", "philem"] },
  { id: 58, name: "Hebrews", bhSlug: "hebrews", aliases: ["heb", "he"] },
  { id: 59, name: "James", bhSlug: "james", aliases: ["james", "jas", "jm"] },
  { id: 60, name: "1 Peter", bhSlug: "1_peter", aliases: ["1pet", "1pe", "1pt"] },
  { id: 61, name: "2 Peter", bhSlug: "2_peter", aliases: ["2pet", "2pe", "2pt"] },
  { id: 62, name: "1 John", bhSlug: "1_john", aliases: ["1john", "1jn", "1jhn"] },
  { id: 63, name: "2 John", bhSlug: "2_john", aliases: ["2john", "2jn", "2jhn"] },
  { id: 64, name: "3 John", bhSlug: "3_john", aliases: ["3john", "3jn", "3jhn"] },
  { id: 65, name: "Jude", bhSlug: "jude", aliases: ["jude", "jud", "jd"] },
  { id: 66, name: "Revelation", bhSlug: "revelation", aliases: ["rev", "re", "rv", "revelations"] }
];

const chapterCache = new Map();

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

function decodeEntities(str) {
  return (str || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanVerseHtml(html) {
  return decodeEntities(
    (html || "")
      .replace(/<S>.*?<\/S>/gi, "")
      .replace(/<sup[^>]*>.*?<\/sup>/gi, "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/\s+/g, " ")
    .trim();
}

function pickPrimaryStrongCode(codes) {
  if (!codes || codes.length === 0) return null;
  // Prefer lexical root numbers (< 8800) over WLC grammar prefix codes (e.g. H9001/H9002) and Greek article G3588 when paired
  const nonGrammar = codes.filter((c) => {
    const num = parseInt(c.slice(1), 10);
    return num > 0 && num < 8800 && c !== "G3588";
  });
  if (nonGrammar.length > 0) return nonGrammar[nonGrammar.length - 1];
  return codes[codes.length - 1];
}

function parseVerseTokens(html, defaultPrefix) {
  const withoutFootnotes = (html || "")
    .replace(/<sup[^>]*>.*?<\/sup>/gi, "")
    .replace(/<br\s*\/?>/gi, " ");

  const parts = withoutFootnotes.split(/(<S>.*?<\/S>)/gi);
  const rawTokens = [];

  for (const part of parts) {
    const strongMatch = part.match(/^<S>\s*([HG]?\d+)\s*<\/S>$/i);
    if (strongMatch) {
      let code = strongMatch[1].toUpperCase();
      if (/^\d+$/.test(code)) {
        code = defaultPrefix + code;
      }
      rawTokens.push({ type: "strong", code });
    } else {
      const cleanText = decodeEntities(part.replace(/<[^>]+>/g, ""));
      if (cleanText) {
        rawTokens.push({ type: "text", text: cleanText });
      }
    }
  }

  // Attach following Strong's code(s) directly to the preceding text token so clicking the word itself looks up its Strong's number
  for (let i = 0; i < rawTokens.length; i++) {
    if (rawTokens[i].type === "text") {
      const attachedCodes = [];
      let j = i + 1;
      while (j < rawTokens.length) {
        if (rawTokens[j].type === "strong") {
          attachedCodes.push(rawTokens[j].code);
          j++;
        } else if (rawTokens[j].type === "text" && !rawTokens[j].text.trim()) {
          j++;
        } else {
          break;
        }
      }
      if (attachedCodes.length > 0) {
        rawTokens[i].strongCode = pickPrimaryStrongCode(attachedCodes);
      }
    }
  }

  return rawTokens;
}

function parseReference(rawRef) {
  if (!rawRef) return null;

  const s = String(rawRef)
    .replace(/(\d+)\s*[^a-zA-Z0-9,\s:]+\s*(\d+)/g, "$1-$2")
    .replace(/[^a-zA-Z0-9:,\-]+/g, " ")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*-\s*/g, "-")
    .replace(/\s*,\s*/g, ",")
    .replace(/^([1-3])([a-zA-Z])/i, "$1 $2")
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
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
    verseSet
  };
}

function formatVerseRangeLabel(bookName, chapter, verseNumbers) {
  if (!verseNumbers || verseNumbers.length === 0) {
    return `${bookName} ${chapter}`;
  }
  const sorted = [...verseNumbers].sort((a, b) => a - b);
  const ranges = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === prev + 1) {
      prev = sorted[i];
    } else {
      ranges.push(start === prev ? `${start}` : `${start}-${prev}`);
      start = sorted[i];
      prev = sorted[i];
    }
  }
  ranges.push(start === prev ? `${start}` : `${start}-${prev}`);
  return `${bookName} ${chapter}:${ranges.join(", ")}`;
}

function resolveTranslation(requestedCode, bookId) {
  const code = (requestedCode || "ESV").toUpperCase();
  const isOT = bookId <= 39;

  if (code === "ORIG") {
    return {
      // TISCH is Tischendorf's 8th Ed. Greek NT with polytonic accents AND embedded Strong's numbers
      apiCode: isOT ? "WLC" : "TISCH",
      isHebrew: isOT,
      strongPrefix: isOT ? "H" : "G"
    };
  }
  if (code === "WLC" && !isOT) {
    return {
      error: "WLC (Hebrew Masoretic) only covers the Old Testament. Choose 'ORIG', 'TISCH', or 'TR' for New Testament Greek."
    };
  }
  if ((code === "LXX" || code === "LXXE") && !isOT) {
    return {
      error: `${code} (Septuagint) only covers the Old Testament. Choose 'ORIG', 'TISCH', or 'TR' for New Testament Greek.`
    };
  }
  if ((code === "TISCH" || code === "NTGT" || code === "TR") && isOT) {
    return {
      error: `${code} only covers the Greek New Testament. Choose 'ORIG', 'LXX' (Greek OT), or 'WLC' (Hebrew OT) for the Old Testament.`
    };
  }

  const strongPrefix = code === "LXX" || !isOT ? "G" : "H";
  return { apiCode: code, isHebrew: code === "WLC", strongPrefix };
}

async function fetchChapterCached(apiCode, bookId, chapter) {
  const key = `${apiCode}_${bookId}_${chapter}`;
  if (chapterCache.has(key)) {
    return chapterCache.get(key);
  }
  const url = `https://bolls.life/get-text/${apiCode}/${bookId}/${chapter}/`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${apiCode} from server.`);
  }
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(`Passage not found in ${apiCode}.`);
  }
  chapterCache.set(key, data);
  return data;
}

function buildTranslationPayload(chapterVerses, targetSet, resolved) {
  const filtered = targetSet
    ? chapterVerses.filter((v) => targetSet.has(Number(v.verse)))
    : chapterVerses;

  return {
    resolvedTranslation: resolved.apiCode,
    isHebrew: resolved.isHebrew,
    verses: filtered.map((v) => ({
      verse: Number(v.verse),
      text: cleanVerseHtml(v.text),
      tokens: parseVerseTokens(v.text, resolved.strongPrefix)
    }))
  };
}

function stripDiacritics(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f\u0591-\u05bd\u05bf-\u05c7]/g, "")
    .toLowerCase()
    .trim();
}

function stemEnglish(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return w;
  return w
    .replace(/(?:eth|est|ing|ed|es|s)\$/, "")
    .replace(/i\$/, "y");
}

async function resolveWordFromVerseContext(word, bookId, chapter, verseNum) {
  if (!bookId || !chapter || !verseNum) return null;
  const isOT = bookId <= 39;
  const isGreekOrHebrew = /[^\u0000-\u007f]/.test(word);
  const refTranslation = isGreekOrHebrew ? (isOT ? "WLC" : "TISCH") : "KJV";
  const prefix = isOT ? "H" : "G";

  try {
    const chapterData = await fetchChapterCached(refTranslation, bookId, chapter);
    const verseObj = chapterData.find((v) => Number(v.verse) === Number(verseNum));
    if (!verseObj) return null;

    const tokens = parseVerseTokens(verseObj.text, prefix);
    const targetNorm = stripDiacritics(word);
    const targetStem = !isGreekOrHebrew ? stemEnglish(word) : null;

    for (const tok of tokens) {
      if (tok.type === "text" && tok.strongCode) {
        const wordsInToken = tok.text.trim().split(/\s+/);
        for (const w of wordsInToken) {
          const cleanW = w.replace(/[.,;:?!'"()[\]—–-]/g, "");
          if (!cleanW) continue;
          if (stripDiacritics(cleanW) === targetNorm) {
            return tok.strongCode;
          }
          if (targetStem && targetStem.length >= 3 && stemEnglish(cleanW) === targetStem) {
            return tok.strongCode;
          }
        }
      }
    }
  } catch (_) {}
  return null;
}

async function queryBdbtApi(queryStr) {
  const url = `https://bolls.life/dictionary-definition/BDBT/${encodeURIComponent(queryStr)}/`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const entries = await res.json();
  return Array.isArray(entries) ? entries : [];
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

    const primaryResolved = resolveTranslation(request.translation, parsed.book.id);
    if (primaryResolved.error) {
      sendResponse({ success: false, error: primaryResolved.error });
      return false;
    }

    let secondaryResolved = null;
    if (request.compareTranslation) {
      secondaryResolved = resolveTranslation(request.compareTranslation, parsed.book.id);
    }

    (async () => {
      try {
        const primaryChapter = await fetchChapterCached(
          primaryResolved.apiCode,
          parsed.book.id,
          parsed.chapter
        );

        let targetSet = parsed.verseSet;
        if (Array.isArray(request.overrideVerses) && request.overrideVerses.length > 0) {
          targetSet = new Set(request.overrideVerses.map(Number));
        }

        const primaryPayload = buildTranslationPayload(
          primaryChapter,
          targetSet,
          primaryResolved
        );

        if (primaryPayload.verses.length === 0) {
          throw new Error("Requested verse number not found in this chapter.");
        }

        let secondaryPayload = null;
        if (secondaryResolved) {
          if (secondaryResolved.error) {
            secondaryPayload = { error: secondaryResolved.error };
          } else {
            try {
              const secondaryChapter = await fetchChapterCached(
                secondaryResolved.apiCode,
                parsed.book.id,
                parsed.chapter
              );
              secondaryPayload = buildTranslationPayload(
                secondaryChapter,
                targetSet,
                secondaryResolved
              );
            } catch (secErr) {
              secondaryPayload = { error: secErr.message };
            }
          }
        }

        const activeVerseNums = primaryPayload.verses.map((v) => v.verse);
        const allChapterNums = primaryChapter.map((v) => Number(v.verse));
        const minChapterVerse = Math.min(...allChapterNums);
        const maxChapterVerse = Math.max(...allChapterNums);
        const minActive = Math.min(...activeVerseNums);
        const maxActive = Math.max(...activeVerseNums);

        const formattedRef = formatVerseRangeLabel(
          parsed.book.name,
          parsed.chapter,
          parsed.verseSet || request.overrideVerses ? activeVerseNums : null
        );

        sendResponse({
          success: true,
          data: {
            reference: formattedRef,
            bookId: parsed.book.id,
            bookName: parsed.book.name,
            bhSlug: parsed.book.bhSlug,
            chapter: parsed.chapter,
            activeVerses: activeVerseNums,
            canExpandPrev: minActive > minChapterVerse,
            canExpandNext: maxActive < maxChapterVerse,
            prevVerseNum: minActive > minChapterVerse ? minActive - 1 : null,
            nextVerseNum: maxActive < maxChapterVerse ? maxActive + 1 : null,
            primary: primaryPayload,
            secondary: secondaryPayload
          }
        });
      } catch (err) {
        sendResponse({ success: false, error: err.message });
      }
    })();

    return true;
  }

  if (request.action === "fetchStrong") {
    const rawQuery = String(request.query || "").trim();
    if (!rawQuery) {
      sendResponse({ success: false, error: "Empty lexicon query." });
      return false;
    }

    (async () => {
      try {
        let lookupKey = rawQuery;
        const isStrongCode = /^[HG]\d+\$/i.test(lookupKey);

        // 1. If the user clicked a word (not a Strong's code), try matching it to the verse's Strong's tag first
        if (!isStrongCode && request.bookId && request.chapter && request.verse) {
          const matchedCode = await resolveWordFromVerseContext(
            rawQuery,
            request.bookId,
            request.chapter,
            request.verse
          );
          if (matchedCode) {
            lookupKey = matchedCode;
          }
        }

        // 2. Query BDB/Thayer's Lexicon
        let entries = await queryBdbtApi(lookupKey);

        // 3. Fallback: try stripped English stem or stripped Greek/Hebrew diacritics if still empty
        if (entries.length === 0 && !/^[HG]\d+\$/i.test(lookupKey)) {
          const stemmed = stemEnglish(rawQuery);
          if (stemmed && stemmed.length >= 3 && stemmed !== rawQuery.toLowerCase()) {
            entries = await queryBdbtApi(stemmed);
          }
          if (entries.length === 0) {
            const unaccented = stripDiacritics(rawQuery);
            if (unaccented && unaccented !== rawQuery) {
              entries = await queryBdbtApi(unaccented);
            }
          }
        }

        if (!Array.isArray(entries) || entries.length === 0) {
          throw new Error(`No BDB/Thayer's lexicon entry found for "${rawQuery}".`);
        }

        // Prefer Greek (G) entries for New Testament books and Hebrew (H) entries for Old Testament books
        if (request.bookId) {
          const expectedPrefix = request.bookId <= 39 ? "H" : "G";
          const filteredByTestament = entries.filter((e) =>
            String(e.topic || "").toUpperCase().startsWith(expectedPrefix)
          );
          if (filteredByTestament.length > 0) {
            entries = filteredByTestament;
          }
        }

        const topEntries = entries.slice(0, 3).map((e) => ({
          topic: e.topic || lookupKey,
          lexeme: e.lexeme || "",
          transliteration: e.transliteration || "",
          pronunciation: e.pronunciation || "",
          shortDef: e.short_definition || "",
          fullDef: decodeEntities(
            (e.definition || "")
              .replace(/<br\s*\/?>/gi, "\n")
              .replace(/<\/p>/gi, "\n")
              .replace(/<\/li>/gi, "\n")
              .replace(/<[^>]+>/g, "")
          )
            .replace(/\n{3,}/g, "\n\n")
            .trim()
        }));

        sendResponse({ success: true, entries: topEntries });
      } catch (err) {
        sendResponse({ success: false, error: err.message });
      }
    })();

    return true;
  }
});