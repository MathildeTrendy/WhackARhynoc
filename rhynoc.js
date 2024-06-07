let rhynocPosition;
let sparxPosition;
let babyPosition;
let greenGemPosition;
let goldGemPosition;
let redGemPosition;
let score = 0;
let gameOver = false;
let rhynocSpeed = 1000;
let friendsSpeed = 1000;
let gemSpeed = {
    greenGem: 5000,
    redGem: 6000,
    goldGem: 7000
};


// Start count
let goldGemCounter = 0;
let greenGemCounter = 0;
let redGemCounter = 0;

let gemClickCounts = {};

window.onload = function() {
    document.getElementById('myModal').style.display = "block";
};

function startGame() {
    document.getElementById('myModal').style.display = "none"; // Hide the modal
    setGame(); // Start the game
}

function setGame() {
    let portalPositions = [];
    for (let i = 0; i < 9; i++) {
        portalPositions.push(i);
    }

    mergeSort(portalPositions, compareGemTypes);

    for (let i = 0; i < 9; i++) {
        let portal = document.createElement("div");
        portal.id = portalPositions[i].toString();
        portal.addEventListener("click", selectPortal);
        document.getElementById("board").appendChild(portal);
    }

    setRhynoc();

    setInterval(setRhynoc, rhynocSpeed);
    setInterval(setSparx, friendsSpeed);
    setInterval(setBaby, friendsSpeed);
    setInterval(() => setGenericGems('greenGem'), gemSpeed.greenGem);
    setInterval(() => setGenericGems('redGem'), gemSpeed.redGem);
    setInterval(() => setGenericGems('goldGem'), gemSpeed.goldGem);
}

function mergeSort(arr, compareFunc) {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left, compareFunc), mergeSort(right, compareFunc), compareFunc);
}

function merge(left, right, compareFunc) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (compareFunc(left[leftIndex], right[rightIndex]) <= 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}


function compareGemTypes(portalPos1, portalPos2) {
    // Extract gem type from tile position
    let gemType1 = getGemType(portalPos1);
    let gemType2 = getGemType(portalPos2);
    let gemTypeOrder = { "greenGem": 1, "redGem": 2, "goldGem": 3 };
    return gemTypeOrder[gemType1] - gemTypeOrder[gemType2];
}


function getGemType(portalPos) {
    if (portalPos === greenGemPosition?.id) {
        return "greenGem";
    } else if (portalPos === redGemPosition?.id) {
        return "redGem";
    } else if (portalPos === goldGemPosition?.id) {
        return "goldGem";
    }
    return "";
}

function getRandomPortal() {
    let availablePortals = [];
    for (let i = 0; i < 9; i++) {
        let portal = document.getElementById(i.toString());
        // Check if the portal does not contain any elements
        if (!portal.querySelector('.rhynoc') && !portal.querySelector('.sparx')
            && !portal.querySelector('.baby') && !portal.querySelector('.greenGem') &&
            !portal.querySelector('.redGem') && !portal.querySelector('.goldGem')) {
            availablePortals.push(i.toString()); // Add the portal position to availablePortals array
        }
    }
    if (availablePortals.length > 0) {
        return availablePortals[Math.floor(Math.random() * availablePortals.length)];
    } else {
        return null;
    }
}


function setRhynoc() {
    if (gameOver) {
        return;
    }
    if (rhynocPosition) {
        rhynocPosition.innerHTML = "";
    }
    let rhynoc = document.createElement("img");
    rhynoc.src = "./img/rhynoc.png";
    rhynoc.classList.add("rhynoc");

    let num = getRandomPortal();

    while (sparxPosition && sparxPosition.id === num ||
    babyPosition && babyPosition.id === num ||
    (greenGemPosition && greenGemPosition.id === num) ||
    (redGemPosition && redGemPosition.id === num) ||
    (goldGemPosition && goldGemPosition.id === num)) {
        num = getRandomPortal();
    }
    rhynocPosition = document.getElementById(num);
    rhynocPosition.appendChild(rhynoc);
}

function setSparx() {
    if (gameOver) {
        return;
    }
    if (sparxPosition) {
        sparxPosition.innerHTML = "";
    }
    let sparx = document.createElement("img");
    sparx.src = "./img/sparx.png";
    sparx.classList.add("sparx");

    let num = getRandomPortal();

    while (rhynocPosition && rhynocPosition.id === num ||
    babyPosition && babyPosition.id === num ||
    (greenGemPosition && greenGemPosition.id === num) ||
    (redGemPosition && redGemPosition.id === num) ||
    (goldGemPosition && goldGemPosition.id === num)) {
        num = getRandomPortal();
    }
    sparxPosition = document.getElementById(num);
    sparxPosition.appendChild(sparx);
}

function setBaby() {
    if (gameOver) {
        return;
    }
    if (babyPosition) {
        babyPosition.innerHTML = "";
    }
    let baby = document.createElement("img");
    baby.src = "./img/baby.png";
    baby.classList.add("baby");

    let num = getRandomPortal();

    while (rhynocPosition && rhynocPosition.id === num ||
    sparxPosition && sparxPosition.id === num ||
    (greenGemPosition && greenGemPosition.id === num) ||
    (redGemPosition && redGemPosition.id === num) ||
    (goldGemPosition && goldGemPosition.id === num)) {
        num = getRandomPortal();
    }
    babyPosition = document.getElementById(num);
    babyPosition.appendChild(baby);
}

