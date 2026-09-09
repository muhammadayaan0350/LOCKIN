```javascript
/* =========================================================
   FOCUS — Productivity + Fitness Companion
   Main Application Logic
   ========================================================= */

/* =========================================================
   APP STATE
   ========================================================= */

const STORAGE_KEY = "focusAppState";

const defaultState = {
    version: 1,

    theme: "dark",

    currentPage: "home",
    currentMode: null,

    studyTime: 0,
    workoutTime: 0,
    pomodoros: 0,

    streak: 0,
    longestStreak: 0,

    xp: 0,
    level: 1,

    dailyGoals: {
        study: 120,
        pomodoros: 4,
        workout: 45,
        tasks: 5
    },

    todayProgress: {
        study: 0,
        pomodoros: 0,
        workout: 0,
        tasks: 0
    },

    tasks: [],

    subjects: [
        "Computer Science",
        "Mathematics",
        "Electronics",
        "Physics"
    ],

    routines: [
        {
            id: "r1",
            time: "06:30",
            title: "Wake Up",
            description: "Start the day without immediately checking your phone.",
            completed: false
        },
        {
            id: "r2",
            time: "07:00",
            title: "Morning Workout",
            description: "Move your body and get ready for the day.",
            completed: false
        },
        {
            id: "r3",
            time: "09:00",
            title: "Deep Work",
            description: "Focus on your highest-priority study task.",
            completed: false
        },
        {
            id: "r4",
            time: "18:00",
            title: "Evening Review",
            description: "Review progress and finish remaining tasks.",
            completed: false
        }
    ],

    habits: [
        {
            id: "h1",
            name: "Study",
            days: []
        },
        {
            id: "h2",
            name: "Workout",
            days: []
        },
        {
            id: "h3",
            name: "Read",
            days: []
        },
        {
            id: "h4",
            name: "Sleep on Time",
            days: []
        }
    ],

    workouts: [],

    personalRecords: {
        longestStudy: 0,
        mostPomodoros: 0,
        longestStreak: 0,
        longestWorkout: 0,
        mostSets: 0,
        longestWorkoutStreak: 0
    },

    achievements: [],

    dailyHistory: {},

    music: {
        track: 0,
        playing: false,
        volume: 0.7,
        sound: null
    },

    settings: {
        notifications: true
    }
};

let state = loadState();

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return structuredClone(defaultState);
        }

        const parsed = JSON.parse(saved);

        return mergeDeep(
            structuredClone(defaultState),
            parsed
        );
    } catch (error) {
        console.error("Could not load app state:", error);
        return structuredClone(defaultState);
    }
}

function saveState() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );
}

function mergeDeep(target, source) {
    Object.keys(source || {}).forEach(key => {
        if (
            source[key] &&
            typeof source[key] === "object" &&
            !Array.isArray(source[key]) &&
            target[key] &&
            typeof target[key] === "object"
        ) {
            mergeDeep(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    });

    return target;
}

/* =========================================================
   HELPERS
   ========================================================= */

const $ = id => document.getElementById(id);

const $$ = selector =>
    Array.from(document.querySelectorAll(selector));

function todayKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatMinutes(minutes) {
    minutes = Math.max(0, Math.round(minutes));

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
        return `${mins}m`;
    }

    if (mins === 0) {
        return `${hours}h`;
    }

    return `${hours}h ${mins}m`;
}

function formatTime(seconds) {
    seconds = Math.max(0, Math.floor(seconds));

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function generateId(prefix = "id") {
    return `${prefix}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;
}

/* =========================================================
   DATE / DAILY RESET
   ========================================================= */

function initializeDay() {
    const today = todayKey();

    if (!state.dailyHistory[today]) {
        state.dailyHistory[today] = {
            study: 0,
            pomodoros: 0,
            workout: 0,
            tasks: 0,
            workoutSets: 0
        };
    }

    state.todayProgress = {
        study: state.dailyHistory[today].study || 0,
        pomodoros: state.dailyHistory[today].pomodoros || 0,
        workout: state.dailyHistory[today].workout || 0,
        tasks: state.dailyHistory[today].tasks || 0
    };

    saveState();
}

function recordDailyData() {
    const today = todayKey();

    state.dailyHistory[today] = {
        study: state.todayProgress.study,
        pomodoros: state.todayProgress.pomodoros,
        workout: state.todayProgress.workout,
        tasks: state.todayProgress.tasks,
        workoutSets:
            state.dailyHistory[today]?.workoutSets || 0
    };

    saveState();
}

/* =========================================================
   QUOTES
   ========================================================= */

const studyQuotes = [
    ["Discipline beats motivation.", "Focus"],
    ["Small progress is still progress.", "Focus"],
    ["You don't need to feel ready. Start.", "Focus"],
    ["One focused hour can change your day.", "Focus"],
    ["Future you is counting on today's effort.", "Focus"],
    ["Stop waiting. Start building.", "Focus"],
    ["Consistency makes ordinary effort extraordinary.", "Focus"],
    ["Your attention is your superpower.", "Focus"]
];

const workoutQuotes = [
    ["Earn your strength.", "Focus"],
    ["One more rep.", "Focus"],
    ["Train today. Thank yourself tomorrow.", "Focus"],
    ["Strong body. Strong mind.", "Focus"],
    ["Don't quit when it gets uncomfortable.", "Focus"],
    ["Progress is built one set at a time.", "Focus"],
    ["Show up. Work hard. Repeat.", "Focus"]
];

function randomQuote(type = "study") {
    const list =
        type === "workout"
            ? workoutQuotes
            : studyQuotes;

    return list[Math.floor(Math.random() * list.length)];
}

function displayQuote(elementId, type = "study") {
    const element = $(elementId);

    if (!element) return;

    const [text, author] = randomQuote(type);

    const textElement =
        element.querySelector(".quote-text") ||
        element;

    const authorElement =
        element.querySelector(".quote-author");

    textElement.textContent = `"${text}"`;

    if (authorElement) {
        authorElement.textContent = `— ${author}`;
    }
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {
    $$(".nav-btn").forEach(button => {
        button.addEventListener("click", () => {
            const page = button.dataset.page;

            if (page) {
                navigateTo(page);
            }
        });
    });

    $("profileButton")?.addEventListener(
        "click",
        () => navigateTo("profile")
    );
}

function navigateTo(page) {
    $$(".page").forEach(section => {
        section.classList.remove("active");
    });

    const target = $(`${page}Page`);

    if (target) {
        target.classList.add("active");
    }

    $$(".nav-btn").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === page
        );
    });

    state.currentPage = page;
    saveState();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (page === "analytics") {
        updateAnalytics();
    }

    if (page === "calendar") {
        renderCalendar();
    }

    if (page === "profile") {
        updateProfile();
    }
}

/* =========================================================
   HOME
   ========================================================= */

function updateGreeting() {
    const hour = new Date().getHours();

    let greeting = "Good evening";

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    }

    const element = $("greeting");

    if (element) {
        element.textContent = greeting;
    }

    const dateElement = $("currentDate");

    if (dateElement) {
        dateElement.textContent =
            new Date().toLocaleDateString(
                undefined,
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );
    }
}

function updateDashboard() {
    const study = $("studyTime");
    const pomos = $("pomodoroCount");
    const workout = $("workoutTime");
    const streak = $("streak");

    if (study) {
        study.textContent =
            formatMinutes(state.todayProgress.study);
    }

    if (pomos) {
        pomos.textContent =
            state.todayProgress.pomodoros;
    }

    if (workout) {
        workout.textContent =
            formatMinutes(state.todayProgress.workout);
    }

    if (streak) {
        streak.textContent =
            state.streak;
    }

    const homeStreak = $("homeStreak");

    if (homeStreak) {
        homeStreak.textContent =
            `${state.streak} day${state.streak === 1 ? "" : "s"}`;
    }

    updateGoalDisplays();
    updatePriorityTasks();
}

function updateGoalDisplays() {
    updateGoal(
        "studyGoalText",
        "studyProgress",
        state.todayProgress.study,
        state.dailyGoals.study,
        " min"
    );

    updateGoal(
        "pomodoroGoalText",
        "pomodoroProgress",
        state.todayProgress.pomodoros,
        state.dailyGoals.pomodoros,
        ""
    );

    updateGoal(
        "workoutGoalText",
        "workoutProgress",
        state.todayProgress.workout,
        state.dailyGoals.workout,
        " min"
    );

    updateGoal(
        "taskGoalText",
        "taskProgress",
        state.todayProgress.tasks,
        state.dailyGoals.tasks,
        ""
    );
}

function updateGoal(
    textId,
    progressId,
    current,
    target,
    suffix
) {
    const text = $(textId);
    const progress = $(progressId);

    if (text) {
        text.textContent =
            `${Math.round(current)} / ${target}${suffix}`;
    }

    if (progress) {
        const percentage =
            target > 0
                ? Math.min(100, (current / target) * 100)
                : 0;

        progress.style.width =
            `${percentage}%`;
    }
}

