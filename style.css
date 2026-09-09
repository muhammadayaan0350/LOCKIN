```css
/* =========================================================
   FOCUS — STYLE SYSTEM
   Study. Train. Grow.
========================================================= */


/* =========================================================
   RESET
========================================================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    min-height: 100vh;
    font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
    overflow-x: hidden;
}

button,
input,
select {
    font: inherit;
}

button {
    border: 0;
    cursor: pointer;
}

button:focus-visible,
input:focus-visible,
select:focus-visible {
    outline: 3px solid rgba(99, 102, 241, 0.35);
    outline-offset: 3px;
}

a {
    color: inherit;
    text-decoration: none;
}


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

:root {
    --black: #050507;
    --dark: #0a0a0f;
    --dark-card: #111118;
    --dark-card-2: #17171f;
    --dark-border: rgba(255, 255, 255, 0.1);
    --dark-text: #f7f7fb;
    --dark-muted: #9999a8;

    --study-bg: #f5f7fb;
    --study-surface: #ffffff;
    --study-surface-soft: #eef2f8;
    --study-border: #dfe5ee;
    --study-text: #172033;
    --study-muted: #6d7688;
    --study-accent: #6366f1;
    --study-accent-2: #8b5cf6;
    --study-success: #16a34a;
    --study-warning: #f59e0b;
    --study-danger: #ef4444;

    --workout-bg: #07080b;
    --workout-surface: #101217;
    --workout-surface-2: #161920;
    --workout-border: rgba(255, 255, 255, 0.1);
    --workout-text: #f5f5f5;
    --workout-muted: #969ba8;
    --workout-accent: #ff5a36;
    --workout-accent-2: #ff9a3d;
    --workout-success: #22c55e;
    --workout-danger: #ef4444;

    --radius-sm: 10px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-xl: 32px;

    --shadow-sm: 0 5px 20px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 15px 40px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 30px 80px rgba(0, 0, 0, 0.16);

    --transition-fast: 0.2s ease;
    --transition: 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
    --transition-slow: 0.65s cubic-bezier(0.2, 0.8, 0.2, 1);
}


/* =========================================================
   MODE SELECTION
========================================================= */

#modeSelection {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    background:
        radial-gradient(
            circle at 20% 20%,
            rgba(99, 102, 241, 0.15),
            transparent 30%
        ),
        radial-gradient(
            circle at 80% 75%,
            rgba(139, 92, 246, 0.13),
            transparent 30%
        ),
        #050507;
    color: var(--dark-text);
}

.mode-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
}

.ambient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(2px);
    opacity: 0.45;
    animation: floatingOrb 12s ease-in-out infinite;
}

.orb-one {
    width: 300px;
    height: 300px;
    top: -120px;
    left: -80px;
    background: rgba(99, 102, 241, 0.16);
}

.orb-two {
    width: 240px;
    height: 240px;
    right: 8%;
    top: 20%;
    background: rgba(168, 85, 247, 0.12);
    animation-delay: -4s;
}

.orb-three {
    width: 340px;
    height: 340px;
    bottom: -180px;
    left: 45%;
    background: rgba(59, 130, 246, 0.1);
    animation-delay: -7s;
}

@keyframes floatingOrb {
    0%,
    100% {
        transform: translate3d(0, 0, 0) scale(1);
    }

    50% {
        transform: translate3d(25px, -20px, 0) scale(1.08);
    }
}

.mode-content {
    position: relative;
    z-index: 2;

    width: min(1180px, calc(100% - 40px));
    min-height: 100vh;

    margin: auto;
    padding: 70px 0 35px;

    display: flex;
    flex-direction: column;
    justify-content: center;
}


/* =========================================================
   BRAND
========================================================= */

.brand-area {
    text-align: center;
    margin-bottom: 55px;
    animation: fadeDown 0.8s ease both;
}

.brand-mark {
    width: 50px;
    height: 50px;

    margin: 0 auto 14px;

    display: grid;
    place-items: center;

    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;

    background: rgba(255, 255, 255, 0.05);

    font-size: 22px;
    font-weight: 900;

    box-shadow:
        0 0 30px rgba(99, 102, 241, 0.15);

    backdrop-filter: blur(15px);
}

.brand-area h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    letter-spacing: 0.18em;
}

.brand-tagline {
    margin-top: 8px;
    color: #898996;
    font-size: 0.9rem;
    letter-spacing: 0.08em;
}


/* =========================================================
   MODE HEADING
========================================================= */

.mode-heading {
    text-align: center;
    margin-bottom: 40px;
    animation: fadeUp 0.8s 0.1s ease both;
}

.eyebrow {
    display: inline-block;

    font-size: 0.68rem;
    font-weight: 800;

    letter-spacing: 0.15em;
    text-transform: uppercase;
}

.mode-heading .eyebrow {
    color: #777783;
}

.mode-heading h2 {
    margin-top: 12px;

    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1.05;
    letter-spacing: -0.045em;
}

.mode-heading h2 span {
    display: block;

    background: linear-gradient(
        90deg,
        #8b5cf6,
        #6366f1,
        #3b82f6
    );

    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.mode-heading p {
    margin-top: 16px;
    color: #888894;
}


/* =========================================================
   MODE CARDS
========================================================= */

.mode-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
}

.mode-card {
    position: relative;

    min-height: 390px;

    padding: 34px;

    overflow: hidden;

    text-align: left;

    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 30px;

    background:
        linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.025)
        );

    color: white;

    backdrop-filter: blur(20px);

    transform: translateY(0) scale(1);

    transition:
        transform var(--transition),
        border-color var(--transition),
        box-shadow var(--transition),
        background var(--transition);

    animation: cardEntrance 0.8s ease both;
}

.study-mode-card {
    animation-delay: 0.2s;
}

.workout-mode-card {
    animation-delay: 0.3s;
}

.mode-card:hover {
    transform: translateY(-12px) scale(1.025);

    border-color: rgba(255, 255, 255, 0.25);

    box-shadow:
        0 30px 70px rgba(0, 0, 0, 0.35),
        0 0 60px rgba(99, 102, 241, 0.12);
}

.mode-card:active {
    transform: translateY(-5px) scale(0.99);
}

.mode-card-glow {
    position: absolute;
    width: 220px;
    height: 220px;

    right: -80px;
    top: -80px;

    border-radius: 50%;

    opacity: 0;

    filter: blur(35px);

    transition: opacity var(--transition);
}

.mode-card:hover .mode-card-glow {
    opacity: 1;
}

.study-mode-card .mode-card-glow {
    background: rgba(99, 102, 241, 0.35);
}

.workout-mode-card .mode-card-glow {
    background: rgba(255, 90, 54, 0.35);
}


/* =========================================================
   MODE ICON
========================================================= */

.mode-icon-wrapper {
    width: 82px;
    height: 82px;

    display: grid;
    place-items: center;

    border-radius: 24px;

    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);

    transition: transform var(--transition);
}

.mode-card:hover .mode-icon-wrapper {
    transform:
        translateY(-5px)
        rotate(-3deg)
        scale(1.08);
}

.mode-icon {
    font-size: 40px;
    line-height: 1;

    transition:
        transform var(--transition),
        filter var(--transition);
}

.mode-card:hover .mode-icon {
    transform: scale(1.12);
    filter: drop-shadow(0 10px 20px rgba(255, 255, 255, 0.15));
}


/* =========================================================
   MODE CONTENT
========================================================= */

.mode-card-content {
    position: relative;
    z-index: 2;
    margin-top: 35px;
}

.mode-number {
    color: #6f6f7b;

    font-size: 0.68rem;
    font-weight: 800;

    letter-spacing: 0.15em;
}

.mode-card h3 {
    margin-top: 8px;

    font-size: 2rem;
    letter-spacing: -0.04em;
}

.mode-card p {
    max-width: 420px;

    margin-top: 10px;

    color: #9999a6;
    line-height: 1.65;
}

.mode-features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    margin-top: 22px;
}

.mode-features span {
    padding: 7px 10px;

    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;

    background: rgba(255, 255, 255, 0.035);

    color: #aaaab5;
    font-size: 0.75rem;
}

.mode-arrow {
    position: absolute;

    right: 30px;
    bottom: 28px;

    width: 46px;
    height: 46px;

    display: grid;
    place-items: center;

    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;

    background: rgba(255, 255, 255, 0.05);

    font-size: 1.3rem;

    transition:
        transform var(--transition),
        background var(--transition);
}

.mode-card:hover .mode-arrow {
    transform: translateX(7px);
    background: rgba(255, 255, 255, 0.1);
}


/* =========================================================
   MODE FOOTER
========================================================= */

.mode-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;

    margin-top: 35px;

    color: #5f5f6b;

    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.14em;

    animation: fadeUp 0.8s 0.4s ease both;
}

.footer-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #555560;
}


/* =========================================================
   APP SCREENS
========================================================= */

.app-screen {
    display: none;
    min-height: 100vh;

    animation: pageEnter 0.55s ease both;
}

.app-screen.active {
    display: block;
}


/* =========================================================
   STUDY ENVIRONMENT
========================================================= */

.study-environment {
    min-height: 100vh;

    background:
        radial-gradient(
            circle at 10% 10%,
            rgba(99, 102, 241, 0.08),
            transparent 30%
        ),
        radial-gradient(
            circle at 90% 30%,
            rgba(139, 92, 246, 0.06),
            transparent 28%
        ),
        var(--study-bg);

    color: var(--study-text);
}


/* =========================================================
   WORKOUT ENVIRONMENT
========================================================= */

.workout-environment {
    min-height: 100vh;

    background:
        radial-gradient(
            circle at 10% 5%,
            rgba(255, 90, 54, 0.1),
            transparent 28%
        ),
        radial-gradient(
            circle at 90% 60%,
            rgba(255, 154, 61, 0.07),
            transparent 30%
        ),
        var(--workout-bg);

    color: var(--workout-text);
}


/* =========================================================
   APP HEADER
========================================================= */

.app-header {
    position: sticky;
    top: 0;
    z-index: 50;

    height: 74px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 32px;

    backdrop-filter: blur(18px);
}

.study-header {
    background: rgba(245, 247, 251, 0.82);
    border-bottom: 1px solid var(--study-border);
}

.workout-header {
    background: rgba(7, 8, 11, 0.78);
    border-bottom: 1px solid var(--workout-border);
}

.back-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    padding: 9px 13px;

    border-radius: 10px;

    background: transparent;

    transition:
        background var(--transition-fast),
        transform var(--transition-fast);
}

.study-header .back-button {
    color: var(--study-muted);
}

.workout-header .back-button {
    color: var(--workout-muted);
}

.back-button:hover {
    transform: translateX(-3px);
}

.study-header .back-button:hover {
    background: var(--study-surface-soft);
}

.workout-header .back-button:hover {
    background: var(--workout-surface);
}

.app-brand {
    display: flex;
    align-items: center;
    gap: 9px;

    font-weight: 900;
    letter-spacing: 0.12em;
}

.app-brand-icon {
    font-size: 1.3rem;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.icon-button {
    width: 40px;
    height: 40px;

    display: grid;
    place-items: center;

    border-radius: 12px;

    transition:
        transform var(--transition-fast),
        background var(--transition-fast);
}

.study-header .icon-button {
    color: var(--study-text);
    background: var(--study-surface);
    border: 1px solid var(--study-border);
}

.workout-header .icon-button {
    color: white;
    background: var(--workout-surface);
    border: 1px solid var(--workout-border);
}

.icon-button:hover {
    transform: translateY(-2px);
}

.profile-button {
    background: transparent;
}

.profile-avatar {
    width: 40px;
    height: 40px;

    display: grid;
    place-items: center;

    border-radius: 50%;

    background: linear-gradient(
        135deg,
        #6366f1,
        #8b5cf6
    );

    color: white;
    font-weight: 800;
}


/* =========================================================
   NAVIGATION
========================================================= */

.mode-navigation {
    position: sticky;
    top: 74px;
    z-index: 40;

    display: flex;
    justify-content: center;
    gap: 5px;

    padding: 10px 20px;
}

.study-navigation {
    background: rgba(245, 247, 251, 0.8);
    border-bottom: 1px solid var(--study-border);
}

.workout-navigation {
    background: rgba(7, 8, 11, 0.78);
    border-bottom: 1px solid var(--workout-border);
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 10px 15px;

    border-radius: 11px;

    background: transparent;

    font-size: 0.82rem;
    font-weight: 700;

    transition:
        background var(--transition-fast),
        transform var(--transition-fast);
}

.study-navigation .nav-item {
    color: var(--study-muted);
}

.workout-navigation .nav-item {
    color: var(--workout-muted);
}

.nav-item:hover {
    transform: translateY(-2px);
}

.study-navigation .nav-item:hover,
.study-navigation .nav-item.active {
    color: var(--study-accent);
    background: white;
    box-shadow: var(--shadow-sm);
}

.workout-navigation .nav-item:hover,
.workout-navigation .nav-item.active {
    color: var(--workout-accent);
    background: var(--workout-surface);
}


/* =========================================================
   APP CONTENT
========================================================= */

.app-content {
    width: min(1200px, calc(100% - 40px));
    margin: auto;

    padding: 55px 0 90px;
}

.internal-page {
    display: none;
    animation: fadeUp 0.45s ease both;
}

.internal-page.active-page {
    display: block;
}


/* =========================================================
   PAGE HEADING
========================================================= */

.page-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 30px;

    margin-bottom: 35px;
}

.compact-heading {
    align-items: center;
}

.study-environment .page-heading .eyebrow {
    color: var(--study-accent);
}

.workout-environment .page-heading .eyebrow {
    color: var(--workout-accent);
}

.page-heading h1 {
    margin-top: 8px;

    font-size: clamp(2rem, 4vw, 3.1rem);
    letter-spacing: -0.045em;
}

.page-heading p {
    margin-top: 9px;

    color: var(--study-muted);
}

.workout-environment .page-heading p {
    color: var(--workout-muted);
}

.page-heading h1 span {
    color: var(--study-accent);
}

.daily-streak {
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 11px 16px;

    border-radius: 15px;
    background: white;
    border: 1px solid var(--study-border);

    box-shadow: var(--shadow-sm);
}

.workout-streak {
    background: var(--workout-surface);
    border-color: var(--workout-border);
}

.daily-streak > span {
    font-size: 1.5rem;
}

.daily-streak strong {
    display: block;
    font-size: 1.05rem;
}

.daily-streak small {
    color: var(--study-muted);
}

.workout-streak small {
    color: var(--workout-muted);
}


/* =========================================================
   STATS
========================================================= */

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-bottom: 45px;
}

.stat-card {
    display: flex;
    align-items: center;
    gap: 15px;

    padding: 20px;

    border-radius: var(--radius-md);

    transition:
        transform var(--transition),
        box-shadow var(--transition);
}

.study-stats .stat-card {
    background: var(--study-surface);
    border: 1px solid var(--study-border);
    box-shadow: var(--shadow-sm);
}

.workout-stats .stat-card {
    background: var(--workout-surface);
    border: 1px solid var(--workout-border);
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
}

.stat-icon {
    width: 45px;
    height: 45px;

    display: grid;
    place-items: center;

    border-radius: 13px;

    font-size: 1.25rem;
}

.study-stats .stat-icon {
    background: #eef2ff;
}

.workout-stats .stat-icon {
    background: rgba(255, 90, 54, 0.1);
}

.stat-card strong {
    display: block;
    font-size: 1.25rem;
}

.stat-card small {
    display: block;

    margin-top: 3px;

    color: var(--study-muted);
    font-size: 0.75rem;
}

.workout-stats .stat-card small {
    color: var(--workout-muted);
}


/* =========================================================
   SECTION
========================================================= */

.content-section {
    margin-top: 42px;
}

.section-heading,
.panel-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    margin-bottom: 18px;
}

.section-heading h2,
.panel-heading h2 {
    margin-top: 5px;

    font-size: 1.25rem;
    letter-spacing: -0.025em;
}

.section-heading p {
    margin-top: 5px;
    color: var(--study-muted);
}

.workout-environment .section-heading p {
    color: var(--workout-muted);
}


/* =========================================================
   GOALS
========================================================= */

.goal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.goal-card {
    padding: 20px;

    border-radius: var(--radius-md);

    background: var(--study-surface);
    border: 1px solid var(--study-border);

    box-shadow: var(--shadow-sm);
}

.goal-top {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    margin-bottom: 14px;

    font-size: 0.85rem;
}

.goal-top strong {
    color: var(--study-muted);
    font-size: 0.75rem;
}

.progress-track,
.xp-track {
    width: 100%;
    height: 7px;

    overflow: hidden;

    border-radius: 99px;
    background: #e7ebf2;
}

.progress-fill,
.xp-fill {
    width: 0;
    height: 100%;

    border-radius: inherit;

    background:
        linear-gradient(
            90deg,
            var(--study-accent),
            var(--study-accent-2)
        );

    transition: width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}


/* =========================================================
   DASHBOARD COLUMNS
========================================================= */

.dashboard-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    margin-top: 25px;
}

.dashboard-panel {
    padding: 24px;

    border-radius: var(--radius-lg);

    background: var(--study-surface);
    border: 1px solid var(--study-border);

    box-shadow: var(--shadow-sm);
}


/* =========================================================
   MINI TIMER
========================================================= */

.mini-timer {
    padding: 25px;

    border-radius: 18px;

    text-align: center;

    background: var(--study-surface-soft);
}

.mini-timer-display {
    font-size: clamp(3rem, 7vw, 4.5rem);
    font-weight: 800;
    letter-spacing: -0.06em;
}

.mini-timer span {
    display: block;

    margin: 4px 0 18px;

    color: var(--study-muted);
}


/* =========================================================
   PRIORITY LIST
========================================================= */

.priority-list {
    display: flex;
    flex-direction: column;
    gap: 9px;
}

.priority-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 13px;

    border-radius: 12px;

    background: var(--study-surface-soft);
}

.priority-item-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.priority-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.priority-high {
    background: var(--study-danger);
}

.priority-medium {
    background: var(--study-warning);
}

.priority-low {
    background: var(--study-success);
}


/* =========================================================
   QUOTES
========================================================= */

.quote-card {
    position: relative;

    margin-top: 30px;
    padding: 30px 35px;

    overflow: hidden;

    border-radius: var(--radius-lg);
}

.study-quote-card {
    background:
        linear-gradient(
            135deg,
            #eef2ff,
            #f5f3ff
        );

    border: 1px solid #dfe4ff;
}

.workout-quote-card {
    background:
        linear-gradient(
            135deg,
            #17110f,
            #111216
        );

    border: 1px solid var(--workout-border);
}

.quote-mark {
    position: absolute;

    top: -30px;
    left: 10px;

    font-size: 9rem;
    line-height: 1;

    opacity: 0.07;
}

.quote-card p {
    position: relative;

    max-width: 800px;

    font-size: 1.1rem;
    font-weight: 650;
    line-height: 1.7;
}

.quote-author {
    display: block;

    margin-top: 10px;

    color: var(--study-muted);
    font-size: 0.78rem;
}


/* =========================================================
   BUTTONS
========================================================= */

.primary-button,
.secondary-button,
.small-button,
.text-button {
    border-radius: 11px;

    font-weight: 800;

    transition:
        transform var(--transition-fast),
        box-shadow var(--transition-fast),
        background var(--transition-fast);
}

.primary-button {
    padding: 12px 18px;

    color: white;

    background:
        linear-gradient(
            135deg,
            var(--study-accent),
            var(--study-accent-2)
        );

    box-shadow:
        0 8px 25px rgba(99, 102, 241, 0.2);
}

.primary-button:hover {
    transform: translateY(-2px);

    box-shadow:
        0 12px 30px rgba(99, 102, 241, 0.3);
}

.secondary-button {
    padding: 12px 18px;

    color: var(--study-text);

    background: var(--study-surface-soft);
    border: 1px solid var(--study-border);
}

.secondary-button:hover {
    transform: translateY(-2px);
}

.small-button {
    width: 42px;
    height: 42px;

    color: var(--study-accent);
    background: #eef2ff;

    font-size: 1.2rem;
}

.text-button {
    padding: 6px;

    background: transparent;
    color: var(--study-accent);
}

.full-button {
    width: 100%;
}

.large-button {
    min-width: 150px;
    padding: 14px 22px;
}


/* =========================================================
   FOCUS PAGE
========================================================= */

.focus-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.7fr);
    gap: 22px;
}

.focus-timer-card,
.focus-settings-card {
    border: 1px solid var(--study-border);
    border-radius: var(--radius-xl);
    background: var(--study-surface);
    box-shadow: var(--shadow-sm);
}

.focus-timer-card {
    min-height: 540px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 50px;
}

.timer-top {
    width: 100%;

    display: flex;
    justify-content: space-between;

    color: var(--study-muted);

    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.1em;
}

.pomodoro-timer {
    margin: 35px 0 12px;

    font-size: clamp(5rem, 13vw, 9rem);
    line-height: 0.95;

    font-weight: 850;
    letter-spacing: -0.08em;

    color: var(--study-text);
}

.timer-mode {
    color: var(--study-muted);
}

.timer-controls {
    display: flex;
    align-items: center;
    gap: 10px;

    margin-top: 35px;
}

.focus-settings-card {
    padding: 28px;
}

.timer-presets {
    display: grid;
    grid-template-columns: 1fr;
    gap: 9px;

    margin-bottom: 25px;
}

.timer-preset {
    padding: 14px;

    text-align: left;

    border-radius: 13px;

    background: var(--study-surface-soft);
    border: 1px solid transparent;

    transition: var(--transition-fast);
}

.timer-preset:hover,
.timer-preset.active {
    border-color: #c9cfff;
    background: #eef2ff;
}

.timer-preset strong,
.timer-preset span {
    display: block;
}

.timer-preset strong {
    font-size: 0.9rem;
}

.timer-preset span {
    margin-top: 3px;

    color: var(--study-muted);
    font-size: 0.7rem;
}

.field-label {
    display: block;

    margin: 18px 0 7px;

    color: var(--study-muted);

    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

select,
input[type="text"],
input[type="date"],
input[type="number"],
input[type="search"] {
    width: 100%;

    padding: 12px 13px;

    border: 1px solid var(--study-border);
    border-radius: 11px;

    background: var(--study-surface);
    color: var(--study-text);

    transition: var(--transition-fast);
}

select:focus,
input:focus {
    border-color: var(--study-accent);
}

.inline-field {
    display: grid;
    grid-template-columns: 1fr 42px;
    gap: 8px;
}


/* =========================================================
   BREAK SYSTEM
========================================================= */

.break-section {
    margin-top: 45px;
}

.break-countdown {
    display: flex;
    align-items: center;
    gap: 12px;

    color: var(--study-muted);
}

.break-countdown strong {
    font-size: 1.2rem;
}

.break-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
}

.break-card {
    padding: 25px 18px;

    border-radius: var(--radius-md);

    text-align: center;

    background: var(--study-surface);
    border: 1px solid var(--study-border);

    box-shadow: var(--shadow-sm);

    transition:
        transform var(--transition),
        box-shadow var(--transition);
}

.break-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-md);
}

.break-icon {
    display: block;

    margin-bottom: 10px;

    font-size: 2rem;
}

.break-card strong,
.break-card small {
    display: block;
}

.break-card small {
    margin-top: 4px;
    color: var(--study-muted);
}


/* =========================================================
   TASKS
========================================================= */

.task-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;
}

.task-filters {
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
}

.filter-btn,
.plan-filter-btn {
    padding: 9px 13px;

    border-radius: 10px;

    background: transparent;

    color: var(--study-muted);

    font-size: 0.78rem;
    font-weight: 700;
}

.filter-btn.active,
.filter-btn:hover {
    background: #eef2ff;
    color: var(--study-accent);
}

.task-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.task-item {
    display: flex;
    align-items: center;
    gap: 14px;

    padding: 16px;

    border: 1px solid var(--study-border);
    border-radius: 14px;

    background: var(--study-surface);

    transition:
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
}

.task-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}

.task-checkbox {
    width: 22px;
    height: 22px;

    border: 2px solid #cbd2dd;
    border-radius: 7px;

    background: transparent;
}

.task-item.completed {
    opacity: 0.55;
}

.task-item.completed .task-checkbox {
    background: var(--study-success);
    border-color: var(--study-success);
}

.task-info {
    flex: 1;
}

.task-title {
    font-weight: 750;
}

.task-meta {
    display: flex;
    gap: 9px;
    flex-wrap: wrap;

    margin-top: 5px;

    color: var(--study-muted);

    font-size: 0.7rem;
}

.priority-badge {
    padding: 4px 7px;
    border-radius: 6px;

    font-size: 0.62rem;
    font-weight: 800;
    text-transform: uppercase;
}


/* =========================================================
   SUBJECTS
========================================================= */

.subject-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.subject-card {
    padding: 22px;

    border-radius: var(--radius-md);

    background: var(--study-surface);
    border: 1px solid var(--study-border);

    box-shadow: var(--shadow-sm);

    transition: var(--transition);
}

.subject-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
}

.subject-card-icon {
    font-size: 2rem;
}

.subject-card h3 {
    margin-top: 14px;
}

.subject-card p {
    margin-top: 5px;
    color: var(--study-muted);
}


/* =========================================================
   MUSIC
========================================================= */

.music-player {
    display: grid;

    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    gap: 20px;

    padding: 25px;

    border-radius: var(--radius-xl);

    background:
        linear-gradient(
            135deg,
            #17172a,
            #20203c
        );

    color: white;
}

.music-cover {
    width: 80px;
    height: 80px;

    display: grid;
    place-items: center;

    border-radius: 20px;

    background: rgba(255, 255, 255, 0.08);

    font-size: 2rem;
}

.music-info > span {
    color: #9999b0;

    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.12em;
}

.music-info h2 {
    margin-top: 4px;
}

.music-info p {
    margin-top: 3px;
    color: #9999aa;
    font-size: 0.78rem;
}

.music-progress {
    height: 4px;

    margin-top: 15px;

    overflow: hidden;

    border-radius: 99px;
    background: rgba(255, 255, 255, 0.1);
}

.music-progress-fill {
    width: 30%;
    height: 100%;
    background: #8b5cf6;
}

.music-controls {
    display: flex;
    align-items: center;
    gap: 7px;
}

.music-controls button {
    width: 38px;
    height: 38px;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.08);
    color: white;
}

.music-controls .music-play {
    width: 48px;
    height: 48px;

    background: white;
    color: #17172a;
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 7px;
}

.volume-control input {
    width: 90px;
}

.sound-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;

    margin-top: 25px;
}

.sound-option {
    padding: 22px;

    text-align: left;

    border: 1px solid var(--study-border);
    border-radius: var(--radius-md);

    background: var(--study-surface);

    transition: var(--transition);
}

.sound-option:hover,
.sound-option.active {
    transform: translateY(-4px);

    border-color: #c8ccff;
    box-shadow: var(--shadow-sm);
}

.sound-option > span {
    display: block;
    font-size: 1.7rem;
}

.sound-option strong {
    display: block;
    margin-top: 13px;
}

.sound-option small {
    display: block;
    margin-top: 3px;
    color: var(--study-muted);
}


/* =========================================================
   ANALYTICS
========================================================= */

.analytics-stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;

    margin-bottom: 25px;
}

.analytics-stat {
    padding: 23px;

    border-radius: var(--radius-md);

    background: var(--study-surface);
    border: 1px solid var(--study-border);

    box-shadow: var(--shadow-sm);
}

.analytics-stat span {
    font-size: 1.5rem;
}

.analytics-stat strong {
    display: block;

    margin-top: 12px;

    font-size: 1.7rem;
}

.analytics-stat small {
    color: var(--study-muted);
}

.analytics-panel {
    padding: 25px;

    border-radius: var(--radius-lg);

    background: var(--study-surface);
    border: 1px solid var(--study-border);

    box-shadow: var(--shadow-sm);
}

#studyChart {
    width: 100%;
    min-height: 300px;
}

.analytics-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    margin-top: 20px;
}

.review-list {
    display: flex;
    flex-direction: column;
    gap: 13px;
}

.review-list div {
    display: flex;
    justify-content: space-between;

    padding: 12px;

    border-radius: 10px;
    background: var(--study-surface-soft);
}

.review-list span {
    color: var(--study-muted);
}


/* =========================================================
   WORKOUT UI
========================================================= */

.workout-environment .primary-button {
    background:
        linear-gradient(
            135deg,
            var(--workout-accent),
            var(--workout-accent-2)
        );

    box-shadow:
        0 10px 30px rgba(255, 90, 54, 0.18);
}

.workout-environment .secondary-button {
    color: var(--workout-text);

    background: var(--workout-surface);
    border: 1px solid var(--workout-border);
}

.workout-primary-button:hover {
    box-shadow:
        0 15px 35px rgba(255, 90, 54, 0.28);
}

.featured-workout {
    position: relative;

    min-height: 260px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 40px;

    overflow: hidden;

    border-radius: var(--radius-xl);

    background:
        linear-gradient(
            135deg,
            #19100d,
            #111216
        );

    border: 1px solid var(--workout-border);
}

.featured-workout::after {
    content: "";

    position: absolute;

    width: 280px;
    height: 280px;

    right: -100px;
    top: -100px;

    border-radius: 50%;

    background: rgba(255, 90, 54, 0.16);
    filter: blur(20px);
}

.featured-workout-content {
    position: relative;
    z-index: 2;
}

.featured-workout .eyebrow {
    color: var(--workout-accent);
}

.featured-workout h2 {
    margin-top: 9px;

    font-size: clamp(2rem, 5vw, 3.2rem);
    letter-spacing: -0.05em;
}

.featured-workout p {
    margin: 8px 0 22px;

    color: var(--workout-muted);
}

.featured-workout-icon {
    position: relative;
    z-index: 2;

    font-size: clamp(5rem, 12vw, 9rem);

    animation: workoutFloat 4s ease-in-out infinite;
}

@keyframes workoutFloat {
    0%,
    100% {
        transform: translateY(0) rotate(-2deg);
    }

    50% {
        transform: translateY(-10px) rotate(2deg);
    }
}


/* =========================================================
   WORKOUT PLANS
========================================================= */

.plan-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    margin-bottom: 25px;
}

.workout-environment .plan-filter-btn {
    color: var(--workout-muted);
}

.workout-environment .plan-filter-btn.active,
.workout-environment .plan-filter-btn:hover {
    color: var(--workout-accent);
    background: rgba(255, 90, 54, 0.08);
}

.workout-plan-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.workout-plan-option {
    position: relative;

    min-height: 190px;

    padding: 25px;

    text-align: left;

    border-radius: var(--radius-lg);

    background: var(--workout-surface);
    border: 1px solid var(--workout-border);

    color: var(--workout-text);

    transition: var(--transition);
}

.workout-plan-option:hover {
    transform: translateY(-7px);

    border-color: rgba(255, 90, 54, 0.45);

    box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.25);
}

.workout-plan-option > span {
    display: block;

    font-size: 2.1rem;
}

.workout-plan-option strong {
    display: block;

    margin-top: 20px;

    font-size: 1.1rem;
}

.workout-plan-option small {
    display: block;

    margin-top: 5px;

    color: var(--workout-muted);
}


/* =========================================================
   EXERCISE LIBRARY
========================================================= */

.exercise-search {
    display: flex;
    align-items: center;
    gap: 10px;

    max-width: 550px;

    margin-bottom: 25px;

    padding: 5px 14px;

    border: 1px solid var(--workout-border);
    border-radius: 13px;

    background: var(--workout-surface);
}

.exercise-search > span {
    color: var(--workout-muted);
    font-size: 1.3rem;
}

.workout-environment .exercise-search input {
    border: 0;
    background: transparent;
    color: var(--workout-text);
}

.exercise-library {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.exercise-card {
    padding: 22px;

    border: 1px solid var(--workout-border);
    border-radius: var(--radius-lg);

    background: var(--workout-surface);

    transition: var(--transition);
}

.exercise-card:hover {
    transform: translateY(-6px);

    border-color: rgba(255, 90, 54, 0.4);

    box-shadow:
        0 20px 45px rgba(0, 0, 0, 0.25);
}

.exercise-card-image {
    height: 150px;

    display: grid;
    place-items: center;

    border-radius: 15px;

    background:
        linear-gradient(
            135deg,
            #1c1e25,
            #121319
        );

    font-size: 4rem;
}

.exercise-card h3 {
    margin-top: 15px;
}

.exercise-card p {
    margin-top: 5px;

    color: var(--workout-muted);
    font-size: 0.78rem;
}


/* =========================================================
   EXERCISE PREVIEW
========================================================= */

.exercise-preview-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 13px;
}

.exercise-preview {
    padding: 18px;

    border-radius: 15px;

    background: var(--workout-surface);
    border: 1px solid var(--workout-border);

    transition: var(--transition);
}

.exercise-preview:hover {
    transform: translateY(-4px);
}

.exercise-preview-icon {
    font-size: 2rem;
}

.exercise-preview strong {
    display: block;
    margin-top: 10px;
}

.exercise-preview small {
    display: block;
    margin-top: 4px;
    color: var(--workout-muted);
}


/* =========================================================
   WORKOUT SESSION
========================================================= */

.workout-session-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
    gap: 20px;
}

.active-exercise-card,
.workout-control-card {
    border-radius: var(--radius-xl);

    background: var(--workout-surface);
    border: 1px solid var(--workout-border);
}

.active-exercise-card {
    overflow: hidden;
}

.exercise-demo {
    min-height: 320px;

    display: grid;
    place-items: center;

    background:
        radial-gradient(
            circle,
            rgba(255, 90, 54, 0.1),
            transparent 60%
        );
}

.exercise-demo-placeholder {
    font-size: 8rem;

    animation: exercisePulse 3s ease-in-out infinite;
}

@keyframes exercisePulse {
    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}

.active-exercise-info {
    padding: 30px;
}

.workout-environment .active-exercise-info .eyebrow {
    color: var(--workout-accent);
}

.active-exercise-info h2 {
    margin-top: 8px;

    font-size: 2rem;
}

.active-exercise-info > p {
    margin-top: 8px;

    max-width: 650px;

    color: var(--workout-muted);
    line-height: 1.6;
}

.exercise-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    margin-top: 25px;
}

.exercise-meta div {
    padding: 15px;

    border-radius: 13px;

    background: var(--workout-surface-2);
}

.exercise-meta span,
.exercise-meta strong {
    display: block;
}

.exercise-meta span {
    color: var(--workout-muted);

    font-size: 0.62rem;
    font-weight: 800;
}

.exercise-meta strong {
    margin-top: 5px;
}

.workout-control-card {
    padding: 25px;
}

.workout-live-timer {
    padding: 20px;

    margin-bottom: 20px;

    text-align: center;

    border-radius: 17px;

    background: var(--workout-surface-2);
}

.workout-live-timer span {
    display: block;

    color: var(--workout-muted);

    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.1em;
}

.workout-live-timer strong {
    display: block;

    margin-top: 8px;

    font-size: 3rem;
    letter-spacing: -0.05em;
}

.workout-control-card > button {
    margin-top: 10px;
}

.rest-timer {
    display: grid;
    place-items: center;

    height: 100px;

    margin-top: 15px;

    border-radius: 17px;

    background:
        radial-gradient(
            circle,
            rgba(255, 90, 54, 0.15),
            transparent 65%
        );

    color: var(--workout-accent);

    font-size: 2.5rem;
    font-weight: 850;
}


/* =========================================================
   RECORDS
========================================================= */

.records-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;

    margin-top: 25px;
}

.record-card {
    display: flex;
    align-items: center;
    gap: 15px;

    padding: 22px;

    border-radius: var(--radius-md);

    background: var(--workout-surface);
    border: 1px solid var(--workout-border);
}

.record-card > span {
    font-size: 2rem;
}

.record-card small,
.record-card strong {
    display: block;
}

.record-card small {
    color: var(--workout-muted);
}

.record-card strong {
    margin-top: 5px;
}


/* =========================================================
   PROFILE PANEL
========================================================= */

.profile-panel {
    position: fixed;

    z-index: 100;

    top: 0;
    right: 0;

    width: min(390px, 100%);

    height: 100vh;

    padding: 25px;

    overflow-y: auto;

    background: white;
    border-left: 1px solid var(--study-border);

    box-shadow: -20px 0 70px rgba(0, 0, 0, 0.12);

    transform: translateX(105%);

    transition: transform var(--transition-slow);
}

.profile-panel.open {
    transform: translateX(0);
}

.profile-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.profile-main {
    text-align: center;

    padding: 45px 0 30px;
}

.large-avatar {
    width: 90px;
    height: 90px;

    display: grid;
    place-items: center;

    margin: auto;

    border-radius: 50%;

    background:
        linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
        );

    color: white;

    font-size: 2rem;
    font-weight: 900;
}

.profile-main h3 {
    margin-top: 15px;
    font-size: 1.4rem;
}

.profile-main span {
    color: var(--study-muted);
}

.profile-xp {
    padding: 18px;

    border-radius: 16px;

    background: var(--study-surface-soft);
}

.profile-xp > div:first-child {
    display: flex;
    justify-content: space-between;

    margin-bottom: 10px;

    font-size: 0.8rem;
}

.profile-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;

    margin-top: 20px;
}

.profile-stats div {
    padding: 15px;

    text-align: center;

    border-radius: 12px;
    background: var(--study-surface-soft);
}

.profile-stats strong,
.profile-stats span {
    display: block;
}

.profile-stats span {
    margin-top: 4px;

    color: var(--study-muted);
    font-size: 0.68rem;
}

.profile-badges {
    margin-top: 30px;
}

#profileBadges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    margin-top: 12px;
}

.badge-placeholder {
    width: 48px;
    height: 48px;

    display: grid;
    place-items: center;

    border-radius: 13px;

    background: #eef2ff;

    font-size: 1.4rem;
}


/* =========================================================
   MODALS
========================================================= */

.modal-overlay {
    position: fixed;

    inset: 0;

    z-index: 200;

    display: none;
    place-items: center;

    padding: 20px;

    background: rgba(5, 5, 8, 0.7);

    backdrop-filter: blur(8px);
}

.modal-overlay.open {
    display: grid;

    animation: fadeIn 0.25s ease both;
}

.modal-card {
    width: min(560px, 100%);

    max-height: 90vh;
    overflow-y: auto;

    padding: 28px;

    border-radius: var(--radius-xl);

    background: white;
    color: var(--study-text);

    box-shadow: var(--shadow-lg);

    animation: modalIn 0.4s var(--transition) both;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin-bottom: 25px;
}

.modal-header h2 {
    margin-top: 5px;
}

.modal-close {
    width: 38px;
    height: 38px;

    display: grid;
    place-items: center;

    border-radius: 50%;

    background: #f0f2f5;
    color: #606878;

    font-size: 1.2rem;

    transition: var(--transition-fast);
}

.modal-close:hover {
    transform: rotate(90deg);
    background: #e6e8ec;
}

.modal-card form {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.modal-card label {
    display: flex;
    flex-direction: column;
    gap: 7px;

    color: var(--study-muted);

    font-size: 0.75rem;
    font-weight: 700;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.modal-exercise-demo {
    height: 210px;

    display: grid;
    place-items: center;

    margin-bottom: 20px;

    border-radius: 20px;

    background:
        linear-gradient(
            135deg,
            #17181d,
            #252831
        );

    font-size: 6rem;
}

.exercise-modal-card > h2 {
    margin-top: 8px;
}

.exercise-modal-card > p {
    margin-top: 7px;
    color: var(--study-muted);
    line-height: 1.6;
}

.exercise-detail-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 9px;

    margin-top: 20px;
}

.exercise-detail-grid div {
    padding: 15px;

    text-align: center;

    border-radius: 12px;
    background: var(--study-surface-soft);
}

.exercise-detail-grid span,
.exercise-detail-grid strong {
    display: block;
}

.exercise-detail-grid span {
    color: var(--study-muted);

    font-size: 0.62rem;
    font-weight: 800;
}

.exercise-detail-grid strong {
    margin-top: 4px;
}

.exercise-tips {
    margin: 20px 0;

    padding: 15px;

    border-radius: 13px;

    background: #fff8e7;
}

.exercise-tips p {
    margin-top: 5px;

    color: #716a5b;
    font-size: 0.8rem;
}


/* =========================================================
   ACHIEVEMENT
========================================================= */

.achievement-unlock,
.record-celebration {
    position: relative;

    width: min(450px, 100%);

    padding: 45px 30px;

    text-align: center;

    overflow: hidden;

    border-radius: 32px;

    background:
        radial-gradient(
            circle at 50% 0%,
            rgba(139, 92, 246, 0.15),
            transparent 45%
        ),
        white;

    box-shadow: var(--shadow-lg);

    animation: achievementPop 0.65s cubic-bezier(0.2, 1.4, 0.3, 1) both;
}

.unlock-sticker,
.record-icon {
    width: 110px;
    height: 110px;

    display: grid;
    place-items: center;

    margin: 0 auto 20px;

    border-radius: 30px;

    background: #eef2ff;

    font-size: 4.2rem;

    animation: stickerBounce 1.2s ease both;
}

.achievement-unlock h2,
.record-celebration h2 {
    margin-top: 10px;

    font-size: 2rem;
}

.achievement-unlock p,
.record-celebration p {
    margin-top: 8px;

    color: var(--study-muted);
    line-height: 1.6;
}

#unlockXP {
    display: block;

    margin: 20px 0;

    color: #7c3aed;

    font-size: 1.3rem;
}

.achievement-confetti {
    position: absolute;
    inset: 0;

    pointer-events: none;
}


/* =========================================================
   GAMES
========================================================= */

.game-modal {
    text-align: center;
}

.game-area {
    min-height: 240px;

    display: grid;
    place-items: center;

    margin: 20px 0;

    border-radius: 20px;

    background: var(--study-surface-soft);
}

#gameResult {
    min-height: 25px;
    margin-bottom: 12px;
    font-weight: 800;
}


/* =========================================================
   FOCUS MODE
========================================================= */

.focus-mode-overlay {
    position: fixed;

    inset: 0;

    z-index: 500;

    display: none;
    place-items: center;

    background:
        radial-gradient(
            circle at center,
            #15152a,
            #06060a 65%
        );

    color: white;
}

.focus-mode-overlay.open {
    display: grid;
    animation: fadeIn 0.4s ease both;
}

.focus-mode-content {
    text-align: center;
}

.focus-mode-content .eyebrow {
    color: #8b5cf6;
}

.focus-mode-timer {
    margin-top: 15px;

    font-size: clamp(6rem, 18vw, 13rem);

    font-weight: 850;
    line-height: 0.9;

    letter-spacing: -0.08em;
}

.focus-mode-content p {
    margin: 20px 0 30px;

    color: #9999a8;
}


/* =========================================================
   TOASTS
========================================================= */

.toast-container {
    position: fixed;

    right: 22px;
    bottom: 22px;

    z-index: 600;

    display: flex;
    flex-direction: column;
    gap: 10px;

    width: min(350px, calc(100% - 44px));
}

.toast {
    padding: 15px 17px;

    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 13px;

    background: #15151c;
    color: white;

    box-shadow: var(--shadow-lg);

    animation:
        toastIn 0.4s ease both,
        toastOut 0.4s 3.8s ease forwards;
}


/* =========================================================
   EMPTY STATES
========================================================= */

.empty-state {
    display: grid;
    place-items: center;

    padding: 40px;

    text-align: center;

    color: var(--study-muted);
}

.empty-state span {
    font-size: 2rem;
    margin-bottom: 8px;
}


/* =========================================================
   ANIMATIONS
========================================================= */

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(18px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeDown {
    from {
        opacity: 0;
        transform: translateY(-18px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes cardEntrance {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.97);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes pageEnter {
    from {
        opacity: 0;
        transform: scale(0.985);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes modalIn {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.96);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes achievementPop {
    from {
        opacity: 0;
        transform: scale(0.65) translateY(30px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes stickerBounce {
    0% {
        transform: scale(0.3) rotate(-15deg);
    }

    60% {
        transform: scale(1.15) rotate(5deg);
    }

    80% {
        transform: scale(0.95) rotate(-2deg);
    }

    100% {
        transform: scale(1) rotate(0);
    }
}

@keyframes toastIn {
    from {
        opacity: 0;
        transform: translateX(30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes toastOut {
    to {
        opacity: 0;
        transform: translateX(30px);
    }
}


/* =========================================================
   RESPONSIVE — TABLET
========================================================= */

@media (max-width: 900px) {

    .mode-grid {
        grid-template-columns: 1fr;
    }

    .mode-card {
        min-height: 320px;
    }

    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .goal-grid {
        grid-template-columns: 1fr;
    }

    .dashboard-columns {
        grid-template-columns: 1fr;
    }

    .focus-layout,
    .workout-session-layout {
        grid-template-columns: 1fr;
    }

    .break-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .subject-grid,
    .workout-plan-grid,
    .exercise-library {
        grid-template-columns: repeat(2, 1fr);
    }

    .sound-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .exercise-preview-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .analytics-columns {
        grid-template-columns: 1fr;
    }

    .music-player {
        grid-template-columns: auto 1fr;
    }

    .music-controls,
    .volume-control {
        grid-column: span 1;
    }
}


/* =========================================================
   RESPONSIVE — MOBILE
========================================================= */

@media (max-width: 620px) {

    .mode-content {
        width: min(100% - 24px, 520px);
        padding: 35px 0 25px;
    }

    .brand-area {
        margin-bottom: 35px;
    }

    .mode-heading {
        margin-bottom: 25px;
    }

    .mode-heading h2 {
        font-size: 2.25rem;
    }

    .mode-card {
        min-height: 300px;
        padding: 25px;
        border-radius: 24px;
    }

    .mode-card h3 {
        font-size: 1.65rem;
    }

    .mode-icon-wrapper {
        width: 65px;
        height: 65px;
    }

    .mode-icon {
        font-size: 30px;
    }

    .mode-card-content {
        margin-top: 24px;
    }

    .mode-footer {
        display: none;
    }

    .app-header {
        height: 64px;
        padding: 0 15px;
    }

    .app-brand {
        font-size: 0.8rem;
    }

    .mode-navigation {
        top: 64px;

        justify-content: flex-start;

        overflow-x: auto;

        padding: 8px 12px;
    }

    .nav-item {
        flex: 0 0 auto;
        padding: 9px 12px;
    }

    .nav-item span:last-child {
        display: none;
    }

    .app-content {
        width: min(100% - 24px, 600px);
        padding-top: 35px;
    }

    .page-heading {
        align-items: flex-start;
        flex-direction: column;
        gap: 18px;
    }

    .page-heading h1 {
        font-size: 2rem;
    }

    .stats-grid {
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .stat-card {
        padding: 15px;
        gap: 10px;
    }

    .stat-icon {
        width: 38px;
        height: 38px;
    }

    .dashboard-panel {
        padding: 18px;
    }

    .pomodoro-timer {
        font-size: 5rem;
    }

    .focus-timer-card {
        min-height: 430px;
        padding: 25px 15px;
    }

    .timer-controls {
        flex-wrap: wrap;
        justify-content: center;
    }

    .break-grid,
    .subject-grid,
    .workout-plan-grid,
    .exercise-library,
    .sound-grid,
    .exercise-preview-grid,
    .records-grid,
    .analytics-stat-grid {
        grid-template-columns: 1fr 1fr;
    }

    .featured-workout {
        padding: 25px;
        min-height: 240px;
    }

    .featured-workout-icon {
        position: absolute;
        right: -10px;
        opacity: 0.35;
    }

    .exercise-demo {
        min-height: 230px;
    }

    .exercise-demo-placeholder {
        font-size: 6rem;
    }

    .exercise-meta {
        grid-template-columns: 1fr 1fr 1fr;
    }

    .music-player {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .music-cover {
        margin: auto;
    }

    .music-controls,
    .volume-control {
        justify-content: center;
    }

    .task-toolbar {
        align-items: stretch;
        flex-direction: column;
        gap: 12px;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .profile-panel {
        width: 100%;
    }
}


/* =========================================================
   SMALL PHONES
========================================================= */

@media (max-width: 420px) {

    .stats-grid,
    .break-grid,
    .subject-grid,
    .workout-plan-grid,
    .exercise-library,
    .sound-grid,
    .exercise-preview-grid,
    .records-grid,
    .analytics-stat-grid {
        grid-template-columns: 1fr;
    }

    .mode-card {
        min-height: 285px;
    }

    .mode-features {
        display: none;
    }

    .mode-arrow {
        right: 20px;
        bottom: 20px;
    }

    .daily-streak {
        width: 100%;
    }

    .timer-controls {
        width: 100%;
    }

    .timer-controls button {
        flex: 1;
    }

    .exercise-meta {
        grid-template-columns: 1fr;
    }

    .quote-card {
        padding: 25px;
    }
}


/* =========================================================
   ACCESSIBILITY
========================================================= */

@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}


/* =========================================================
   CUSTOM SCROLLBAR
========================================================= */

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #b9bdc7;
    border-radius: 99px;
}

.workout-environment::-webkit-scrollbar-thumb {
    background: #343741;
}
```
