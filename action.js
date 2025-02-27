// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const taskDashboard = document.getElementById('task-dashboard');
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const currentUserElement = document.getElementById('current-user');
const userAvatar = document.getElementById('user-avatar');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const signupUsername = document.getElementById('signup-username');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupConfirmPassword = document.getElementById('signup-confirm-password');
const passwordStrengthBar = document.getElementById('password-strength-bar');
const loginPasswordToggle = document.getElementById('login-password-toggle');
const signupPasswordToggle = document.getElementById('signup-password-toggle');
const rememberMeCheckbox = document.getElementById('remember-me');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-tasks');
const filterAllBtn = document.getElementById('filter-all');
const filterActiveBtn = document.getElementById('filter-active');
const filterCompletedBtn = document.getElementById('filter-completed');
const loginAlert = document.getElementById('login-alert');
const signupAlert = document.getElementById('signup-alert');
const paginationContainer = document.getElementById('pagination');
const progressBar = document.getElementById('progress-bar');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const addTaskBtn = document.getElementById('add-task-btn');
const taskModal = document.getElementById('task-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelTaskBtn = document.getElementById('cancel-task');
const saveTaskBtn = document.getElementById('save-task');
const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const taskDueDateInput = document.getElementById('task-due-date');
const taskPriorityInput = document.getElementById('task-priority');
const taskTagsInput = document.getElementById('task-tags');
const subtasksList = document.getElementById('subtask-list');
const newSubtaskInput = document.getElementById('new-subtask');
const addSubtaskBtn = document.getElementById('add-subtask-btn');
const modalTitle = document.getElementById('modal-title');
const taskDetailsModal = document.getElementById('task-details-modal');
const closeDetailsModalBtn = document.getElementById('close-details-modal');
const closeDetailsBtn = document.getElementById('close-details');
const editTaskBtn = document.getElementById('edit-task');
const deleteTaskBtn = document.getElementById('delete-task');
const detailModalTitle = document.getElementById('detail-modal-title');
const detailDescription = document.getElementById('detail-description');
const detailDueDate = document.getElementById('detail-due-date');
const detailPriority = document.getElementById('detail-priority');
const detailStatus = document.getElementById('detail-status');
const detailTags = document.getElementById('detail-tags');
const detailSubtasks = document.getElementById('detail-subtasks');
const commentsContainer = document.getElementById('comments-container');
const newCommentInput = document.getElementById('new-comment');
const addCommentBtn = document.getElementById('add-comment-btn');
const totalTasksElement = document.getElementById('total-tasks');
const pendingTasksElement = document.getElementById('pending-tasks');
const completedTasksElement = document.getElementById('completed-tasks');
const overdueTasksElement = document.getElementById('overdue-tasks');
const tagList = document.getElementById('tag-list');
const addTagBtn = document.getElementById('add-tag-btn');
const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view-content');

// Kanban elements
const todoTasksContainer = document.getElementById('todo-tasks');
const inprogressTasksContainer = document.getElementById('inprogress-tasks');
const doneTasksContainer = document.getElementById('done-tasks');
const todoCountElement = document.getElementById('todo-count');
const inprogressCountElement = document.getElementById('inprogress-count');
const doneCountElement = document.getElementById('done-count');

// Calendar elements
const calendarGrid = document.getElementById('calendar-grid');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const calendarMonthYear = document.getElementById('calendar-month-year');

// Analytics elements
const periodWeekBtn = document.getElementById('period-week');
const periodMonthBtn = document.getElementById('period-month');
const periodYearBtn = document.getElementById('period-year');
const completionChartCanvas = document.getElementById('completion-chart-canvas');
const priorityChartCanvas = document.getElementById('priority-chart-canvas');
const statusChartCanvas = document.getElementById('status-chart-canvas');
const trendChartCanvas = document.getElementById('trend-chart-canvas');

// Pomodoro elements
const pomodoroTimer = document.getElementById('pomodoro-timer');
const startTimerBtn = document.getElementById('start-timer');
const pauseTimerBtn = document.getElementById('pause-timer');
const resetTimerBtn = document.getElementById('reset-timer');
const pomodoroModeBtn = document.getElementById('pomodoro-mode');
const shortBreakBtn = document.getElementById('short-break');
const longBreakBtn = document.getElementById('long-break');
const pomodoroCountElement = document.getElementById('pomodoro-count');
const pomodoroTaskSelect = document.getElementById('pomodoro-task-select');

//css rootStyles
const rootStyles = getComputedStyle(document.documentElement)
const secondaryColor = rootStyles.getPropertyValue("--secondary-color").trim()
const warningColor = rootStyles.getPropertyValue("--warning-color").trim()
const dangerColor = rootStyles.getPropertyValue("--danger-color").trim()

// State Management
let currentUser = null;
let tasks = [];
let subtasks = [];
let comments = [];
let tags = [];
let currentFilter = 'all';
let currentSearch = '';
let currentPage = 1;
let itemsPerPage = 5;
let currentTaskId = null;
let currentView = 'list';
let calendar = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear()
};
let pomodoroState = {
    minutes: 25,
    seconds: 0,
    isRunning: false,
    timerType: 'pomodoro',
    completedPomodoros: 0,
    timerInterval: null,
    selectedTaskId: null
};
let charts = {
    completionChart: null,
    priorityChart: null,
    statusChart: null,
    trendChart: null,
    currentPeriod: 'week'
};

// Initialize App
function init() {
    simulateProgress();
    checkDarkModePreference();
    checkLoggedInUser();
    setupEventListeners();
    setTodayAsDefaultDueDate();
}

// Simulate page load progress
function simulateProgress() {
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressBar.style.width = '0';
            }, 500);
        } else {
            width += 5;
            progressBar.style.width = width + '%';
        }
    }, 50);
}

// Check dark mode preferences
function checkDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
}

// Set today as default due date
function setTodayAsDefaultDueDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    taskDueDateInput.value = `${year}-${month}-${day}`;
}

// Check for logged in user
function checkLoggedInUser() {
    const storedUser = localStorage.getItem('currentUser');
    const rememberToken = localStorage.getItem('rememberToken');
    
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        showTaskDashboard();
    } else if (rememberToken) {
        // Validate remember token
        const storedTokens = JSON.parse(localStorage.getItem('rememberTokens') || '[]');
        const validToken = storedTokens.find(token => 
            token.token === rememberToken && new Date(token.expiry) > new Date()
        );
        
        if (validToken) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.id === validToken.userId);
            
            if (user) {
                currentUser = { id: user.id, username: user.username, email: user.email };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showTaskDashboard();
            }
        }
    }
}

