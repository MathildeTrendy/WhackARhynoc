let currRhynocTile;
let currSparxTile;
let currBabyTile;
let currGemTile;
let currGoldGemTile;
let currRedGemTile;
let score = 0;
let gameOver = false;
let rhynocInterval = 1000; // Initial interval for Rhynoc movement
let friendsInterval = 1000; // Initial interval for friends movement
let gemInterval = 5000; // Initial interval for gem
let gemIntervals = {
    gem: 5000,     // Interval for regular gems
    redGem: 6000,  // Interval for red gems
    goldGem: 7000  // Interval for gold gems
};


// Counters for each type of gem
let goldGemCounter = 0;
let gemCounter = 0;
let redGemCounter = 0;

let gemClickCounts = {};

window.onload = function() {
    document.getElementById('myModal').style.display = "block"; // Display the modal when the window loads
};

function startGame() {
    document.getElementById('myModal').style.display = "none"; // Hide the modal
    setGame(); // Start the game
}

function setGame() {
    // Create an array of tile positions
    let tilePositions = [];
    for (let i = 0; i < 9; i++) {
        tilePositions.push(i);
    }

    // Sort the tile positions using Merge Sort (algorithm) based on gem type
    mergeSort(tilePositions, compareGemTypes);

    // Set up the grid in HTML using the sorted tile positions
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = tilePositions[i].toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    // Set the initial rhynoc without delay
    setRhynoc();

    // Set intervals for Rhynoc, Sparx, Baby, and gem
    setInterval(setRhynoc, rhynocInterval);
    setInterval(setSparx, friendsInterval);
    setInterval(setBaby, friendsInterval);
    // Set intervals for gem generation
    setInterval(() => setGenericGem('gem'), gemIntervals.gem);
    setInterval(() => setGenericGem('redGem'), gemIntervals.redGem);
    setInterval(() => setGenericGem('goldGem'), gemIntervals.goldGem);
}

// Merge Sort algorithm to sort tile positions based on gem type
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

// Comparator function to compare gem types
function compareGemTypes(tilePos1, tilePos2) {
    // Extract gem type from tile position
    let gemType1 = getGemType(tilePos1);
    let gemType2 = getGemType(tilePos2);
    // Assign numerical values to gem types for sorting
    let gemTypeOrder = { "gem": 1, "redGem": 2, "goldGem": 3 };
    return gemTypeOrder[gemType1] - gemTypeOrder[gemType2];
}

// Function to get gem type from tile position
function getGemType(tilePos) {
    // Check if the tile position matches any of the gem types
    if (tilePos === currGemTile?.id) {
        return "gem";
    } else if (tilePos === currRedGemTile?.id) {
        return "redGem";
    } else if (tilePos === currGoldGemTile?.id) {
        return "goldGem";
    }
    return ""; // Default case if no match is found
}

function getRandomTile() {
    let availableTiles = []; // Array to store available tile positions
    for (let i = 0; i < 9; i++) {
        let tile = document.getElementById(i.toString());
        // Check if the tile does not contain any elements
        if (!tile.querySelector('.rhynoc') && !tile.querySelector('.sparx') && !tile.querySelector('.baby') && !tile.querySelector('.gem') && !tile.querySelector('.redGem') && !tile.querySelector('.goldGem')) {
            availableTiles.push(i.toString()); // Add the tile position to availableTiles array
        }
    }
    // If there are available tiles, return a random tile position from the availableTiles array
    if (availableTiles.length > 0) {
        return availableTiles[Math.floor(Math.random() * availableTiles.length)];
    } else {
        return null; // Return null if there are no available tiles
    }
}


function setRhynoc() {
    if (gameOver) {
        return;
    }
    if (currRhynocTile) {
        currRhynocTile.innerHTML = "";
    }
    let rhynoc = document.createElement("img");
    rhynoc.src = "./img/rhynoc.png";
    rhynoc.classList.add("rhynoc");

    let num = getRandomTile();
    // Check for duplication with sparx, baby, and gems
    while (currSparxTile && currSparxTile.id === num ||
    currBabyTile && currBabyTile.id === num ||
    (currGemTile && currGemTile.id === num) ||
    (currRedGemTile && currRedGemTile.id === num) ||
    (currGoldGemTile && currGoldGemTile.id === num)) {
        num = getRandomTile();
    }
    currRhynocTile = document.getElementById(num);
    currRhynocTile.appendChild(rhynoc);
}

function setSparx() {
    if (gameOver) {
        return;
    }
    if (currSparxTile) {
        currSparxTile.innerHTML = "";
    }
    let sparx = document.createElement("img");
    sparx.src = "./img/sparx.png";
    sparx.classList.add("sparx");

    let num = getRandomTile();
    // Check for duplication with rhynoc, baby, and gems
    while (currRhynocTile && currRhynocTile.id === num ||
    currBabyTile && currBabyTile.id === num ||
    (currGemTile && currGemTile.id === num) ||
    (currRedGemTile && currRedGemTile.id === num) ||
    (currGoldGemTile && currGoldGemTile.id === num)) {
        num = getRandomTile();
    }
    currSparxTile = document.getElementById(num);
    currSparxTile.appendChild(sparx);
}

function setBaby() {
    if (gameOver) {
        return;
    }
    if (currBabyTile) {
        currBabyTile.innerHTML = "";
    }
    let baby = document.createElement("img");
    baby.src = "./img/baby.png";
    baby.classList.add("baby");

    let num = getRandomTile();
    // Check for duplication with rhynoc, sparx, and gems
    while (currRhynocTile && currRhynocTile.id === num ||
    currSparxTile && currSparxTile.id === num ||
    (currGemTile && currGemTile.id === num) ||
    (currRedGemTile && currRedGemTile.id === num) ||
    (currGoldGemTile && currGoldGemTile.id === num)) {
        num = getRandomTile();
    }
    currBabyTile = document.getElementById(num);
    currBabyTile.appendChild(baby);
}

