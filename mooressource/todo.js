const prompt = require('prompt-sync')({sigint:true});
let tasks = [];

const printList = () => {
    console.log("Your list: ");
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}

const length = prompt("How many things to do? ");
for (let i = 0; i < length; i++) {
    let task = prompt("Thing " + (i+1) + ": ");
    while (!task) {
        console.log("Invalid!");
        task = prompt("Thing " + (i+1) + ": ");
    }
    tasks.push(task);
}

printList();