// Set up event listeners
function setupEventListeners() {
    // Auth navigation
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Password toggle visibility
    loginPasswordToggle.addEventListener('click', () => togglePasswordVisibility(loginPassword, loginPasswordToggle));
    signupPasswordToggle.addEventListener('click', () => togglePasswordVisibility(signupPassword, signupPasswordToggle));

    // Password strength meter
    signupPassword.addEventListener('input', checkPasswordStrength);

    // Signup
    signupBtn.addEventListener('click', handleSignup);

    // Login
    loginBtn.addEventListener('click', handleLogin);

    // Logout
    logoutBtn.addEventListener('click', handleLogout);

    // Dark mode toggle
    darkModeToggle.addEventListener('change', toggleDarkMode);

    // View navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewName = link.getAttribute('data-view');
            changeView(viewName);
        });
    });

    // Task filters
    filterAllBtn.addEventListener('click', () => setFilter('all'));
    filterActiveBtn.addEventListener('click', () => setFilter('active'));
    filterCompletedBtn.addEventListener('click', () => setFilter('completed'));

    // Search tasks
    searchInput.addEventListener('input', searchTasks);

    // Modal actions
    addTaskBtn.addEventListener('click', showAddTaskModal);
    closeModalBtn.addEventListener('click', closeTaskModal);
    cancelTaskBtn.addEventListener('click', closeTaskModal);
    saveTaskBtn.addEventListener('click', saveTask);

    // Subtasks
    addSubtaskBtn.addEventListener('click', addSubtask);
    newSubtaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSubtask();
        }
    });

    // Task details modal
    closeDetailsModalBtn.addEventListener('click', closeTaskDetailsModal);
    closeDetailsBtn.addEventListener('click', closeTaskDetailsModal);
    editTaskBtn.addEventListener('click', editCurrentTask);
    deleteTaskBtn.addEventListener('click', deleteCurrentTask);
    addCommentBtn.addEventListener('click', addComment);

    // Calendar navigation
    prevMonthBtn.addEventListener('click', goToPrevMonth);
    nextMonthBtn.addEventListener('click', goToNextMonth);

    // Analytics period change
    periodWeekBtn.addEventListener('click', () => changeAnalyticsPeriod('week'));
    periodMonthBtn.addEventListener('click', () => changeAnalyticsPeriod('month'));
    periodYearBtn.addEventListener('click', () => changeAnalyticsPeriod('year'));

    // Pomodoro timer
    startTimerBtn.addEventListener('click', startTimer);
    pauseTimerBtn.addEventListener('click', pauseTimer);
    resetTimerBtn.addEventListener('click', resetTimer);
    pomodoroModeBtn.addEventListener('click', () => setTimerMode('pomodoro', 25));
    shortBreakBtn.addEventListener('click', () => setTimerMode('shortBreak', 1));
    longBreakBtn.addEventListener('click', () => setTimerMode('longBreak', 15));

    // Tags
    addTagBtn.addEventListener('click', () => {
        const tagName = prompt('Enter new tag name:');
        if (tagName && tagName.trim()) {
            addNewTag(tagName.trim());
        }
    });
}

// Add new tag
function addNewTag(tagName) {
    if (!tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())) {
        const newTag = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            name: tagName,
            userId: currentUser.id
        };
        tags.push(newTag);
        saveTags();
        renderTags();
    } else {
        alert('Tag already exists!');
    }
}

// Toggle password visibility
function togglePasswordVisibility(passwordInput, toggleButton) {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = '🔒';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = '👁️';
    }
}

// Check password strength
function checkPasswordStrength() {
    const password = signupPassword.value;
    
    // Remove any existing classes
    passwordStrengthBar.className = 'password-strength-bar';
    
    if (password.length === 0) {
        passwordStrengthBar.style.width = '0';
        return;
    }
    
    let strength = 0;
    
    // Check length
    if (password.length >= 8) strength += 1;
    
    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    
    // Check for numbers
    if (password.match(/\d/)) strength += 1;
    
    // Check for special characters
    if (password.match(/[^a-zA-Z\d]/)) strength += 1;
    
    // Update the strength bar
    if (strength <= 2) {
        passwordStrengthBar.classList.add('strength-weak');
    } else if (strength === 3) {
        passwordStrengthBar.classList.add('strength-medium');
    } else {
        passwordStrengthBar.classList.add('strength-strong');
    }
}