// Function to set generic gem (gem, redGem, goldGem)
// Function to set generic gem (gem, redGem, goldGem)
function setGenericGem(gemType) {
    if (gameOver) {
        return;
    }

    // Clear the current tile of the specified gem type
    if (gemType === "gem" && currGemTile) {
        currGemTile.innerHTML = "";
    } else if (gemType === "redGem" && currRedGemTile) {
        currRedGemTile.innerHTML = "";
    } else if (gemType === "goldGem" && currGoldGemTile) {
        currGoldGemTile.innerHTML = "";
    }

    // Delay the appearance of the gold gem
    if (gemType === "goldGem") {
        setTimeout(() => {
            let gem = document.createElement("img");
            gem.src = `./img/${gemType}.png`; // Use the gemType to set the image source
            gem.classList.add(gemType);

            let num = getRandomTile(); // Get a random tile

            let tile = document.getElementById(num);
            tile.appendChild(gem);

            // Set the current tile variable based on gem type
            currGoldGemTile = tile;
        }, 3000); // Delay gold gem appearance by 3 seconds
    } else {
        // For other gem types, display immediately
        let gem = document.createElement("img");
        gem.src = `./img/${gemType}.png`; // Use the gemType to set the image source
        gem.classList.add(gemType);

        let num = getRandomTile(); // Get a random tile

        let tile = document.getElementById(num);
        tile.appendChild(gem);

        // Set the current tile variable based on gem type
        if (gemType === "gem") {
            currGemTile = tile;
        } else if (gemType === "redGem") {
            currRedGemTile = tile;
        }
    }
}




function selectTile() {
    if (gameOver) {
        return;
    }

    // Check if the clicked tile contains a gem
    if (this === currGemTile && currGemTile) {
        score += 2;
        gemCounter++;
        currGemTile.innerHTML = ""; // Clear gem tile after collecting it
        currGemTile = null;
        gemClickCounts.gem++; // Increment gem click count

        // Check if the condition for adding 50 points is met
        if (checkGemOrderForBonus()) {
            score += 50;
            updateScore(); // Update the score display after adding 50 points
        }
    } else if (this === currRedGemTile && currRedGemTile) {
        score += 3;
        redGemCounter++;
        currRedGemTile.innerHTML = ""; // Clear red gem tile
        currRedGemTile = null;
        gemClickCounts.redGem++; // Increment red gem click count
    } else if (this === currGoldGemTile && currGoldGemTile && currGoldGemTile.querySelector('.goldGem')) {
        score += 4;
        goldGemCounter++;
        currGoldGemTile.innerHTML = ""; // Clear gold gem tile after collecting it
        currGoldGemTile = null;
        gemClickCounts.goldGem++; // Increment gold gem click count
    } else if (this === currRhynocTile && currRhynocTile) {
        score += 10; // Add 10 points when Rhynoc is hit
    } else if (this === currSparxTile && currSparxTile) {
        // Remove one gem from the list when Sparx is hit
        removeGemFromList();
        this.innerHTML = ""; // Clear the clicked tile
    } else if (this === currBabyTile && currBabyTile) {
        // End the game when Baby is hit
        gameOver = true;
        alert("Game Over!");
        return;
    } else {
        // If the clicked tile doesn't contain a gem or enemy, do nothing
        return;
    }

    updateScore(); // Update the score display
    updateGemCounts(); // Update gem counts after each click
}


function checkGemOrderForBonus() {
    // Check if the player has collected a red gem, followed by a gold gem, and then a regular gem in this order
    return redGemCounter >= 1 && goldGemCounter >= 1 && gemCounter >= 1;
}

function removeGemFromList() {
    // Determine which gem type to remove based on the gem counters
    let gemToRemove;
    if (redGemCounter > 0) {
        gemToRemove = 'redGem';
    } else if (goldGemCounter > 0) {
        gemToRemove = 'goldGem';
    } else if (gemCounter > 0) {
        gemToRemove = 'gem';
    } else {
        return; // No gem to remove
    }

    // Decrement the corresponding gem counter
    switch (gemToRemove) {
        case 'redGem':
            redGemCounter--;
            break;
        case 'goldGem':
            goldGemCounter--;
            break;
        case 'gem':
            gemCounter--;
            break;
    }

    // Update the gem counts display
    updateGemCounts();
}




function updateScore() {
    let scoreElement = document.getElementById("score");
    if (scoreElement) {
        scoreElement.innerText = "Score: " + score;
    }
}

function updateGemCounts() {
    document.getElementById("gem-count").innerText = "Gems: " + gemCounter;
    document.getElementById("red-gem-count").innerText = "Red Gems: " + redGemCounter;
    document.getElementById("gold-gem-count").innerText = "Gold Gems: " + goldGemCounter;

    // Display gem click counts
    displayGemClickCounts(); // Call the function to display gem click counts
}

// Function to display the gem click counts
function displayGemClickCounts() {
    let gemClickList = document.getElementById("gem-click-list");
    if (gemClickList) {
        gemClickList.innerHTML = ""; // Clear the list before updating
        for (let gemType in gemClickCounts) {
            let listItem = document.createElement("li");
            listItem.textContent = `${gemType}: ${gemClickCounts[gemType]}`;
            gemClickList.appendChild(listItem);
        }
    }
}



