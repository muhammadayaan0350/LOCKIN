```javascript
/* =========================================================
   FOCUS — SCRIPT
   Study. Train. Grow.
========================================================= */

"use strict";


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY = "focusAppState";


const defaultState = {
    user: {
        name: "Ayaan",
        level: 1,
        xp: 0
    },

    theme: {
        study: "light",
        workout: "dark"
    },

    currentMode: "selection",
    currentStudyPage: "study-dashboard",
    currentWorkoutPage: "workout-dashboard",

    study: {
        totalMinutes: 0,
        pomodoros: 0,
        tasksCompleted: 0,
        currentSubject: "General",
        subjects: [
            "General",
            "Mathematics",
            "Physics",
            "Electronics",
            "Programming"
        ]
    },

    goals: {
        studyMinutes: 120,
        pomodoros: 4,
        tasks: 5
    },

    tasks: [],

    routines: [],

    habits: {},

    workout: {
        count: 0,
        totalMinutes: 0,
        totalSets: 0,
        streak: 0,
        bestStreak: 0,
        longestWorkout: 0,
        mostSets: 0
    },

    records: {
        studyMinutes: 0,
        pomodoros: 0,
        longestStudySession: 0,
        longestWorkout: 0,
        mostSets: 0,
        longestWorkoutStreak: 0
    },

    history: {},

    achievements: [],

    music: {
        current: "lofi",
        playing: false,
        volume: 50
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

        console.error("Could not load state:", error);

        return structuredClone(defaultState);
    }
}


function mergeDeep(base, incoming) {

    Object.keys(incoming || {}).forEach((key) => {

        if (
            incoming[key] &&
            typeof incoming[key] === "object" &&
            !Array.isArray(incoming[key]) &&
            base[key] &&
            typeof base[key] === "object"
        ) {
            base[key] = mergeDeep(base[key], incoming[key]);
        } else {
            base[key] = incoming[key];
        }

    });

    return base;
}


function saveState() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );
}


/* =========================================================
   GENERAL HELPERS
========================================================= */

function todayKey() {

    const date = new Date();

    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
    ].join("-");
}


function formatMinutes(minutes) {

    minutes = Math.max(0, Math.round(minutes));

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
        return `${hours}h ${mins}m`;
    }

    return `${mins}m`;
}


function formatTimer(seconds) {

    seconds = Math.max(0, Math.floor(seconds));

    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function generateId() {

    return `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`;
}


function clamp(value, min, max) {

    return Math.min(
        Math.max(value, min),
        max
    );
}


function ensureTodayHistory() {

    const key = todayKey();

    if (!state.history[key]) {

        state.history[key] = {
            studyMinutes: 0,
            pomodoros: 0,
            tasksCompleted: 0,
            workoutMinutes: 0,
            workouts: 0,
            sets: 0,
            active: false
        };
    }

    return state.history[key];
}


function markActivity() {

    const today = ensureTodayHistory();

    today.active = true;

    saveState();
}


/* =========================================================
   TOASTS
========================================================= */

function showToast(message, icon = "✨") {

    const container = $("#toastContainer");

    if (!container) return;

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `
        <strong>${icon}</strong>
        <span style="margin-left:8px">
            ${escapeHTML(message)}
        </span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4300);
}


/* =========================================================
   MODE SELECTION
========================================================= */

function enterStudyMode() {

    state.currentMode = "study";

    saveState();

    $("#modeSelection").style.display = "none";
    $("#workoutApp").classList.remove("active");

    $("#studyApp").classList.add("active");

    showStudyPage("study-dashboard");

    updateAll();

    animatePage("#studyApp");
}


function enterWorkoutMode() {

    state.currentMode = "workout";

    saveState();

    $("#modeSelection").style.display = "none";
    $("#studyApp").classList.remove("active");

    $("#workoutApp").classList.add("active");

    showWorkoutPage("workout-dashboard");

    updateAll();

    animatePage("#workoutApp");
}