// User Registration
function handleSignup() {
    // Show loader
    document.getElementById('signup-btn-loader').style.display = 'inline-block';
    
    // Simulate API delay
    setTimeout(() => {
        const username = signupUsername.value.trim();
        const email = signupEmail.value.trim();
        const password = signupPassword.value;
        const confirmPassword = signupConfirmPassword.value;

        // Validation
        if (!username || !email || !password) {
            showAlert(signupAlert, 'Please fill in all fields', 'danger');
            document.getElementById('signup-btn-loader').style.display = 'none';
            return;
        }

        if (!isValidEmail(email)) {
            showAlert(signupAlert, 'Please enter a valid email address', 'danger');
            document.getElementById('signup-btn-loader').style.display = 'none';
            return;
        }

        if (password.length < 6) {
            showAlert(signupAlert, 'Password must be at least 6 characters long', 'danger');
            document.getElementById('signup-btn-loader').style.display = 'none';
            return;
        }

        if (password !== confirmPassword) {
            showAlert(signupAlert, 'Passwords do not match', 'danger');
            document.getElementById('signup-btn-loader').style.display = 'none';
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.username === username)) {
            showAlert(signupAlert, 'Username already exists', 'danger');
            document.getElementById('signup-btn-loader').style.display = 'none';
            return;
        }

        if (users.some(user => user.email === email)) {
            showAlert(signupAlert, 'Email already in use', 'danger');
            document.getElementById('signup-btn-loader').style.display = 'none';
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password, // In a real app, you would hash this password
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Create default tags for new user
        const defaultTags = [
            { id: Date.now() + 1, name: 'Work', userId: newUser.id },
            { id: Date.now() + 2, name: 'Personal', userId: newUser.id },
            { id: Date.now() + 3, name: 'Urgent', userId: newUser.id }
        ];
        
        const allTags = JSON.parse(localStorage.getItem('tags') || '[]');
        localStorage.setItem('tags', JSON.stringify([...allTags, ...defaultTags]));
        
        // Auto login after signup
        currentUser = { id: newUser.id, username: newUser.username, email: newUser.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Hide loader and show dashboard
        document.getElementById('signup-btn-loader').style.display = 'none';
        showTaskDashboard();
    }, 1000); // Simulate 1 second delay
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// User Login
function handleLogin() {
    // Show loader
    document.getElementById('login-btn-loader').style.display = 'inline-block';
    
    // Simulate API delay
    setTimeout(() => {
        const username = loginUsername.value.trim();
        const password = loginPassword.value;
        const rememberMe = rememberMeCheckbox.checked;

        if (!username || !password) {
            showAlert(loginAlert, 'Please fill in all fields', 'danger');
            document.getElementById('login-btn-loader').style.display = 'none';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

        if (!user) {
            showAlert(loginAlert, 'Invalid username or password', 'danger');
            document.getElementById('login-btn-loader').style.display = 'none';
            return;
        }

        currentUser = { id: user.id, username: user.username, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Handle remember me
        if (rememberMe) {
            const token = generateToken();
            const thirtyDaysFromNow = new Date();
            thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
            
            const tokenObject = {
                userId: user.id,
                token: token,
                expiry: thirtyDaysFromNow.toISOString()
            };
            
            const storedTokens = JSON.parse(localStorage.getItem('rememberTokens') || '[]');
            localStorage.setItem('rememberTokens', JSON.stringify([...storedTokens, tokenObject]));
            localStorage.setItem('rememberToken', token);
        }
        
        // Hide loader and show dashboard
        document.getElementById('login-btn-loader').style.display = 'none';
        showTaskDashboard();
    }, 1000); // Simulate 1 second delay
}

// Generate random token
function generateToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

// User Logout
function handleLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberToken');
    currentUser = null;
    tasks = [];
    
    taskDashboard.style.display = 'none';
    loginForm.style.display = 'block';
    logoutBtn.style.display = 'none';
    currentUserElement.textContent = '';
    
    // Clear form fields
    loginUsername.value = '';
    loginPassword.value = '';
    loginAlert.innerHTML = '';
}

// Show Task Dashboard
function showTaskDashboard() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    taskDashboard.style.display = 'grid';
    logoutBtn.style.display = 'flex';
    currentUserElement.textContent = `${currentUser.username}`;
    
    // Set user avatar
    userAvatar.textContent = currentUser.username.charAt(0);
    
    loadTasks();
    loadTags();
    renderTasks();
    renderTags();
    renderKanbanBoard();
    renderCalendar();
    renderAnalytics();
    loadTasksIntoPomodoro();
    updateTaskStats();
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', darkModeToggle.checked);
}

// Change view
function changeView(viewName) {
    currentView = viewName;
    
    // Update navigation links
    navLinks.forEach(link => {
        if (link.getAttribute('data-view') === viewName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Hide all views
    views.forEach(view => {
        view.style.display = 'none';
    });
    
    // Show selected view
    document.getElementById(`${viewName}-view`).style.display = 'block';
    
    // Special handling for views
    if (viewName === 'kanban') {
        renderKanbanBoard();
    } else if (viewName === 'calendar') {
        renderCalendar();
    } else if (viewName === 'analytics') {
        renderAnalytics();
    }
}

// Load tasks from localStorage
function loadTasks() {
    tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.id}`) || '[]');
    subtasks = JSON.parse(localStorage.getItem(`subtasks_${currentUser.id}`) || '[]');
    comments = JSON.parse(localStorage.getItem(`comments_${currentUser.id}`) || '[]');
}

// Load tags from localStorage
function loadTags() {
    const allTags = JSON.parse(localStorage.getItem('tags') || '[]');
    tags = allTags.filter(tag => tag.userId === currentUser.id);
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem(`tasks_${currentUser.id}`, JSON.stringify(tasks));
    localStorage.setItem(`subtasks_${currentUser.id}`, JSON.stringify(subtasks));
    localStorage.setItem(`comments_${currentUser.id}`, JSON.stringify(comments));
}

// Save tags to localStorage
function saveTags() {
    const allTags = JSON.parse(localStorage.getItem('tags') || '[]');
    const otherUserTags = allTags.filter(tag => tag.userId !== currentUser.id);
    localStorage.setItem('tags', JSON.stringify([...otherUserTags, ...tags]));
}

// Set current filter
function setFilter(filter) {
    currentFilter = filter;
    currentPage = 1;
    renderTasks();
    
    // Update active button
    [filterAllBtn, filterActiveBtn, filterCompletedBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (filter === 'all') filterAllBtn.classList.add('active');
    if (filter === 'active') filterActiveBtn.classList.add('active');
    if (filter === 'completed') filterCompletedBtn.classList.add('active');
}

// Search tasks
function searchTasks() {
    currentSearch = searchInput.value.toLowerCase().trim();
    currentPage = 1;
    renderTasks();
}

// Show "Add Task" modal
function showAddTaskModal() {
    // Reset form
    modalTitle.textContent = 'Add New Task';
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
    setTodayAsDefaultDueDate();
    taskPriorityInput.value = 'medium';
    taskTagsInput.value = '';
    document.querySelector('input[name="task-status"][value="todo"]').checked = true;
    subtasksList.innerHTML = '';
    currentTaskId = null;
    
    // Show modal
    taskModal.style.display = 'block';
}

// Close task modal
function closeTaskModal() {
    taskModal.style.display = 'none';
}

// Close task details modal
function closeTaskDetailsModal() {
    taskDetailsModal.style.display = 'none';
}

// Add a new task
function saveTask() {
    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    const dueDate = taskDueDateInput.value;
    const priority = taskPriorityInput.value;
    const tagInput = taskTagsInput.value.trim();
    const status = document.querySelector('input[name="task-status"]:checked').value;
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    // Process tags
    const tagNames = tagInput ? tagInput.split(',').map(tag => tag.trim()) : [];
    
    // Add new tags if they don't exist
    tagNames.forEach(tagName => {
        if (tagName && !tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())) {
            const newTag = {
                id: Date.now() + Math.floor(Math.random() * 1000),
                name: tagName,
                userId: currentUser.id
            };
            tags.push(newTag);
        }
    });
    
    saveTags();
    
    if (currentTaskId) {
        // Update existing task
        const taskIndex = tasks.findIndex(task => task.id === currentTaskId);
        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title,
                description,
                dueDate,
                priority,
                tags: tagNames,
                status,
                completed: status === 'done',
                updatedAt: new Date().toISOString()
            };
        }
        
        // Get existing subtasks from the form
        const newSubtasks = [];
        const subtaskElements = subtasksList.querySelectorAll('.subtask-item');
        subtaskElements.forEach(element => {
            const subtaskText = element.querySelector('.subtask-text').textContent;
            const isCompleted = element.querySelector('.subtask-checkbox').checked;
            newSubtasks.push({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                taskId: currentTaskId,
                text: subtaskText,
                completed: isCompleted
            });
        });
        
        // Replace all subtasks for this task
        subtasks = subtasks.filter(subtask => subtask.taskId !== currentTaskId);
        subtasks = [...subtasks, ...newSubtasks];
    } else {
        // Create new task
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            created: new Date().toISOString(),
            dueDate,
            completed: status === 'done',
            priority,
            tags: tagNames,
            status,
            progress: 0,
            updatedAt: new Date().toISOString()
        };
        
        tasks.unshift(newTask); // Add to beginning of array
        
        // Process subtasks
        const subtaskElements = subtasksList.querySelectorAll('.subtask-item');
        subtaskElements.forEach(element => {
            const subtaskText = element.querySelector('.subtask-text').textContent;
            const isCompleted = element.querySelector('.subtask-checkbox').checked;
            const newSubtask = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                taskId: newTask.id,
                text: subtaskText,
                completed: isCompleted
            };
            subtasks.push(newSubtask);
        });
    }
    
    saveTasks();
    renderTasks();
    renderTags();
    renderKanbanBoard();
    renderCalendar();
    renderAnalytics();
    loadTasksIntoPomodoro();
    updateTaskStats();
    
    // Show confetti animation for completed task
    if (status === 'done') {
        createConfetti();
    }
    
    closeTaskModal();
}

// Add subtask
function addSubtask() {
    const subtaskText = newSubtaskInput.value.trim();
    if (!subtaskText) return;
    
    const subtaskItem = document.createElement('div');
    subtaskItem.className = 'subtask-item';
    
    subtaskItem.innerHTML = `
        <input type="checkbox" class="subtask-checkbox">
        <div class="subtask-text">${subtaskText}</div>
        <button class="subtask-delete">×</button>
    `;
    
    subtaskItem.querySelector('.subtask-delete').addEventListener('click', () => {
        subtaskItem.remove();
    });
    
    subtasksList.appendChild(subtaskItem);
    newSubtaskInput.value = '';
}

// Show task details
function showTaskDetails(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    currentTaskId = taskId;
    
    // Set task details
    detailModalTitle.textContent = task.title;
    detailDescription.textContent = task.description || 'No description provided';
    detailDueDate.textContent = formatDate(task.dueDate);
    detailPriority.textContent = capitalizeFirstLetter(task.priority);
    detailStatus.textContent = getStatusDisplayName(task.status);
    
    // Set priority class
    detailPriority.className = '';
    detailPriority.classList.add(`priority-${task.priority}`);
    
    // Set status class
    detailStatus.className = '';
    detailStatus.classList.add(`status-${task.status}`);
    
    // Display tags
    detailTags.innerHTML = '';
    if (task.tags && task.tags.length > 0) {
        task.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'task-tag';
            tagElement.textContent = tag;
            detailTags.appendChild(tagElement);
        });
    }
    
    // Display subtasks
    detailSubtasks.innerHTML = '<h4>Subtasks</h4>';
    const taskSubtasks = subtasks.filter(s => s.taskId === taskId);
    
    if (taskSubtasks.length === 0) {
        detailSubtasks.innerHTML += '<p>No subtasks</p>';
    } else {
        const subtasksList = document.createElement('div');
        subtasksList.className = 'subtask-list';
        
        taskSubtasks.forEach(subtask => {
            const subtaskItem = document.createElement('div');
            subtaskItem.className = 'subtask-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'subtask-checkbox';
            checkbox.checked = subtask.completed;
            checkbox.disabled = true;
            
            const subtaskText = document.createElement('div');
            subtaskText.className = 'subtask-text';
            if (subtask.completed) subtaskText.classList.add('completed');
            subtaskText.textContent = subtask.text;
            
            subtaskItem.appendChild(checkbox);
            subtaskItem.appendChild(subtaskText);
            subtasksList.appendChild(subtaskItem);
        });
        
        detailSubtasks.appendChild(subtasksList);
    }
    
    // Display comments
    commentsContainer.innerHTML = '';
    const taskComments = comments.filter(c => c.taskId === taskId);
    
    if (taskComments.length === 0) {
        commentsContainer.innerHTML = '<p>No comments yet</p>';
    } else {
        taskComments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            
            const commentHeader = document.createElement('div');
            commentHeader.className = 'comment-header';
            
            const commentAuthor = document.createElement('div');
            commentAuthor.className = 'comment-author';
            commentAuthor.textContent = currentUser.username;
            
            const commentDate = document.createElement('div');
            commentDate.className = 'comment-date';
            commentDate.textContent = formatDate(comment.createdAt);
            
            commentHeader.appendChild(commentAuthor);
            commentHeader.appendChild(commentDate);
            
            const commentContent = document.createElement('div');
            commentContent.className = 'comment-content';
            commentContent.textContent = comment.text;
            
            commentElement.appendChild(commentHeader);
            commentElement.appendChild(commentContent);
            
            commentsContainer.appendChild(commentElement);
        });
    }
    
    // Show modal
    taskDetailsModal.style.display = 'block';
}

// Edit current task
function editCurrentTask() {
    const task = tasks.find(t => t.id === currentTaskId);
    if (!task) return;
    
    // Close details modal
    closeTaskDetailsModal();
    
    // Populate task modal with current task data
    modalTitle.textContent = 'Edit Task';
    taskTitleInput.value = task.title;
    taskDescriptionInput.value = task.description || '';
    taskDueDateInput.value = task.dueDate;
    taskPriorityInput.value = task.priority;
    taskTagsInput.value = task.tags ? task.tags.join(', ') : '';
    document.querySelector(`input[name="task-status"][value="${task.status}"]`).checked = true;
    
    // Populate subtasks
    subtasksList.innerHTML = '';
    const taskSubtasks = subtasks.filter(s => s.taskId === currentTaskId);
    
    taskSubtasks.forEach(subtask => {
        const subtaskItem = document.createElement('div');
        subtaskItem.className = 'subtask-item';
        
        subtaskItem.innerHTML = `
            <input type="checkbox" class="subtask-checkbox" ${subtask.completed ? 'checked' : ''}>
            <div class="subtask-text">${subtask.text}</div>
            <button class="subtask-delete">×</button>
        `;
        
        subtaskItem.querySelector('.subtask-delete').addEventListener('click', () => {
            subtaskItem.remove();
        });
        
        subtasksList.appendChild(subtaskItem);
    });
    
    // Show modal
    taskModal.style.display = 'block';
}

// Delete current task
function deleteCurrentTask() {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    tasks = tasks.filter(task => task.id !== currentTaskId);
    subtasks = subtasks.filter(subtask => subtask.taskId !== currentTaskId);
    comments = comments.filter(comment => comment.taskId !== currentTaskId);
    
    saveTasks();
    renderTasks();
    renderKanbanBoard();
    renderCalendar();
    renderAnalytics();
    updateTaskStats();
    loadTasksIntoPomodoro();
    
    closeTaskDetailsModal();
}

// Add comment to task
function addComment() {
    const commentText = newCommentInput.value.trim();
    if (!commentText) return;
    
    const newComment = {
        id: Date.now().toString(),
        taskId: currentTaskId,
        text: commentText,
        createdAt: new Date().toISOString(),
        userId: currentUser.id
    };
    
    comments.push(newComment);
    saveTasks();
    
    // Add the new comment to the UI
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    
    const commentHeader = document.createElement('div');
    commentHeader.className = 'comment-header';
    
    const commentAuthor = document.createElement('div');
    commentAuthor.className = 'comment-author';
    commentAuthor.textContent = currentUser.username;
    
    const commentDate = document.createElement('div');
    commentDate.className = 'comment-date';
    commentDate.textContent = 'Just now';
    
    commentHeader.appendChild(commentAuthor);
    commentHeader.appendChild(commentDate);
    
    const commentContent = document.createElement('div');
    commentContent.className = 'comment-content';
    commentContent.textContent = commentText;
    
    commentElement.appendChild(commentHeader);
    commentElement.appendChild(commentContent);
    
    // If "No comments yet" message exists, remove it
    if (commentsContainer.querySelector('p')) {
        commentsContainer.innerHTML = '';
    }
    
    commentsContainer.appendChild(commentElement);
    newCommentInput.value = '';
}

// Toggle task completion
function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            const completed = !task.completed;
            
            // If completing the task, show confetti animation
            if (completed) {
                createConfetti();
            }
            
            return { 
                ...task, 
                completed,
                status: completed ? 'done' : 'todo',
                updatedAt: new Date().toISOString() 
            };
        }
        return task;
    });
    
    saveTasks();
    renderTasks();
    renderKanbanBoard();
    renderAnalytics();
    updateTaskStats();
}

// Create confetti animation
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random position
        const x = Math.random() * window.innerWidth;
        confetti.style.left = x + 'px';
        
        // Random color
        const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size
        const size = Math.random() * 10 + 5;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Random rotation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Add to body
        document.body.appendChild(confetti);
        
        // Remove after animation completes
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Delete task
function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    tasks = tasks.filter(task => task.id !== taskId);
    subtasks = subtasks.filter(subtask => subtask.taskId !== taskId);
    comments = comments.filter(comment => comment.taskId !== taskId);
    
    saveTasks();
    renderTasks();
    renderKanbanBoard();
    renderCalendar();
    renderAnalytics();
    updateTaskStats();
    loadTasksIntoPomodoro();
}

// Render tasks based on current filter
function renderTasks() {
    taskList.innerHTML = '';
    
    let filteredTasks = [...tasks];
    
    // Apply search filter
    if (currentSearch) {
        filteredTasks = filteredTasks.filter(task => 
            task.title.toLowerCase().includes(currentSearch) || 
            (task.description && task.description.toLowerCase().includes(currentSearch))
        );
    }
    
    // Apply status filter
    if (currentFilter === 'active') {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.completed);
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedTasks = filteredTasks.slice(start, start + itemsPerPage);
    
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<li class="task-item">No tasks found</li>';
        paginationContainer.innerHTML = '';
        return;
    }
    
    // Render tasks
    paginatedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item priority-${task.priority} draggable`;
        taskItem.setAttribute('draggable', 'true');
        taskItem.setAttribute('data-id', task.id);
        
        const taskCheckbox = document.createElement('div');
        taskCheckbox.className = task.completed ? 'task-checkbox checked' : 'task-checkbox';
        taskCheckbox.addEventListener('click', () => toggleTaskCompletion(task.id));
        
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        if (task.completed) taskContent.classList.add('completed');
        
        const taskTitle = document.createElement('div');
        taskTitle.className = 'task-title';
        taskTitle.textContent = task.title;
        
        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';
        
        // Due date
        const dueDate = document.createElement('div');
        dueDate.className = 'task-detail';
        dueDate.innerHTML = `<span>📅</span> ${formatDate(task.dueDate)}`;
        
        // Is task overdue?
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskDueDate = new Date(task.dueDate);
        if (!task.completed && taskDueDate < today) {
            dueDate.style.color = dangerColor;
            dueDate.style.fontWeight = 'bold';
        }
        
        // Priority
        const priority = document.createElement('div');
        priority.className = 'task-detail';
        priority.innerHTML = `<span>🔥</span> ${capitalizeFirstLetter(task.priority)}`;
        
        // Status
        const status = document.createElement('div');
        status.className = 'task-detail';
        status.innerHTML = `<span>📋</span> ${getStatusDisplayName(task.status)}`;
        
        taskDetails.appendChild(dueDate);
        taskDetails.appendChild(priority);
        taskDetails.appendChild(status);
        
        // Task tags
        if (task.tags && task.tags.length > 0) {
            const taskTags = document.createElement('div');
            taskTags.className = 'task-tags';
            
            task.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'task-tag';
                tagElement.textContent = tag;
                taskTags.appendChild(tagElement);
            });
            
            taskContent.appendChild(taskTitle);
            taskContent.appendChild(taskDetails);
            taskContent.appendChild(taskTags);
        } else {
            taskContent.appendChild(taskTitle);
            taskContent.appendChild(taskDetails);
        }
        
        // Task progress
        const taskProgress = document.createElement('div');
        taskProgress.className = 'task-progress';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        // Calculate progress based on subtasks
        const taskSubtasks = subtasks.filter(s => s.taskId === task.id);
        let progress = 0;
        
        if (taskSubtasks.length > 0) {
            const completedSubtasks = taskSubtasks.filter(s => s.completed).length;
            progress = Math.round((completedSubtasks / taskSubtasks.length) * 100);
        } else if (task.completed) {
            progress = 100;
        }
        
        progressBar.style.width = `${progress}%`;
        taskProgress.appendChild(progressBar);
        taskContent.appendChild(taskProgress);
        
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';
        
        const viewBtn = document.createElement('button');
        viewBtn.innerHTML = '👁️';
        viewBtn.title = 'View details';
        viewBtn.addEventListener('click', () => showTaskDetails(task.id));
        
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.title = 'Edit task';
        editBtn.addEventListener('click', () => {
            currentTaskId = task.id;
            editCurrentTask();
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.title = 'Delete task';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        taskActions.appendChild(viewBtn);
        taskActions.appendChild(editBtn);
        taskActions.appendChild(deleteBtn);
        
        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(taskActions);
        
        taskList.appendChild(taskItem);
        
        // Setup drag and drop
        taskItem.addEventListener('dragstart', () => {
            taskItem.classList.add('dragging');
        });
        
        taskItem.addEventListener('dragend', () => {
            taskItem.classList.remove('dragging');
        });
    });
    
    // Render pagination
    renderPagination(totalPages);
}

// Render pagination controls
function renderPagination(totalPages) {
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevButton = document.createElement('div');
    prevButton.className = 'pagination-item';
    prevButton.innerHTML = '◀';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTasks();
        }
    });
    paginationContainer.appendChild(prevButton);
    
    // Page numbers
    const maxPages = 5; // Maximum pages to show
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage + 1 < maxPages) {
        startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('div');
        pageButton.className = 'pagination-item';
        if (i === currentPage) pageButton.classList.add('active');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderTasks();
        });
        paginationContainer.appendChild(pageButton);
    }
    
    // Next button
    const nextButton = document.createElement('div');
    nextButton.className = 'pagination-item';
    nextButton.innerHTML = '▶';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTasks();
        }
    });
    paginationContainer.appendChild(nextButton);
}

