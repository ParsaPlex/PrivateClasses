document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('speakingGrid');
    const topicFilter = document.getElementById('topicFilter');
    const levelFilter = document.getElementById('levelFilter');
    const searchInput = document.getElementById('speakingSearch');
    
    const modal = document.getElementById('practiceModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    let activeTimer = null;
    let timerSeconds = 120; // 2 minutes default for IELTS speaking part 2

    // Populate Dynamic Topic Filter Options
    const uniqueTopics = [...new Set(practiceData.speaking.map(item => item.topic))];
    uniqueTopics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicFilter.appendChild(option);
    });

    // Render Cards Function
    function renderCards() {
        grid.innerHTML = '';
        const searchVal = searchInput.value.toLowerCase();
        const selectedTopic = topicFilter.value;
        const selectedLevel = levelFilter.value;

        const filtered = practiceData.speaking.filter(item => {
            const matchesSearch = item.prompt.toLowerCase().includes(searchVal) || item.topic.toLowerCase().includes(searchVal);
            const matchesTopic = selectedTopic === 'all' || item.topic === selectedTopic;
            const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;
            return matchesSearch && matchesTopic && matchesLevel;
        });

        filtered.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'glass-card practice-card';
            cardEl.innerHTML = `
                <div class="card-header">
                    <span class="card-topic">${card.topic}</span>
                    <span class="card-level">${card.level}</span>
                </div>
                <h3>Describe ${card.topic}</h3>
                <p>${card.prompt.substring(0, 110)}...</p>
            `;
            cardEl.addEventListener('click', () => openModal(card));
            grid.appendChild(cardEl);
        });
    }

    // Modal Control Functions
    function openModal(card) {
        document.getElementById('modalTopic').textContent = card.topic + ' - Level ' + card.level;
        document.getElementById('modalTitle').textContent = `Practice Topic: ${card.topic}`;
        document.getElementById('modalPrompt').textContent = card.prompt;
        
        const vocabContainer = document.getElementById('modalVocabulary');
        vocabContainer.innerHTML = '';
        card.vocabulary.forEach(vocab => {
            const li = document.createElement('li');
            li.textContent = vocab;
            vocabContainer.appendChild(li);
        });

        resetTimerLogic();
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        clearInterval(activeTimer);
    }

    // Timer Logic
    const timerDisplay = document.getElementById('timerDisplay');
    const startTimerBtn = document.getElementById('startTimer');
    const resetTimerBtn = document.getElementById('resetTimer');
    const progressBar = document.getElementById('timerProgress');

    function resetTimerLogic() {
        clearInterval(activeTimer);
        timerSeconds = 120;
        timerDisplay.textContent = "02:00";
        progressBar.style.width = "100%";
        startTimerBtn.textContent = "Start";
        activeTimer = null;
    }

    startTimerBtn.addEventListener('click', () => {
        if (activeTimer) {
            clearInterval(activeTimer);
            activeTimer = null;
            startTimerBtn.textContent = "Resume";
        } else {
            startTimerBtn.textContent = "Pause";
            activeTimer = setInterval(() => {
                timerSeconds--;
                let mins = Math.floor(timerSeconds / 60);
                let secs = timerSeconds % 60;
                timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                
                let progressPercent = (timerSeconds / 120) * 100;
                progressBar.style.width = `${progressPercent}%`;

                if (timerSeconds <= 0) {
                    clearInterval(activeTimer);
                    timerDisplay.textContent = "Finished!";
                    startTimerBtn.textContent = "Start";
                }
            }, 1000);
        }
    });

    resetTimerBtn.addEventListener('click', resetTimerLogic);

    // Event Listeners for Filters
    topicFilter.addEventListener('change', renderCards);
    levelFilter.addEventListener('change', renderCards);
    searchInput.addEventListener('input', renderCards);
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Initial load
    renderCards();
});