function returnToModes() {

    stopPomodoro();

    stopWorkoutTimer();

    state.currentMode = "selection";

    saveState();

    $("#studyApp").classList.remove("active");
    $("#workoutApp").classList.remove("active");

    $("#modeSelection").style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function animatePage(selector) {

    const element = $(selector);

    if (!element) return;

    element.style.animation = "none";

    requestAnimationFrame(() => {

        element.style.animation =
            "pageEnter 0.55s cubic-bezier(.2,.8,.2,1) both";

    });
}


/* =========================================================
   STUDY NAVIGATION
========================================================= */

function showStudyPage(pageId) {

    $$(".study-navigation .nav-item")
        .forEach((button) => {

            button.classList.toggle(
                "active",
                button.dataset.studyPage === pageId
            );
        });


    $$("#studyApp .internal-page")
        .forEach((page) => {

            page.classList.toggle(
                "active-page",
                page.id === pageId
            );
        });


    state.currentStudyPage = pageId;

    saveState();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   WORKOUT NAVIGATION
========================================================= */

function showWorkoutPage(pageId) {

    $$(".workout-navigation .nav-item")
        .forEach((button) => {

            button.classList.toggle(
                "active",
                button.dataset.workoutPage === pageId
            );
        });


    $$("#workoutApp .internal-page")
        .forEach((page) => {

            page.classList.toggle(
                "active-page",
                page.id === pageId
            );
        });


    state.currentWorkoutPage = pageId;

    saveState();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   GREETING
========================================================= */

function updateGreeting() {

    const hour = new Date().getHours();

    let greeting = "Good evening";

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    }

    const greetingElement = $("#studyGreeting");

    if (greetingElement) {
        greetingElement.textContent =
            `${state.user.name}`;
    }

    const dateElement = $("#studyCurrentDate");

    if (dateElement) {

        const date = new Date();

        dateElement.textContent =
            `${greeting} · ${date.toLocaleDateString(
                undefined,
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                }
            )}`;
    }

    const workoutDate = $("#workoutDate");

    if (workoutDate) {

        workoutDate.textContent =
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
   DAILY QUOTES
========================================================= */

const studyQuotes = [

    "The secret of getting ahead is getting started.",
    "Small progress is still progress.",
    "Focus on the work, not the clock.",
    "One focused hour can change your entire day.",
    "Discipline beats motivation when motivation disappears.",
    "Your future self will thank you.",
    "Don't study harder. Study with intention."
];


const workoutQuotes = [

    "The pain you feel today will be the strength you feel tomorrow.",
    "You don't have to be extreme. Just consistent.",
    "Strong body. Strong mind.",
    "One more rep.",
    "Show up. Put in the work. Repeat.",
    "Your only competition is yesterday's you.",
    "Earn your strength."
];


function getDailyQuote(array) {

    const date = new Date();

    const index =
        (date.getFullYear() +
            date.getMonth() +
            date.getDate()) %
        array.length;

    return array[index];
}


function updateQuotes() {

    const studyQuote = $("#studyDailyQuote");

    if (studyQuote) {
        studyQuote.textContent =
            getDailyQuote(studyQuotes);
    }

    const workoutQuote = $("#workoutQuote");

    if (workoutQuote) {
        workoutQuote.textContent =
            getDailyQuote(workoutQuotes);
    }
}


/* =========================================================
   STUDY DASHBOARD
========================================================= */

function updateStudyDashboard() {

    const today = ensureTodayHistory();

    const studyToday = today.studyMinutes;
    const pomodoros = today.pomodoros;
    const tasks = today.tasksCompleted;

    const studyTime = $("#studyTodayTime");
    const pomodoroCount = $("#studyPomodoros");
    const taskCount = $("#studyTasksCompleted");
    const progress = $("#studyDailyProgress");

    if (studyTime) {
        studyTime.textContent =
            formatMinutes(studyToday);
    }

    if (pomodoroCount) {
        pomodoroCount.textContent =
            pomodoros;
    }

    if (taskCount) {
        taskCount.textContent =
            tasks;
    }

    const studyPercentage =
        clamp(
            Math.round(
                (studyToday /
                    Math.max(1, state.goals.studyMinutes)) *
                100
            ),
            0,
            100
        );

    if (progress) {
        progress.textContent =
            `${studyPercentage}%`;
    }


    /* GOALS */

    $("#studyGoalText").textContent =
        `${studyToday} / ${state.goals.studyMinutes} min`;

    $("#pomodoroGoalText").textContent =
        `${pomodoros} / ${state.goals.pomodoros}`;

    $("#studyTaskGoalText").textContent =
        `${tasks} / ${state.goals.tasks}`;


    animateProgress(
        "#studyGoalProgress",
        studyToday / state.goals.studyMinutes
    );

    animateProgress(
        "#pomodoroGoalProgress",
        pomodoros / state.goals.pomodoros
    );

    animateProgress(
        "#studyTaskGoalProgress",
        tasks / state.goals.tasks
    );


    updatePriorityTasks();
    updateStudyStreak();
}


function animateProgress(selector, ratio) {

    const element = $(selector);

    if (!element) return;

    const percentage =
        clamp(ratio * 100, 0, 100);

    requestAnimationFrame(() => {

        element.style.width =
            `${percentage}%`;
    });
}


/* =========================================================
   STUDY STREAK
========================================================= */

function updateStudyStreak() {

    const streak = calculateStreak(
        "studyMinutes"
    );

    state.user.studyStreak = streak;

    const element = $("#studyStreak");

    if (element) {
        element.textContent = streak;
    }
}


function calculateStreak(activityKey) {

    let streak = 0;

    const date = new Date();

    while (true) {

        const key = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");

        const day = state.history[key];

        if (!day || !(day[activityKey] > 0)) {
            break;
        }

        streak++;

        date.setDate(
            date.getDate() - 1
        );
    }

    return streak;
}


/* =========================================================
   TASKS
========================================================= */

let currentTaskFilter = "all";


function openTaskModal() {

    $("#taskModal").classList.add("open");
    $("#taskModal").setAttribute(
        "aria-hidden",
        "false"
    );

    setTimeout(() => {
        $("#taskTitle")?.focus();
    }, 100);
}


function closeTaskModal() {

    $("#taskModal").classList.remove("open");
    $("#taskModal").setAttribute(
        "aria-hidden",
        "true"
    );
}


function createTask(event) {

    event.preventDefault();

    const title =
        $("#taskTitle").value.trim();

    if (!title) return;


    const task = {

        id: generateId(),

        title,

        priority:
            $("#taskPriority").value,

        subject:
            $("#taskSubject").value,

        dueDate:
            $("#taskDueDate").value,

        estimatedTime:
            Number(
                $("#taskEstimatedTime").value
            ) || 25,

        completed: false,

        createdAt: Date.now()
    };


    state.tasks.push(task);

    saveState();

    $("#taskForm").reset();

    closeTaskModal();

    renderTasks();
    updatePriorityTasks();

    showToast(
        "Task added successfully.",
        "✓"
    );
}


function isTaskOverdue(task) {

    if (!task.dueDate || task.completed) {
        return false;
    }

    return task.dueDate < todayKey();
}


function completeTask(id) {

    const task =
        state.tasks.find(
            (item) => item.id === id
        );

    if (!task || task.completed) return;

    task.completed = true;

    const today = ensureTodayHistory();

    today.tasksCompleted++;

    state.study.tasksCompleted++;

    markActivity();

    addXP(20);

    checkAchievements();

    saveState();

    renderTasks();
    updateStudyDashboard();

    showToast(
        "Task completed! +20 XP",
        "🎯"
    );
}


function renderTasks() {

    const container = $("#taskList");

    if (!container) return;

    let tasks = [...state.tasks];


    if (currentTaskFilter === "active") {

        tasks = tasks.filter(
            (task) => !task.completed
        );

    } else if (currentTaskFilter === "completed") {

        tasks = tasks.filter(
            (task) => task.completed
        );

    } else if (currentTaskFilter === "overdue") {

        tasks = tasks.filter(
            (task) => isTaskOverdue(task)
        );
    }


    const sortMode =
        $("#taskSort")?.value ||
        "priority";


    if (sortMode === "priority") {

        const rank = {
            high: 1,
            medium: 2,
            low: 3
        };

        tasks.sort(
            (a, b) =>
                rank[a.priority] -
                rank[b.priority]
        );

    } else if (sortMode === "due") {

        tasks.sort(
            (a, b) =>
                (a.dueDate || "9999") >
                (b.dueDate || "9999")
                    ? 1
                    : -1
        );

    } else {

        tasks.sort(
            (a, b) =>
                b.createdAt -
                a.createdAt
        );
    }


    if (!tasks.length) {

        container.innerHTML = `
            <div class="empty-state">
                <span>✓</span>
                <p>No tasks here.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        tasks.map(task => {

            const overdue =
                isTaskOverdue(task);

            return `
                <article
                    class="task-item ${
                        task.completed
                            ? "completed"
                            : ""
                    }"
                    data-task-id="${task.id}"
                >

                    <button
                        class="task-checkbox"
                        data-complete-task="${task.id}"
                        aria-label="Complete task"
                        type="button"
                    >
                        ${task.completed ? "✓" : ""}
                    </button>

                    <div class="task-info">

                        <div class="task-title">
                            ${escapeHTML(task.title)}
                        </div>

                        <div class="task-meta">

                            <span>
                                ${escapeHTML(task.subject)}
                            </span>

                            <span>
                                ${task.estimatedTime} min
                            </span>

                            ${
                                task.dueDate
                                    ? `
                                    <span class="${
                                        overdue
                                            ? "overdue"
                                            : ""
                                    }">
                                        ${
                                            overdue
                                                ? "Overdue"
                                                : task.dueDate
                                        }
                                    </span>
                                    `
                                    : ""
                            }

                        </div>

                    </div>

                    <span
                        class="priority-badge priority-${task.priority}"
                    >
                        ${task.priority}
                    </span>

                    ${
                        !task.completed
                            ? `
                            <button
                                class="small-button task-focus-button"
                                data-focus-task="${task.id}"
                                type="button"
                                title="Start Pomodoro"
                            >
                                ⏱
                            </button>
                            `
                            : ""
                    }

                </article>
            `;
        }).join("");
}


function updatePriorityTasks() {

    const container =
        $("#studyPriorityTasks");

    if (!container) return;

    const tasks =
        state.tasks
            .filter(
                task => !task.completed
            )
            .sort((a, b) => {

                const rank = {
                    high: 1,
                    medium: 2,
                    low: 3
                };

                return (
                    rank[a.priority] -
                    rank[b.priority]
                );
            })
            .slice(0, 4);


    if (!tasks.length) {

        container.innerHTML = `
            <div class="empty-state">
                <span>✓</span>
                <p>No priority tasks yet.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        tasks.map(task => {

            return `
                <div class="priority-item">

                    <div class="priority-item-left">

                        <span
                            class="priority-dot priority-${task.priority}"
                        ></span>

                        <span>
                            ${escapeHTML(task.title)}
                        </span>

                    </div>

                    <button
                        class="text-button"
                        data-focus-task="${task.id}"
                        type="button"
                    >
                        Focus
                    </button>

                </div>
            `;

        }).join("");
}


/* =========================================================
   TASK → POMODORO
========================================================= */

function focusTask(id) {

    const task =
        state.tasks.find(
            item => item.id === id
        );

    if (!task) return;

    showStudyPage("study-focus");

    const select = $("#pomodoroTask");

    if (select) {

        select.value = task.id;
    }

    state.study.currentSubject =
        task.subject || "General";

    if ($("#subjectSelect")) {
        $("#subjectSelect").value =
            task.subject || "General";
    }

    updateTimerSubject();

    showToast(
        `Focus task selected: ${task.title}`,
        "⏱"
    );
}


/* =========================================================
   SUBJECTS
========================================================= */

function renderSubjects() {

    const select = $("#subjectSelect");
    const taskSubject = $("#taskSubject");
    const grid = $("#subjectGrid");

    const subjects = [
        ...new Set(
            state.study.subjects
        )
    ];


    if (select) {

        const current =
            state.study.currentSubject ||
            "General";

        select.innerHTML =
            subjects.map(subject => `
                <option value="${escapeHTML(subject)}">
                    ${escapeHTML(subject)}
                </option>
            `).join("");

        select.value = current;
    }


    if (taskSubject) {

        taskSubject.innerHTML =
            subjects.map(subject => `
                <option value="${escapeHTML(subject)}">
                    ${escapeHTML(subject)}
                </option>
            `).join("");
    }


    if (!grid) return;


    grid.innerHTML =
        subjects.map((subject, index) => {

            const total =
                Object.values(state.history)
                    .reduce(
                        (sum, day) =>
                            sum +
                            (day.subjects?.[subject] || 0),
                        0
                    );

            const icons = [
                "📚",
                "🧮",
                "⚡",
                "💻",
                "🔬",
                "📖"
            ];

            return `
                <article class="subject-card">

                    <div class="subject-card-icon">
                        ${icons[index % icons.length]}
                    </div>

                    <h3>
                        ${escapeHTML(subject)}
                    </h3>

                    <p>
                        ${formatMinutes(total)}
                        studied
                    </p>

                </article>
            `;

        }).join("");
}


function addSubject() {

    const name =
        prompt("Enter the subject name:");

    if (!name) return;

    const clean =
        name.trim();

    if (!clean) return;


    if (
        state.study.subjects
            .some(
                subject =>
                    subject.toLowerCase() ===
                    clean.toLowerCase()
            )
    ) {

        showToast(
            "That subject already exists.",
            "ℹ️"
        );

        return;
    }


    state.study.subjects.push(clean);

    saveState();

    renderSubjects();

    showToast(
        `${clean} added.`,
        "📚"
    );
}


/* =========================================================
   POMODORO
========================================================= */

let pomodoro = {

    running: false,

    mode: "focus",

    focusMinutes: 25,

    breakMinutes: 5,

    remaining: 25 * 60,

    session: 1,

    interval: null
};


function updatePomodoroDisplay() {

    const formatted =
        formatTimer(
            pomodoro.remaining
        );

    const timer =
        $("#pomodoroTimer");

    if (timer) {
        timer.textContent =
            formatted;
    }

    const mini =
        $("#studyMiniTimer");

    if (mini) {
        mini.textContent =
            formatted;
    }

    const focusModeTimer =
        $("#focusModeTimer");

    if (focusModeTimer) {
        focusModeTimer.textContent =
            formatted;
    }

    const status =
        $("#timerStatus");

    if (status) {

        status.textContent =
            pomodoro.running
                ? pomodoro.mode === "focus"
                    ? "FOCUSING"
                    : "BREAK"
                : "READY";
    }

    const miniStatus =
        $("#studyMiniTimerStatus");

    if (miniStatus) {

        miniStatus.textContent =
            pomodoro.running
                ? pomodoro.mode === "focus"
                    ? "Focusing..."
                    : "Taking a break..."
                : "Ready";
    }

    const session =
        $("#currentSession");

    if (session) {

        session.textContent =
            pomodoro.mode === "focus"
                ? `Focus Session ${pomodoro.session}`
                : "Break";
    }

    const subjectLabel =
        $("#timerSubjectLabel");

    if (subjectLabel) {

        subjectLabel.textContent =
            state.study.currentSubject
                .toUpperCase();
    }
}


function updateTimerSubject() {

    const select =
        $("#subjectSelect");

    if (select) {

        state.study.currentSubject =
            select.value;
    }

    updatePomodoroDisplay();

    saveState();
}


function startPomodoro() {

    if (pomodoro.running) return;

    pomodoro.running = true;

    updatePomodoroDisplay();


    pomodoro.interval =
        setInterval(() => {

            pomodoro.remaining--;

            updatePomodoroDisplay();


            if (pomodoro.remaining <= 0) {

                pomodoroComplete();
            }

        }, 1000);


    showToast(
        pomodoro.mode === "focus"
            ? "Focus session started."
            : "Break started.",
        pomodoro.mode === "focus"
            ? "🍅"
            : "🌿"
    );
}


function pausePomodoro() {

    if (!pomodoro.running) return;

    pomodoro.running = false;

    clearInterval(
        pomodoro.interval
    );

    pomodoro.interval = null;

    updatePomodoroDisplay();

    showToast(
        "Timer paused.",
        "⏸"
    );
}


function stopPomodoro() {

    clearInterval(
        pomodoro.interval
    );

    pomodoro.interval = null;

    pomodoro.running = false;
}


function resetPomodoro() {

    stopPomodoro();

    pomodoro.mode = "focus";

    pomodoro.remaining =
        pomodoro.focusMinutes * 60;

    updatePomodoroDisplay();

    showToast(
        "Timer reset.",
        "↻"
    );
}


function setPomodoroPreset(
    focus,
    breakMinutes
) {

    stopPomodoro();

    pomodoro.focusMinutes =
        Number(focus);

    pomodoro.breakMinutes =
        Number(breakMinutes);

    pomodoro.mode = "focus";

    pomodoro.remaining =
        pomodoro.focusMinutes * 60;

    $$(".timer-preset")
        .forEach(button => {

            button.classList.toggle(
                "active",
                Number(button.dataset.focus) ===
                Number(focus)
            );
        });

    updatePomodoroDisplay();
}


function pomodoroComplete() {

    stopPomodoro();

    if (pomodoro.mode === "focus") {

        const minutes =
            pomodoro.focusMinutes;

        const today =
            ensureTodayHistory();

        today.studyMinutes += minutes;
        today.pomodoros++;

        state.study.totalMinutes += minutes;
        state.study.pomodoros++;

        const subject =
            state.study.currentSubject ||
            "General";


        if (!today.subjects) {
            today.subjects = {};
        }

        today.subjects[subject] =
            (today.subjects[subject] || 0) +
            minutes;


        state.records.studyMinutes =
            Math.max(
                state.records.studyMinutes,
                today.studyMinutes
            );


        state.records.pomodoros =
            Math.max(
                state.records.pomodoros,
                today.pomodoros
            );


        markActivity();

        addXP(50);

        checkAchievements();

        showToast(
            "Focus session complete! +50 XP",
            "🍅"
        );


        pomodoro.mode = "break";

        pomodoro.remaining =
            pomodoro.breakMinutes * 60;

        updatePomodoroDisplay();

        updateAll();

        playNotificationSound();

    } else {

        pomodoro.mode = "focus";

        pomodoro.session++;

        pomodoro.remaining =
            pomodoro.focusMinutes * 60;

        updatePomodoroDisplay();

        showToast(
            "Break complete. Back to work! 💪",
            "🔥"
        );

        playNotificationSound();
    }

    saveState();
}


function startMiniPomodoro() {

    showStudyPage("study-focus");

    startPomodoro();
}


/* =========================================================
   BREAK TIMER
========================================================= */

let breakInterval = null;
let breakSeconds = 300;


function startBreakTimer() {

    clearInterval(breakInterval);

    breakSeconds =
        pomodoro.breakMinutes * 60;

    updateBreakTimer();


    breakInterval =
        setInterval(() => {

            breakSeconds--;

            updateBreakTimer();


            if (breakSeconds <= 0) {

                clearInterval(
                    breakInterval
                );

                showToast(
                    "Break finished!",
                    "🌿"
                );

                playNotificationSound();
            }

        }, 1000);
}


function updateBreakTimer() {

    const element =
        $("#breakTimer");

    if (element) {

        element.textContent =
            formatTimer(breakSeconds);
    }
}


/* =========================================================
   MUSIC / SOUNDS
========================================================= */

const soundNames = {

    lofi: "Lo-Fi Focus",
    rain: "Rain",
    cafe: "Café",
    ocean: "Ocean",
    forest: "Forest",
    fireplace: "Fireplace",
    classical: "Classical",
    "white-noise": "White Noise"
};


function selectSound(sound) {

    state.music.current =
        sound;

    state.music.playing =
        true;

    $("#currentTrack").textContent =
        soundNames[sound] ||
        "Study Sound";


    $$(".sound-option")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.sound === sound
            );
        });


    updateMusicButton();

    saveState();

    showToast(
        `${soundNames[sound]} selected.`,
        "🎧"
    );
}


function toggleMusic() {

    state.music.playing =
        !state.music.playing;

    updateMusicButton();

    saveState();

    showToast(
        state.music.playing
            ? "Sound on."
            : "Sound paused.",
        state.music.playing
            ? "▶"
            : "⏸"
    );
}


function updateMusicButton() {

    const button =
        $("#musicPlay");

    if (button) {

        button.textContent =
            state.music.playing
                ? "❚❚"
                : "▶";
    }
}


function changeTrack(direction) {

    const sounds =
        Object.keys(soundNames);

    let index =
        sounds.indexOf(
            state.music.current
        );

    index =
        (index + direction + sounds.length) %
        sounds.length;

    selectSound(
        sounds[index]
    );
}


/* =========================================================
   FOCUS MODE
========================================================= */

function openFocusMode() {

    const overlay =
        $("#focusModeOverlay");

    if (!overlay) return;

    overlay.classList.add("open");

    overlay.setAttribute(
        "aria-hidden",
        "false"
    );

    updatePomodoroDisplay();

    document.body.style.overflow =
        "hidden";

    if (
        document.documentElement.requestFullscreen
    ) {

        document.documentElement
            .requestFullscreen()
            .catch(() => {});
    }
}


function closeFocusMode() {

    const overlay =
        $("#focusModeOverlay");

    if (!overlay) return;

    overlay.classList.remove("open");

    overlay.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

    if (document.fullscreenElement) {

        document.exitFullscreen()
            .catch(() => {});
    }
}


/* =========================================================
   WORKOUT DATA
========================================================= */

const exercises = [

    {
        id: "pushups",
        name: "Push Ups",
        muscle: "Chest",
        icon: "💪",
        description:
            "A classic bodyweight movement for the chest, shoulders and triceps.",
        sets: 3,
        reps: 12,
        rest: 60,
        tips:
            "Keep your core tight and lower your chest with control."
    },

    {
        id: "squats",
        name: "Squats",
        muscle: "Legs",
        icon: "🦵",
        description:
            "A fundamental lower-body movement targeting the quads and glutes.",
        sets: 3,
        reps: 12,
        rest: 75,
        tips:
            "Keep your chest up and drive through your feet."
    },

    {
        id: "lunges",
        name: "Lunges",
        muscle: "Legs",
        icon: "🏃",
        description:
            "A unilateral movement that challenges your legs and balance.",
        sets: 3,
        reps: 10,
        rest: 60,
        tips:
            "Take a controlled step and keep your front knee stable."
    },

    {
        id: "plank",
        name: "Plank",
        muscle: "Core",
        icon: "🧘",
        description:
            "An isometric core exercise that builds stability.",
        sets: 3,
        reps: "30s",
        rest: 45,
        tips:
            "Keep your hips level and brace your core."
    },

    {
        id: "shoulderpress",
        name: "Shoulder Press",
        muscle: "Shoulders",
        icon: "🏋️",
        description:
            "Press weight overhead to build shoulder strength.",
        sets: 3,
        reps: 10,
        rest: 75,
        tips:
            "Avoid excessive arching and control the descent."
    },

    {
        id: "rows",
        name: "Rows",
        muscle: "Back",
        icon: "💪",
        description:
            "A pulling movement that develops the upper back.",
        sets: 3,
        reps: 10,
        rest: 75,
        tips:
            "Pull toward your torso and squeeze your shoulder blades."
    },

    {
        id: "burpees",
        name: "Burpees",
        muscle: "Full Body",
        icon: "🔥",
        description:
            "A high-intensity movement combining strength and cardio.",
        sets: 3,
        reps: 10,
        rest: 90,
        tips:
            "Keep your pace controlled and land softly."
    },

    {
        id: "jumpingjacks",
        name: "Jumping Jacks",
        muscle: "Cardio",
        icon: "⚡",
        description:
            "A simple full-body cardio movement.",
        sets: 3,
        reps: 30,
        rest: 45,
        tips:
            "Stay light on your feet and maintain a steady rhythm."
    }

];


const workoutPlans = {

    "full-body": [
        "pushups",
        "squats",
        "rows",
        "shoulderpress",
        "lunges",
        "plank",
        "burpees"
    ],

    "upper-lower": [
        "pushups",
        "rows",
        "shoulderpress",
        "squats",
        "lunges",
        "plank"
    ],

    "ppl": [
        "pushups",
        "shoulderpress",
        "rows",
        "squats",
        "lunges",
        "burpees"
    ],

    cardio: [
        "jumpingjacks",
        "burpees",
        "lunges",
        "jumpingjacks",
        "burpees"
    ],

    recovery: [
        "plank",
        "lunges",
        "plank"
    ]
};


let activeWorkout = {

    name: "Full Body",

    planId: "full-body",

    exercises: [...workoutPlans["full-body"]],

    index: 0,

    currentSet: 1,

    setsCompleted: 0,

    startTime: null,

    running: false
};


/* =========================================================
   WORKOUT RENDERING
========================================================= */

function getExercise(id) {

    return exercises.find(
        exercise => exercise.id === id
    );
}


function renderTodayExercises() {

    const container =
        $("#todayExerciseList");

    if (!container) return;


    const ids =
        activeWorkout.exercises
            .slice(0, 4);


    container.innerHTML =
        ids.map(id => {

            const exercise =
                getExercise(id);

            if (!exercise) return "";

            return `
                <button
                    class="exercise-preview"
                    data-exercise="${exercise.id}"
                    type="button"
                >

                    <span class="exercise-preview-icon">
                        ${exercise.icon}
                    </span>

                    <strong>
                        ${escapeHTML(exercise.name)}
                    </strong>

                    <small>
                        ${exercise.sets} × ${exercise.reps}
                    </small>

                </button>
            `;

        }).join("");
}


function renderExerciseLibrary(
    search = ""
) {

    const container =
        $("#exerciseLibrary");

    if (!container) return;

    const query =
        search.trim().toLowerCase();

    const filtered =
        exercises.filter(exercise => {

            return (
                exercise.name
                    .toLowerCase()
                    .includes(query) ||

                exercise.muscle
                    .toLowerCase()
                    .includes(query)
            );
        });


    if (!filtered.length) {

        container.innerHTML = `
            <div class="empty-state">
                <span>🔎</span>
                <p>No exercises found.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        filtered.map(exercise => {

            return `
                <button
                    class="exercise-card"
                    data-exercise="${exercise.id}"
                    type="button"
                >

                    <div class="exercise-card-image">
                        ${exercise.icon}
                    </div>

                    <h3>
                        ${escapeHTML(exercise.name)}
                    </h3>

                    <p>
                        ${escapeHTML(exercise.muscle)}
                        ·
                        ${exercise.sets} ×
                        ${exercise.reps}
                    </p>

                </button>
            `;

        }).join("");
}


/* =========================================================
   EXERCISE MODAL
========================================================= */

let selectedExercise = null;


function openExerciseModal(id) {

    const exercise =
        getExercise(id);

    if (!exercise) return;

    selectedExercise =
        exercise;


    $("#modalExerciseMuscle").textContent =
        exercise.muscle.toUpperCase();

    $("#modalExerciseName").textContent =
        exercise.name;

    $("#modalExerciseDescription").textContent =
        exercise.description;

    $("#modalSets").textContent =
        exercise.sets;

    $("#modalReps").textContent =
        exercise.reps;

    $("#modalRest").textContent =
        `${exercise.rest}s`;

    $("#modalExerciseTips").textContent =
        exercise.tips;

    $$(".modal-exercise-demo")
        .forEach(element => {

            element.textContent =
                exercise.icon;
        });


    $("#exerciseModal")
        .classList.add("open");

    $("#exerciseModal")
        .setAttribute(
            "aria-hidden",
            "false"
        );
}


function closeExerciseModal() {

    $("#exerciseModal")
        .classList.remove("open");

    $("#exerciseModal")
        .setAttribute(
            "aria-hidden",
            "true"
        );

    selectedExercise = null;
}


function addSelectedExerciseToWorkout() {

    if (!selectedExercise) return;

    activeWorkout.exercises.push(
        selectedExercise.id
    );

    renderTodayExercises();

    closeExerciseModal();

    showToast(
        `${selectedExercise.name} added to workout.`,
        "💪"
    );
}


/* =========================================================
   WORKOUT PLANS
========================================================= */

function selectWorkoutPlan(planId) {

    if (!workoutPlans[planId]) {
        return;
    }

    activeWorkout.planId =
        planId;

    activeWorkout.exercises =
        [...workoutPlans[planId]];

    activeWorkout.index = 0;
    activeWorkout.currentSet = 1;
    activeWorkout.setsCompleted = 0;


    const names = {

        "full-body": "Full Body",

        "upper-lower":
            "Upper / Lower",

        ppl:
            "Push / Pull / Legs",

        cardio:
            "Cardio",

        recovery:
            "Recovery"
    };


    activeWorkout.name =
        names[planId] ||
        "Workout";


    $("#activeWorkoutName").textContent =
        activeWorkout.name;

    $("#activeWorkoutMeta").textContent =
        `${activeWorkout.exercises.length} exercises · ~45 minutes`;


    renderTodayExercises();

    showWorkoutPage(
        "workout-dashboard"
    );

    showToast(
        `${activeWorkout.name} selected.`,
        "🔥"
    );
}


/* =========================================================
   WORKOUT SESSION
========================================================= */

function startWorkout() {

    if (!activeWorkout.exercises.length) {
        showToast(
            "Add an exercise first.",
            "ℹ️"
        );
        return;
    }


    activeWorkout.index = 0;
    activeWorkout.currentSet = 1;
    activeWorkout.setsCompleted = 0;
    activeWorkout.startTime =
        Date.now();
    activeWorkout.running = true;


    showWorkoutPage(
        "workout-session"
    );

    updateWorkoutExercise();

    startWorkoutTimer();

    showToast(
        "Workout started. LET'S GO! 🔥",
        "🏋️"
    );
}


function updateWorkoutExercise() {

    const id =
        activeWorkout.exercises[
            activeWorkout.index
        ];

    const exercise =
        getExercise(id);

    if (!exercise) return;


    $("#sessionWorkoutName").textContent =
        activeWorkout.name;

    $("#sessionWorkoutProgress").textContent =
        `Exercise ${
            activeWorkout.index + 1
        } of ${
            activeWorkout.exercises.length
        }`;


    $("#currentExercise").textContent =
        exercise.name;

    $("#currentExerciseDescription").textContent =
        exercise.description;

    $("#currentSet").textContent =
        activeWorkout.currentSet;

    $("#totalSets").textContent =
        exercise.sets;

    $("#targetReps").textContent =
        exercise.reps;

    $("#targetRest").textContent =
        `${exercise.rest}s`;


    $("#exerciseDemo").textContent =
        exercise.icon;


    updateWorkoutTimerDisplay();
}


let workoutTimerInterval = null;
let workoutElapsed = 0;


function startWorkoutTimer() {

    clearInterval(
        workoutTimerInterval
    );

    if (
        activeWorkout.startTime
    ) {

        workoutElapsed =
            Math.floor(
                (
                    Date.now() -
                    activeWorkout.startTime
                ) / 1000
            );
    } else {

        workoutElapsed = 0;
    }


    workoutTimerInterval =
        setInterval(() => {

            workoutElapsed++;

            updateWorkoutTimerDisplay();

        }, 1000);
}


function stopWorkoutTimer() {

    clearInterval(
        workoutTimerInterval
    );

    workoutTimerInterval = null;
}


function updateWorkoutTimerDisplay() {

    const timer =
        $("#workoutTimer");

    if (!timer) return;

    timer.textContent =
        formatTimer(
            workoutElapsed
        );
}


function completeSet() {

    if (!activeWorkout.running) {

        showToast(
            "Start a workout first.",
            "ℹ️"
        );

        return;
    }


    const exercise =
        getExercise(
            activeWorkout.exercises[
                activeWorkout.index
            ]
        );

    if (!exercise) return;


    activeWorkout.setsCompleted++;

    state.workout.totalSets++;

    const today =
        ensureTodayHistory();

    today.sets++;


    if (
        activeWorkout.setsCompleted >
        state.records.mostSets
    ) {

        state.records.mostSets =
            activeWorkout.setsCompleted;

        celebrateRecord(
            "Most Sets",
            `${activeWorkout.setsCompleted} sets`,
            "You just beat your previous workout record!"
        );
    }


    addXP(15);

    saveState();

    showToast(
        `Set ${activeWorkout.currentSet} complete! +15 XP`,
        "💪"
    );


    if (
        activeWorkout.currentSet <
        exercise.sets
    ) {

        activeWorkout.currentSet++;

        updateWorkoutExercise();

        startRestTimer(
            exercise.rest
        );

    } else {

        if (
            activeWorkout.index <
            activeWorkout.exercises.length - 1
        ) {

            activeWorkout.index++;
            activeWorkout.currentSet = 1;

            updateWorkoutExercise();

            showToast(
                "Exercise complete! Next one.",
                "🔥"
            );

        } else {

            finishWorkout();
        }
    }

    checkAchievements();
    updateAll();
}


function nextExercise() {

    if (
        activeWorkout.index >=
        activeWorkout.exercises.length - 1
    ) {

        finishWorkout();

        return;
    }

    activeWorkout.index++;
    activeWorkout.currentSet = 1;

    updateWorkoutExercise();
}


/* =========================================================
   REST TIMER
========================================================= */

let restInterval = null;
let restSeconds = 0;


function startRestTimer(seconds) {

    clearInterval(restInterval);

    restSeconds =
        Number(seconds) || 60;

    updateRestTimer();


    restInterval =
        setInterval(() => {

            restSeconds--;

            updateRestTimer();


            if (restSeconds <= 0) {

                clearInterval(
                    restInterval
                );

                showToast(
                    "Rest complete. Get back in! 🔥",
                    "⏱"
                );

                playNotificationSound();
            }

        }, 1000);
}


function updateRestTimer() {

    const element =
        $("#workoutRestTimer");

    if (element) {

        element.textContent =
            restSeconds;
    }
}


/* =========================================================
   FINISH WORKOUT
========================================================= */

function finishWorkout() {

    if (!activeWorkout.running) {
        return;
    }


    activeWorkout.running = false;

    stopWorkoutTimer();

    clearInterval(
        restInterval
    );


    const minutes =
        Math.max(
            1,
            Math.round(
                workoutElapsed / 60
            )
        );


    const today =
        ensureTodayHistory();


    today.workoutMinutes += minutes;
    today.workouts++;
    today.sets +=
        activeWorkout.setsCompleted;


    state.workout.count++;
    state.workout.totalMinutes +=
        minutes;


    state.workout.totalSets +=
        activeWorkout.setsCompleted;


    state.workout.longestWorkout =
        Math.max(
            state.workout.longestWorkout,
            minutes
        );


    state.records.longestWorkout =
        Math.max(
            state.records.longestWorkout,
            minutes
        );


    state.records.mostSets =
        Math.max(
            state.records.mostSets,
            state.workout.totalSets
        );


    markActivity();

    updateWorkoutStreak();

    addXP(100);

    checkAchievements();

    saveState();

    showToast(
        `Workout complete! +100 XP 🔥`,
        "🏆"
    );

    playNotificationSound();


    activeWorkout.startTime =
        null;

    activeWorkout.running =
        false;

    workoutElapsed = 0;

    updateAll();


    setTimeout(() => {

        showWorkoutPage(
            "workout-dashboard"
        );

    }, 300);
}


/* =========================================================
   WORKOUT STREAK
========================================================= */

function updateWorkoutStreak() {

    const streak =
        calculateStreak(
            "workouts"
        );

    state.workout.streak =
        streak;

    state.workout.bestStreak =
        Math.max(
            state.workout.bestStreak,
            streak
        );

    state.records.longestWorkoutStreak =
        Math.max(
            state.records.longestWorkoutStreak,
            streak
        );

    saveState();
}


/* =========================================================
   WORKOUT DASHBOARD
========================================================= */

function updateWorkoutDashboard() {

    $("#workoutCount").textContent =
        state.workout.count;

    $("#totalWorkoutTime").textContent =
        formatMinutes(
            state.workout.totalMinutes
        );

    $("#totalSetsCompleted").textContent =
        state.workout.totalSets;

    $("#workoutStreak").textContent =
        state.workout.streak;

    $("#workoutRecords").textContent =
        countRecords();

    $("#analyticsWorkouts").textContent =
        state.workout.count;

    $("#analyticsWorkoutTime").textContent =
        formatMinutes(
            state.workout.totalMinutes
        );

    $("#analyticsWorkoutSets").textContent =
        state.workout.totalSets;

    $("#analyticsWorkoutStreak").textContent =
        state.workout.bestStreak;

    $("#longestWorkout").textContent =
        `${state.records.longestWorkout} min`;

    $("#mostSets").textContent =
        state.records.mostSets;

    $("#longestWorkoutStreak").textContent =
        `${state.records.longestWorkoutStreak} days`;


    renderTodayExercises();
}


function countRecords() {

    let count = 0;

    if (state.records.studyMinutes > 0) {
        count++;
    }

    if (state.records.pomodoros > 0) {
        count++;
    }

    if (state.records.longestWorkout > 0) {
        count++;
    }

    if (state.records.mostSets > 0) {
        count++;
    }

    if (
        state.records.longestWorkoutStreak > 0
    ) {
        count++;
    }

    return count;
}


/* =========================================================
   PERSONAL RECORD CELEBRATION
========================================================= */

function celebrateRecord(
    title,
    value,
    message
) {

    $("#recordTitle").textContent =
        title;

    $("#recordValue").textContent =
        value;

    $("#recordMessage").textContent =
        message;

    $("#recordOverlay")
        .classList.add("open");

    $("#recordOverlay")
        .setAttribute(
            "aria-hidden",
            "false"
        );

    createConfetti();
}


/* =========================================================
   XP / LEVEL
========================================================= */

function xpRequired(level) {

    return 100 + (
        (level - 1) * 50
    );
}


function addXP(amount) {

    state.user.xp +=
        Number(amount) || 0;


    let required =
        xpRequired(
            state.user.level
        );


    while (
        state.user.xp >= required
    ) {

        state.user.xp -= required;

        state.user.level++;

        required =
            xpRequired(
                state.user.level
            );


        showToast(
            `LEVEL UP! You reached Level ${state.user.level}!`,
            "🚀"
        );

        createConfetti();
    }


    updateXP();

    saveState();
}


function updateXP() {

    const level =
        state.user.level;

    const required =
        xpRequired(level);

    const percentage =
        clamp(
            (
                state.user.xp /
                required
            ) * 100,
            0,
            100
        );


    $("#totalXP").textContent =
        `${state.user.xp} XP`;

    $("#profileLevel").textContent =
        `Level ${level}`;

    $("#xpProgress").style.width =
        `${percentage}%`;
}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

const achievements = {

    first-focus: {
        title: "First Focus",
        sticker: "📚",
        description:
            "Complete your first Pomodoro.",
        xp: 50
    },

    focus-beast: {
        title: "Focus Beast",
        sticker: "🧠",
        description:
            "Complete 10 Pomodoros.",
        xp: 100
    },

    grinder: {
        title: "The Grinder",
        sticker: "⚙️",
        description:
            "Complete 25 tasks.",
        xp: 150
    },

    consistency: {
        title: "Consistency King",
        sticker: "🔥",
        description:
            "Build a 7 day activity streak.",
        xp: 150
    },

    beast-mode: {
        title: "Beast Mode",
        sticker: "💪",
        description:
            "Complete your first workout.",
        xp: 75
    },

    gym-monster: {
        title: "Gym Monster",
        sticker: "🏋️",
        description:
            "Complete 100 workout sets.",
        xp: 200
    },

    speed-demon: {
        title: "Speed Demon",
        sticker: "⚡",
        description:
            "Finish a workout session.",
        xp: 100
    },

    night-owl: {
        title: "Night Owl",
        sticker: "🦉",
        description:
            "Complete a focus session late at night.",
        xp: 100
    },

    no-zero-days: {
        title: "No Zero Days",
        sticker: "🏆",
        description:
            "Reach a 14 day activity streak.",
        xp: 300
    }

};


function unlockAchievement(id) {

    if (
        state.achievements
            .includes(id)
    ) {
        return;
    }


    const achievement =
        achievements[id];

    if (!achievement) return;


    state.achievements.push(id);

    addXP(
        achievement.xp
    );

    saveState();


    $("#unlockSticker").textContent =
        achievement.sticker;

    $("#unlockTitle").textContent =
        achievement.title;

    $("#unlockDescription").textContent =
        achievement.description;

    $("#unlockXP").textContent =
        `+${achievement.xp} XP`;


    $("#achievementOverlay")
        .classList.add("open");

    $("#achievementOverlay")
        .setAttribute(
            "aria-hidden",
            "false"
        );


    createConfetti();

    showToast(
        `${achievement.title} unlocked!`,
        "🏆"
    );
}


function checkAchievements() {

    const today =
        ensureTodayHistory();


    if (
        today.pomodoros >= 1
    ) {

        unlockAchievement(
            "first-focus"
        );
    }


    if (
        state.study.pomodoros >= 10
    ) {

        unlockAchievement(
            "focus-beast"
        );
    }


    if (
        state.study.tasksCompleted >= 25
    ) {

        unlockAchievement(
            "grinder"
        );
    }


    const studyStreak =
        calculateStreak(
            "studyMinutes"
        );


    const workoutStreak =
        calculateStreak(
            "workouts"
        );


    const activityStreak =
        Math.max(
            studyStreak,
            workoutStreak
        );


    if (
        activityStreak >= 7
    ) {

        unlockAchievement(
            "consistency"
        );
    }


    if (
        state.workout.count >= 1
    ) {

        unlockAchievement(
            "beast-mode"
        );

        unlockAchievement(
            "speed-demon"
        );
    }


    if (
        state.workout.totalSets >= 100
    ) {

        unlockAchievement(
            "gym-monster"
        );
    }


    if (
        activityStreak >= 14
    ) {

        unlockAchievement(
            "no-zero-days"
        );
    }


    const hour =
        new Date().getHours();


    if (
        hour >= 22 &&
        today.pomodoros > 0
    ) {

        unlockAchievement(
            "night-owl"
        );
    }
}


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {

    const overlay =
        $(".achievement-confetti");

    if (!overlay) return;

    overlay.innerHTML = "";


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const piece =
            document.createElement("span");

        piece.style.position =
            "absolute";

        piece.style.width =
            "7px";

        piece.style.height =
            "12px";

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.top =
            "-20px";

        piece.style.borderRadius =
            "2px";

        piece.style.background =
            `hsl(${Math.random() * 360}, 80%, 60%)`;

        piece.style.animation =
            `confettiFall ${
                1.2 +
                Math.random() * 1.8
            }s ease forwards`;

        piece.style.animationDelay =
            `${Math.random() * 0.4}s`;

        overlay.appendChild(piece);
    }
}


/* =========================================================
   ACHIEVEMENT / RECORD CLOSE
========================================================= */

function closeAchievement() {

    $("#achievementOverlay")
        .classList.remove("open");

    $("#achievementOverlay")
        .setAttribute(
            "aria-hidden",
            "true"
        );
}


function closeRecord() {

    $("#recordOverlay")
        .classList.remove("open");

    $("#recordOverlay")
        .setAttribute(
            "aria-hidden",
            "true"
        );
}


/* =========================================================
   PROFILE
========================================================= */

function openProfile() {

    const panel =
        $("#profilePanel");

    panel.classList.add("open");

    panel.setAttribute(
        "aria-hidden",
        "false"
    );

    updateProfile();
}


function closeProfile() {

    const panel =
        $("#profilePanel");

    panel.classList.remove("open");

    panel.setAttribute(
        "aria-hidden",
        "true"
    );
}


function updateProfile() {

    $("#profileName").textContent =
        state.user.name;

    $("#profileLevel").textContent =
        `Level ${state.user.level}`;

    $("#profileStudyHours").textContent =
        `${(
            state.study.totalMinutes /
            60
        ).toFixed(1)}h`;

    $("#profileWorkouts").textContent =
        state.workout.count;

    $("#profileAchievements").textContent =
        state.achievements.length;

    $("#totalXP").textContent =
        `${state.user.xp} XP`;

    updateXP();


    const badges =
        $("#profileBadges");

    if (!badges) return;


    if (!state.achievements.length) {

        badges.innerHTML = `
            <span class="badge-placeholder">
                🔒
            </span>
        `;

        return;
    }


    badges.innerHTML =
        state.achievements
            .map(id => {

                return `
                    <span
                        class="badge-placeholder"
                        title="${
                            achievements[id]?.title ||
                            "Achievement"
                        }"
                    >
                        ${
                            achievements[id]?.sticker ||
                            "🏆"
                        }
                    </span>
                `;

            })
            .join("");
}


/* =========================================================
   THEME
========================================================= */

function applyThemes() {

    const study =
        state.theme.study;

    const workout =
        state.theme.workout;


    document.documentElement
        .dataset.studyTheme =
        study;

    document.documentElement
        .dataset.workoutTheme =
        workout;
}


function toggleStudyTheme() {

    state.theme.study =
        state.theme.study === "light"
            ? "dark"
            : "light";

    document.documentElement
        .classList.toggle(
            "study-dark",
            state.theme.study === "dark"
        );

    saveState();

    showToast(
        `Study theme: ${state.theme.study}`,
        "☀️"
    );
}


function toggleWorkoutTheme() {

    state.theme.workout =
        state.theme.workout === "dark"
            ? "light"
            : "dark";

    document.documentElement
        .classList.toggle(
            "workout-light",
            state.theme.workout === "light"
        );

    saveState();

    showToast(
        `Workout theme: ${state.theme.workout}`,
        "🌙"
    );
}


/* =========================================================
   DAILY GOALS
========================================================= */

function editStudyGoal() {

    const value =
        prompt(
            "Daily study goal in minutes:",
            state.goals.studyMinutes
        );

    if (value === null) return;

    const number =
        Number(value);

    if (
        !Number.isFinite(number) ||
        number <= 0
    ) {

        showToast(
            "Enter a valid number.",
            "⚠️"
        );

        return;
    }


    state.goals.studyMinutes =
        Math.round(number);

    saveState();

    updateStudyDashboard();
}


function editPomodoroGoal() {

    const value =
        prompt(
            "Daily Pomodoro goal:",
            state.goals.pomodoros
        );

    if (value === null) return;

    const number =
        Number(value);

    if (
        !Number.isFinite(number) ||
        number <= 0
    ) {
        return;
    }

    state.goals.pomodoros =
        Math.round(number);

    saveState();

    updateStudyDashboard();
}


function editTaskGoal() {

    const value =
        prompt(
            "Daily task goal:",
            state.goals.tasks
        );

    if (value === null) return;

    const number =
        Number(value);

    if (
        !Number.isFinite(number) ||
        number <= 0
    ) {
        return;
    }

    state.goals.tasks =
        Math.round(number);

    saveState();

    updateStudyDashboard();
}


/* =========================================================
   ANALYTICS
========================================================= */

function updateAnalytics() {

    const days =
        Object.entries(
            state.history
        ).sort(
            ([a], [b]) =>
                a.localeCompare(b)
        );


    const totalStudy =
        days.reduce(
            (sum, [, day]) =>
                sum +
                (day.studyMinutes || 0),
            0
        );


    const totalPomodoros =
        days.reduce(
            (sum, [, day]) =>
                sum +
                (day.pomodoros || 0),
            0
        );


    const totalTasks =
        days.reduce(
            (sum, [, day]) =>
                sum +
                (day.tasksCompleted || 0),
            0
        );


    $("#analyticsStudyTime").textContent =
        formatMinutes(totalStudy);

    $("#analyticsPomodoros").textContent =
        totalPomodoros;


    const totalCreated =
        state.tasks.length;

    const completion =
        totalCreated > 0
            ? Math.round(
                (
                    state.tasks.filter(
                        task =>
                            task.completed
                    ).length /
                    totalCreated
                ) * 100
            )
            : 0;


    $("#analyticsTasks").textContent =
        `${completion}%`;

    $("#taskCompletionRate").textContent =
        `${completion}%`;


    drawStudyChart();
    renderAnalyticsSubjects();
    updateBestStudyDay();
}


function drawStudyChart() {

    const canvas =
        $("#studyChart");

    if (!canvas) return;


    const rect =
        canvas.getBoundingClientRect();

    const width =
        Math.max(
            300,
            rect.width
        );

    const height = 300;


    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;

    canvas.style.height =
        `${height}px`;


    const ctx =
        canvas.getContext("2d");

    ctx.scale(
        dpr,
        dpr
    );


    const days = [];

    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        const date =
            new Date();

        date.setDate(
            date.getDate() - i
        );

        const key = [
            date.getFullYear(),
            String(
                date.getMonth() + 1
            ).padStart(2, "0"),
            String(
                date.getDate()
            ).padStart(2, "0")
        ].join("-");

        days.push({
            key,
            value:
                state.history[key]
                    ?.studyMinutes || 0,
            label:
                date.toLocaleDateString(
                    undefined,
                    {
                        weekday: "short"
                    }
                )
        });
    }


    const max =
        Math.max(
            60,
            ...days.map(
                day => day.value
            )
        );


    const padding = 35;

    const chartWidth =
        width - padding * 2;

    const chartHeight =
        height - 70;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    ctx.strokeStyle =
        "#e5e7eb";

    ctx.lineWidth = 1;


    for (
        let i = 0;
        i <= 4;
        i++
    ) {

        const y =
            25 +
            (chartHeight / 4) * i;

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


    ctx.beginPath();

    days.forEach(
        (day, index) => {

            const x =
                padding +
                (
                    chartWidth /
                    Math.max(
                        1,
                        days.length - 1
                    )
                ) * index;

            const y =
                25 +
                chartHeight -
                (
                    day.value /
                    max
                ) * chartHeight;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
    );


    ctx.strokeStyle =
        "#6366f1";

    ctx.lineWidth = 3;

    ctx.stroke();


    days.forEach(
        (day, index) => {

            const x =
                padding +
                (
                    chartWidth /
                    Math.max(
                        1,
                        days.length - 1
                    )
                ) * index;

            const y =
                25 +
                chartHeight -
                (
                    day.value /
                    max
                ) * chartHeight;


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                5,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "#6366f1";

            ctx.fill();


            ctx.fillStyle =
                "#6b7280";

            ctx.font =
                "12px system-ui";

            ctx.textAlign =
                "center";

            ctx.fillText(
                day.label,
                x,
                height - 12
            );
        }
    );
}


function renderAnalyticsSubjects() {

    const container =
        $("#analyticsSubjectList");

    if (!container) return;


    const totals = {};


    Object.values(
        state.history
    ).forEach(day => {

        if (!day.subjects) return;

        Object.entries(
            day.subjects
        ).forEach(
            ([subject, minutes]) => {

                totals[subject] =
                    (
                        totals[subject] ||
                        0
                    ) + minutes;
            }
        );
    });


    const entries =
        Object.entries(totals)
            .sort(
                ([, a], [, b]) =>
                    b - a
            );


    if (!entries.length) {

        container.innerHTML = `
            <div class="empty-state">
                <span>📚</span>
                <p>Start studying to see your breakdown.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        entries.map(
            ([subject, minutes]) => {

                return `
                    <div class="review-list">
                        <div>
                            <span>
                                ${escapeHTML(subject)}
                            </span>

                            <strong>
                                ${formatMinutes(minutes)}
                            </strong>
                        </div>
                    </div>
                `;

            }
        ).join("");
}


function updateBestStudyDay() {

    const entries =
        Object.entries(
            state.history
        );


    if (!entries.length) {
        $("#bestStudyDay").textContent =
            "—";
        $("#topSubject").textContent =
            "—";
        return;
    }


    const best =
        entries.reduce(
            (best, current) =>
                (current[1].studyMinutes || 0) >
                (best[1].studyMinutes || 0)
                    ? current
                    : best
        );


    $("#bestStudyDay").textContent =
        best[0];


    const subjects = {};


    entries.forEach(
        ([, day]) => {

            Object.entries(
                day.subjects || {}
            ).forEach(
                ([subject, minutes]) => {

                    subjects[subject] =
                        (
                            subjects[subject] ||
                            0
                        ) + minutes;
                }
            );
        }
    );


    const top =
        Object.entries(subjects)
            .sort(
                ([, a], [, b]) =>
                    b - a
            )[0];


    $("#topSubject").textContent =
        top
            ? top[0]
            : "—";
}


/* =========================================================
   PROFILE / STATS UPDATE
========================================================= */

function updateAll() {

    updateGreeting();

    updateQuotes();

    updateStudyDashboard();

    updateWorkoutDashboard();

    renderTasks();

    renderSubjects();

    renderExerciseLibrary();

    updateAnalytics();

    updateProfile();

    updateXP();

    updatePomodoroDisplay();

    updateBreakTimer();

    updateWorkoutTimerDisplay();

    applyThemes();
}


/* =========================================================
   NOTIFICATION SOUND
========================================================= */

function playNotificationSound() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) return;

        const audio =
            new AudioContext();

        const oscillator =
            audio.createOscillator();

        const gain =
            audio.createGain();


        oscillator.type =
            "sine";

        oscillator.frequency.value =
            880;

        gain.gain.setValueAtTime(
            0.001,
            audio.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.15,
            audio.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 0.4
        );


        oscillator.connect(gain);

        gain.connect(
            audio.destination
        );

        oscillator.start();

        oscillator.stop(
            audio.currentTime + 0.4
        );

    } catch (error) {

        console.warn(
            "Notification sound unavailable."
        );
    }
}


