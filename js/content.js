/* =====================================================================
   barnavo os · CONTENT FILE
   ---------------------------------------------------------------------
   everything people read on the site lives here. edit this file only,
   the ui code in os.js reads from it.

   house rules
   - no em dashes or en dashes anywhere. commas, periods, line breaks.
   - lead with proof, not adjectives. a hiring manager skims first.

   mini markdown used in note bodies and answers
   # big title            ## section title        ~ grey line under a title
   - bullet               **bold**                *italic*      `code`
   > **box title**        > - box bullet          (a summary box, keep lines together)
   [text](https://...)    external link
   [text](note:id)        opens a note            [text](app:finder) opens an app
   [text](project:id)     opens a project window
   {{roadmap:jobpipe}}    roadmap from a project  {{experience:assurentis}}
   {{leadership:all}}     {{education:all}}       {{skills:all}}   {{contact:buttons}}
   ===================================================================== */

window.CONTENT = {

  /* ---------- basics ---------- */
  site: {
    osName: "barnavo os",
    name: "Barnavo Dey",
    shortName: "barnavo",
    headline: "Product Analyst / APM. I ship products, then measure them.",
    email: "barnavodey05@gmail.com",
    linkedin: "https://www.linkedin.com/in/barnavo-dey",
    github: "https://github.com/barnavo05",
    resume: "assets/resume.pdf",
    resumeDownloadName: "Barnavo_Dey_Resume.pdf",
    sourceRepo: "https://github.com/barnavo05/barnavo05.github.io",
    defaultWallpaper: "monsoon",
    openOnBoot: "notes"
  },

  /* little banner a few seconds after boot. set to null to turn off */
  notification: {
    app: "ask",
    title: "Ask Barnavo",
    body: "questions? i have prewritten answers. very fast ones.",
    delay: 5000
  },

  /* ---------- structured profile (used by notes, terminal and resume) ---------- */
  profile: {
    location: "Gwalior, open to Bengaluru and other metros",
    education: {
      degree: "B.Tech Computer Science",
      school: "SRM Institute of Science and Technology",
      year: "2026",
      cgpa: "8.59"
    },
    experience: [
      {
        id: "assurentis",
        company: "Assurentis Technologies",
        role: "Intern, Test Automation",
        period: "Aug 2026 to present",
        location: "remote",
        about: "b2b saas for oracle fusion cloud erp, covering accounts payable, general ledger and hcm. i work on the engine that tests it, and on what clients see when it reports back.",
        bullets: [
          "**rebuilt the client facing test report** so clients can read results on their own: plain language errors, accurate timings, correct pass/fail per step, and the right screenshots",
          "**caught a false pass bug** where invoices stuck in \"not validated\" were reported as passed",
          "**audited ~130 generated test specs** and flagged coverage gaps that shaped what the team fixed next",
          "**automated end to end accounts payable flows** across 9 invoice scenarios",
          "**restored the team's ci pipeline the same day** an os upgrade broke every run, and made the test engine work across 3 oracle environments"
        ],
        stack: ["TypeScript", "Playwright", "GitHub Actions", "Firestore", "Oracle REST APIs"]
      }
    ],
    leadership: [
      { role: "Committee Head, External Affairs", org: "AARUUSH", note: "SRM's national tech fest, 10,000+ attendees" },
      { role: "Corporate Relations Member", org: "SRM Placement Team", note: "" }
    ],
    skills: {
      product: ["product metrics", "funnels", "cohorts", "a/b test design", "PRDs", "user stories", "UAT"],
      data: ["SQL", "Python", "Tableau", "Excel"],
      build: ["TypeScript", "Next.js", "Supabase", "REST APIs", "LLM APIs", "RAG"]
    }
  },

  /* ---------- NOTES (the main app) ---------- */
  notes: [
    {
      id: "about",
      title: "about me",
      body: `
# hey, i'm barnavo
~ product analyst / apm. i ship products, then measure them.

> **if you only have 30 seconds**
> - 2026 cs grad, SRM Institute of Science and Technology, CGPA 8.59
> - looking for product analyst and apm roles. based in gwalior, open to bengaluru and other metros
> - interning in test automation on a b2b oracle erp saas, where i caught a false pass and rebuilt the client report
> - building [JobPipe](project:jobpipe) in public, an open source job alert bot
> - rank 4 at AI for Bharat Hackathon 2026, and a first-author IEEE paper out of the same project

you just booted an entire operating system to read about one guy. bold use of a lunch break, and i appreciate it.

the part of building i like most is the loop around it: deciding what's worth building, shipping the smallest version that answers the question, and then checking the numbers to see if i was right. usually i'm about half right, which is why the checking part matters.

## where to go next
- [how i think](note:how-i-think) is the note i'd read if i were hiring me
- [experience](note:experience) has what i actually did at work
- [finder](app:finder) has every project, with live links and repos
- [ask barnavo](app:ask) answers the usual recruiter questions

there's also a terminal hidden somewhere in here. if you find it, try \`hire barnavo\`. it does exactly what you think.
`
    },
    {
      id: "experience",
      title: "experience",
      body: `
# experience
~ where i've worked, and what changed because i was there

{{experience:assurentis}}

the short version: i make automated tests tell the truth, and then make the results readable by people who didn't write the tests. turns out a test that always passes is very relaxing, right up until a client reads it.

## leadership
{{leadership:all}}

running external affairs for a 10,000+ person fest is mostly stakeholder management with a deadline you can't move. good practice for product work, worse for sleep.

## education
{{education:all}}

## skills
{{skills:all}}
`
    },
    {
      id: "products",
      title: "products i've built",
      body: `
# products i've built
~ five projects, none of them a todo app. full write ups live in [finder](app:finder).

## [JobPipe](project:jobpipe), building in public
open source telegram job alerts. checks 60+ company career pages plus linkedin, indeed and naukri, and will send matched alerts twice a day at zero infra cost.

## [NazarIQ](project:nazariq)
a job search toolkit: a ghost job scorer, a referral message generator and a proof of work brief. next.js, typescript, supabase, gemini.

## [KharchaAI / StatementIQ](project:kharchaai)
rag + llm analytics on bank statements, plus an underwriting demo for the lending side.

## [FasalDrishti](project:fasaldrishti)
ai fruit quality grading (cnn + dcfnet + grad-cam) with shelf life estimation. rank 4 at AI for Bharat Hackathon 2026, and a first-author IEEE paper.

## [Retail Sales Analytics](project:retail)
a sql pipeline on ~10k order rows feeding a tableau dashboard.

you may notice a theme: two of these are about job hunting. i like to build for problems i have personally been annoyed by. it keeps the user research cheap.
`
    },
    {
      id: "now",
      title: "what i'm building now",
      body: `
# what i'm building now
~ JobPipe, building in public

job hunting is mostly refreshing career pages and calling it productivity. JobPipe does the refreshing for you, so you only have to do the calling it productivity part.

it's a free, open source telegram bot. it checks 60+ company career pages plus linkedin, indeed and naukri, and will send matched alerts twice a day. infra cost: zero, which is also the budget.

{{roadmap:jobpipe}}

## what i'll measure at launch
- **signups**, to know if the pitch lands at all
- **2 week retention**, to know if the alerts are worth keeping
- **thumbs-down rate**, to know when matching is wrong
- **an a/b test of embedding vs keyword matching**, because "the fancy one is better" still has to prove it

[read the full write up](project:jobpipe) or [peek at the repo](https://github.com/barnavo05/jobpipe).
`
    },
    {
      id: "how-i-think",
      title: "how i think",
      body: `
# how i think
~ product calls i've made, the trade-off behind each, and what i'd watch

## telegram over whatsapp
for JobPipe i picked telegram. whatsapp would have meant per message costs and a real chance of the number getting banned, and for a free bot either one ends the product. the trade-off: telegram has fewer users in india, so reach is the risk i'm accepting.

## launch before building an app
no app yet. the bot goes out first, and an app only happens if retention says people want more. building the fancy version before anyone uses the simple one is how side projects become very nice github repos with one star. mine.

## decide what "working" means before launch
signups, 2 week retention and thumbs-down rate are wired up before anything goes live, along with the matching a/b test. if i pick the metric after seeing the data, i'll just pick whichever number looks nicest.

## a pass has to mean pass
at assurentis i caught invoices stuck in "not validated" being reported as passed. a green checkmark that lies costs more than a red one, because nobody goes back to check green. so that got fixed before anything else.

## reports are for the reader
the client test report needed someone on our side to explain it. i rebuilt it so clients can read it alone: plain language errors, correct results per step, the right screenshots. fewer calls for us, more trust for them.

## audit before you fix
going through ~130 generated test specs showed where coverage was thin. that list decided what the team fixed next, instead of whatever broke most loudly that week.
`
    },
    {
      id: "wins",
      title: "wins",
      body: `
# wins
~ the trophy shelf, digital edition

## rank 4, AI for Bharat Hackathon 2026
at IIIT Delhi, with [FasalDrishti](project:fasaldrishti), an ai fruit quality grader with shelf life estimation.

## first-author IEEE paper
accepted at AMLDS 2026 in osaka. the hackathon project turned into actual research. the research did not turn into less work.

## running external affairs for AARUUSH
committee head of external affairs for SRM's national tech fest, 10,000+ attendees.

## the same day ci rescue
an os upgrade broke every ci run at assurentis. the pipeline was green again the same day, which is the only acceptable amount of time for a team to stare at red.
`
    },
    {
      id: "hit-me-up",
      title: "hit me up",
      body: `
# hit me up
~ recruiters, founders, hiring managers, curious people. all welcome.

if you've read this far, you're either hiring or very bored. both are good reasons to email me.

{{contact:buttons}}

- email: [barnavodey05@gmail.com](mailto:barnavodey05@gmail.com)
- linkedin: [linkedin.com/in/barnavo-dey](https://www.linkedin.com/in/barnavo-dey)
- github: [github.com/barnavo05](https://github.com/barnavo05)

or grab the [one page resume](app:preview). i usually reply within a day.
`
    }
  ],

  /* ---------- FINDER projects (first one shows first) ----------
     optional demo: drop a screenshot or short screen recording in assets/demos/
     and set demo: "assets/demos/name.png" (or .mp4). it shows at the top of the window. */
  projects: [
    {
      id: "jobpipe",
      name: "JobPipe",
      tagline: "open source telegram job alerts, built in public",
      status: "building in public",
      colors: ["#2f6b57", "#1f4fb8"],
      demo: "",
      what: "a free, open source telegram bot for job alerts. it checks 60+ company career pages plus linkedin, indeed and naukri, and will send matched alerts twice a day at zero infra cost. currently in development.",
      problem: "openings are scattered across dozens of career pages and three big job boards. checking them all by hand every day doesn't scale, and the big boards are full of listings that were never going to hire.",
      decisions: [
        "**telegram over whatsapp.** whatsapp meant per message cost and ban risk, both fatal for a free bot. i'm accepting telegram's smaller reach in exchange",
        "**launch before building an app.** the bot ships first. an app only if 2 week retention says people want more",
        "**metrics before launch.** signups, 2 week retention and thumbs-down rate are tracked from day one, so success is defined before i see the data",
        "**test the matching, don't assume it.** an a/b test of embedding vs keyword matching is set up for launch",
        "**a ghost job detector.** an alert is only useful if the job is real, so filtering comes before volume"
      ],
      roadmap: {
        done: ["ghost job detector", "metrics tracking: signups, 2 week retention, thumbs-down rate", "a/b test set up: embedding vs keyword matching", "picked telegram over whatsapp"],
        now: ["checking 60+ career pages plus linkedin, indeed and naukri", "matching jobs to each user"],
        next: ["public launch", "matched alerts twice a day", "read the a/b test results", "an app, only if retention says so"]
      },
      stack: [],
      live: "",
      repo: "https://github.com/barnavo05/jobpipe"
    },
    {
      id: "nazariq",
      name: "NazarIQ",
      tagline: "a job search toolkit",
      status: "live",
      colors: ["#3567a6", "#1c2629"],
      demo: "",
      what: "three small tools for job seekers: a ghost job scorer, a referral message generator and a proof of work brief.",
      problem: "job seekers spend applications on listings that may never hire, send referral asks that get ignored, and send resumes that don't show what they can actually do.",
      decisions: [
        "**three narrow tools instead of one big assistant.** each one answers a single question: is this job real, how do i ask for a referral, how do i show proof",
        "**a cheap, fast stack.** next.js and supabase keep it free to run, with gemini doing the writing parts"
      ],
      stack: ["Next.js", "TypeScript", "Supabase", "Gemini"],
      live: "https://nazar-app-beta.vercel.app",
      repo: "https://github.com/barnavo05/nazar-app"
    },
    {
      id: "kharchaai",
      name: "KharchaAI / StatementIQ",
      tagline: "bank statement analytics with rag + llm",
      status: "live",
      colors: ["#8a6a35", "#a8392f"],
      demo: "",
      what: "rag + llm analytics on bank statements, plus an underwriting demo.",
      problem: "bank statements are long and hard to read, both for the people they belong to and for the lenders who have to judge them.",
      decisions: [
        "**rag so answers stay grounded** in the actual statement instead of the model's imagination",
        "**an underwriting demo next to personal finance**, to show the same engine works for the lender side, which is where the money is"
      ],
      stack: ["RAG", "LLM APIs", "Python", "Streamlit"],
      live: "https://kharchaai.streamlit.app",
      repo: "https://github.com/barnavo05/kharchaAI"
    },
    {
      id: "fasaldrishti",
      name: "FasalDrishti",
      tagline: "ai fruit quality grading with shelf life estimation",
      status: "rank 4, IEEE paper",
      colors: ["#2f6b57", "#d9a521"],
      demo: "",
      what: "ai fruit quality grading using cnn + dcfnet + grad-cam, with shelf life estimation.",
      problem: "grading fruit by eye is slow and inconsistent, and knowing how long produce will last matters as much as how it looks today.",
      decisions: [
        "**grad-cam on top of the classifier**, so a person can see what the model looked at before trusting its grade",
        "**shelf life alongside the grade**, so the output says what to do with the fruit next"
      ],
      highlights: [
        "rank 4 at AI for Bharat Hackathon 2026 (IIIT Delhi)",
        "first-author IEEE paper accepted at AMLDS 2026, osaka"
      ],
      stack: ["CNN", "DCFNet", "Grad-CAM", "Python", "Streamlit"],
      live: "https://fasaldrishti.streamlit.app",
      repo: "https://github.com/barnavo05/fasaldrishti"
    },
    {
      id: "retail",
      name: "Retail Sales Analytics",
      tagline: "a sql pipeline feeding a tableau dashboard",
      status: "repo",
      colors: ["#56707b", "#1c2629"],
      demo: "",
      what: "a sql pipeline on ~10k order rows feeding a tableau dashboard.",
      problem: "raw order rows don't answer questions until they're cleaned, modelled and put somewhere a non-analyst can look at them.",
      decisions: [
        "**heavy lifting in sql, tableau only for the view**, so the logic lives in one place and can be checked"
      ],
      stack: ["SQL", "Tableau"],
      live: "",
      repo: "https://github.com/barnavo05/retail-sales-dashboard"
    }
  ],

  /* ---------- ASK BARNAVO ----------
     zero cost keyword matching. the answer with the most keyword hits wins.
     to plug in a real llm later, set llm.enabled to true and point llm.endpoint
     at YOUR OWN serverless function (never put an api key here). see README. */
  askBarnavo: {
    subtitle: "prewritten answers, instant delivery",
    placeholder: "ask about projects, work, skills...",
    greeting: "hi, i'm barnavo. well, a prewritten version of me. ask anything, or tap a question below.",
    chips: ["what did you build?", "why product?", "can you code?", "what are you building now?", "tell me about your internship", "where are you based?", "how do i reach you?"],
    llm: {
      enabled: false,
      endpoint: ""   // e.g. "https://your-worker.your-name.workers.dev/ask"
    },
    fallback: "i don't have a prewritten answer for that one. try a question below, or [email me](mailto:barnavodey05@gmail.com). the real barnavo improvises better than this one.",
    qa: [
      {
        keywords: ["hi", "hello", "hey", "yo", "sup", "hola", "namaste"],
        a: "hey! ask me what i've built, why product, or whether i can code. or tap a question below."
      },
      {
        keywords: ["who", "about", "yourself", "introduce", "barnavo", "background", "tell me about you"],
        a: "i'm barnavo, a 2026 cs grad from SRM looking for product analyst and apm roles. i ship products, then measure them. right now i'm interning in test automation at Assurentis Technologies and building **JobPipe** in public. [read the about note](note:about)"
      },
      {
        keywords: ["build", "built", "projects", "project", "products", "made", "portfolio", "shipped"],
        a: "the main one right now is **JobPipe**, a free telegram job alert bot i'm building in public. before that: **NazarIQ** (job search toolkit), **KharchaAI** (rag + llm bank statement analytics), **FasalDrishti** (ai fruit grading, rank 4 at a national hackathon and an IEEE paper) and a **retail sales** sql + tableau dashboard. [open finder](app:finder) for live links."
      },
      {
        keywords: ["why product", "product", "apm", "pm", "product manager", "product analyst", "analyst", "why"],
        a: "because the part i enjoy most is deciding what to build and then checking whether it worked. even in a test automation internship my best work was product shaped: rebuilding a client report so clients could read it alone, and catching a false pass that would have misled them. [see how i think](note:how-i-think)"
      },
      {
        keywords: ["code", "coding", "program", "programming", "engineer", "developer", "technical", "tech stack", "stack", "typescript", "python", "sql", "nextjs", "next.js"],
        a: "yes. typescript, python and sql day to day, and i've shipped with next.js, supabase, playwright, streamlit, llm apis and rag. every project in [finder](app:finder) has a repo, so you can check instead of trusting me."
      },
      {
        keywords: ["jobpipe", "now", "currently", "building now", "working on", "telegram", "side project", "in public"],
        a: "**JobPipe**, an open source telegram bot that checks 60+ career pages plus linkedin, indeed and naukri, and will send matched alerts twice a day at zero infra cost. telegram over whatsapp for cost and ban risk, bot before app, and metrics plus an embedding vs keyword a/b test ready for launch. [see the roadmap](note:now)"
      },
      {
        keywords: ["intern", "internship", "assurentis", "experience", "job", "work", "oracle", "playwright", "testing", "automation"],
        a: "intern, test automation at **Assurentis Technologies** (aug 2026 to present, remote), on b2b saas for oracle fusion cloud erp. i rebuilt the client test report so clients can read it alone, caught a false pass bug on invoices, audited ~130 test specs for coverage gaps, automated accounts payable flows across 9 scenarios, and got ci green again the same day an os upgrade broke it. [full details](note:experience)"
      },
      {
        keywords: ["where", "based", "location", "relocate", "relocation", "bengaluru", "bangalore", "city", "remote", "onsite"],
        a: "based in gwalior, open to bengaluru and other metros."
      },
      {
        keywords: ["college", "education", "degree", "srm", "cgpa", "gpa", "graduate", "graduated", "university", "study", "studied"],
        a: "b.tech in computer science from SRM Institute of Science and Technology, graduated 2026 with a CGPA of 8.59."
      },
      {
        keywords: ["hackathon", "ieee", "paper", "award", "win", "wins", "achievement", "achievements", "fasaldrishti", "research", "osaka"],
        a: "rank 4 at AI for Bharat Hackathon 2026 at IIIT Delhi with **FasalDrishti**, and that project became a first-author IEEE paper accepted at AMLDS 2026 in osaka. [more wins](note:wins)"
      },
      {
        keywords: ["contact", "email", "mail", "reach", "linkedin", "hire", "talk", "call", "connect", "resume", "cv", "available"],
        a: "email is fastest: [barnavodey05@gmail.com](mailto:barnavodey05@gmail.com). also on [linkedin](https://www.linkedin.com/in/barnavo-dey) and [github](https://github.com/barnavo05). the resume is in [preview](app:preview)."
      },
      {
        keywords: ["skills", "skill", "metrics", "funnel", "funnels", "cohort", "cohorts", "a/b", "ab test", "prd", "prds", "tableau", "excel", "uat"],
        a: "product: metrics, funnels, cohorts, a/b test design, prds, user stories, uat. data: sql, python, tableau, excel. building: typescript, next.js, supabase, rest apis, llm apis, rag."
      },
      {
        keywords: ["lead", "leadership", "aaruush", "fest", "placement", "team", "teamwork", "manage"],
        a: "i was committee head of external affairs for **AARUUSH**, SRM's national tech fest with 10,000+ attendees, and a corporate relations member on the SRM placement team."
      },
      {
        keywords: ["weakness", "weaknesses", "bad at", "improve"],
        a: "i over-instrument. JobPipe had its metrics dashboard planned before it had users. i'm learning that sometimes the right metric is just \"did anyone reply\"."
      },
      {
        keywords: ["joke", "funny", "fun", "hobby", "hobbies", "weekend", "free time"],
        a: "the good jokes are in the notes app. i call it a retention strategy."
      }
    ]
  },

  /* ---------- MUSIC ----------
     three calm tracks composed in code for this site. swap in your own mp3s anytime. */
  music: {
    credit: "composed in code for this site. no samples, no royalties.",
    tracks: [
      { title: "quiet build", artist: "barnavo os", length: "1:36", src: "assets/music/quiet-build.mp3", colors: ["#2e4b57", "#c9b48a"] },
      { title: "green ci", artist: "barnavo os", length: "1:36", src: "assets/music/green-ci.mp3", colors: ["#2f4a3a", "#9db58a"] },
      { title: "after hours", artist: "barnavo os", length: "1:36", src: "assets/music/after-hours.mp3", colors: ["#16222a", "#3a6073"] }
    ]
  },

  /* ---------- MAIL ---------- */
  mail: {
    subject: "hi barnavo, saw your portfolio",
    placeholder: "say hi, ask a question, or tell me about the role. this opens in your own mail app."
  },

  /* ---------- TERMINAL ---------- */
  terminal: {
    user: "guest",
    host: "barnavo-os",
    secrets: "you found the secrets file. the secret is: i actually reply to every message. revolutionary, i know.",
    coffee: [
      "[sudo] password for guest: ********",
      "grinding beans...",
      "brewing...",
      "error: this is a portfolio, not a café.",
      "but i'm always up for a coffee chat. type `open mail`."
    ]
  },

  /* ---------- PRIVACY AND TERMS ---------- */
  legal: `
# privacy and terms
~ last updated november 2026. short, because there isn't much to say.

## privacy
- **no tracking.** no cookies, no analytics, no ad pixels, no fingerprinting.
- **one thing is saved in your browser:** your wallpaper choice, in local storage, so it's still there next time. clear your site data to remove it.
- **photo booth** only turns on your camera after you tap the button. photos are made inside your browser, never uploaded, and the camera switches off when you close the window.
- **ask barnavo** answers from a prewritten list inside the page. your questions aren't sent or stored anywhere.
- **mail** opens your own email app. this site never sends anything on your behalf.
- **hosting.** the site is served by github pages, which may log basic request data such as ip addresses. see [github's privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- **links out** to linkedin, github and project demos are covered by those sites' own policies.

## terms
- **content.** text, resume and design are © 2026 Barnavo Dey. sharing the link is very welcome. passing the content off as your own is not.
- **projects.** code linked from here is covered by the license in each project's repository.
- **as is.** this is a portfolio, not a real operating system. it's provided as is, and nothing here is an offer, contract or guarantee.
- **music** was composed for this site and is free to listen to here.

questions? [barnavodey05@gmail.com](mailto:barnavodey05@gmail.com)
`,

  /* ---------- WALLPAPERS ----------
     soft gradients with a little grain. to use a photo instead, add
     { id: "mine", name: "mine", image: "assets/wallpapers/mine.jpg" } */
  wallpapers: [
    { id: "monsoon", name: "monsoon", css: "linear-gradient(168deg, #24414c 0%, #4f7470 48%, #b7a77f 100%)" },
    { id: "sandstone", name: "sandstone", css: "linear-gradient(170deg, #4a3a33 0%, #8c6a52 50%, #d4b993 100%)" },
    { id: "tea", name: "tea garden", css: "linear-gradient(165deg, #1f3a2e 0%, #4d7556 55%, #a9bf8f 100%)" },
    { id: "night", name: "night train", css: "linear-gradient(180deg, #121d24 0%, #22404f 60%, #3f6676 100%)" },
    { id: "dusk", name: "dusk", css: "linear-gradient(172deg, #2d3a4f 0%, #6e6a78 50%, #c99c7b 100%)" },
    { id: "fog", name: "fog", css: "linear-gradient(170deg, #9aa8a6 0%, #c3cbc6 55%, #e0e3dc 100%)" }
  ]
};
