# barnavo os

my portfolio, built as a tiny operating system. 8 working apps, a boot screen, draggable windows on desktop, and an iOS style home screen on phones.

plain html, css and javascript. no frameworks, no build step, no running cost.

```
barnavo-os/
├── index.html          the page shell (rarely needs touching)
├── css/style.css       all the styling
├── js/content.js       ← ALL YOUR CONTENT LIVES HERE
├── js/os.js            the "operating system" (windows, dock, apps)
├── assets/
│   ├── resume.pdf      ← add this
│   ├── music/          ← add mp3s here
│   ├── wallpapers/     optional photo wallpapers
│   ├── og.png          link preview image for linkedin / whatsapp
│   ├── favicon.svg
│   └── icon-180.png    home screen icon on iphone
└── .nojekyll           tells github pages to serve files as is
```

---

## 1. deploy to github pages (10 minutes, free)

your site will live at **https://barnavo05.github.io**

1. go to github.com, click **new repository**
2. name it exactly **`barnavo05.github.io`** (this exact name is what gives you the clean url), keep it public, create it
3. upload the files. either:
   - **easy way:** on the empty repo page click "uploading an existing file", drag in everything inside the `barnavo-os` folder (not the folder itself, its contents, so `index.html` sits at the top level), commit
   - **terminal way:**
     ```bash
     cd barnavo-os
     git init
     git add .
     git commit -m "boot barnavo os"
     git branch -M main
     git remote add origin https://github.com/barnavo05/barnavo05.github.io.git
     git push -u origin main
     ```
4. in the repo go to **settings → pages**. under "build and deployment" pick **deploy from a branch**, branch **main**, folder **/ (root)**, save
5. wait a minute or two, then open https://barnavo05.github.io

every time you push a change, the site updates itself in a minute or so.

### test it on your laptop first
double clicking `index.html` mostly works, but the camera and some checks need a real server:

```bash
cd barnavo-os
python3 -m http.server 8000
# open http://localhost:8000
```

---

## 2. what's already done, and what's optional

done:
- one page resume at `assets/resume.pdf` (built from the content file, replace it anytime with the same filename)
- three calm background tracks in `assets/music/`, composed in code for this site, so there are no licensing questions
- jokes written into every note, kept light
- privacy and terms page (logo menu, about window, and the phone home screen)
- skeleton loaders on the resume viewer and project screenshots
- self hosted fonts (Schibsted Grotesk, Literata, IBM Plex Mono), so no google fonts request and no layout jump

optional, but worth it:
- **real product demos.** take a screenshot or a 10 to 20 second screen recording of each live project, put it in `assets/demos/`, and set `demo: "assets/demos/nazariq.png"` on that project in `content.js`. hiring managers trust a screenshot more than a link that might be asleep
- rewrite any project line that doesn't sound like you

---

## 3. editing content (only touch `js/content.js`)

everything people read is in one file. the ui code reads from it, so you never need to touch `os.js` to change words.

| what you want to change | where in `content.js` |
|---|---|
| name, headline, email, links, resume path | `site` |
| which app opens after boot | `site.openOnBoot` |
| the "Ask Barnavo" pop-up banner | `notification` (set to `null` to turn off) |
| experience, education, leadership, skills | `profile` |
| the notes (main app) | `notes` |
| projects in Finder | `projects` (first one shows first) |
| JobPipe roadmap | `projects[0].roadmap` with `done`, `now`, `next` |
| ask barnavo answers and chips | `askBarnavo` |
| music tracks | `music.tracks` |
| mail subject and placeholder | `mail` |
| terminal jokes | `terminal` |
| wallpapers | `wallpapers` |

### writing notes
note bodies use a tiny markdown:

```
# big title
~ grey line under a title
## section title
- bullet point
**bold**  *italic*  `code`
[a link](https://example.com)
[open a note](note:how-i-think)
[open an app](app:finder)
[open a project](project:jobpipe)
```

and a few blocks that pull from your data, so you only write things once:

```
{{experience:assurentis}}   job, bullets and stack from profile.experience
{{leadership:all}}
{{education:all}}
{{skills:all}}
{{roadmap:jobpipe}}         roadmap cards from the jobpipe project
{{contact:buttons}}         copy email / email / linkedin / github buttons
```

add a new note by copying one `{ id, title, body }` block. the `id` is what links and the url use.

### updating the jobpipe roadmap
when you ship something, move it from `next` to `now` to `done`. it updates the note, the project window and the terminal at once.

### adding a project
copy a project block, give it a unique `id`, two `colors` for the folder and header, and leave `live` as `""` if there's no live link yet.

### teaching ask barnavo new answers
add to `askBarnavo.qa`:

```js
{ keywords: ["relocate", "bengaluru", "remote"], a: "your answer here, links work too: [email me](mailto:...)" }
```

the answer with the most keyword hits wins. multi word keywords count more. anything unmatched gets `fallback`.

### wallpapers
gradients are free (zero bytes). to use a photo, drop it in `assets/wallpapers/` and add:

```js
{ id: "goa", name: "goa", image: "assets/wallpapers/goa.jpg" }
```

keep photos under ~400 kb so the phone version stays fast.

---

## 4. deep links (handy for cold dms)

send people straight to the good stuff:

- `https://barnavo05.github.io/#jobpipe` opens the JobPipe project
- `https://barnavo05.github.io/#notes/how-i-think` opens a specific note
- `https://barnavo05.github.io/#terminal` opens an app (`notes`, `ask`, `finder`, `photobooth`, `music`, `terminal`, `preview`, `mail`)

---

## 5. plugging in a real llm later

ask barnavo already has a swap point. **never put an api key in this repo**, anything here is public. instead, run a tiny serverless function that holds the key, and point the site at it.

1. create a free cloudflare worker (or vercel / netlify function) that:
   - accepts a `POST` with json `{ question, history, context }`
   - `context` is a plain text dump of your notes, experience and projects, built automatically by the site
   - calls the llm of your choice with a system prompt like "you are barnavo. answer only from this context, casually, in lowercase, no em dashes" plus the context
   - returns `{ "answer": "..." }`
   - allows cors from `https://barnavo05.github.io` only, and adds basic rate limiting so nobody drains your credits
2. in `content.js` set:
   ```js
   llm: { enabled: true, endpoint: "https://your-worker.your-name.workers.dev/ask" }
   ```

if the endpoint is down or slow, the site quietly falls back to the keyword answers, so it never breaks.

---

## 6. little details that are already handled

- boot screen runs for about 1 second, shorter if the visitor prefers reduced motion
- dark mode follows the visitor's system setting
- the terminal is a hidden easter egg: press the \` key on desktop, or use the logo menu
- wallpaper choice is remembered per visitor, nothing else is stored
- photo booth only turns on the camera after a tap, stops it when the window closes, and never uploads anything
- the "send" button in mail opens the visitor's own mail app. nothing is sent from the site
- phones get a clean resume card instead of a broken pdf embed
- link previews on linkedin and whatsapp use `assets/og.png`

### design rules this site follows
flat and matte, crisp 1px frames instead of drop shadows, no glass blur, no hover animations, no sparkle icons, no emojis, no em dashes, sentence case labels. keep it that way when you edit.