/* =========================================================
   EVENT LISTENERS
========================================================= */


/* MODE SELECTION */

$("#enterStudyMode")
    ?.addEventListener(
        "click",
        enterStudyMode
    );


$("#enterWorkoutMode")
    ?.addEventListener(
        "click",
        enterWorkoutMode
    );


$("#studyBackButton")
    ?.addEventListener(
        "click",
        returnToModes
    );


$("#workoutBackButton")
    ?.addEventListener(
        "click",
        returnToModes
    );


/* STUDY NAV */

$$("[data-study-page]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const page =
                    button.dataset.studyPage;

                if (!page) return;

                showStudyPage(page);
            }
        );
    });


/* WORKOUT NAV */

$$("[data-workout-page]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const page =
                    button.dataset.workoutPage;

                if (!page) return;

                showWorkoutPage(page);
            }
        );
    });


/* PROFILE */

$("#studyProfileButton")
    ?.addEventListener(
        "click",
        openProfile
    );


$("#workoutProfileButton")
    ?.addEventListener(
        "click",
        openProfile
    );


$("#closeProfile")
    ?.addEventListener(
        "click",
        closeProfile
    );


/* THEMES */

$("#studyThemeToggle")
    ?.addEventListener(
        "click",
        toggleStudyTheme
    );


