import { getSettings } from './settings.js';
import { updateUI, updateMode, updateSessionCount } from './ui.js';

export class Timer {
    constructor() {
        this.timeRemaining = 25 * 60;
        this.isRunning = false;
        this.isBreakTime = false;
        this.isLongBreak = false;
        this.sessionCount = 0;
        this.interval = null;
    }

    playNotification() {
        const audio = new Audio('./sound/iphone.mp3');
        audio.play().catch(() => {
            alert('Time is up!');
        });
    }

    setTime(seconds) {
        this.timeRemaining = seconds;
        this.pause();
        updateUI(this.timeRemaining);
    }

    setMode(mode) {
        this.pause();
        switch(mode) {
            case 'Work':
                this.timeRemaining = 25 * 60;
                this.isBreakTime = false;
                this.isLongBreak = false;
                break;
            case 'Short Break':
                this.timeRemaining = 5 * 60;
                this.isBreakTime = true;
                this.isLongBreak = false;
                break;
            case 'Long Break':
                this.timeRemaining = 15 * 60;
                this.isBreakTime = true;
                this.isLongBreak = true;
                break;
        }
        updateUI(this.timeRemaining);
        updateMode(mode);
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.interval);
    }

    reset() {
        this.pause();
        this.timeRemaining = 25 * 60;
        this.isBreakTime = false;
        this.isLongBreak = false;
        this.sessionCount = 0;
        updateUI(this.timeRemaining);
        updateMode('Work');
        updateSessionCount(this.sessionCount);
    }

  tick() {
        if (this.timeRemaining > 0) {
            this.timeRemaining--;
            updateUI(this.timeRemaining);
        } else {
            this.switchMode();
        }
    }

    switchMode() {
        this.pause();
        this.playNotification(); 

        if (this.isBreakTime) {
            this.isBreakTime = false;
            this.isLongBreak = false;
            this.timeRemaining = 25 * 60;
            updateMode('Work');
        } else {
            this.sessionCount++;
            this.isBreakTime = true;
            if (this.sessionCount % 4 === 0) {
                this.isLongBreak = true;
                this.timeRemaining = 15 * 60;
                updateMode('Long Break');
            } else {
                this.timeRemaining = 5 * 60;
                updateMode('Short Break');
            }
            updateSessionCount(this.sessionCount);
        }

        updateUI(this.timeRemaining);
        this.start();
    }
}