function updatePriorityTasks() {
    const container = $("priorityList");

    if (!container) return;

    const tasks = state.tasks
        .filter(task => !task.completed)
        .sort(compareTasks)
        .slice(0, 5);

    if (!tasks.length) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎉</div>
                <p>No priority tasks right now.</p>
            </div>
        `;
        return;
    }

    container.innerHTML =
        tasks.map(renderTaskHTML).join("");
}

/* =========================================================
   TASKS
   ========================================================= */

let currentTaskFilter = "all";

function setupTasks() {
    $("addTaskButton")?.addEventListener(
        "click",
        openTaskModal
    );

    $$(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            currentTaskFilter =
                button.dataset.filter || "all";

            $$(".filter-btn").forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            renderTasks();
        });
    });

    $("taskForm")?.addEventListener(
        "submit",
        handleTaskSubmit
    );

    $("closeTaskModal")?.addEventListener(
        "click",
        closeTaskModal
    );
}

function compareTasks(a, b) {
    const priorityWeight = {
        high: 0,
        medium: 1,
        low: 2
    };

    const priorityDifference =
        (priorityWeight[a.priority] ?? 3) -
        (priorityWeight[b.priority] ?? 3);

    if (priorityDifference !== 0) {
        return priorityDifference;
    }

    return (
        new Date(a.dueDate || "9999-12-31") -
        new Date(b.dueDate || "9999-12-31")
    );
}

function renderTasks() {
    const container = $("taskList");

    if (!container) return;

    let tasks = [...state.tasks];

    if (currentTaskFilter === "active") {
        tasks = tasks.filter(task => !task.completed);
    }

    if (currentTaskFilter === "completed") {
        tasks = tasks.filter(task => task.completed);
    }

    if (currentTaskFilter === "high") {
        tasks = tasks.filter(
            task => task.priority === "high"
        );
    }

    tasks.sort(compareTasks);

    if (!tasks.length) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <p>No tasks here yet.</p>
            </div>
        `;
        return;
    }

    container.innerHTML =
        tasks.map(renderTaskHTML).join("");

    container
        .querySelectorAll("[data-task-id]")
        .forEach(element => {
            element.addEventListener("click", () => {
                const id = element.dataset.taskId;

                completeTask(id);
            });
        });
}

function renderTaskHTML(task) {
    const overdue =
        !task.completed &&
        task.dueDate &&
        new Date(task.dueDate) < startOfToday();

    const priorityClass =
        `priority-${task.priority || "medium"}`;

    return `
        <div class="task-card
            ${task.completed ? "completed" : ""}
            ${overdue ? "task-overdue" : ""}"
        >
            <button
                class="task-checkbox ${task.completed ? "checked" : ""}"
                data-task-id="${escapeHTML(task.id)}"
                aria-label="Complete task"
            >
                ${task.completed ? "✓" : ""}
            </button>

            <div class="task-content">
                <div class="task-title">
                    ${escapeHTML(task.title)}
                </div>

                <div class="task-meta">
                    <span class="priority-badge ${priorityClass}">
                        ${escapeHTML(task.priority || "medium")}
                    </span>

                    ${
                        task.subject
                            ? `<span class="subject-badge">
                                ${escapeHTML(task.subject)}
                              </span>`
                            : ""
                    }

                    ${
                        task.dueDate
                            ? `<span>
                                ${overdue
                                    ? '<span class="overdue-label">Overdue</span>'
                                    : `Due ${formatDate(task.dueDate)}`}
                              </span>`
                            : ""
                    }

                    ${
                        task.estimatedTime
                            ? `<span>${task.estimatedTime} min</span>`
                            : ""
                    }
                </div>
            </div>
        </div>
    `;
}

function completeTask(id) {
    const task =
        state.tasks.find(task => task.id === id);

    if (!task || task.completed) return;

    task.completed = true;

    state.todayProgress.tasks++;

    addXP(20);

    updateStreak();

    recordDailyData();

    checkAchievements();

    renderTasks();
    updateDashboard();

    showNotification(
        "Task complete! 🎯",
        `+20 XP — ${task.title}`,
        "success"
    );

    saveState();
}

function openTaskModal() {
    const modal = $("taskModal");

    if (!modal) return;

    modal.classList.add("active");

    $("taskTitle")?.focus();

    populateSubjectSelects();
}

function closeTaskModal() {
    $("taskModal")?.classList.remove("active");
}

function handleTaskSubmit(event) {
    event.preventDefault();

    const title = $("taskTitle")?.value.trim();

    if (!title) return;

    const task = {
        id: generateId("task"),
        title,
        priority:
            $("taskPriority")?.value || "medium",
        subject:
            $("taskSubject")?.value || "",
        dueDate:
            $("taskDueDate")?.value || "",
        estimatedTime:
            Number($("taskEstimatedTime")?.value) || 25,
        completed: false,
        createdAt: new Date().toISOString()
    };

    state.tasks.push(task);

    event.target.reset();

    closeTaskModal();

    renderTasks();
    updateDashboard();

    saveState();

    showNotification(
        "Task added 📋",
        "Stay focused and get it done.",
        "success"
    );
}

function startOfToday() {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    return date;
}

function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString(
        undefined,
        {
            month: "short",
            day: "numeric"
        }
    );
}

/* =========================================================
   SUBJECTS
   ========================================================= */

function populateSubjectSelects() {
    const selectors = [
        $("subjectSelect"),
        $("pomodoroTask"),
        $("taskSubject")
    ];

    selectors.forEach(select => {
        if (!select) return;

        const current = select.value;

        let firstOption =
            select.id === "taskSubject"
                ? `<option value="">No subject</option>`
                : `<option value="">Select subject</option>`;

        select.innerHTML =
            firstOption +
            state.subjects
                .map(subject =>
                    `<option value="${escapeHTML(subject)}">
                        ${escapeHTML(subject)}
                    </option>`
                )
                .join("");

        if (
            current &&
            state.subjects.includes(current)
        ) {
            select.value = current;
        }
    });
}

function setupSubjects() {
    $("addSubject")?.addEventListener(
        "click",
        () => {
            const name = prompt(
                "Enter the new subject:"
            );

            if (!name?.trim()) return;

            const subject = name.trim();

            if (
                !state.subjects.some(
                    item =>
                        item.toLowerCase() ===
                        subject.toLowerCase()
                )
            ) {
                state.subjects.push(subject);

                saveState();

                populateSubjectSelects();
                renderSubjectCards();

                showNotification(
                    "Subject added 📚",
                    subject,
                    "success"
                );
            }
        }
    );

    populateSubjectSelects();
    renderSubjectCards();
}

function renderSubjectCards() {
    const container = $("subjectGrid");

    if (!container) return;

    const stats = {};

    state.subjects.forEach(subject => {
        stats[subject] = 0;
    });

    state.tasks.forEach(task => {
        if (task.subject && stats[task.subject] !== undefined) {
            stats[task.subject]++;
        }
    });

    container.innerHTML =
        state.subjects.map(subject => `
            <div class="subject-card">
                <h3>${escapeHTML(subject)}</h3>
                <p>Tasks tracked</p>
                <div class="subject-time">
                    ${stats[subject] || 0}
                </div>
            </div>
        `).join("");
}

/* =========================================================
   POMODORO TIMER
   ========================================================= */

const pomodoro = {
    focusSeconds: 25 * 60,
    breakSeconds: 5 * 60,

    remaining: 25 * 60,

    running: false,
    interval: null,

    mode: "focus",
    session: 1,
    targetSessions: 4
};

function setupPomodoro() {
    $("startPomodoro")?.addEventListener(
        "click",
        startPomodoro
    );

    $("pausePomodoro")?.addEventListener(
        "click",
        pausePomodoro
    );

    $("resetPomodoro")?.addEventListener(
        "click",
        resetPomodoro
    );

    $$(".timer-preset").forEach(button => {
        button.addEventListener("click", () => {
            const focus =
                Number(button.dataset.focus) || 25;

            const breakTime =
                Number(button.dataset.break) || 5;

            pomodoro.focusSeconds =
                focus * 60;

            pomodoro.breakSeconds =
                breakTime * 60;

            pomodoro.mode = "focus";

            pomodoro.remaining =
                pomodoro.focusSeconds;

            $$(".timer-preset").forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            updatePomodoroDisplay();
        });
    });

    updatePomodoroDisplay();
}

function startPomodoro() {
    if (pomodoro.running) return;

    pomodoro.running = true;

    updatePomodoroStatus();

    pomodoro.interval =
        setInterval(() => {
            pomodoro.remaining--;

            updatePomodoroDisplay();

            if (pomodoro.remaining <= 0) {
                finishPomodoroPhase();
            }
        }, 1000);
}

function pausePomodoro() {
    pomodoro.running = false;

    clearInterval(pomodoro.interval);

    updatePomodoroStatus();
}

function resetPomodoro() {
    pausePomodoro();

    pomodoro.mode = "focus";

    pomodoro.remaining =
        pomodoro.focusSeconds;

    updatePomodoroDisplay();
    updatePomodoroStatus();
}

function finishPomodoroPhase() {
    pausePomodoro();

    if (pomodoro.mode === "focus") {
        completePomodoro();

        pomodoro.mode = "break";

        pomodoro.remaining =
            pomodoro.breakSeconds;

        showNotification(
            "Focus session complete! 🔥",
            "Take a proper break.",
            "success"
        );

        playNotificationSound();
    } else {
        pomodoro.mode = "focus";

        pomodoro.remaining =
            pomodoro.focusSeconds;

        showNotification(
            "Break finished ⚡",
            "Back to focus.",
            "success"
        );
    }

    updatePomodoroDisplay();
}

