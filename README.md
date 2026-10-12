# 📖 Quick Bible Verse Lookup

A lightweight Chromium browser extension (Chrome, Edge, Brave) that lets you highlight any Bible reference on a webpage to view the passage in a clean floating popup—including inside dynamic AI interfaces like **Google Gemini**.

## Features

* **Works Everywhere (Including Gemini AI):** Listens dynamically to text selections rather than scanning pages only once on load, and builds the UI with native DOM methods inside an isolated Shadow DOM to respect strict `TrustedHTML` and Content Security Policy (CSP) headers.
* **12 English Translations:** Switch on the fly between **ESV**, **NIV**, **NLT**, **NKJV**, **NASB**, **KJV**, **LSB**, **BSB**, **NET**, **AMP**, **WEB**, and **YLT** (powered by the free [Bolls.life API](https://bolls.life/)).
* **Smart Reference Parsing:** Automatically recognizes standard book names, common abbreviations (e.g., `1 Cor 15:3-4`, `Rom 8:28`), comma-separated verses, and AI-generated en-dashes (`–`).
* **Zero Tracking:** Runs locally on selection events and only contacts the Bible API when you click to read a verse.

---

## How to Install

### Option 1: Download from Releases (Easiest)
1. Go to the **Releases** section on the right side of this GitHub page and download the latest `QuickBibleVerseLookup.zip` file.
2. Right-click the downloaded `.zip` file and select **Extract All...** to unzip it into a folder on your computer.
3. Open your browser and navigate to the Extensions page:
   * **Microsoft Edge:** Type `edge://extensions` in the address bar and press **Enter**.
   * **Google Chrome:** Type `chrome://extensions` in the address bar and press **Enter**.
   * **Brave:** Type `brave://extensions` in the address bar and press **Enter**.
4. Turn on the **Developer mode** toggle switch (located in the left sidebar on Edge, or the top-right corner on Chrome/Brave).
5. Click the **Load unpacked** button and select the unzipped folder containing `manifest.json`.
6. Refresh any open tabs to start using the extension!

### Option 2: Clone with Git
1. Run `git clone https://github.com/YOUR-USERNAME/quick-bible-verse-lookup.git`
2. Open `edge://extensions` or `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the cloned folder.

---

## 💡 How to Use

1. **Highlight** any Bible verse reference on a webpage (for example, `John 3:14–16` or `Romans
