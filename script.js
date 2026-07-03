let isRunning = false;
let intervalId = null;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const videoFeed = document.getElementById('videoFeed');
const videoOverlay = document.getElementById('videoOverlay');
const objectCount = document.getElementById('objectCount');
const fpsDisplay = document.getElementById('fpsDisplay');
const statusText = document.getElementById('statusText');

// Start button
startBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            isRunning = true;
            startBtn.disabled = true;
            stopBtn.disabled = false;
            videoFeed.classList.add('active');
            videoOverlay.classList.add('hidden');
            statusText.textContent = 'Running';
            statusText.style.color = '#22c55e';
            
            // Start fetching frames
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(fetchFrame, 100);
        }
    } catch (error) {
        console.error('Error starting:', error);
        alert('Cannot access camera. Please check if camera is available.');
    }
});

// Stop button
stopBtn.addEventListener('click', async () => {
    await fetch('/api/stop', { method: 'POST' });
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(intervalId);
    intervalId = null;
    statusText.textContent = 'Stopped';
    statusText.style.color = '#ef4444';
    videoFeed.classList.remove('active');
    videoOverlay.classList.remove('hidden');
});

// Clear button
clearBtn.addEventListener('click', async () => {
    await fetch('/api/clear', { method: 'POST' });
    objectCount.textContent = '0';
});

// Fetch frame from server
async function fetchFrame() {
    try {
        const response = await fetch('/api/frame');
        const data = await response.json();
        
        if (data.image) {
            videoFeed.src = 'data:image/jpeg;base64,' + data.image;
            objectCount.textContent = data.count || 0;
            fpsDisplay.textContent = Math.round(data.fps || 0);
        }
    } catch (error) {
        console.error('Frame error:', error);
    }
}

// Check status on load
async function checkStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        if (data.processing) {
            startBtn.click();
        }
    } catch (error) {
        console.log('Status check failed');
    }
}

checkStatus();