function completePomodoro() {
    state.todayProgress.pomodoros++;

    state.pomodoros++;

    addXP(50);

    const today = todayKey();

    state.dailyHistory[today].pomodoros =
        state.todayProgress.pomodoros;

    const studyMinutes =
        pomodoro.focusSeconds / 60;

    state.todayProgress.study +=
        studyMinutes;

    state.studyTime +=
        studyMinutes;

    state.dailyHistory[today].study =
        state.todayProgress.study;

    updatePersonalRecord(
        "mostPomodoros",
        state.todayProgress.pomodoros
    );

    updatePersonalRecord(
        "longestStudy",
        state.todayProgress.study
    );

    updateStreak();

    checkAchievements();

    updateDashboard();
    updateAnalytics();

    saveState();
}

function updatePomodoroDisplay() {
    const timer = $("pomodoroTimer");

    if (timer) {
        timer.textContent =
            formatTime(pomodoro.remaining);
    }

    const status = $("timerStatus");

    if (status) {
        status.textContent =
            pomodoro.mode === "focus"
                ? "FOCUS"
                : "BREAK";
    }

    const currentSession =
        $("currentSession");

    if (currentSession) {
        currentSession.textContent =
            pomodoro.session;
    }

    const sessionsTarget =
        $("sessionsTarget");

    if (sessionsTarget) {
        sessionsTarget.textContent =
            pomodoro.targetSessions;
    }
}

function updatePomodoroStatus() {
    const start =
        $("startPomodoro");

    const pause =
        $("pausePomodoro");

    if (start) {
        start.disabled =
            pomodoro.running;
    }

    if (pause) {
        pause.disabled =
            !pomodoro.running;
    }
}

/* =========================================================
   MUSIC / AMBIENT
   ========================================================= */

const tracks = [
    "Lo-Fi Focus",
    "Deep Work",
    "Rainy Study",
    "Late Night Coding"
];

function setupMusic() {
    $("previousTrack")?.addEventListener(
        "click",
        previousTrack
    );

    $("nextTrack")?.addEventListener(
        "click",
        nextTrack
    );

    $("musicPlay")?.addEventListener(
        "click",
        toggleMusic
    );

    $("musicVolume")?.addEventListener(
        "input",
        event => {
            state.music.volume =
                Number(event.target.value);

            saveState();
        }
    );

    $$(".sound-option").forEach(option => {
        option.addEventListener("click", () => {
            $$(".sound-option").forEach(item =>
                item.classList.remove("active")
            );

            option.classList.add("active");

            state.music.sound =
                option.dataset.sound ||
                option.textContent.trim();

            saveState();

            showNotification(
                "Ambient mode 🎧",
                state.music.sound,
                "success"
            );
        });
    });

    updateMusicUI();
}

function previousTrack() {
    state.music.track =
        (state.music.track - 1 + tracks.length) %
        tracks.length;

    updateMusicUI();
    saveState();
}

function nextTrack() {
    state.music.track =
        (state.music.track + 1) %
        tracks.length;

    updateMusicUI();
    saveState();
}

function toggleMusic() {
    state.music.playing =
        !state.music.playing;

    updateMusicUI();

    showNotification(
        state.music.playing
            ? "Music started 🎧"
            : "Music paused",
        tracks[state.music.track],
        "success"
    );

    saveState();
}

function updateMusicUI() {
    const currentTrack =
        $("currentTrack");

    if (currentTrack) {
        currentTrack.textContent =
            tracks[state.music.track];
    }

    const button =
        $("musicPlay");

    if (button) {
        button.textContent =
            state.music.playing
                ? "⏸"
                : "▶";
    }

    const volume =
        $("musicVolume");

    if (volume) {
        volume.value =
            state.music.volume;
    }
}

/* =========================================================
   BREAK SYSTEM
   ========================================================= */

let breakSeconds = 5 * 60;
let breakInterval = null;

function setupBreakSystem() {
    $("refreshBreak")?.addEventListener(
        "click",
        startBreak
    );

    $$(".break-card").forEach(card => {
        card.addEventListener("click", () => {
            const type =
                card.dataset.break ||
                card.dataset.game;

            openBreakGame(type);
        });
    });

    $("closeBreakGame")?.addEventListener(
        "click",
        closeBreakGame
    );

    $("closeGame")?.addEventListener(
        "click",
        closeBreakGame
    );

    $("startGame")?.addEventListener(
        "click",
        startCurrentGame
    );
}

function startBreak() {
    clearInterval(breakInterval);

    breakSeconds = 5 * 60;

    updateBreakTimer();

    breakInterval =
        setInterval(() => {
            breakSeconds--;

            updateBreakTimer();

            if (breakSeconds <= 0) {
                clearInterval(breakInterval);

                showNotification(
                    "Break complete 🌱",
                    "Ready for another focus session?",
                    "success"
                );
            }
        }, 1000);
}

function updateBreakTimer() {
    const element = $("breakTimer");

    if (element) {
        element.textContent =
            formatTime(breakSeconds);
    }
}

let currentGame = null;
let reactionStart = 0;

function openBreakGame(type) {
    const modal = $("breakGameModal");

    if (!modal) return;

    currentGame = type;

    modal.classList.add("active");

    const title =
        $("breakGameTitle");

    const area =
        $("gameArea");

    const result =
        $("gameResult");

    if (result) {
        result.textContent = "";
    }

    if (type === "reaction") {
        if (title) {
            title.textContent =
                "⚡ Reaction Test";
        }

        if (area) {
            area.innerHTML = `
                <button
                    class="reaction-button"
                    id="reactionButton"
                >
                    Wait...
                </button>
            `;

            const button =
                $("reactionButton");

            setTimeout(() => {
                if (!button) return;

                button.classList.add("ready");
                button.textContent =
                    "CLICK!";

                reactionStart =
                    performance.now();

                button.onclick =
                    finishReactionGame;
            }, 1200 + Math.random() * 2500);
        }
    } else {
        if (title) {
            title.textContent =
                getGameTitle(type);
        }

        if (area) {
            area.innerHTML =
                getGameIntro(type);
        }
    }
}

function getGameTitle(type) {
    const titles = {
        memory: "🧠 Memory Challenge",
        math: "➗ Quick Math",
        word: "🔤 Word Scramble",
        pattern: "🧩 Pattern Game",
        breathing: "🌿 Breathing Reset",
        stretching: "🧘 Quick Stretch"
    };

    return titles[type] || "Break Activity";
}

function getGameIntro(type) {
    if (type === "memory") {
        return `
            <div>
                <div class="game-question">
                    🐶 🍎 🚀 🎸
                </div>

                <p class="text-secondary mt-small">
                    Remember this sequence.
                </p>

                <button
                    class="btn btn-primary mt-medium"
                    id="memoryStart"
                >
                    Start
                </button>
            </div>
        `;
    }

    if (type === "math") {
        return `
            <div>
                <div class="game-question">
                    17 + 28 = ?
                </div>

                <div class="game-options">
                    <button class="btn" data-answer="41">41</button>
                    <button class="btn" data-answer="45">45</button>
                    <button class="btn" data-answer="47">47</button>
                    <button class="btn" data-answer="51">51</button>
                </div>
            </div>
        `;
    }

    if (type === "word") {
        return `
            <div>
                <div class="game-question">
                    T A R S T
                </div>

                <p class="text-secondary">
                    Unscramble the word.
                </p>

                <input
                    class="form-control mt-medium"
                    id="wordAnswer"
                    placeholder="Your answer"
                >

                <button
                    class="btn btn-primary mt-small"
                    id="wordSubmit"
                >
                    Check
                </button>
            </div>
        `;
    }

    if (type === "breathing") {
        return `
            <div>
                <div class="game-question">
                    Breathe 🌿
                </div>

                <p class="text-secondary">
                    Inhale for 4 seconds.<br>
                    Hold for 4 seconds.<br>
                    Exhale for 6 seconds.
                </p>

                <button
                    class="btn btn-success mt-medium"
                    id="breathingStart"
                >
                    Begin
                </button>
            </div>
        `;
    }

    if (type === "stretching") {
        return `
            <div>
                <div class="game-question">
                    🧘
                </div>

                <p class="text-secondary">
                    Roll your shoulders, stretch your neck,
                    stand up and move for a minute.
                </p>
            </div>
        `;
    }

    return `
        <p class="text-secondary">
            Take a short break and reset your brain.
        </p>
    `;
}

function startCurrentGame() {
    openBreakGame(currentGame);
}

function finishReactionGame() {
    const result =
        Math.round(
            performance.now() -
            reactionStart
        );

    $("gameResult").textContent =
        `${result} ms ⚡`;

    addXP(10);

    checkAchievements();

    saveState();
}

function closeBreakGame() {
    $("breakGameModal")?.classList.remove(
        "active"
    );
}

/* =========================================================
   FOCUS MODE
   ========================================================= */

let focusMode = false;

function setupFocusMode() {
    $("focusModeButton")?.addEventListener(
        "click",
        toggleFocusMode
    );
}