// Render Kanban board
function renderKanbanBoard() {
    // Clear containers
    todoTasksContainer.innerHTML = '';
    inprogressTasksContainer.innerHTML = '';
    doneTasksContainer.innerHTML = '';
    
    // Group tasks by status
    const todoTasks = tasks.filter(task => task.status === 'todo' || (!task.status && !task.completed));
    const inprogressTasks = tasks.filter(task => task.status === 'inprogress');
    const doneTasks = tasks.filter(task => task.status === 'done' || (!task.status && task.completed));
    
    // Update counts
    todoCountElement.textContent = todoTasks.length;
    inprogressCountElement.textContent = inprogressTasks.length;
    doneCountElement.textContent = doneTasks.length;
    
    // Render tasks in each column
    renderKanbanTasks(todoTasks, todoTasksContainer);
    renderKanbanTasks(inprogressTasks, inprogressTasksContainer);
    renderKanbanTasks(doneTasks, doneTasksContainer);
    
    // Set up drop zones
    setupDropZones();
}

// Render tasks in Kanban column
function renderKanbanTasks(tasks, container) {
    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = `task-item priority-${task.priority} draggable`;
        taskCard.setAttribute('draggable', 'true');
        taskCard.setAttribute('data-id', task.id);
        
        const taskTitle = document.createElement('div');
        taskTitle.className = 'task-title';
        taskTitle.textContent = task.title;
        
        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';
        taskDetails.innerHTML = `<div class="task-detail"><span>📅</span> ${formatDate(task.dueDate)}</div>`;
        
        // Task tags
        if (task.tags && task.tags.length > 0) {
            const taskTags = document.createElement('div');
            taskTags.className = 'task-tags';
            
            task.tags.slice(0, 2).forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'task-tag';
                tagElement.textContent = tag;
                taskTags.appendChild(tagElement);
            });
            
            if (task.tags.length > 2) {
                const moreTag = document.createElement('span');
                moreTag.className = 'task-tag';
                moreTag.textContent = `+${task.tags.length - 2}`;
                taskTags.appendChild(moreTag);
            }
            
            taskCard.appendChild(taskTitle);
            taskCard.appendChild(taskDetails);
            taskCard.appendChild(taskTags);
        } else {
            taskCard.appendChild(taskTitle);
            taskCard.appendChild(taskDetails);
        }
        
        taskCard.addEventListener('click', () => showTaskDetails(task.id));
        
        // Drag events
        taskCard.addEventListener('dragstart', () => {
            taskCard.classList.add('dragging');
        });
        
        taskCard.addEventListener('dragend', () => {
            taskCard.classList.remove('dragging');
        });
        
        container.appendChild(taskCard);
    });
}

