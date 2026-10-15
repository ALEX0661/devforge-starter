import { useState } from 'react'
import logo from './assets/logo-light.svg'
import './App.css'

// ─────────────────────────────────────────────────────────
// EDIT HERE. Change any text below and save: the page
// updates instantly (HMR) without a refresh.
//
// Tip: wrap a word in `backticks` inside any text to show it
// as inline code, like `npm run build`.
// ─────────────────────────────────────────────────────────
const SITE = {
  label: 'Update 3',
  repo: 'https://github.com/ALEX0661/devforge-starter',
  headline: ['Take your project', 'from laptop to live.'], // second line is highlighted
  intro:
    "The step-by-step guide from the DevForge webinar. Put the same React project online with Vercel, Netlify and Firebase, then try it again on your own.",
}

const LINKS = [
  { label: 'Vite', href: 'https://vite.dev/' },
  { label: 'React', href: 'https://react.dev/' },
  { label: 'GitHub', href: SITE.repo },
]

// ───────── Guide content ─────────
const GLOSSARY = [
  { term: 'Deployment', text: 'Putting your website on the internet so other people can open it.' },
  { term: 'Hosting', text: 'Renting a computer that is always on and stores your site for visitors.' },
  { term: 'Domain', text: 'The address of your site, like mysite.com.' },
  { term: 'Repository', text: 'Your project folder, saved online on GitHub. Also called a repo.' },
  { term: 'Build', text: 'Turning your code into files a browser can run. In this project it creates the `dist` folder.' },
  { term: 'Environment variable', text: 'A secret setting, like a password, kept outside your code.' },
]

