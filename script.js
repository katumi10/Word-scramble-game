const wordTxt = document.querySelector(".word"); 
const hintTxt = document.querySelector(".hint span");
const timeTxt = document.querySelector(".time b");
const refreshBtn  = document.querySelector(".refresh-word");
const checkBtn  = document.querySelector(".check-word");
const inputField = document.querySelector("input");

let correctWord, timer;

const startTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0){
            maxTime--; //decreasing maxtime by 1
           return timeTxt.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time Up! ${correctWord.toUpperCase()} was the correct word`); // calling startgame function to restart the game
    }, 1000);
}

const startGame = () => {
    startTimer(30); //calling startTime function and passing 30 as max time value
    let randomObj = words[Math.floor(Math.random() * words.length)];  //getting random objects fromm words
    let wordArray = randomObj.word.split(""); //splitting each letter of random word
    for (let i= wordArray.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));//getting random number

        //shuffling and swiping wordArray letters randomly
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordTxt.innerText = wordArray.join("");// passing shuffles words as text
    hintTxt.innerText = randomObj.hint; //passing random object hint as hint text
    correctWord = randomObj.word.toLowerCase(); //passing random word to correct word
    inputField.value = ""; //making inputfield empty

    //setting input maxlength attr value to word length
    inputField.setAttribute("maxlength", correctWord.length);
  
}

startGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();// getting ser value
    //if user doesnt enter anything
    if(!userWord) return alert("Please Enter A word");

    //if user word doesnt match with correct word
    if(userWord !== correctWord)
   return alert (`OOPS! ${userWord} is not the correct word`);

    //if the above conditions are false then userword is correct 
    alert (`CONGRATS! ${userWord.toUpperCase()} is the corect word`);
    startGame();
}

refreshBtn.addEventListener("click", startGame);
checkBtn.addEventListener("click", checkWord);