$("#workoutThemeToggle")
    ?.addEventListener(
        "click",
        toggleWorkoutTheme
    );


/* STUDY TIMER */

$("#startPomodoro")
    ?.addEventListener(
        "click",
        startPomodoro
    );


$("#pausePomodoro")
    ?.addEventListener(
        "click",
        pausePomodoro
    );


$("#resetPomodoro")
    ?.addEventListener(
        "click",
        resetPomodoro
    );


$("#startMiniPomodoro")
    ?.addEventListener(
        "click",
        startMiniPomodoro
    );


$("#subjectSelect")
    ?.addEventListener(
        "change",
        updateTimerSubject
    );


$$(".timer-preset")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                setPomodoroPreset(
                    button.dataset.focus,
                    button.dataset.break
                );
            }
        );
    });


/* TASKS */

$("#addTaskButton")
    ?.addEventListener(
        "click",
        openTaskModal
    );


$("#closeTaskModal")
    ?.addEventListener(
        "click",
        closeTaskModal
    );


$("#taskForm")
    ?.addEventListener(
        "submit",
        createTask
    );


$("#taskSort")
    ?.addEventListener(
        "change",
        renderTasks
    );


$$(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentTaskFilter =
                    button.dataset.filter;

                $$(".filter-btn")
                    .forEach(
                        item =>
                            item.classList.toggle(
                                "active",
                                item === button
                            )
                    );

                renderTasks();
            }
        );
    });


