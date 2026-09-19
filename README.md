# 🎧 OFF/BEAT - Website Concept

> **⚠️ Disclaimer:** This is an **unofficial design concept** for OFF/BEAT, a new venture by Aman Gupta. It is made for portfolio purposes and is **NOT** affiliated with OFF/BEAT, Aman Gupta, or any of their official partners. Facts and information on this site are sourced from public news reports published between March and July 2026.

An interactive, responsive, and dynamic web concept tailored for creators, founders, and AI-led consumer companies. It features a custom 3D particle background, smooth scrolling, and magnetic interactive elements to create a premium, modern aesthetic.

---

## ✨ Features

- **Interactive 3D Background:** A stunning web-gl particle system powered by `Three.js` that reacts to mouse movements.
- **Smooth Scrolling:** Buttery-smooth page navigation using `Lenis`.
- **Dynamic Animations:** Scroll-triggered reveals, 3D flips, and hover states built with `GSAP` and `ScrollTrigger`.
- **Beat Sequencer:** A fun, interactive music sequencer built right into the hero section of the home page.
- **Mobile Responsive:** Works seamlessly across desktop and mobile devices.
- **Dark Mode / Custom Colors:** Handpicked color tokens (Blue, Gold, Navy) with dark mode considerations baked in.

## 🚀 How to Run Locally

This is a static web project, meaning there is no complex build step required! 

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aman130901/OFF-BEAT.git
   cd OFF-BEAT
   ```
2. **Start a local server** (Optional but recommended for the 3D canvas and routing):
   - **Using Python:** `python -m http.server 8000`
   - **Using Node/NPM:** `npx serve`
3. **Open in Browser:** Navigate to `http://localhost:8000`

## 📂 Project Structure

```text
/
├── css/
│   └── styles.css          # Core styling, responsive rules, & color tokens
├── js/
│   ├── 3d-animations.js    # Three.js background, GSAP animations, & custom cursor
│   └── script.js           # Form validation, beat sequencer, & mobile nav logic
├── index.html              # Home page
├── studio.html             # Studio / Venture concept page
├── creators.html           # Creators focus page
├── founders.html           # Founders invitation and FAQ page
└── contact.html            # Pitch form page (UI only)
```

## 🛠️ Technology Stack

- **HTML5 & CSS3** (Vanilla)
- **JavaScript (ES6+)**
- [**Three.js**](https://threejs.org/) - For the 3D particle background
- [**GSAP**](https://greensock.com/gsap/) & **ScrollTrigger** - For advanced scrolling animations
- [**Lenis**](https://lenis.studiofreight.com/) - For smooth scrolling physics
- **Google Fonts** - *Archivo* typeface

## 🎨 Easy Customizations

- **Colors:** You can easily change the primary brand colors by editing the CSS variables at the top of `css/styles.css` (`--blue`, `--gold`, `--navy`).
- **Sequencer Speed:** Modify the `STEP` variable in `js/script.js` to change the BPM/speed of the beat sequencer.
- **Forms:** The form on `contact.html` is visually complete but currently submits nowhere. You can link its action to a backend service like Formspree or a custom API to make it fully functional.