// Each section has steps. A step can have `code` (shows a copy button)
// and `note` (shows a highlighted tip). To add a step, copy a block.
const GUIDE = [
  {
    id: 'setup',
    title: 'Get ready',
    intro: 'Do this once. After this, every platform below is just a few clicks.',
    steps: [
      {
        title: 'Install the tools',
        text: 'Install Node.js (nodejs.org), Git (git-scm.com) and VS Code (code.visualstudio.com). Then check that Node and Git work.',
        code: 'node -v\ngit --version',
      },
      {
        title: 'Get the project',
        text: 'Easiest: open the DevForge starter on GitHub and click Fork to copy it to your own account. Then clone your copy.',
        link: { label: 'Open the DevForge starter on GitHub', href: SITE.repo },
        code: 'git clone https://github.com/YOUR-USERNAME/devforge-starter.git\ncd devforge-starter',
        note: 'Want to start from scratch instead? Run `npm create vite@latest my-app -- --template react`, choose React and JavaScript, then `cd my-app`.',
      },
      {
        title: 'Install the packages',
        text: 'This downloads everything the app needs to run.',
        code: 'npm install',
      },
      {
        title: 'Run it on your laptop',
        text: 'Open the localhost link it prints. Only you can see this page.',
        code: 'npm run dev',
      },
      {
        title: 'Test the build',
        text: 'This makes the final files in the `dist` folder. If it shows an error, fix it first, because the platforms run the same command.',
        code: 'npm run build',
      },
      {
        title: 'Put the project on GitHub',
        text: 'Only needed if you started from scratch. If you forked the starter, your project is already on GitHub, so skip this step. Otherwise, create a new empty repository on github.com and run these in your project folder, using the link GitHub shows you.',
        code: 'git init\ngit add .\ngit commit -m "first commit"\ngit branch -M main\ngit remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git\ngit push -u origin main',
      },
      {
        title: 'Make your accounts',
        text: 'You need GitHub, Vercel, Netlify and Firebase (a Google account).',
        note: 'Tip: you can sign in to Vercel and Netlify with GitHub. It makes connecting your repo easier.',
      },
    ],
  },
  {
    id: 'vercel',
    title: 'Deploy with Vercel',
    intro: 'Vercel watches your GitHub repo and deploys every time you push.',
    steps: [
      { title: 'Log in', text: 'Go to vercel.com and log in with GitHub.' },
      {
        title: 'Add your project',
        text: 'Click Add New Project and pick your repo. If it is not listed, allow Vercel to access it when GitHub asks.',
      },
      {
        title: 'Check the detected settings',
        text: 'Vercel should detect a Vite app. The build command is `npm run build` and the output folder is `dist`. Leave the defaults.',
      },
      {
        title: 'Optional: add an environment variable',
        text: 'Open Environment Variables, type a name and a value, and the app can read it without the value ever appearing in your code.',
        note: 'In a Vite app, names must start with `VITE_` and the value ends up in the files visitors download. Never put a real secret in a frontend app. Use this to learn where settings go.',
      },
      {
        title: 'Deploy',
        text: 'Click Deploy and wait. When it finishes, open the live URL and look for the padlock in the address bar. HTTPS is already set up for you.',
        note: 'A custom domain like yourname.com is optional. Connect one later in your project under Settings, then Domains.',
      },
    ],
  },
  {
    id: 'netlify',
    title: 'Deploy with Netlify',
    intro: 'Same project, second platform. Nothing new to install.',
    steps: [
      { title: 'Log in', text: 'Go to netlify.com and log in with GitHub.' },
      {
        title: 'Import your repo',
        text: 'Click Add new site, then Import an existing project. Choose GitHub and pick the same repo.',
      },
      {
        title: 'Set the build settings',
        text: 'Build command: `npm run build`. Publish directory: `dist`. Netlify serves whatever is inside that folder.',
      },
      {
        title: 'Deploy',
        text: 'Click Deploy and open the URL when it is ready, usually in about a minute.',
        note: 'You can also drag and drop your built `dist` folder into Netlify. It is quick, but it will not redeploy by itself when you change your code.',
      },
    ],
  },
  {
    id: 'firebase',
    title: 'Deploy with Firebase',
    intro: 'Firebase uses the command line instead of GitHub.',
    steps: [
      {
        title: 'Create a Firebase project',
        text: 'Go to console.firebase.google.com, click Add project and follow the steps.',
      },
      {
        title: 'Install the Firebase CLI',
        text: 'This adds the `firebase` command to your terminal.',
        code: 'npm install -g firebase-tools',
      },
      {
        title: 'Log in',
        text: 'A browser window opens so you can sign in with your Google account.',
        code: 'firebase login',
      },
      {
        title: 'Build the project',
        text: 'Make sure the `dist` folder exists and is up to date.',
        code: 'npm run build',
      },
      {
        title: 'Set up Hosting',
        text: 'Pick your Firebase project. Type `dist` as the public directory. Answer Yes to single-page app. Answer No to automatic builds with GitHub.',
        code: 'firebase init hosting',
      },
      {
        title: 'Deploy',
        text: 'This uploads the `dist` folder. When it finishes, it prints a Hosting URL. That is your live site.',
        code: 'firebase deploy',
        note: 'Hosting works on the free Spark plan. Cloud Functions need the Blaze plan, which needs a billing account. If you use Blaze, set a budget alert.',
      },
    ],
  },
  {
    id: 'update',
    title: 'Update, fix and roll back',
    intro: 'What to do after your site is live.',
    steps: [
      {
        title: 'Change something',
        text: 'Open `src/App.jsx` and change a heading or any text. Save it and check it on localhost first.',
      },
      {
        title: 'Push the change',
        text: 'Vercel and Netlify see the push and redeploy by themselves. Refresh your live site after a minute.',
        code: 'git add .\ngit commit -m "update text"\ngit push',
        note: 'Firebase does not redeploy from GitHub in this setup. Run `npm run build` and then `firebase deploy` again.',
      },
      {
        title: 'If a build fails',
        text: 'Open the failed deployment and read the build log. The answer is usually in the last few lines. Fix it and push again. Your last working site stays online the whole time.',
      },
      {
        title: 'Roll back a bad update',
        text: 'In Vercel, open Deployments, pick an earlier working one and use the rollback or promote option. In Netlify, open Deploys, pick an earlier one and click Publish deploy.',
        note: 'Button names can change slightly, so check the labels on your screen.',
      },
    ],
  },
  {
    id: 'found',
    title: 'Bonus: get found on Google',
    intro: 'Being live does not mean you show up in search right away.',
    steps: [
      {
        title: 'Add your site',
        text: 'Open Google Search Console and add your site. You will be asked to prove you own it.',
      },
      {
        title: 'Inspect your link',
        text: 'Paste your live URL into the URL Inspection box at the top. It tells you if Google already knows the page.',
      },
      {
        title: 'Request indexing',
        text: 'If Google does not know it yet, click Request Indexing.',
        note: 'It is not instant and there is no guarantee. A custom domain is easier to manage here, but your free .vercel.app or .netlify.app address works too.',
      },
    ],
  },
]

const CHECKLIST = [
  'The app runs on localhost.',
  'npm run build works without errors.',
  'There are no secrets in your code.',
  'After deploying, I tested the live link on my phone.',
]

const MISTAKES = [
  { title: 'Secrets in your code', text: 'Pushing an API key to GitHub is the most common and most dangerous mistake. Use environment variables.' },
  { title: 'Wrong build folder', text: 'For a Vite project the output folder is `dist`.' },
  { title: 'Forgetting to push', text: 'If the live site never changes, check that you committed and pushed.' },
  { title: 'Ignoring the build log', text: 'When a build fails, the answer is almost always in the last lines of the log.' },
]

const PICK = [
  { name: 'Vercel', when: 'You use Next.js or React and want the simplest GitHub deploy.' },
  { name: 'Netlify', when: 'You have a simple static site or a portfolio, or need built-in forms.' },
  { name: 'Firebase', when: 'You need a database, login and backend in one place.' },
  { name: 'Others', when: 'Always-on backends fit Render or Railway. PHP and WordPress need traditional hosting.' },
]