function toggleFocusMode() {
    focusMode = !focusMode;

    document.body.classList.toggle(
        "focus-active",
        focusMode
    );

    if (focusMode) {
        document.documentElement.requestFullscreen?.()
            .catch(() => {});

        showNotification(
            "Focus Mode ON 🔥",
            "Distractions are out.",
            "success"
        );
    } else {
        if (document.fullscreenElement) {
            document.exitFullscreen?.()
                .catch(() => {});
        }

        showNotification(
            "Focus Mode OFF",
            "Welcome back.",
            "success"
        );
    }
}

/* =========================================================
   WORKOUT DATA
   ========================================================= */

const exercises = [
    {
        id: "pushups",
        name: "Push-Ups",
        muscle: "Chest • Triceps",
        icon: "💪",
        description:
            "A classic bodyweight pushing movement.",
        sets: 3,
        reps: "8–15",
        rest: 60,
        tips:
            "Keep your core tight and lower your chest under control."
    },
    {
        id: "squats",
        name: "Bodyweight Squats",
        muscle: "Quads • Glutes",
        icon: "🦵",
        description:
            "Build lower-body strength with controlled squats.",
        sets: 3,
        reps: "12–20",
        rest: 60,
        tips:
            "Keep your knees tracking over your toes."
    },
    {
        id: "lunges",
        name: "Walking Lunges",
        muscle: "Quads • Glutes",
        icon: "🏃",
        description:
            "Single-leg movement for strength and stability.",
        sets: 3,
        reps: "10 / leg",
        rest: 60,
        tips:
            "Take controlled steps and keep your torso upright."
    },
    {
        id: "plank",
        name: "Plank",
        muscle: "Core",
        icon: "🔥",
        description:
            "Isometric core exercise.",
        sets: 3,
        reps: "30–60 sec",
        rest: 45,
        tips:
            "Squeeze your abs and glutes while keeping your hips level."
    },
    {
        id: "pike",
        name: "Pike Push-Ups",
        muscle: "Shoulders • Triceps",
        icon: "🏋️",
        description:
            "Bodyweight shoulder-focused pushing movement.",
        sets: 3,
        reps: "6–12",
        rest: 75,
        tips:
            "Keep your hips high and lower your head toward the floor."
    },
    {
        id: "glutebridge",
        name: "Glute Bridges",
        muscle: "Glutes • Hamstrings",
        icon: "🍑",
        description:
            "Great for posterior-chain activation.",
        sets: 3,
        reps: "12–20",
        rest: 60,
        tips:
            "Pause and squeeze at the top."
    },
    {
        id: "jumpingjacks",
        name: "Jumping Jacks",
        muscle: "Full Body • Cardio",
        icon: "⚡",
        description:
            "Simple cardio movement to raise your heart rate.",
        sets: 3,
        reps: "30–60 sec",
        rest: 45,
        tips:
            "Land softly and maintain a steady rhythm."
    },
    {
        id: "mountainclimbers",
        name: "Mountain Climbers",
        muscle: "Core • Cardio",
        icon: "🏔️",
        description:
            "Fast-paced core and cardio movement.",
        sets: 3,
        reps: "20–40",
        rest: 45,
        tips:
            "Keep your shoulders stacked over your hands."
    },
    {
        id: "burpees",
        name: "Burpees",
        muscle: "Full Body",
        icon: "🔥",
        description:
            "High-intensity full-body conditioning movement.",
        sets: 3,
        reps: "6–12",
        rest: 90,
        tips:
            "Prioritize controlled movement over speed."
    }
];

const workoutPlans = {
    "full-body": [
        "squats",
        "pushups",
        "lunges",
        "pike",
        "plank"
    ],

    upper: [
        "pushups",
        "pike",
        "plank"
    ],

    lower: [
        "squats",
        "lunges",
        "glutebridge"
    ],

    cardio: [
        "jumpingjacks",
        "mountainclimbers",
        "burpees"
    ],

    recovery: [
        "glutebridge",
        "plank"
    ]
};

let selectedWorkoutPlan = "full-body";

let workoutSession = {
    active: false,
    exerciseIndex: 0,
    set: 1,
    elapsed: 0,
    interval: null,
    setsCompleted: 0
};

function setupWorkout() {
    $$(".plan-filter").forEach(button => {
        button.addEventListener("click", () => {
            selectedWorkoutPlan =
                button.dataset.plan ||
                "full-body";

            $$(".plan-filter").forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            renderTodayWorkout();
        });
    });

    $$(".workout-plan-option").forEach(card => {
        card.addEventListener("click", () => {
            selectedWorkoutPlan =
                card.dataset.plan ||
                "full-body";

            $$(".workout-plan-option").forEach(item =>
                item.classList.remove("active")
            );

            card.classList.add("active");

            renderTodayWorkout();
        });
    });

    $("exerciseSearch")?.addEventListener(
        "input",
        renderExerciseLibrary
    );

    $("startWorkout")?.addEventListener(
        "click",
        startWorkout
    );

    $("completeSet")?.addEventListener(
        "click",
        completeWorkoutSet
    );

    $("startRest")?.addEventListener(
        "click",
        startWorkoutRest
    );

    $("closeExerciseModal")?.addEventListener(
        "click",
        closeExerciseModal
    );

    $("addExerciseToWorkout")?.addEventListener(
        "click",
        addCurrentExerciseToWorkout
    );

    renderExerciseLibrary();
    renderTodayWorkout();
    updateWorkoutStats();
}

function renderExerciseLibrary() {
    const container =
        $("exerciseLibrary");

    if (!container) return;

    const search =
        $("exerciseSearch")?.value
            .toLowerCase()
            .trim() || "";

    const filtered =
        exercises.filter(exercise =>
            `${exercise.name} ${exercise.muscle}`
                .toLowerCase()
                .includes(search)
        );

    if (!filtered.length) {
        container.innerHTML = `
            <div class="empty-state">
                No exercises found.
            </div>
        `;

        return;
    }

    container.innerHTML =
        filtered.map(exercise => `
            <div
                class="exercise-card"
                data-exercise="${exercise.id}"
            >
                <div class="exercise-demo">
                    ${exercise.icon}
                </div>

                <div class="exercise-content">
                    <h3>${escapeHTML(exercise.name)}</h3>

                    <p>
                        ${escapeHTML(exercise.muscle)}
                    </p>

                    <div class="exercise-details">
                        <span class="exercise-detail">
                            ${exercise.sets} sets
                        </span>

                        <span class="exercise-detail">
                            ${escapeHTML(exercise.reps)}
                        </span>

                        <span class="exercise-detail">
                            ${exercise.rest}s rest
                        </span>
                    </div>
                </div>
            </div>
        `).join("");

    container
        .querySelectorAll(".exercise-card")
        .forEach(card => {
            card.addEventListener("click", () => {
                openExerciseModal(
                    card.dataset.exercise
                );
            });
        });
}

function renderTodayWorkout() {
    const ids =
        workoutPlans[selectedWorkoutPlan] ||
        workoutPlans["full-body"];

    const selectedExercises =
        ids.map(id =>
            exercises.find(
                exercise => exercise.id === id
            )
        ).filter(Boolean);

    const name =
        $("activeWorkoutName");

    const meta =
        $("activeWorkoutMeta");

    if (name) {
        name.textContent =
            capitalize(selectedWorkoutPlan)
            + " Workout";
    }

    if (meta) {
        meta.textContent =
            `${selectedExercises.length} exercises • ${
                selectedExercises.reduce(
                    (total, exercise) =>
                        total + exercise.sets,
                    0
                )
            } total sets`;
    }

    const container =
        $("todayExerciseList");

    if (!container) return;

    container.innerHTML =
        selectedExercises.map((exercise, index) => `
            <div class="task-card">
                <div class="exercise-demo"
                     style="width:55px;min-height:55px;border-radius:12px;font-size:1.6rem;">
                    ${exercise.icon}
                </div>

                <div class="task-content">
                    <div class="task-title">
                        ${index + 1}. ${escapeHTML(exercise.name)}
                    </div>

                    <div class="task-meta">
                        <span>
                            ${exercise.sets} × ${escapeHTML(exercise.reps)}
                        </span>

                        <span>
                            ${exercise.rest}s rest
                        </span>
                    </div>
                </div>
            </div>
        `).join("");
}

function startWorkout() {
    if (workoutSession.active) return;

    workoutSession = {
        active: true,
        exerciseIndex: 0,
        set: 1,
        elapsed: 0,
        interval: null,
        setsCompleted: 0
    };

    workoutSession.interval =
        setInterval(() => {
            workoutSession.elapsed++;

            updateWorkoutTimer();

            if (
                workoutSession.elapsed %
                    60 === 0
            ) {
                state.todayProgress.workout++;

                state.workoutTime++;

                recordDailyData();

                updateDashboard();
            }
        }, 1000);

    updateCurrentExercise();

    showNotification(
        "Workout started 💪",
        "Let's get to work.",
        "success"
    );
}

function updateWorkoutTimer() {
    const timer =
        $("workoutTimer");

    if (!timer) return;

    timer.textContent =
        formatTime(
            workoutSession.elapsed
        );
}

