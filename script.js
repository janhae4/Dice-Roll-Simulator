let i = 1;
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".roll-btn");
    const dice = document.querySelector(".dice");
    const historyContainer = document.querySelector(".history-container-close");

    const createHistoryTitle = () => {
        if (!historyContainer.querySelector('.history-title')) {
            const titleDiv = document.createElement('div');
            titleDiv.className = 'history-title';
            titleDiv.innerHTML = `
                <h2>History</h2>
                <button type="button" class="btn close-btn"><span class="material-symbols-outlined rotate-icon">close</span></button>
            `;
            historyContainer.prepend(titleDiv);

            const closeBtn = titleDiv.querySelector('.close-btn');
            closeBtn.addEventListener("click", deleteHistory);
        }
    };

    const randomDice = () => {
        const random = Math.floor(Math.random() * 6 + 1);
        rollDice(random);
    };

    const updateHistory = (x, y) => {
        createHistoryTitle();
        
        const historyItem = document.createElement("div");
        historyItem.className = "roll-history";
        historyItem.innerHTML = `
            <h4>Roll ${i++}:</h4>
            <div class="small-dice" style="transform: rotateX(${x}deg) rotateY(${y}deg);">
                <div class="face front"></div>
                <div class="face back"></div>
                <div class="face top"></div>
                <div class="face bottom"></div>
                <div class="face left"></div>
                <div class="face right"></div>
           </div>
        `;
        
        const hr = document.createElement("hr");
        
        historyContainer.appendChild(historyItem);
        historyContainer.appendChild(hr);

        // Limit history items (e.g., keep only last 10 rolls)
        const maxItems = 10;
        const items = historyContainer.querySelectorAll('.roll-history');
        if (items.length > maxItems) {
            historyContainer.removeChild(items[0]);
            historyContainer.removeChild(historyContainer.querySelector('hr'));
        }
    };

    const rollDice = random => {
        dice.style.animation = 'rolling 2s';
        historyContainer.classList.remove("history-container-close");
        historyContainer.classList.add("history-container");
        
        setTimeout(() => {
            dice.style.animation = 'none';
            switch (random) {
                case 1:
                    dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    updateHistory(0, 0);
                    break;
                case 6:
                    dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                    updateHistory(180, 0);
                    break;
                case 2:
                    dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                    updateHistory(-90, 0);
                    break;
                case 5:
                    dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                    updateHistory(90, 0);
                    break;
                case 3:
                    dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                    updateHistory(0, 90);
                    break;
                case 4:
                    dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                    updateHistory(0, -90);
                    break;
            }
        }, 400);
    };

    const deleteHistory = () => {
        historyContainer.innerHTML = '';
        historyContainer.classList.remove("history-container");
        historyContainer.classList.add("history-container-close");
        i = 1; // Reset roll counter
    };

    btn.addEventListener("click", randomDice);
});