const RESOURCES = [
  { label: 'DevForge starter project (GitHub)', href: SITE.repo },
  { label: 'Vite: deploying a static site', href: 'https://vite.dev/guide/static-deploy.html' },
  { label: 'Vercel docs', href: 'https://vercel.com/docs' },
  { label: 'Netlify docs', href: 'https://docs.netlify.com/' },
  { label: 'Firebase Hosting docs', href: 'https://firebase.google.com/docs/hosting' },
  { label: 'GitHub docs', href: 'https://docs.github.com/' },
  { label: 'Google Search Console', href: 'https://search.google.com/search-console' },
]

const NAV = [
  { id: 'words', title: 'Words to know' },
  ...GUIDE.map((s) => ({ id: s.id, title: s.title })),
  { id: 'checklist', title: 'Checklist' },
  { id: 'mistakes', title: 'Common mistakes' },
  { id: 'choose', title: 'Which one to pick' },
  { id: 'resources', title: 'Resources' },
]

// ───────── Small helpers ─────────
// Turns `backticks` inside text into <code>.
function Text({ children }) {
  return children.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))
}

function Code({ children }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be blocked; the text is still selectable.
    }
  }

  return (
    <div className="code">
      <pre>
        <code>{children}</code>
      </pre>
      <button type="button" onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [checked, setChecked] = useState({})

  return (
    <div className="app">
      <header className="bar">
        <img className="bar-logo" src={logo} alt="DevForge" />
        <nav>
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <p className="label">// {SITE.label}</p>
            <h1>
              {SITE.headline[0]} <span className="hl">{SITE.headline[1]}</span>
            </h1>
            <p className="intro">{SITE.intro}</p>
            <div className="cta-row">
              <a className="cta" href="#words">
                Start the guide
              </a>
              <a className="cta cta-alt" href={SITE.repo} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </div>
          </div>

          <div className="panel">
            <p className="panel-title">hot reload test</p>
            <p className="panel-count">{String(count).padStart(2, '0')}</p>
            <button type="button" onClick={() => setCount((c) => c + 1)}>
              Click to count
            </button>
            <p className="panel-hint">
              Edit <code>src/App.jsx</code> and save. The count keeps its value.
            </p>
          </div>
        </section>

        <div className="guide">
          <aside className="toc">
            <p className="toc-title">Guide</p>
            <ul>
              {NAV.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="guide-body">
            <section className="g-sec" id="words">
              <h2>Words to know</h2>
              <p className="sec-intro">
                Six words you will see all the time. Each one makes more sense once you try it.
              </p>
              <dl className="words">
                {GLOSSARY.map((item) => (
                  <div key={item.term}>
                    <dt>{item.term}</dt>
                    <dd>
                      <Text>{item.text}</Text>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="note">
                Free plans have limits, and those limits change. Check each platform's pricing page
                before you rely on one.
              </p>
            </section>

            {GUIDE.map((section, i) => (
              <section className="g-sec" id={section.id} key={section.id}>
                <h2>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                <p className="sec-intro">{section.intro}</p>
                <ol className="steps">
                  {section.steps.map((step, n) => (
                    <li key={step.title}>
                      <span className="step-n">{n + 1}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>
                          <Text>{step.text}</Text>
                        </p>
                        {step.link && (
                          <p className="step-link">
                            <a href={step.link.href} target="_blank" rel="noreferrer">
                              {step.link.label}
                            </a>
                          </p>
                        )}
                        {step.code && <Code>{step.code}</Code>}
                        {step.note && (
                          <p className="note">
                            <Text>{step.note}</Text>
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}

            <section className="g-sec" id="checklist">
              <h2>Checklist</h2>
              <p className="sec-intro">Go through this before every deploy.</p>
              <ul className="checks">
                {CHECKLIST.map((item) => (
                  <li key={item}>
                    <label className={checked[item] ? 'done' : ''}>
                      <input
                        type="checkbox"
                        checked={!!checked[item]}
                        onChange={(e) => setChecked({ ...checked, [item]: e.target.checked })}
                      />
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section className="g-sec" id="mistakes">
              <h2>Common mistakes</h2>
              <p className="sec-intro">Most deployment problems have a simple fix.</p>
              <ul className="mistakes">
                {MISTAKES.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>
                      <Text>{item.text}</Text>
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="g-sec" id="choose">
              <h2>Which one to pick</h2>
              <p className="sec-intro">
                There is no single best tool. It depends on your project, and you can combine them.
              </p>
              <ul className="pick">
                {PICK.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>
                    <span>{item.when}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="g-sec" id="resources">
              <h2>Resources</h2>
              <p className="sec-intro">
                The official docs are the best source when a setting or a price changes.
              </p>
              <ul className="resources">
                {RESOURCES.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

      </main>

      <footer className="foot">
        <span>DevForge</span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}

export default App