function updateCurrentExercise() {
    const ids =
        workoutPlans[selectedWorkoutPlan];

    const exercise =
        exercises.find(
            item =>
                item.id === ids[workoutSession.exerciseIndex]
        );

    if (!exercise) {
        finishWorkout();

        return;
    }

    const currentExercise =
        $("currentExercise");

    const currentSet =
        $("currentSet");

    const totalSets =
        $("totalSets");

    const targetReps =
        $("targetReps");

    if (currentExercise) {
        currentExercise.textContent =
            exercise.name;
    }

    if (currentSet) {
        currentSet.textContent =
            workoutSession.set;
    }

    if (totalSets) {
        totalSets.textContent =
            exercise.sets;
    }

    if (targetReps) {
        targetReps.textContent =
            exercise.reps;
    }

    updateWorkoutTimer();
}

function completeWorkoutSet() {
    if (!workoutSession.active) {
        showNotification(
            "Start your workout first.",
            "Press Start Workout.",
            "warning"
        );

        return;
    }

    const ids =
        workoutPlans[selectedWorkoutPlan];

    const exercise =
        exercises.find(
            item =>
                item.id ===
                ids[workoutSession.exerciseIndex]
        );

    if (!exercise) return;

    workoutSession.setsCompleted++;

    state.todayProgress.workout =
        Math.max(
            state.todayProgress.workout,
            1
        );

    const today =
        todayKey();

    state.dailyHistory[today].workoutSets =
        (state.dailyHistory[today].workoutSets || 0) + 1;

    state.totalSetsCompleted =
        (state.totalSetsCompleted || 0) + 1;

    addXP(30);

    if (workoutSession.set >= exercise.sets) {
        workoutSession.exerciseIndex++;
        workoutSession.set = 1;

        if (
            workoutSession.exerciseIndex >=
            ids.length
        ) {
            finishWorkout();
            return;
        }
    } else {
        workoutSession.set++;
    }

    updateCurrentExercise();

    updatePersonalRecord(
        "mostSets",
        workoutSession.setsCompleted
    );

    checkAchievements();

    saveState();

    showNotification(
        "Set complete! 🔥",
        "+30 XP",
        "success"
    );
}

function startWorkoutRest() {
    let seconds = 60;

    const button =
        $("startRest");

    if (!button) return;

    button.disabled = true;

    const originalText =
        button.textContent;

    const interval =
        setInterval(() => {
            seconds--;

            button.textContent =
                `Rest ${seconds}s`;

            if (seconds <= 0) {
                clearInterval(interval);

                button.disabled = false;

                button.textContent =
                    originalText;
            }
        }, 1000);
}

function finishWorkout() {
    clearInterval(
        workoutSession.interval
    );

    workoutSession.active = false;

    const minutes =
        Math.max(
            1,
            Math.round(
                workoutSession.elapsed / 60
            )
        );

    state.todayProgress.workout +=
        Math.max(0, minutes - state.todayProgress.workout % minutes);

    state.workoutTime += minutes;

    const today =
        todayKey();

    state.dailyHistory[today].workout =
        state.todayProgress.workout;

    updatePersonalRecord(
        "longestWorkout",
        minutes
    );

    updatePersonalRecord(
        "mostSets",
        workoutSession.setsCompleted
    );

    updateStreak();

    addXP(100);

    checkAchievements();

    updateDashboard();
    updateWorkoutStats();

    saveState();

    showRecordCelebration(
        "Workout Complete 💪",
        `${minutes} min`,
        "You showed up and finished the job."
    );

    showNotification(
        "Workout complete! 🏆",
        "+100 XP",
        "success"
    );
}

function openExerciseModal(id) {
    const exercise =
        exercises.find(
            item => item.id === id
        );

    if (!exercise) return;

    const modal =
        $("exerciseModal");

    if (!modal) return;

    modal.classList.add("active");

    modal.dataset.exercise =
        exercise.id;

    const demo =
        $("exerciseDemo");

    if (demo) {
        demo.textContent =
            exercise.icon;
    }

    const muscle =
        $("modalExerciseMuscle");

    const name =
        $("modalExerciseName");

    const description =
        $("modalExerciseDescription");

    const sets =
        $("modalSets");

    const reps =
        $("modalReps");

    const rest =
        $("modalRest");

    const tips =
        $("modalExerciseTips");

    if (muscle) muscle.textContent = exercise.muscle;
    if (name) name.textContent = exercise.name;
    if (description) description.textContent = exercise.description;
    if (sets) sets.textContent = exercise.sets;
    if (reps) reps.textContent = exercise.reps;
    if (rest) rest.textContent = `${exercise.rest}s`;
    if (tips) tips.textContent = exercise.tips;
}

function closeExerciseModal() {
    $("exerciseModal")?.classList.remove(
        "active"
    );
}

function addCurrentExerciseToWorkout() {
    const id =
        $("exerciseModal")?.dataset.exercise;

    if (!id) return;

    if (!workoutPlans[selectedWorkoutPlan].includes(id)) {
        workoutPlans[selectedWorkoutPlan].push(id);
    }

    closeExerciseModal();

    renderTodayWorkout();

    showNotification(
        "Exercise added 💪",
        "Your workout has been updated.",
        "success"
    );
}

/* =========================================================
   WORKOUT STATS
   ========================================================= */

function updateWorkoutStats() {
    if ($("workoutCount")) {
        $("workoutCount").textContent =
            state.workouts.length;
    }

    if ($("totalWorkoutTime")) {
        $("totalWorkoutTime").textContent =
            formatMinutes(
                state.workoutTime
            );
    }

    if ($("totalSetsCompleted")) {
        $("totalSetsCompleted").textContent =
            state.personalRecords.mostSets;
    }

    if ($("workoutStreak")) {
        $("workoutStreak").textContent =
            state.personalRecords.longestWorkoutStreak;
    }

    if ($("workoutQuote")) {
        const [text] =
            randomQuote("workout");

        $("workoutQuote").textContent =
            `"${text}"`;
    }

    if ($("workoutDate")) {
        $("workoutDate").textContent =
            new Date().toLocaleDateString(
                undefined,
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                }
            );
    }
}

/* =========================================================
   ROUTINE
   ========================================================= */

function setupRoutine() {
    $("addRoutineButton")?.addEventListener(
        "click",
        addRoutine
    );

    $("addHabitButton")?.addEventListener(
        "click",
        addHabit
    );

    [
        "studyGoalInput",
        "pomodoroGoalInput",
        "workoutGoalInput",
        "taskGoalInput"
    ].forEach(id => {
        $(id)?.addEventListener(
            "change",
            saveGoals
        );
    });

    renderRoutine();
    renderHabits();
    loadGoalInputs();
}

function addRoutine() {
    const title =
        prompt("Routine item:");

    if (!title?.trim()) return;

    const time =
        prompt("Time (example: 18:30):");

    state.routines.push({
        id: generateId("routine"),
        time:
            time?.trim() || "09:00",
        title: title.trim(),
        description: "Custom routine item.",
        completed: false
    });

    state.routines.sort(
        (a, b) =>
            a.time.localeCompare(b.time)
    );

    renderRoutine();

    saveState();
}

function renderRoutine() {
    const container =
        $("routineList");

    if (!container) return;

    container.innerHTML =
        state.routines.map(item => `
            <div class="routine-card">
                <div class="routine-time">
                    ${escapeHTML(item.time)}
                </div>

                <div class="routine-content">
                    <h3>
                        ${escapeHTML(item.title)}
                    </h3>

                    <p>
                        ${escapeHTML(item.description)}
                    </p>
                </div>

                <button
                    class="routine-check ${
                        item.completed
                            ? "checked"
                            : ""
                    }"
                    data-routine="${item.id}"
                >
                    ${item.completed ? "✓" : ""}
                </button>
            </div>
        `).join("");

    container
        .querySelectorAll("[data-routine]")
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    const item =
                        state.routines.find(
                            routine =>
                                routine.id ===
                                button.dataset.routine
                        );

                    if (!item) return;

                    item.completed =
                        !item.completed;

                    if (item.completed) {
                        addXP(10);
                    }

                    renderRoutine();

                    checkAchievements();
                    saveState();
                }
            );
        });
}

function addHabit() {
    const name =
        prompt("Habit name:");

    if (!name?.trim()) return;

    state.habits.push({
        id: generateId("habit"),
        name: name.trim(),
        days: []
    });

    renderHabits();

    saveState();
}

function renderHabits() {
    const container =
        $("habitGrid");

    if (!container) return;

    const today =
        new Date();

    const currentDay =
        today.getDay();

    container.innerHTML =
        state.habits.map(habit => `
            <div class="habit-card">
                <div class="habit-name">
                    ${escapeHTML(habit.name)}
                </div>

                <div class="habit-days">
                    ${Array.from(
                        { length: 7 },
                        (_, index) => {
                            const completed =
                                habit.days.includes(
                                    index
                                );

                            return `
                                <button
                                    class="habit-day ${
                                        completed
                                            ? "done"
                                            : ""
                                    }"
                                    data-habit="${habit.id}"
                                    data-day="${index}"
                                    aria-label="Toggle habit"
                                ></button>
                            `;
                        }
                    ).join("")}
                </div>
            </div>
        `).join("");

    container
        .querySelectorAll(".habit-day")
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    const habit =
                        state.habits.find(
                            item =>
                                item.id ===
                                button.dataset.habit
                        );

                    if (!habit) return;

                    const day =
                        Number(button.dataset.day);

                    if (habit.days.includes(day)) {
                        habit.days =
                            habit.days.filter(
                                value =>
                                    value !== day
                            );
                    } else {
                        habit.days.push(day);

                        addXP(10);
                    }

                    renderHabits();
                    checkAchievements();
                    saveState();
                }
            );
        });
}