// Setup drop zones for Kanban columns
function setupDropZones() {
    const dropZones = document.querySelectorAll('.kanban-tasks');
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            if (draggable) {
                zone.appendChild(draggable);
            }
        });
        
        zone.addEventListener('drop', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            if (!draggable) return;
            
            const taskId = draggable.getAttribute('data-id');
            const newStatus = zone.getAttribute('data-status');
            
            // Update task status
            tasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { 
                        ...task, 
                        status: newStatus,
                        completed: newStatus === 'done',
                        updatedAt: new Date().toISOString() 
                    };
                }
                return task;
            });
            
            saveTasks();
            renderKanbanBoard();
            renderTasks();
            renderAnalytics();
            updateTaskStats();
        });
    });
}

// Render tags
function renderTags() {
    tagList.innerHTML = '';
    
    tags.forEach(tag => {
        const tagItem = document.createElement('li');
        tagItem.className = 'tag-item';
        
        const tagText = document.createElement('span');
        tagText.className = 'tag';
        tagText.textContent = tag.name;
        
        // Count tasks with this tag
        const tagCount = tasks.filter(task => 
            task.tags && task.tags.some(t => t.toLowerCase() === tag.name.toLowerCase())
        ).length;
        
        const count = document.createElement('span');
        count.className = 'tag-count';
        count.textContent = tagCount;
        
        tagItem.appendChild(tagText);
        tagItem.appendChild(count);
        tagList.appendChild(tagItem);
    });
}