function setGenericGems(gemType) {
    if (gameOver) {
        return;
    }

    if (gemType === "greenGem" && greenGemPosition) {
        greenGemPosition.innerHTML = "";
    } else if (gemType === "redGem" && redGemPosition) {
        redGemPosition.innerHTML = "";
    } else if (gemType === "goldGem" && goldGemPosition) {
        goldGemPosition.innerHTML = "";
    }

    if (gemType === "goldGem") {
        setTimeout(() => {
            let gem = document.createElement("img");
            gem.src = `./img/${gemType}.png`;
            gem.classList.add(gemType);

            let num = getRandomPortal();

            let portal = document.getElementById(num);
            portal.appendChild(gem);

            goldGemPosition = portal;
        }, 3000);
    } else {
        let gem = document.createElement("img");
        gem.src = `./img/${gemType}.png`;
        gem.classList.add(gemType);

        let num = getRandomPortal();

        let portal = document.getElementById(num);
        portal.appendChild(gem);

        if (gemType === "greenGem") {
            greenGemPosition = portal;
        } else if (gemType === "redGem") {
            redGemPosition = portal;
        }
    }
}

let lastGemsCollected = [];

function selectPortal() {
    if (gameOver) {
        return;
    }

    if (this === greenGemPosition && greenGemPosition) {
        score += 2;
        greenGemCounter++;
        greenGemPosition.innerHTML = "";
        greenGemPosition = null;
        gemClickCounts.greenGem++;
    } else if (this === redGemPosition && redGemPosition) {
        score += 3;
        redGemCounter++;
        redGemPosition.innerHTML = "";
        redGemPosition = null;
        gemClickCounts.redGem++;
    } else if (this === goldGemPosition && goldGemPosition && goldGemPosition.querySelector('.goldGem')) {
        score += 4;
        goldGemCounter++;
        goldGemPosition.innerHTML = "";
        goldGemPosition = null;
        gemClickCounts.goldGem++;
    } else if (this === rhynocPosition && rhynocPosition) {
        score += 10;
    } else if (this === sparxPosition && sparxPosition) {
        removeRandomGem();
    } else if (this === babyPosition && babyPosition) {
        gameOver = true;
        let totalGems = greenGemCounter + redGemCounter + goldGemCounter;
        let message = `Game Over!\nTotal Score: ${score}\nTotal Gems: ${totalGems}`;
        displayGameOverModal(message);
        return;
    } else {
        return;
    }
    if (this === greenGemPosition && lastGemsCollected.length === 2 && lastGemsCollected[0] === "redGem" && lastGemsCollected[1] === "goldGem") {
        score += 50;
    }

    lastGemsCollected.push(getGemType(this));
    if (lastGemsCollected.length > 2) {
        lastGemsCollected.shift();
    }

    this.innerHTML = "";
    updateScore();
    updateGemCounts();
}




function removeRandomGem() {
    let randomNumber = Math.random();
    let removedGemType;

    if (randomNumber < 0.33 && greenGemCounter > 0) {
        removedGemType = 'greenGem';
        greenGemCounter--;
    } else if (randomNumber < 0.66 && redGemCounter > 0) {
        removedGemType = 'redGem';
        redGemCounter--;
    } else if (goldGemCounter > 0) {
        removedGemType = 'goldGem';
        goldGemCounter--;
    } else {
        return;
    }

    let portalToRemoveGem = getRandomPortalWithGemType(removedGemType);
    if (portalToRemoveGem) {
        portalToRemoveGem.innerHTML = "";
    }
}

function getRandomPortalWithGemType(gemType) {
    let portalWithGem = [];

    for (let i = 0; i < 9; i++) {
        let portal = document.getElementById(i.toString());
        if (portal.querySelector(`.${gemType}`)) {
            portalWithGem.push(portal);
        }
    }
    if (portalWithGem.length > 0) {
        return portalWithGem[Math.floor(Math.random() * portalWithGem.length)];
    } else {
        return null;
    }
}

function updateScore() {
    let scoreElement = document.getElementById("score");
    if (scoreElement) {
        scoreElement.innerText = "Score: " + score;
    }
}

function updateGemCounts() {
    document.getElementById("green-gem-count").innerText = "Green Gems: " + greenGemCounter;
    document.getElementById("red-gem-count").innerText = "Red Gems: " + redGemCounter;
    document.getElementById("gold-gem-count").innerText = "Gold Gems: " + goldGemCounter;

    displayGemClickCounts();
}

function displayGemClickCounts() {
    let gemClickList = document.getElementById("gem-click-list");
    if (gemClickList) {
        gemClickList.innerHTML = "";
        for (let gemType in gemClickCounts) {
            let listItem = document.createElement("li");
            listItem.textContent = `${gemType}: ${gemClickCounts[gemType]}`;
            gemClickList.appendChild(listItem);
        }
    }
}

function displayGameOverModal(message) {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${message}</h2>
            <button id="retryButton">Retry</button>
        </div>
    `;
    document.getElementById('game-container').appendChild(modal);


    let retryButton = document.getElementById('retryButton');
    retryButton.addEventListener('click', function() {
        location.reload();
    });


    modal.style.display = "block";
}