function saveGoals() {
    state.dailyGoals.study =
        Number($("studyGoalInput")?.value) || 120;

    state.dailyGoals.pomodoros =
        Number($("pomodoroGoalInput")?.value) || 4;

    state.dailyGoals.workout =
        Number($("workoutGoalInput")?.value) || 45;

    state.dailyGoals.tasks =
        Number($("taskGoalInput")?.value) || 5;

    saveState();

    updateDashboard();

    showNotification(
        "Goals updated 🎯",
        "Your daily targets are saved.",
        "success"
    );
}

function loadGoalInputs() {
    if ($("studyGoalInput")) {
        $("studyGoalInput").value =
            state.dailyGoals.study;
    }

    if ($("pomodoroGoalInput")) {
        $("pomodoroGoalInput").value =
            state.dailyGoals.pomodoros;
    }

    if ($("workoutGoalInput")) {
        $("workoutGoalInput").value =
            state.dailyGoals.workout;
    }

    if ($("taskGoalInput")) {
        $("taskGoalInput").value =
            state.dailyGoals.tasks;
    }
}

/* =========================================================
   XP / LEVEL SYSTEM
   ========================================================= */

function xpRequiredForLevel(level) {
    return 500 + (level - 1) * 250;
}

function addXP(amount) {
    if (!amount || amount <= 0) return;

    state.xp += amount;

    let required =
        xpRequiredForLevel(state.level);

    while (state.xp >= required) {
        state.xp -= required;

        state.level++;

        required =
            xpRequiredForLevel(state.level);

        showLevelUp();
    }

    updateLevelUI();

    saveState();
}

function updateLevelUI() {
    const level =
        $("userLevel");

    if (level) {
        level.textContent =
            state.level;
    }

    const xp =
        $("totalXP");

    if (xp) {
        xp.textContent =
            state.xp;
    }

    const progress =
        $("xpProgress");

    if (progress) {
        const required =
            xpRequiredForLevel(
                state.level
            );

        progress.style.width =
            `${Math.min(
                100,
                (state.xp / required) * 100
            )}%`;
    }

    const text =
        $("xpText");

    if (text) {
        text.textContent =
            `${state.xp} / ${
                xpRequiredForLevel(
                    state.level
                )
            } XP`;
    }

    if ($("profileLevel")) {
        $("profileLevel").textContent =
            state.level;
    }
}

function showLevelUp() {
    showNotification(
        `LEVEL ${state.level} 🔥`,
        "You just leveled up!",
        "success"
    );
}

/* =========================================================
   STREAK SYSTEM
   ========================================================= */

function updateStreak() {
    const today =
        todayKey();

    const dates =
        Object.keys(state.dailyHistory)
            .sort();

    if (!dates.length) return;

    let streak = 0;

    const cursor =
        new Date();

    while (true) {
        const key =
            todayKey(cursor);

        const data =
            state.dailyHistory[key];

        const active =
            data &&
            (
                data.study > 0 ||
                data.pomodoros > 0 ||
                data.workout > 0 ||
                data.tasks > 0
            );

        if (!active) {
            break;
        }

        streak++;

        cursor.setDate(
            cursor.getDate() - 1
        );
    }

    state.streak =
        Math.max(
            state.streak,
            streak
        );

    state.longestStreak =
        Math.max(
            state.longestStreak,
            state.streak
        );

    updatePersonalRecord(
        "longestStreak",
        state.streak
    );

    saveState();
}

/* =========================================================
   PERSONAL RECORDS
   ========================================================= */

function updatePersonalRecord(
    key,
    value
) {
    if (
        state.personalRecords[key] === undefined
    ) {
        return;
    }

    if (
        Number(value) >
        Number(state.personalRecords[key])
    ) {
        state.personalRecords[key] =
            Number(value);

        showRecordCelebration(
            "NEW PERSONAL RECORD 🏆",
            formatRecordValue(key, value),
            getRecordMessage(key)
        );

        saveState();
    }
}

function formatRecordValue(key, value) {
    if (
        key === "longestStudy" ||
        key === "longestWorkout"
    ) {
        return formatMinutes(value);
    }

    return value;
}

function getRecordMessage(key) {
    const messages = {
        longestStudy:
            "Your longest focused study day yet.",
        mostPomodoros:
            "You completed more Pomodoros than ever.",
        longestStreak:
            "Your consistency record just got better.",
        longestWorkout:
            "That was your longest workout yet.",
        mostSets:
            "You crushed your highest set count.",
        longestWorkoutStreak:
            "Your fitness consistency is leveling up."
    };

    return messages[key] ||
        "You just beat your previous best.";
}

function updateRecordUI() {
    const mapping = {
        longestStudy: "longestStudy",
        mostPomodoros: "mostPomodoros",
        longestStreak: "longestStreak",
        longestWorkout: "longestWorkout",
        mostSets: "mostSets",
        longestWorkoutStreak:
            "longestWorkoutStreak"
    };

    Object.entries(mapping)
        .forEach(([key, id]) => {
            const element = $(id);

            if (!element) return;

            const value =
                state.personalRecords[key] || 0;

            element.textContent =
                key === "longestStudy" ||
                key === "longestWorkout"
                    ? formatMinutes(value)
                    : value;
        });

    if ($("recordCount")) {
        $("recordCount").textContent =
            Object.values(
                state.personalRecords
            ).filter(value => value > 0).length;
    }
}

/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

const achievementDefinitions = [
    {
        id: "first-flame",
        sticker: "🔥",
        title: "First Flame",
        description: "Complete your first focus session.",
        xp: 50,
        condition: () =>
            state.todayProgress.pomodoros >= 1 ||
            state.pomodoros >= 1
    },

    {
        id: "bookworm",
        sticker: "📚",
        title: "Bookworm",
        description: "Study for 5 total hours.",
        xp: 100,
        condition: () =>
            state.studyTime >= 300
    },

    {
        id: "focus-beast",
        sticker: "🧠",
        title: "Focus Beast",
        description: "Complete 10 Pomodoros.",
        xp: 150,
        condition: () =>
            state.pomodoros >= 10
    },

    {
        id: "unstoppable",
        sticker: "⚡",
        title: "Unstoppable",
        description: "Reach a 7-day streak.",
        xp: 250,
        condition: () =>
            state.longestStreak >= 7
    },

    {
        id: "beast-mode",
        sticker: "💀",
        title: "Beast Mode",
        description: "Complete 10 workouts.",
        xp: 200,
        condition: () =>
            state.workouts.length >= 10
    },

    {
        id: "gym-monster",
        sticker: "🏋️",
        title: "Gym Monster",
        description: "Complete 100 total sets.",
        xp: 300,
        condition: () =>
            state.personalRecords.mostSets >= 100
    },

    {
        id: "task-master",
        sticker: "🎯",
        title: "Task Master",
        description: "Complete 25 tasks.",
        xp: 200,
        condition: () =>
            state.tasks.filter(
                task => task.completed
            ).length >= 25
    },

    {
        id: "night-owl",
        sticker: "🦉",
        title: "Night Owl",
        description: "Complete a focus session after 10 PM.",
        xp: 100,
        condition: () =>
            state.achievements.includes(
                "night-trigger"
            )
    },

    {
        id: "big-brain",
        sticker: "🤓",
        title: "Big Brain",
        description: "Study for 10 hours total.",
        xp: 300,
        condition: () =>
            state.studyTime >= 600
    },

    {
        id: "no-zero-days",
        sticker: "🌱",
        title: "No Zero Days",
        description: "Have activity for 14 consecutive days.",
        xp: 400,
        condition: () =>
            state.longestStreak >= 14
    }
];

function checkAchievements() {
    achievementDefinitions.forEach(
        achievement => {
            if (
                state.achievements.includes(
                    achievement.id
                )
            ) {
                return;
            }

            if (achievement.condition()) {
                unlockAchievement(
                    achievement
                );
            }
        }
    );

    renderAchievements();
}

function unlockAchievement(
    achievement
) {
    state.achievements.push(
        achievement.id
    );

    addXP(achievement.xp);

    showAchievementOverlay(
        achievement
    );

    saveState();
}

function showAchievementOverlay(
    achievement
) {
    const overlay =
        $("achievementOverlay");

    if (!overlay) return;

    if ($("unlockSticker")) {
        $("unlockSticker").textContent =
            achievement.sticker;
    }

    if ($("unlockTitle")) {
        $("unlockTitle").textContent =
            achievement.title;
    }

    if ($("unlockDescription")) {
        $("unlockDescription").textContent =
            achievement.description;
    }

    if ($("unlockXP")) {
        $("unlockXP").textContent =
            `+${achievement.xp} XP`;
    }

    overlay.classList.add("active");

    createConfetti();
}

function closeAchievementOverlay() {
    $("achievementOverlay")?.classList.remove(
        "active"
    );
}

