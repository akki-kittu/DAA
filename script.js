// Mock data - in a real app, this would come from an API
const childData = {
    name: "Alex",
    age: 8,
    progress: {
        eye_contact: 65,
        verbal_response: 42,
        emotion_recognition: 58
    },
    currentSession: {
        scenario: "Classroom Introduction",
        duration: "12:45",
        difficulty: "3/5",
        status: "active"
    },
    sessions: [
        {
            date: "2023-11-20",
            scenario: "Classroom Introduction",
            duration: "15:22",
            performance: "72%",
            status: "success"
        },
        {
            date: "2023-11-18",
            scenario: "Playground Interaction",
            duration: "12:45",
            performance: "58%",
            status: "warning"
        },
        {
            date: "2023-11-15",
            scenario: "Store Checkout",
            duration: "08:30",
            performance: "41%",
            status: "warning"
        }
    ]
};

// DOM Elements
const sessionTable = document.getElementById('session-data');
const pauseBtn = document.getElementById('pause-btn');
const calmBtn = document.getElementById('calm-btn');
const hintBtn = document.getElementById('hint-btn');
const eyeContactProgress = document.getElementById('eye-contact-progress');
const verbalResponseProgress = document.getElementById('verbal-response-progress');
const eyeContactValue = document.getElementById('eye-contact-value');
const verbalResponseValue = document.getElementById('verbal-response-value');
const currentScenario = document.getElementById('current-scenario');
const sessionDuration = document.getElementById('session-duration');
const sessionDifficulty = document.getElementById('session-difficulty');

// Initialize Dashboard
function initDashboard() {
    // Update progress bars
    eyeContactProgress.style.width = `${childData.progress.eye_contact}%`;
    verbalResponseProgress.style.width = `${childData.progress.verbal_response}%`;
    eyeContactValue.textContent = `${childData.progress.eye_contact}%`;
    verbalResponseValue.textContent = `${childData.progress.verbal_response}%`;
    
    // Update current session
    currentScenario.textContent = childData.currentSession.scenario;
    sessionDuration.textContent = childData.currentSession.duration;
    sessionDifficulty.textContent = childData.currentSession.difficulty;
    
    // Populate session history
    sessionTable.innerHTML = childData.sessions.map(session => `
        <tr>
            <td>${session.date}</td>
            <td>${session.scenario}</td>
            <td>${session.duration}</td>
            <td>${session.performance}</td>
            <td>
                <span class="badge ${session.status === 'success' ? 'badge-success' : 'badge-warning'}">
                    ${session.status === 'success' ? 'Good' : 'Needs Work'}
                </span>
            </td>
        </tr>
    `).join('');
}

// VR Controls
pauseBtn.addEventListener('click', () => {
    alert("Session paused. Child can take a break.");
});

calmBtn.addEventListener('click', () => {
    alert("Calming protocol activated: Reducing stimuli...");
    // In a real app, this would trigger:
    // 1. Reduce VR environment brightness
    // 2. Play calming audio
    // 3. Notify therapist
});

hintBtn.addEventListener('click', () => {
    alert("Hint provided: 'Try looking at the person when speaking'");
    // In a real app, this would:
    // 1. Display visual hint in VR
    // 2. Highlight the avatar's face
});

// Simulate real-time updates
function simulateLiveData() {
    setInterval(() => {
        // Random small progress increases
        if (Math.random() > 0.7) {
            const currentWidth = parseFloat(eyeContactProgress.style.width);
            if (currentWidth < 100) {
                const newWidth = currentWidth + 0.5;
                eyeContactProgress.style.width = `${newWidth}%`;
                eyeContactValue.textContent = `${Math.round(newWidth)}%`;
            }
        }
        
        // Update session timer every minute
        const [mins, secs] = sessionDuration.textContent.split(':').map(Number);
        const newSecs = secs + 1;
        if (newSecs >= 60) {
            sessionDuration.textContent = `${mins + 1}:00`;
        } else {
            sessionDuration.textContent = `${mins}:${newSecs.toString().padStart(2, '0')}`;
        }
    }, 5000);
}

// Initialize VR connection (placeholder)
async function initVR() {
    try {
        if (navigator.xr) {
            const canvas = document.createElement('canvas');
            document.getElementById('vr-viewport').appendChild(canvas);
            
            // WebXR code would go here
            console.log("WebXR is available");
        } else {
            console.warn("WebXR not supported in this browser");
        }
    } catch (error) {
        console.error("VR initialization failed:", error);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    simulateLiveData();
    
    // Initialize VR if available
    initVR();
});

// API Integration Example (commented out)
/*
async function fetchProgressData() {
    try {
        const response = await fetch('https://your-api.com/progress/alex');
        const data = await response.json();
        updateDashboard(data);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}
*/