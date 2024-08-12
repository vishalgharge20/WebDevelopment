// let maxNum = parseInt(prompt("Enter the Maximum Number"));

// while (!maxNum) {
//     maxNum = parseInt(prompt("Enter a Valid Number"));
// }

// const num = Math.floor(Math.random() * maxNum) + 1;
// console.log(num);

// let userNum = prompt("Now Guess the Random Number");
// let attempts = 1;

// while (parseInt(userNum) !== num) {
//     if (userNum === 'q') break;

//     if (parseInt(userNum) > num) {
//         userNum = prompt("Too High! Enter a New Guess");
//     } else {
//         userNum = prompt("Too Low! Enter a New Guess");
//     }
//     attempts++;
// }

// if (userNum === 'q') {
//     console.log("You quit the game.");
// } else {
//     console.log(`Congratulations! You guessed the number in ${attempts} attempts.`);
// }





let testScores = {
    keenan:80,
    damon: 67,
    kim: 89,
    shawn:91,
    marlon:72
}

for(person in testScores){
    console.log(`${person} scored ${testScores[person]}`)
}


console.log(Object.keys(testScores))
console.log(Object.values(testScores))

console.log(Object.entries(testScores))