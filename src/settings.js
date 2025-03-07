import { resetTimer } from './timer.js';

export function getSettings() {
    return {
        workDuration: 25,
        breakDuration: 5,
        longBreakDuration: 15
    };
}

export function saveSettings(workDuration, breakDuration, longBreakDuration) {
    localStorage.setItem('workDuration', workDuration);
    localStorage.setItem('breakDuration', breakDuration);
    localStorage.setItem('longBreakDuration', longBreakDuration);
}

export function loadSettings() {
    return {
        workDuration: localStorage.getItem('workDuration') || 25,
        breakDuration: localStorage.getItem('breakDuration') || 5,
        longBreakDuration: localStorage.getItem('longBreakDuration') || 15
    };
}