function renderAchievements() {
    const cards =
        $$(".achievement-card");

    cards.forEach(card => {
        const id =
            card.dataset.achievement;

        if (
            state.achievements.includes(id)
        ) {
            card.classList.add("unlocked");
            card.classList.remove("locked");
        } else {
            card.classList.add("locked");
            card.classList.remove("unlocked");
        }
    });

    if ($("achievementCount")) {
        $("achievementCount").textContent =
            state.achievements.length;
    }

    if ($("totalXP")) {
        $("totalXP").textContent =
            state.xp;
    }

    updateLevelUI();
    updateRecordUI();
    renderBadgeShowcase();
}

function renderBadgeShowcase() {
    const container =
        $("badgeShowcase");

    if (!container) return;

    const unlocked =
        achievementDefinitions.filter(
            achievement =>
                state.achievements.includes(
                    achievement.id
                )
        );

    if (!unlocked.length) {
        container.innerHTML = `
            <span class="badge locked">
                🔒 No badges yet
            </span>
        `;

        return;
    }

    container.innerHTML =
        unlocked.map(achievement => `
            <span class="badge">
                ${achievement.sticker}
                ${escapeHTML(achievement.title)}
            </span>
        `).join("");
}

function createConfetti() {
    const pieces = [];

    for (let i = 0; i < 35; i++) {
        const piece =
            document.createElement("span");

        piece.textContent =
            ["🎉", "✨", "🔥", "⭐"][
                Math.floor(Math.random() * 4)
            ];

        piece.style.position =
            "fixed";

        piece.style.left =
            `${Math.random() * 100}vw`;

        piece.style.top =
            "-30px";

        piece.style.zIndex =
            "3000";

        piece.style.fontSize =
            `${15 + Math.random() * 20}px`;

        piece.style.pointerEvents =
            "none";

        document.body.appendChild(piece);

        piece.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(110vh) rotate(${
                            Math.random() * 720
                        }deg)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    1500 +
                    Math.random() * 1800,
                easing:
                    "cubic-bezier(.2,.7,.3,1)"
            }
        ).finished.then(
            () => piece.remove()
        );

        pieces.push(piece);
    }
}

/* =========================================================
   ANALYTICS
   ========================================================= */

function setupAnalytics() {
    $("studyChartRange")?.addEventListener(
        "change",
        updateAnalytics
    );

    updateAnalytics();
}

function updateAnalytics() {
    const history =
        Object.entries(
            state.dailyHistory
        ).sort(
            ([a], [b]) =>
                a.localeCompare(b)
        );

    const last7 =
        history.slice(-7);

    const study =
        last7.reduce(
            (sum, [, data]) =>
                sum + (data.study || 0),
            0
        );

    const pomos =
        last7.reduce(
            (sum, [, data]) =>
                sum + (data.pomodoros || 0),
            0
        );

    const workouts =
        last7.filter(
            ([, data]) =>
                (data.workout || 0) > 0
        ).length;

    const tasks =
        state.tasks.length
            ? Math.round(
                (
                    state.tasks.filter(
                        task =>
                            task.completed
                    ).length /
                    state.tasks.length
                ) * 100
            )
            : 0;

    if ($("analyticsStudyTime")) {
        $("analyticsStudyTime").textContent =
            formatMinutes(study);
    }

    if ($("analyticsPomodoros")) {
        $("analyticsPomodoros").textContent =
            pomos;
    }

    if ($("analyticsWorkouts")) {
        $("analyticsWorkouts").textContent =
            workouts;
    }

    if ($("analyticsTasks")) {
        $("analyticsTasks").textContent =
            `${tasks}%`;
    }

    renderStudyChart(last7);
    renderAnalyticsSubjects();

    if ($("bestStudyDay")) {
        $("bestStudyDay").textContent =
            getBestStudyDay();
    }

    if ($("topSubject")) {
        $("topSubject").textContent =
            getTopSubject();
    }

    if ($("taskCompletionRate")) {
        $("taskCompletionRate").textContent =
            `${tasks}%`;
    }

    if ($("weeklyWorkouts")) {
        $("weeklyWorkouts").textContent =
            workouts;
    }

    updateWeeklyReview(last7);
}

function renderStudyChart(data) {
    const canvas =
        $("studyChart");

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    const width =
        canvas.clientWidth ||
        600;

    const height =
        canvas.clientHeight ||
        280;

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;

    ctx.scale(dpr, dpr);

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    const values =
        data.map(
            ([, item]) =>
                item.study || 0
        );

    const max =
        Math.max(
            60,
            ...values
        );

    const padding = 35;

    ctx.strokeStyle =
        getComputedStyle(
            document.documentElement
        ).getPropertyValue(
            "--border"
        );

    ctx.lineWidth = 1;

    for (
        let i = 0;
        i <= 4;
        i++
    ) {
        const y =
            padding +
            ((height - padding * 2) / 4) *
            i;

        ctx.beginPath();

        ctx.moveTo(
            padding,
            y
        );

        ctx.lineTo(
            width - padding,
            y
        );

        ctx.stroke();
    }

    if (!values.length) {
        ctx.fillStyle =
            "#737d91";

        ctx.font =
            "14px sans-serif";

        ctx.fillText(
            "Start studying to build your chart.",
            padding,
            height / 2
        );

        return;
    }

    const points =
        values.map(
            (value, index) => {
                const x =
                    padding +
                    (
                        index /
                        Math.max(
                            1,
                            values.length - 1
                        )
                    ) *
                    (
                        width -
                        padding * 2
                    );

                const y =
                    height -
                    padding -
                    (
                        value / max
                    ) *
                    (
                        height -
                        padding * 2
                    );

                return { x, y };
            }
        );

    ctx.strokeStyle =
        "#7c5cff";

    ctx.lineWidth = 4;

    ctx.beginPath();

    points.forEach(
        (point, index) => {
            if (index === 0) {
                ctx.moveTo(
                    point.x,
                    point.y
                );
            } else {
                ctx.lineTo(
                    point.x,
                    point.y
                );
            }
        }
    );

    ctx.stroke();

    points.forEach(point => {
        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#7c5cff";

        ctx.fill();
    });
}

function renderAnalyticsSubjects() {
    const container =
        $("analyticsSubjectList");

    if (!container) return;

    const subjectCounts = {};

    state.subjects.forEach(
        subject => {
            subjectCounts[subject] = 0;
        }
    );

    state.tasks.forEach(task => {
        if (task.subject) {
            subjectCounts[task.subject] =
                (subjectCounts[task.subject] || 0) +
                1;
        }
    });

    const entries =
        Object.entries(subjectCounts)
            .sort((a, b) => b[1] - a[1]);

    container.innerHTML =
        entries.map(([subject, count]) => `
            <div class="analytics-row">
                <span>
                    ${escapeHTML(subject)}
                </span>

                <span>
                    ${count} tasks
                </span>
            </div>
        `).join("");
}

function getBestStudyDay() {
    const entries =
        Object.entries(
            state.dailyHistory
        );

    if (!entries.length) {
        return "—";
    }

    const best =
        entries.reduce(
            (current, item) =>
                (item[1].study || 0) >
                (current[1].study || 0)
                    ? item
                    : current
        );

    return formatMinutes(
        best[1].study || 0
    );
}

function getTopSubject() {
    const counts = {};

    state.tasks.forEach(task => {
        if (task.subject) {
            counts[task.subject] =
                (counts[task.subject] || 0) + 1;
        }
    });

    const top =
        Object.entries(counts)
            .sort((a, b) => b[1] - a[1])[0];

    return top
        ? top[0]
        : "—";
}

function updateWeeklyReview(last7) {
    const study =
        last7.reduce(
            (sum, [, data]) =>
                sum + (data.study || 0),
            0
        );

    const workout =
        last7.reduce(
            (sum, [, data]) =>
                sum + (data.workout || 0),
            0
        );

    const tasks =
        state.tasks.filter(
            task =>
                task.completed
        ).length;

    if ($("reviewStudy")) {
        $("reviewStudy").textContent =
            formatMinutes(study);
    }

    if ($("reviewWorkout")) {
        $("reviewWorkout").textContent =
            formatMinutes(workout);
    }

    if ($("reviewTasks")) {
        $("reviewTasks").textContent =
            tasks;
    }

    if ($("reviewStreak")) {
        $("reviewStreak").textContent =
            `${state.streak} days`;
    }
}

/* =========================================================
   CALENDAR
   ========================================================= */

let calendarDate =
    new Date();

function setupCalendar() {
    $("previousMonth")?.addEventListener(
        "click",
        () => {
            calendarDate.setMonth(
                calendarDate.getMonth() - 1
            );

            renderCalendar();
        }
    );

    $("nextMonth")?.addEventListener(
        "click",
        () => {
            calendarDate.setMonth(
                calendarDate.getMonth() + 1
            );

            renderCalendar();
        }
    );

    renderCalendar();
}

