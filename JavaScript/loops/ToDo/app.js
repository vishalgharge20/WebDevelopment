
function displayList(){
        for(i=0;i<todoList.length;i++){
            console.log(`${i}: ${todoList[i]}`)
        }
}
let todoList = [];

let userinput = prompt("What would you want to do?")
while(userinput!=='quit'){
    if(userinput==='list'){
        console.log("***********")
        displayList()
        console.log("***********")
    }
    else if(userinput==='add'){
        let newTask= prompt("Enter a new Task that you would want to add")
        todoList.push(newTask)
        // console.log(todoList)
    }
    else if(userinput==='del'){
        console.log("***********")
        displayList()
        console.log("***********")
        let delTask = parseInt(prompt("Enter the index number of the Task that you want to del"))
            if (delTask >= 0 && delTask < todoList.length) {
            todoList.splice(delTask, 1);
            } else {
            console.log("Invalid index. Please try again.");
            }
        console.log(todoList)
    }
    userinput = prompt("What would you want to do?");
}
console.log("Thank you for using the To-Do List app!");




//  chat gpt

// let todoList = [];

// let userinput = prompt("What would you want to do?");
// while (userinput !== 'quit') {
//     if (userinput === 'list') {
//         console.log(todoList);
//     } else if (userinput === 'add') {
//         let newTask = prompt("Enter a new task that you would want to add");
//         todoList.push(newTask);
//         console.log(todoList);
//     } else if (userinput === 'del') {
//         console.log(todoList);
//         let delTask = parseInt(prompt("Enter the index number of the task that you want to delete"));
//         if (delTask >= 0 && delTask < todoList.length) {
//             todoList.splice(delTask, 1);
//         } else {
//             console.log("Invalid index. Please try again.");
//         }
//         console.log(todoList);
//     }
//     userinput = prompt("What would you want to do?");
// }
// console.log("Thank you for using the To-Do List app!");