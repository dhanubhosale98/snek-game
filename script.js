var r1 = -1;
var r2 = -1;
const table = document.getElementById('table')
table.style.width = '300px';
table.style.height = '300px';
var newArr = [[9, 9]];
var currentKey = "ArrowUp";
var interval;
var score = 0;
const simplebtn = document.getElementById('simplebtn');
const mediumbtn = document.getElementById('mediumbtn');
const hardbtn = document.getElementById('hardbtn');
const firstDiv = document.getElementById('first');
const lost = document.getElementById("lost");
const scoreEle=document.getElementById('score');

// create the random green element
function createRandom() {
    r1 = Math.floor(Math.random() * 10);

    if (r1 != 0)
        r1 = r1 - 1;

    r2 = Math.floor(Math.random() * 10);

    if (r2 != 0)
        r2--;
}

// creates the table with 10 rows
function starterTemplate() {

    for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            let td = document.createElement('td');
            td.setAttribute("id", [i, j].toString())
            if (j == 9 && i == 9) {
                td.classList.add('red');
            }
            if (i == r1 && j == r2) {
                td.classList.add('green');
            }
            td.innerText = ""
            tr.append(td)
        }

        table.append(tr)
    }
}


function switchfun() {

    try {
        if (newArr[0][0] == -1 || newArr[0][0] == 10 || newArr[0][1] == -1 || newArr[0][1] == 10) {
            userDiesOnCollidOnWall();
        }

        checkCollidOnEachOther()

        if (newArr[0][0] == r1 && newArr[0][1] == r2) {
            newArr.push([r1, r2]);
            document.getElementById([r1, r2].toString()).classList.remove('green')
            createRandom();
            document.getElementById([r1, r2].toString()).classList.add('green')
        }

        switchPair();
    } catch (error) {
        console.log(error, "error")
        table.innerHTML = ""

    }

}

// move the array or snek to next step
function switchPair() {
    try {
        for (let i = 0; i < newArr.length; i++) {
            document.getElementById(newArr[i].toString()).classList.remove('red')
        }

        let pair = [...newArr[0]];

        if (currentKey == "ArrowDown") {
            pair[0] = newArr[0][0] + 1;
        }

        if (currentKey == "ArrowUp") {
            pair[0] = newArr[0][0] - 1;
        }

        if (currentKey == "ArrowRight") {
            pair[1] = newArr[0][1] + 1;
        }

        if (currentKey == "ArrowLeft") {
            pair[1] = newArr[0][1] - 1;
        }

        newArr.unshift(pair);
        newArr.pop();

        for (let i = 0; i < newArr.length; i++) {
            document.getElementById(newArr[i].toString()).classList.add('red')
        }
    } catch (error) {
        console.log(error, "error");
        table.innerHTML = ""
    }
}

// handle the code after the snek collid on wall
function userDiesOnCollidOnWall(){
    clearInterval(interval);
    lost.innerText = "you have lost ....play again."
    score=newArr.length/3;
    scoreEle.innerText=`Score: ${Math.floor(score)}`;
    table.innerHTML = ""
}



//all type of keyDown event or to set the current key
document.addEventListener('keydown', function ($event) {

    if (currentKey == "ArrowDown" && event.key == "ArrowUp") {
        currentKey = "ArrowDown"
    }
    else if (currentKey == "ArrowUp" && event.key == "ArrowDown") {
        currentKey = "ArrowUp"
    }
    else if (currentKey == "ArrowRight" && event.key == "ArrowLeft") {
        currentKey = "ArrowRight"
    }
    else if (currentKey == "ArrowLeft" && event.key == "ArrowRight") {
        currentKey = "ArrowLeft"
    }
    else if (!(currentKey == event.key)) {
        currentKey = event.key;
    }
})

// event listener for simple button
simplebtn.addEventListener('click', () => {
    calledAfterNewGame(600)

})

// event listener for medium button
mediumbtn.addEventListener('click', () => {
    calledAfterNewGame(400)

})

// event listener for hard button
hardbtn.addEventListener('click', () => {

    calledAfterNewGame(200)

})


// when new game start the all value set again
function calledAfterNewGame(time) {
    lost.innerText = "";
    scoreEle.innerText="";
    newArr = [[9, 9]];
    currentKey = "ArrowUp";
    createRandom();
    starterTemplate();
    interval = setInterval(() => { switchfun() }, time)
}

// check the snek collid on itself
function checkCollidOnEachOther() {
    let ele = newArr[0];

    for (let i = 1; i < newArr.length; i++) {
        if (ele[0] == newArr[i][0] && ele[1] == newArr[i][1]) {
            clearInterval(interval);
            table.innerHTML = ""
            lost.innerText = "you have lost ....score123......play again."
            score=newArr.length/3;
            scoreEle.innerText=`Score: ${Math.floor(score)}`;
        }
    }


}