/* SUBJECTS */

$("#addSubject")
    ?.addEventListener(
        "click",
        addSubject
    );


$("#addSubjectFromSubjects")
    ?.addEventListener(
        "click",
        addSubject
    );


/* MUSIC */

$("#musicPlay")
    ?.addEventListener(
        "click",
        toggleMusic
    );


$("#previousTrack")
    ?.addEventListener(
        "click",
        () => changeTrack(-1)
    );


$("#nextTrack")
    ?.addEventListener(
        "click",
        () => changeTrack(1)
    );


$("#musicVolume")
    ?.addEventListener(
        "input",
        event => {

            state.music.volume =
                Number(
                    event.target.value
                );

            saveState();
        }
    );


$$(".sound-option")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectSound(
                    button.dataset.sound
                );
            }
        );
    });


/* FOCUS MODE */

$("#focusModeButton")
    ?.addEventListener(
        "click",
        openFocusMode
    );


$("#exitFocusMode")
    ?.addEventListener(
        "click",
        closeFocusMode
    );


/* BREAK */

$$(".break-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.break;

                if (
                    type === "game"
                ) {

                    openBreakGame();

                } else {

                    startBreakActivity(
                        type
                    );
                }
            }
        );
    });


/* WORKOUT PLANS */

$$(".workout-plan-option")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectWorkoutPlan(
                    button.dataset.plan
                );
            }
        );
    });