// Update task statistics
function updateTaskStats() {
    const totalCount = tasks.length;
    const completedCount = tasks.filter(task => task.completed || task.status === 'done').length;
    const pendingCount = totalCount - completedCount;
    
    // Calculate overdue tasks
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdueCount = tasks.filter(task => {
        if (task.completed || task.status === 'done') return false;
        const dueDate = new Date(task.dueDate);
        return dueDate < today;
    }).length;
    
    totalTasksElement.textContent = totalCount;
    completedTasksElement.textContent = completedCount;
    pendingTasksElement.textContent = pendingCount;
    overdueTasksElement.textContent = overdueCount;
}

// Render calendar
function renderCalendar() {
    calendarGrid.innerHTML = '';
    
    const year = calendar.currentYear;
    const month = calendar.currentMonth;
    
    // Update month/year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    calendarMonthYear.textContent = `${monthNames[month]} ${year}`;
    
    // Create day name headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayNameElement = document.createElement('div');
        dayNameElement.className = 'calendar-day-name';
        dayNameElement.textContent = day;
        calendarGrid.appendChild(dayNameElement);
    });
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create blank cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
        const blankDay = document.createElement('div');
        blankDay.className = 'calendar-day';
        calendarGrid.appendChild(blankDay);
    }
    
    // Create calendar days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Check if this is today
        const currentDate = new Date(year, month, day);
        if (currentDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Find tasks due on this day
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dueTasks = tasks.filter(task => task.dueDate === dateStr);
        
        dueTasks.forEach(task => {
            const taskEvent = document.createElement('div');
            taskEvent.className = 'calendar-event';
            if (task.completed || task.status === 'done') {
                taskEvent.style.backgroundColor = secondaryColor;
            } else if (currentDate < today) {
                taskEvent.style.backgroundColor = dangerColor;
            }
            taskEvent.textContent = task.title;
            taskEvent.addEventListener('click', () => showTaskDetails(task.id));
            dayElement.appendChild(taskEvent);
        });
        
        calendarGrid.appendChild(dayElement);
    }
}

