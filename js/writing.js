document.addEventListener('DOMContentLoaded', () => {
    const writingList = document.getElementById('writingList');
    const letterFilter = document.getElementById('letterTypeFilter');
    const workspace = document.getElementById('writingWorkspace');
    
    const selectedType = document.getElementById('selectedLetterType');
    const selectedTopic = document.getElementById('selectedLetterTopic');
    const selectedPrompt = document.getElementById('selectedLetterPrompt');
    const textarea = document.getElementById('writingTextarea');
    const wordCounter = document.getElementById('wordCounter');
    
    // Timer Variables
    const timerDisplay = document.getElementById('writingTimerDisplay');
    const toggleTimerBtn = document.getElementById('toggleTimerBtn');
    let writingTimer = null;
    let timeRemaining = 1200; // 20 minutes in seconds

    // Render Side-bar List
    function renderSidebar() {
        writingList.innerHTML = '';
        const filterVal = letterFilter.value;

        const filtered = practiceData.writing.filter(item => {
            return filterVal === 'all' || item.type === filterVal;
        });

        filtered.forEach((item, index) => {
            const btn = document.createElement('div');
            btn.className = 'glass-card prompt-list-item';
            btn.innerHTML = `
                <span>${item.type} Letter</span>
                <h4>Topic ${item.id}</h4>
            `;
            btn.addEventListener('click', () => loadPrompt(item, btn));
            writingList.appendChild(btn);
            
            // Auto load first item
            if (index === 0) {
                loadPrompt(item, btn);
            }
        });
    }

    function loadPrompt(item, element) {
        // Manage active states
        document.querySelectorAll('.prompt-list-item').forEach(el => el.classList.remove('active'));
        element.classList.add('active');

        // Setup workspace
        workspace.style.display = 'block';
        selectedType.textContent = `${item.type} Letter`;
        selectedTopic.textContent = `IELTS Writing Challenge #${item.id}`;
        selectedPrompt.textContent = item.situation;
        
        // Reset Editor & Word Count
        textarea.value = '';
        wordCounter.textContent = '0';
        resetWritingTimer();
    }

    // Interactive Word Counter logic
    textarea.addEventListener('input', () => {
        const text = textarea.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        wordCounter.textContent = words;

        if (words >= 150) {
            wordCounter.style.color = '#10b981'; // Green color when requirement met
        } else {
            wordCounter.style.color = '';
        }
    });

    // 20-minute countdown logic
    function resetWritingTimer() {
        clearInterval(writingTimer);
        writingTimer = null;
        timeRemaining = 1200;
        timerDisplay.textContent = "20:00";
        timerDisplay.style.color = '';
        toggleTimerBtn.textContent = "Start Timer";
    }

    toggleTimerBtn.addEventListener('click', () => {
        if (writingTimer) {
            clearInterval(writingTimer);
            writingTimer = null;
            toggleTimerBtn.textContent = "Resume";
        } else {
            toggleTimerBtn.textContent = "Pause";
            writingTimer = setInterval(() => {
                timeRemaining--;
                let mins = Math.floor(timeRemaining / 60);
                let secs = timeRemaining % 60;
                timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

                if (timeRemaining <= 180) { // 3 minutes warning
                    timerDisplay.style.color = '#ef4444';
                }

                if (timeRemaining <= 0) {
                    clearInterval(writingTimer);
                    timerDisplay.textContent = "Time's Up!";
                }
            }, 1000);
        }
    });

    letterFilter.addEventListener('change', renderSidebar);
    
    // Initial Render
    renderSidebar();
});
