const prompt = require('prompt-sync')({sigint:true});
const fs = require('fs');

let data;
try {
    data = JSON.parse(fs.readFileSync('arcade.json', 'utf8'));
} catch (err) {
    console.error("No JSON found...");
}

const highestScore = (array) => {
    if (array.length < 1) {
        return "None, yet!";
    } else {
        let highScore = 0;
        for (let i = 0; i < array.length; i++) {
            let currentScore = array[i];
            if (currentScore > highScore) highScore = currentScore;
        }
        return highScore;
    }
}

const printMachine = (machine) => {
    console.log(machine.title + " - " + machine.year + "\nHighest Score: " + highestScore(machine.highscores));
    if (machine.status !== "working") console.log("This machine is out of order!");
    console.log("-------------------------------");
}

const handleAdd = () => {
    let name = prompt("   Name of machine to add: ");
    while (!name) {
        console.log("[!]Invalid, name cannot be blank.");
        name = prompt("   Name of machine to add: ");
    }
    let release = parseInt(prompt("   When was the game released? (1970-2025): "));
    while ((release < 1970 || release > 2025) || !release) {
        console.log("[!]Invalid, year cannot be blank, or before 1970 or after 2025.");
        release = parseInt(prompt("   When was the game released? (1970-2025): "));
    }
    let machStatus = prompt("   Current status of machine ('working' or 'out of order'): ");
    while (machStatus !== 'working' && machStatus !== 'out of order') {
        console.log("[!]Invalid, must either be 'working' or 'out of order'");
        machStatus = prompt("   Current status of machine ('working' or 'out of order'): ");
    }
    let highscoresToAdd = [];
    let needToAdd = prompt("   Any known high scores? ('yes' or 'no'): ");
    while (needToAdd !== 'yes' && needToAdd !== 'no' && !needToAdd) {
        console.log("[!]Invalid, must either be 'yes' or 'no'");
        needToAdd = prompt("   Any known high scores? ('yes' or 'no'): ");
    }
    needToAdd = (needToAdd === 'yes');
    if (needToAdd) {
        let scores = prompt("   How many scores? (0-9): ");
        while (!(scores >= 0 && scores <= 9)) {
            console.log("[!]Invalid, range must be between 0 and 9 (inclusive).");
            scores = prompt("   How many scores? (0-9): ");
        }
        for (let i = 0; i < scores; i++) {
            highscoresToAdd.push(parseInt(prompt("   Score " + (i+1) + ": ")));
        }
        highscoresToAdd.sort((a, b) => b - a);

    } else {
        highscoresToAdd = [];
    }

    try{
        data.arcade.machines.push({
            title: name,
            year: release,
            status: machStatus,
            highscores: highscoresToAdd
        
        });
        fs.writeFileSync('arcade.json', JSON.stringify(data, null, 2), 'utf8');
        console.log(name + " added!");
    } catch (err) {
        console.error("[!]An unknown error has occured.");
    }
    console.log('***************************');
}

const handleRemove = () => {
    let found;
    const nameToRemove = prompt("What game to remove? ");
    for (let i = 0; i < data.arcade.machines.length; i++) {
        const currentName = data.arcade.machines[i].title;
        if (currentName == nameToRemove) {
            try {
                data.arcade.machines = data.arcade.machines.filter(machine => machine.title !== nameToRemove);
                fs.writeFileSync('arcade.json', JSON.stringify(data, null, 2), 'utf8');
                console.log(nameToRemove + " removed.");
                found = true;
                break;
            } catch (err) {
                console.error("[!]An unknown error occured.");
            }
        }
    }
    if (!found) console.log("[!]Game not found!");
    console.log('***************************');
}

const main = () => {

    if (data) {
        if (data.arcade.machines === 0) {
            console.error("No machines!");
            return;
        }
    }

    while(true) {
        action = prompt("Welcome to Voltagy Arcade! What would you like to do? (view, add, remove, quit): ");
        if (action.toLowerCase() == 'view') {
            console.log("All current machines:\n");
            for (let i = 0; i < data.arcade.machines.length; i++){
                const currentMachine = data.arcade.machines[i];
                printMachine(currentMachine);
            }
        } else if (action.toLowerCase() == 'add') {
            handleAdd();
        } else if (action.toLowerCase() == 'remove') {
            handleRemove();
        } else if (action.toLowerCase() == 'quit') {
            console.log("Goodbye!");
            break;
        } else {
            console.log("[!]Invalid command, must be the following: 'add', 'remove', 'view', 'quit'")
        }
    }
}



main();