// Navigate to previous month
function goToPrevMonth() {
    calendar.currentMonth--;
    if (calendar.currentMonth < 0) {
        calendar.currentMonth = 11;
        calendar.currentYear--;
    }
    renderCalendar();
}

// Navigate to next month
function goToNextMonth() {
    calendar.currentMonth++;
    if (calendar.currentMonth > 11) {
        calendar.currentMonth = 0;
        calendar.currentYear++;
    }
    renderCalendar();
}

// Render analytics charts
function renderAnalytics() {
    // Destroy existing charts to prevent memory leaks
    if (charts.completionChart) charts.completionChart.destroy();
    if (charts.priorityChart) charts.priorityChart.destroy();
    if (charts.statusChart) charts.statusChart.destroy();
    if (charts.trendChart) charts.trendChart.destroy();
    
    // Set active period button
    [periodWeekBtn, periodMonthBtn, periodYearBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (charts.currentPeriod === 'week') periodWeekBtn.classList.add('active');
    if (charts.currentPeriod === 'month') periodMonthBtn.classList.add('active');
    if (charts.currentPeriod === 'year') periodYearBtn.classList.add('active');
    
    // Prepare data
    const completedTasks = tasks.filter(task => task.completed || task.status === 'done');
    const pendingTasks = tasks.filter(task => !task.completed && task.status !== 'done');
    
    // Task completion rate chart
    const completionData = {
        labels: ['Completed', 'Pending'],
        datasets: [{
            data: [completedTasks.length, pendingTasks.length],
            backgroundColor: [secondaryColor, warningColor],
            borderWidth: 0
        }]
    };
    
    charts.completionChart = new Chart(completionChartCanvas, {
        type: 'doughnut',
        data: completionData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
    
    // Task distribution by priority chart
    const highPriority = tasks.filter(task => task.priority === 'high').length;
    const mediumPriority = tasks.filter(task => task.priority === 'medium').length;
    const lowPriority = tasks.filter(task => task.priority === 'low').length;
    
    const priorityData = {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
            label: 'Tasks by Priority',
            data: [highPriority, mediumPriority, lowPriority],
            backgroundColor: ['#e74c3c', '#f39c12', '#2ecc71'],
            borderWidth: 0
        }]
    };
    
    charts.priorityChart = new Chart(priorityChartCanvas, {
        type: 'bar',
        data: priorityData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
    
    // Task status breakdown chart
    const todoCount = tasks.filter(task => task.status === 'todo' || (!task.status && !task.completed)).length;
    const inProgressCount = tasks.filter(task => task.status === 'inprogress').length;
    const doneCount = tasks.filter(task => task.status === 'done' || (!task.status && task.completed)).length;
    
            const statusData = {
                labels: ['To Do', 'In Progress', 'Done'],
                datasets: [{
                    label: 'Tasks by Status',
                    data: [todoCount, inProgressCount, doneCount],
                    backgroundColor: ['#f8d7da', '#fff3cd', '#d4edda'],
                    borderColor: ['#721c24', '#856404', '#155724'],
                    borderWidth: 1
                }]
            };
            
            charts.statusChart = new Chart(statusChartCanvas, {
                type: 'pie',
                data: statusData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            
            // Productivity trends chart (tasks completed over time)
            // Group by relevant period
            let dateLabels = [];
            let completedData = [];
            
            if (charts.currentPeriod === 'week') {
                // Last 7 days
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dateStr = date.toISOString().split('T')[0];
                    dateLabels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
                    
                    const completedOnDay = completedTasks.filter(task => {
                        const updatedDate = new Date(task.updatedAt);
                        return updatedDate.toISOString().split('T')[0] === dateStr;
                    }).length;
                    
                    completedData.push(completedOnDay);
                }
            } else if (charts.currentPeriod === 'month') {
                // Last 4 weeks
                for (let i = 3; i >= 0; i--) {
                    const weekStart = new Date();
                    weekStart.setDate(weekStart.getDate() - (i * 7) - weekStart.getDay());
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekEnd.getDate() + 6);
                    
                    const weekLabel = `${weekStart.getDate()}/${weekStart.getMonth() + 1} - ${weekEnd.getDate()}/${weekEnd.getMonth() + 1}`;
                    dateLabels.push(weekLabel);
                    
                    const completedInWeek = completedTasks.filter(task => {
                        const updatedDate = new Date(task.updatedAt);
                        return updatedDate >= weekStart && updatedDate <= weekEnd;
                    }).length;
                    
                    completedData.push(completedInWeek);
                }
            } else {
                // Last 12 months
                for (let i = 11; i >= 0; i--) {
                    const date = new Date();
                    date.setMonth(date.getMonth() - i);
                    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
                    dateLabels.push(monthName);
                    
                    const month = date.getMonth();
                    const year = date.getFullYear();
                    
                    const completedInMonth = completedTasks.filter(task => {
                        const updatedDate = new Date(task.updatedAt);
                        return updatedDate.getMonth() === month && updatedDate.getFullYear() === year;
                    }).length;
                    
                    completedData.push(completedInMonth);
                }
            }
            
            const trendData = {
                labels: dateLabels,
                datasets: [{
                    label: 'Tasks Completed',
                    data: completedData,
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            };
            
            charts.trendChart = new Chart(trendChartCanvas, {
                type: 'line',
                data: trendData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            }
                        }
                    }
                }
            });
        }
        
        // Change analytics period
        function changeAnalyticsPeriod(period) {
            charts.currentPeriod = period;
            renderAnalytics();
        }
        
        // Load tasks into Pomodoro selector
        function loadTasksIntoPomodoro() {
            pomodoroTaskSelect.innerHTML = '<option value="">-- Select a task --</option>';
            
            const activeTasks = tasks.filter(task => !task.completed && task.status !== 'done');
            activeTasks.forEach(task => {
                const option = document.createElement('option');
                option.value = task.id;
                option.textContent = task.title;
                pomodoroTaskSelect.appendChild(option);
            });
        }
        
        // Start Pomodoro timer
        function startTimer() {
            if (pomodoroState.isRunning) return;
            
            pomodoroState.isRunning = true;
            startTimerBtn.disabled = true;
            pauseTimerBtn.disabled = false;
            
            pomodoroState.timerInterval = setInterval(() => {
                if (pomodoroState.seconds > 0) {
                    pomodoroState.seconds--;
                } else if (pomodoroState.minutes > 0) {
                    pomodoroState.minutes--;
                    pomodoroState.seconds = 59;
                } else {
                    // Timer complete
                    clearInterval(pomodoroState.timerInterval);
                    pomodoroState.isRunning = false;
                    
                    // Play notification sound
                    try {
                        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/933/933-preview.mp3');
                        audio.play();
                    } catch (e) {
                        console.log('Could not play notification sound');
                    }
                    
                    // Show browser notification if possible
                    if ('Notification' in window) {
                        if (Notification.permission === 'granted') {
                            new Notification('Pomodoro Timer Complete', {
                                body: 'Time for a break!',
                                icon: 'https://img.icons8.com/color/48/000000/tomato.png'
                            });
                        } else if (Notification.permission !== 'denied') {
                            Notification.requestPermission().then(permission => {
                                if (permission === 'granted') {
                                    new Notification('Pomodoro Timer Complete', {
                                        body: 'Time for a break!',
                                        icon: 'https://img.icons8.com/color/48/000000/tomato.png'
                                    });
                                } else {
                                    alert('Pomodoro Timer Complete! Time for a break!');
                                }
                            });
                        } else {
                            alert('Pomodoro Timer Complete! Time for a break!');
                        }
                    }
                    
                    
                    // If this was a pomodoro (not a break), increment counter
                    if (pomodoroState.timerType === 'pomodoro') {
                        pomodoroState.completedPomodoros++;
                        pomodoroCountElement.textContent = `Completed Pomodoros: ${pomodoroState.completedPomodoros}`;
                    }
                    
                    startTimerBtn.disabled = false;
                    pauseTimerBtn.disabled = true;
                }
                
                updateTimerDisplay();
            }, 1000);
        }
        
        // Pause Pomodoro timer
        function pauseTimer() {
            clearInterval(pomodoroState.timerInterval);
            pomodoroState.isRunning = false;
            startTimerBtn.disabled = false;
            pauseTimerBtn.disabled = true;
        }
        
        // Reset Pomodoro timer
        function resetTimer() {
            clearInterval(pomodoroState.timerInterval);
            setTimerMode(pomodoroState.timerType, 
                pomodoroState.timerType === 'pomodoro' ? 25 : 
                pomodoroState.timerType === 'shortBreak' ? 1 : 15);
            pomodoroState.isRunning = false;
            startTimerBtn.disabled = false;
            pauseTimerBtn.disabled = true;
        }
        
        // Set timer mode (pomodoro, short break, long break)
        function setTimerMode(mode, minutes) {
            pomodoroState.timerType = mode;
            pomodoroState.minutes = minutes;
            pomodoroState.seconds = 0;
            
            // Reset UI
            [pomodoroModeBtn, shortBreakBtn, longBreakBtn].forEach(btn => {
                btn.classList.remove('active');
            });
            
            if (mode === 'pomodoro') pomodoroModeBtn.classList.add('active');
            if (mode === 'shortBreak') shortBreakBtn.classList.add('active');
            if (mode === 'longBreak') longBreakBtn.classList.add('active');
            
            updateTimerDisplay();
            
            // If timer is running, stop it
            if (pomodoroState.isRunning) {
                pauseTimer();
            }
        }
        
        // Update timer display
        function updateTimerDisplay() {
            const minutesDisplay = String(pomodoroState.minutes).padStart(2, '0');
            const secondsDisplay = String(pomodoroState.seconds).padStart(2, '0');
            pomodoroTimer.textContent = `${minutesDisplay}:${secondsDisplay}`;
        }
        
        // Format date for display
        function formatDate(dateString) {
            if (!dateString) return 'No date';
            
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }
        
        // Capitalize first letter
        function capitalizeFirstLetter(string) {
            if (!string) return '';
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        
        // Get display name for status
        function getStatusDisplayName(status) {
            switch (status) {
                case 'todo': return 'To Do';
                case 'inprogress': return 'In Progress';
                case 'done': return 'Done';
                default: return status ? capitalizeFirstLetter(status) : 'Unknown';
            }
        }
        
        // Show alert message
        function showAlert(element, message, type) {
            element.innerHTML = `
                <div class="alert alert-${type}">
                    ${message}
                    <button class="alert-close">&times;</button>
                </div>
            `;
            
            const closeBtn = element.querySelector('.alert-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    element.innerHTML = '';
                });
            }
            
            setTimeout(() => {
                if (element.querySelector('.alert')) {
                    element.innerHTML = '';
                }
            }, 5000);
        }
        
        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);