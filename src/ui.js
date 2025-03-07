export function setupUI() {
    document.getElementById('timer-display').textContent = '25:00';
}

export function updateUI(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timer-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function updateSessionCount(count) {
    document.getElementById('session-count').textContent = `Session: ${count}/4`;
}

export function updateMode(mode) {
    document.getElementById('mode-display').textContent = mode;
    
    const root = document.documentElement;
    switch(mode) {
        case 'Short Break':
            root.style.setProperty('--current-color', 'var(--short-break-color)');
            break;
        case 'Long Break':
            root.style.setProperty('--current-color', 'var(--long-break-color)');
            break;
        default:
            root.style.setProperty('--current-color', 'var(--pomodoro-color)');
    }
}

export function setupControls(onStart, onPause, onReset) {
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        if (startBtn.textContent === 'START') {
            onStart();
            startBtn.textContent = 'PAUSE';
        } else {
            onPause();
            startBtn.textContent = 'START';
        }
    });

}

export function setupDurationInputs(onChange) {
    const inputs = ['work-duration', 'break-duration', 'long-break-duration'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('change', (e) => {
            const value = parseInt(e.target.value);
            if (value > 0 && value <= 60) {
                onChange();
            } else {
                alert('Please enter a duration between 1 and 60 minutes');
                e.target.value = id === 'work-duration' ? 25 : id === 'break-duration' ? 5 : 15;
            }
        });
    });
}