/* WORKOUT */

$("#startWorkout")
    ?.addEventListener(
        "click",
        startWorkout
    );


$("#completeSet")
    ?.addEventListener(
        "click",
        completeSet
    );


$("#startRest")
    ?.addEventListener(
        "click",
        () => {

            const id =
                activeWorkout.exercises[
                    activeWorkout.index
                ];

            const exercise =
                getExercise(id);

            startRestTimer(
                exercise?.rest || 60
            );
        }
    );


$("#nextExercise")
    ?.addEventListener(
        "click",
        nextExercise
    );


/* EXERCISE SEARCH */

$("#exerciseSearch")
    ?.addEventListener(
        "input",
        event => {

            renderExerciseLibrary(
                event.target.value
            );
        }
    );


/* EXERCISE MODAL */

$("#closeExerciseModal")
    ?.addEventListener(
        "click",
        closeExerciseModal
    );


$("#addExerciseToWorkout")
    ?.addEventListener(
        "click",
        addSelectedExerciseToWorkout
    );


/* ACHIEVEMENT */

$("#closeAchievement")
    ?.addEventListener(
        "click",
        closeAchievement
    );


$("#achievementContinue")
    ?.addEventListener(
        "click",
        closeAchievement
    );


/* RECORD */

$("#closeRecord")
    ?.addEventListener(
        "click",
        closeRecord
    );