function renderCalendar() {
    const grid =
        $("calendarGrid");

    const title =
        $("calendarMonth");

    if (!grid || !title) return;

    const year =
        calendarDate.getFullYear();

    const month =
        calendarDate.getMonth();

    title.textContent =
        new Date(
            year,
            month,
            1
        ).toLocaleDateString(
            undefined,
            {
                month: "long",
                year: "numeric"
            }
        );

    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();

    let html = "";

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {
        html += `
            <div class="calendar-day empty"></div>
        `;
    }

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {
        const date =
            new Date(
                year,
                month,
                day
            );

        const key =
            todayKey(date);

        const data =
            state.dailyHistory[key];

        const today =
            key === todayKey();

        html += `
            <div class="calendar-day ${
                today ? "today" : ""
            }">
                <div class="calendar-number">
                    ${day}
                </div>

                <div class="calendar-events">
                    ${
                        data?.study
                            ? `<span class="calendar-event">
                                📚 ${formatMinutes(data.study)}
                              </span>`
                            : ""
                    }

                    ${
                        data?.workout
                            ? `<span class="calendar-event workout">
                                💪 ${formatMinutes(data.workout)}
                              </span>`
                            : ""
                    }

                    ${
                        data?.tasks
                            ? `<span class="calendar-event goal">
                                🎯 ${data.tasks} tasks
                              </span>`
                            : ""
                    }
                </div>
            </div>
        `;
    }

    grid.innerHTML = html;
}

/* =========================================================
   PROFILE
   ========================================================= */

function updateProfile() {
    if ($("profileStudyHours")) {
        $("profileStudyHours").textContent =
            formatMinutes(
                state.studyTime
            );
    }

    if ($("profileWorkouts")) {
        $("profileWorkouts").textContent =
            state.workouts.length;
    }

    if ($("profileAchievements")) {
        $("profileAchievements").textContent =
            state.achievements.length;
    }

    if ($("profileLevel")) {
        $("profileLevel").textContent =
            state.level;
    }

    if ($("profileBadges")) {
        $("profileBadges").textContent =
            state.achievements.length;
    }
}

/* =========================================================
   THEME
   ========================================================= */

function setupTheme() {
    applyTheme();

    $("themeToggle")?.addEventListener(
        "click",
        () => {
            state.theme =
                state.theme === "dark"
                    ? "light"
                    : "dark";

            applyTheme();

            saveState();
        }
    );
}

function applyTheme() {
    document.body.classList.toggle(
        "light-theme",
        state.theme === "light"
    );

    const button =
        $("themeToggle");

    if (button) {
        button.textContent =
            state.theme === "dark"
                ? "☀️"
                : "🌙";
    }
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function setupNotifications() {
    createNotificationContainer();

    checkOverdueTasks();

    if (
        "Notification" in window &&
        Notification.permission === "default"
    ) {
        // We don't automatically request permission.
    }
}

function createNotificationContainer() {
    if (
        document.querySelector(
            ".notification-container"
        )
    ) {
        return;
    }

    const container =
        document.createElement("div");

    container.className =
        "notification-container";

    document.body.appendChild(
        container
    );
}

function showNotification(
    title,
    message,
    type = "success"
) {
    if (!state.settings.notifications) {
        return;
    }

    const container =
        document.querySelector(
            ".notification-container"
        );

    if (!container) return;

    const notification =
        document.createElement("div");

    notification.className =
        `notification ${type}`;

    const icons = {
        success: "✅",
        warning: "⚠️",
        danger: "🚨",
        info: "ℹ️"
    };

    notification.innerHTML = `
        <div class="notification-icon">
            ${icons[type] || "🔔"}
        </div>

        <div class="notification-content">
            <div class="notification-title">
                ${escapeHTML(title)}
            </div>

            <div class="notification-text">
                ${escapeHTML(message)}
            </div>
        </div>
    `;

    container.appendChild(
        notification
    );

    setTimeout(() => {
        notification.remove();
    }, 4500);
}

function checkOverdueTasks() {
    const overdue =
        state.tasks.filter(
            task =>
                !task.completed &&
                task.dueDate &&
                new Date(task.dueDate) <
                    startOfToday()
        );

    if (!overdue.length) return;

    showNotification(
        `${overdue.length} overdue task${
            overdue.length > 1 ? "s" : ""
        } 🚨`,
        "Check your priority list.",
        "danger"
    );
}

function playNotificationSound() {
    try {
        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) return;

        const context =
            new AudioContext();

        const oscillator =
            context.createOscillator();

        const gain =
            context.createGain();

        oscillator.frequency.value =
            660;

        oscillator.connect(gain);
        gain.connect(context.destination);

        gain.gain.setValueAtTime(
            0.05,
            context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            context.currentTime + 0.35
        );

        oscillator.start();

        oscillator.stop(
            context.currentTime + 0.35
        );
    } catch {
        // Audio is optional.
    }
}

/* =========================================================
   RECORD OVERLAY
   ========================================================= */

function showRecordCelebration(
    title,
    value,
    message
) {
    const overlay =
        $("recordOverlay");

    if (!overlay) return;

    if ($("recordTitle")) {
        $("recordTitle").textContent =
            title;
    }

    if ($("recordValue")) {
        $("recordValue").textContent =
            value;
    }

    if ($("recordMessage")) {
        $("recordMessage").textContent =
            message;
    }

    overlay.classList.add("active");
}

function closeRecordCelebration() {
    $("recordOverlay")?.classList.remove(
        "active"
    );
}

/* =========================================================
   EVENT LISTENERS FOR OVERLAYS
   ========================================================= */

function setupOverlays() {
    $("closeAchievement")?.addEventListener(
        "click",
        closeAchievementOverlay
    );

    $("closeRecord")?.addEventListener(
        "click",
        closeRecordCelebration
    );

    $("achievementOverlay")?.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                event.currentTarget
            ) {
                closeAchievementOverlay();
            }
        }
    );

    $("recordOverlay")?.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                event.currentTarget
            ) {
                closeRecordCelebration();
            }
        }
    );

    $("taskModal")?.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                event.currentTarget
            ) {
                closeTaskModal();
            }
        }
    );

    $("exerciseModal")?.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                event.currentTarget
            ) {
                closeExerciseModal();
            }
        }
    );
}

/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

function setupKeyboardShortcuts() {
    document.addEventListener(
        "keydown",
        event => {
            if (
                event.target.tagName === "INPUT" ||
                event.target.tagName === "TEXTAREA" ||
                event.target.tagName === "SELECT"
            ) {
                return;
            }

            if (
                event.code === "Space" &&
                state.currentPage === "study"
            ) {
                event.preventDefault();

                if (pomodoro.running) {
                    pausePomodoro();
                } else {
                    startPomodoro();
                }
            }

            if (
                event.key.toLowerCase() === "f"
            ) {
                toggleFocusMode();
            }

            if (event.key === "Escape") {
                closeTaskModal();
                closeExerciseModal();
                closeBreakGame();
                closeAchievementOverlay();
                closeRecordCelebration();
            }
        }
    );
}

/* =========================================================
   NIGHT SUMMARY
   ========================================================= */

function setupNightSummary() {
    const hour =
        new Date().getHours();

    if (hour < 21) return;

    const today =
        state.todayProgress;

    if (
        today.study === 0 &&
        today.workout === 0 &&
        today.tasks === 0
    ) {
        return;
    }

    setTimeout(() => {
        showNotification(
            "Daily progress 🌙",
            `${formatMinutes(today.study)} study • ${today.pomodoros} Pomodoros • ${today.tasks} tasks`,
            "info"
        );
    }, 1500);
}

/* =========================================================
   MORNING MODE
   ========================================================= */

function setupMorningMode() {
    const hour =
        new Date().getHours();

    if (hour >= 5 && hour < 10) {
        setTimeout(() => {
            showNotification(
                "Good morning ☀️",
                "Pick one important thing and start.",
                "info"
            );
        }, 1200);
    }
}

/* =========================================================
   UTILITY
   ========================================================= */

function capitalize(text) {
    return String(text)
        .replaceAll("-", " ")
        .replace(
            /\b\w/g,
            letter =>
                letter.toUpperCase()
        );
}

/* =========================================================
   DEMO DATA
   ========================================================= */

function createDemoDataIfNeeded() {
    // Intentionally disabled.
    // The app starts clean for the user.
}

/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    () => {
        if (
            state.currentPage ===
            "analytics"
        ) {
            updateAnalytics();
        }
    }
);

/* =========================================================
   APP INITIALIZATION
   ========================================================= */

function initApp() {
    initializeDay();

    updateGreeting();

    setupNavigation();
    setupTheme();

    setupTasks();
    setupSubjects();

    setupPomodoro();

    setupMusic();
    setupBreakSystem();
    setupFocusMode();

    setupWorkout();

    setupRoutine();

    setupAnalytics();
    setupCalendar();

    setupOverlays();

    setupNotifications();

    setupKeyboardShortcuts();

    setupMorningMode();
    setupNightSummary();

    createDemoDataIfNeeded();

    updateDashboard();

    renderTasks();
    renderSubjectCards();

    renderAchievements();

    updateWorkoutStats();

    updateProfile();

    displayQuote(
        "dailyQuote",
        "study"
    );

    updateLevelUI();
    updateRecordUI();

    navigateTo(
        state.currentPage || "home"
    );

    saveState();

    console.log(
        "⚡ FOCUS app initialized successfully."
    );
}

document.addEventListener(
    "DOMContentLoaded",
    initApp
);
```
