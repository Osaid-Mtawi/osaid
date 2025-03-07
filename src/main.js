import './styles.css';  
import { Timer } from './timer.js';
import { setupUI } from './ui.js';

class TaskManager {
    constructor() {
        this.tasks = [];
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('add-task-btn').addEventListener('click', () => this.addNewTask());
    }

    addNewTask() {
        const taskInput = document.createElement('div');
        taskInput.className = 'task-input';
        taskInput.innerHTML = `
            <input type="text" placeholder="What are you working on?" class="task-name-input">
            <div class="task-buttons">
                <button class="save-task">Save</button>
                <button class="cancel-task">Cancel</button>
            </div>
        `;

        const tasksList = document.getElementById('tasks-list');
        tasksList.appendChild(taskInput);

        const saveBtn = taskInput.querySelector('.save-task');
        const cancelBtn = taskInput.querySelector('.cancel-task');
        const input = taskInput.querySelector('.task-name-input');

        saveBtn.addEventListener('click', () => this.saveTask(input.value, taskInput));
        cancelBtn.addEventListener('click', () => taskInput.remove());
        input.focus();
    }

    saveTask(taskName, inputElement) {
        if (!taskName.trim()) {
            alert('Please enter a task name');
            return;
        }

        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox">
                <span class="task-name">${taskName}</span>
            </div>
            <button class="delete-task">×</button>
        `;

        inputElement.replaceWith(taskElement);

        taskElement.querySelector('.delete-task').addEventListener('click', () => {
            taskElement.remove();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const timer = new Timer();
    setupUI();

    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            switch(btn.dataset.mode) {
                case 'pomodoro':
                    timer.setMode('Work');
                    break;
                case 'short-break':
                    timer.setMode('Short Break');
                    break;
                case 'long-break':
                    timer.setMode('Long Break');
                    break;
            }
        });
    });

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        if (startBtn.textContent === 'START') {
            timer.start();
            startBtn.textContent = 'PAUSE';
        } else {
            timer.pause();
            startBtn.textContent = 'START';
        }
    });

    new TaskManager();
});