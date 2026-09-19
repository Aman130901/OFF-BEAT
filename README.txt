OFF/BEAT website concept, version 2 (multi-page)
================================================

An unofficial design concept for OFF/BEAT, a venture by Aman Gupta. It is NOT the
official site and is not affiliated with OFF/BEAT or Aman Gupta. Facts on the pages come
from public news reports and a law-firm deal note (March to July 2026). Flows and
feature ideas on the Studio, Creators and Founders pages are illustrative concept copy.

How to run
----------
Open index.html in any browser. No build step. Keep all files in the same folder.
The Archivo font loads from Google Fonts; without internet it falls back to Impact / Arial Narrow.

Pages
-----
index.html      Home: hero with beat sequencer, directions, quick pitch, founder facts
studio.html     How a venture-studio build could run, plus public facts
creators.html   How working with creators could look
founders.html   Invitation to founders, what to bring, FAQ
contact.html    Pitch form with validation (nothing is sent)
styles.css      All styling (colour tokens, dark mode, responsive rules)
script.js       Mobile menu, beat sequencer, quick pitch hand-off, form validation

Easy edits
----------
- Colours: variables at the top of styles.css (--blue, --gold, --navy, ...)
- Copy: edit the text directly in each HTML file
- Sequencer speed: STEP in script.js (milliseconds per step)
- Form: contact.html submits nowhere. Connect it to your own backend to make it real.