/* GAMES */

$("#closeBreakGame")
    ?.addEventListener(
        "click",
        closeBreakGame
    );


$("#closeGame")
    ?.addEventListener(
        "click",
        closeBreakGame
    );


$("#startGame")
    ?.addEventListener(
        "click",
        startCurrentGame
    );


/* =========================================================
   EVENT DELEGATION
========================================================= */

document.addEventListener(
    "click",
    event => {

        const completeButton =
            event.target.closest(
                "[data-complete-task]"
            );

        if (completeButton) {

            completeTask(
                completeButton.dataset.completeTask
            );

            return;
        }


        const focusButton =
            event.target.closest(
                "[data-focus-task]"
            );

        if (focusButton) {

            focusTask(
                focusButton.dataset.focusTask
            );

            return;
        }


        const exerciseButton =
            event.target.closest(
                "[data-exercise]"
            );

        if (exerciseButton) {

            openExerciseModal(
                exerciseButton.dataset.exercise
            );

            return;
        }
    }
);


/* =========================================================
   BREAK ACTIVITIES
========================================================= */

function startBreakActivity(type) {

    startBreakTimer();

    const messages = {

        breathing:
            "Breathe slowly. In for 4 seconds, out for 6.",

        stretch:
            "Stand up, roll your shoulders, and stretch.",

        eye:
            "Look at something 20 feet away for 20 seconds."
    };


    const message =
        messages[type] ||
        "Take a proper break.";


    showToast(
        message,
        type === "breathing"
            ? "🌿"
            : type === "stretch"
                ? "🧘"
                : "👁"
    );
}


/* =========================================================
   QUICK BREAK GAME
========================================================= */

let currentGame = "reaction";
let reactionStart = 0;


function openBreakGame() {

    $("#breakGameModal")
        .classList.add("open");

    $("#breakGameModal")
        .setAttribute(
            "aria-hidden",
            "false"
        );

    currentGame =
        ["reaction", "math", "word"][
            Math.floor(
                Math.random() * 3
            )
        ];

    $("#breakGameTitle").textContent =
        gameTitle(currentGame);

    $("#gameResult").textContent = "";

    $("#gameArea").innerHTML = `
        <button
            id="startGame"
            class="primary-button"
            type="button"
        >
            Start Game
        </button>
    `;

    $("#startGame")
        .addEventListener(
            "click",
            startCurrentGame
        );
}


function gameTitle(game) {

    const titles = {

        reaction:
            "Reaction Test",

        math:
            "Quick Math",

        word:
            "Word Scramble"
    };

    return titles[game] ||
        "Quick Game";
}


function startCurrentGame() {

    if (
        currentGame ===
        "reaction"
    ) {

        startReactionGame();

    } else if (
        currentGame ===
        "math"
    ) {

        startMathGame();

    } else {

        startWordGame();
    }
}


function startReactionGame() {

    const area =
        $("#gameArea");

    area.innerHTML = `
        <button
            id="reactionTarget"
            style="
                width:150px;
                height:150px;
                border-radius:50%;
                background:#6366f1;
                color:white;
                font-weight:800;
            "
            type="button"
        >
            WAIT...
        </button>
    `;


    const delay =
        1000 +
        Math.random() * 2500;


    setTimeout(() => {

        const target =
            $("#reactionTarget");

        if (!target) return;

        target.textContent =
            "CLICK!";

        target.style.background =
            "#16a34a";

        reactionStart =
            performance.now();

        target.addEventListener(
            "click",
            () => {

                const time =
                    Math.round(
                        performance.now() -
                        reactionStart
                    );

                $("#gameResult").textContent =
                    `${time} ms — Nice reaction!`;

                addXP(10);

                showToast(
                    `Reaction test: ${time}ms`,
                    "⚡"
                );
            },
            {
                once: true
            }
        );

    }, delay);
}


function startMathGame() {

    const a =
        Math.floor(
            Math.random() * 20
        ) + 5;

    const b =
        Math.floor(
            Math.random() * 20
        ) + 5;

    const answer =
        a + b;


    $("#gameArea").innerHTML = `

        <div style="text-align:center">

            <h2>
                ${a} + ${b} = ?
            </h2>

            <input
                id="mathAnswer"
                type="number"
                placeholder="Answer"
                style="
                    margin:15px 0;
                    max-width:180px;
                "
            >

            <button
                id="mathSubmit"
                class="primary-button"
                type="button"
            >
                Check
            </button>

        </div>
    `;


    $("#mathSubmit")
        .addEventListener(
            "click",
            () => {

                const userAnswer =
                    Number(
                        $("#mathAnswer").value
                    );

                if (
                    userAnswer === answer
                ) {

                    $("#gameResult")
                        .textContent =
                        "Correct! 🧠 +10 XP";

                    addXP(10);

                } else {

                    $("#gameResult")
                        .textContent =
                        `Not quite. Answer: ${answer}`;
                }
            }
        );
}


function startWordGame() {

    const words = [
        "FOCUS",
        "ENERGY",
        "STUDY",
        "MOTION",
        "STRENGTH",
        "DISCIPLINE"
    ];


    const word =
        words[
            Math.floor(
                Math.random() *
                words.length
            )
        ];


    const scrambled =
        word
            .split("")
            .sort(
                () =>
                    Math.random() - 0.5
            )
            .join("");


    $("#gameArea").innerHTML = `

        <div style="text-align:center">

            <h2>
                ${scrambled}
            </h2>

            <input
                id="wordAnswer"
                type="text"
                placeholder="Unscramble it"
                style="
                    margin:15px 0;
                    max-width:220px;
                "
            >

            <button
                id="wordSubmit"
                class="primary-button"
                type="button"
            >
                Check
            </button>

        </div>
    `;


    $("#wordSubmit")
        .addEventListener(
            "click",
            () => {

                const answer =
                    $("#wordAnswer")
                        .value
                        .trim()
                        .toUpperCase();


                if (
                    answer === word
                ) {

                    $("#gameResult")
                        .textContent =
                        "Correct! 🧠 +10 XP";

                    addXP(10);

                } else {

                    $("#gameResult")
                        .textContent =
                        "Try again!";
                }
            }
        );
}


function closeBreakGame() {

    $("#breakGameModal")
        .classList.remove("open");

    $("#breakGameModal")
        .setAttribute(
            "aria-hidden",
            "true"
        );
}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeTaskModal();
            closeExerciseModal();
            closeAchievement();
            closeRecord();
            closeBreakGame();
            closeFocusMode();
            closeProfile();
        }


        if (
            event.code === "Space" &&
            !["INPUT", "TEXTAREA", "SELECT"]
                .includes(
                    document.activeElement?.tagName
                )
        ) {

            event.preventDefault();

            if (
                state.currentMode ===
                "study"
            ) {

                if (
                    pomodoro.running
                ) {
                    pausePomodoro();
                } else {
                    startPomodoro();
                }
            }
        }
    }
);


/* =========================================================
   CLOSE MODALS WHEN CLICKING BACKDROP
========================================================= */

$$(".modal-overlay")
    .forEach(overlay => {

        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target !==
                    overlay
                ) {
                    return;
                }

                overlay.classList.remove(
                    "open"
                );

                overlay.setAttribute(
                    "aria-hidden",
                    "true"
                );
            }
        );
    });


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            state.currentMode ===
            "study"
        ) {

            drawStudyChart();
        }
    }
);


/* =========================================================
   MODE CARD CURSOR EFFECT
========================================================= */

$$(".mode-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    (
                        y -
                        rect.height / 2
                    ) /
                    25;


                const rotateY =
                    (
                        rect.width / 2 -
                        x
                    ) /
                    25;


                card.style.transform =
                    `
                    translateY(-12px)
                    scale(1.025)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );
    });


/* =========================================================
   INITIALIZATION
========================================================= */

function initializeApp() {

    ensureTodayHistory();

    applyThemes();

    updateAll();

    updateMusicButton();

    updatePomodoroDisplay();


    /* Default state */

    $("#modeSelection").style.display =
        "block";

    $("#studyApp")
        .classList.remove("active");

    $("#workoutApp")
        .classList.remove("active");


    /*
       Always start on mode selection.
       The user explicitly chooses their mode.
    */

    state.currentMode =
        "selection";

    saveState();


    console.log(
        "FOCUS initialized successfully."
    );
}


initializeApp();


/* =========================================================
   EXTRA CSS ANIMATION
   Injected because confetti needs keyframes.
========================================================= */

const animationStyle =
    document.createElement("style");

animationStyle.textContent = `

@keyframes confettiFall {

    0% {
        transform:
            translateY(-20px)
            rotate(0deg);
        opacity: 1;
    }

    100% {
        transform:
            translateY(500px)
            rotate(720deg);
        opacity: 0;
    }
}

.overdue {
    color: #ef4444 !important;
    font-weight: 800;
}

.study-dark .study-environment {
    --study-bg: #0d0f14;
    --study-surface: #151821;
    --study-surface-soft: #1b1f2a;
    --study-border: rgba(255,255,255,.09);
    --study-text: #f5f7fb;
    --study-muted: #9da4b4;
}

.workout-light .workout-environment {
    --workout-bg: #f5f6f8;
    --workout-surface: #ffffff;
    --workout-surface-2: #eef0f3;
    --workout-border: #dfe2e7;
    --workout-text: #17191e;
    --workout-muted: #69707d;
}

`;

document.head.appendChild(
    animationStyle
);
```
