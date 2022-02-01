// To Selects all the css selectors using querySelector() method 
const score = document.querySelector(".score span");
const missed = document.querySelector(".missed span");
//const comt = document.querySelector(".holescont");
// querySelectorAll() method returns all the holes with class"hole"  
const holes = document.querySelectorAll(".hole");
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const exitBtn = document.querySelector(".stop");
const cursor = document.querySelector(".cursor img");
// Create headshot html audio object w/out HTML tag in html page 
var headshotaudio = new Audio('graphics_audio/assets_Dart.mp3');
// Create background html audio object w/out HTML tag in home page
var backgroundmusic = new Audio('graphics_audio/backgroundSound1.mp3');

// Global variables to keeptrack of scores, missed score
// And total moles lives
var result = 0;
var missedscore = 0;
var result2 = 0;
var count = 0;
// variable just tomae sure if the game mode is On or Off
var GameModeOnOff = false;

playBtn.addEventListener("click", () => {
    GameModeOnOff = true;
    // Here we change the default cursor to hammer
    // Add eveent
    window.addEventListener("mousemove", (e) => {
        cursor.style.top = e.pageY + "px";
        cursor.style.left = e.pageX + "px";
        // here we give the animation to the hammer hit effect
        // after 0.1s(100ms) we can hit the target with animation again
        window.addEventListener("click", () => {
            cursor.style.animation = "hit 0.2s ease";
            // Evaluate the hammer click function after 100 ms
            setTimeout(() => {
                cursor.style.removeProperty("animation");
            }, 100);
        });
    });
    // After play button is clicked
    playBtn.disabled = true;    // Disable play btn,to prevent user from clicking play button twice 
    exitBtn.disabled = false;   // Enable Exist button 
    pauseBtn.disabled = false;  // Enable Pause button 
    backgroundmusic.currentTime = 0;    // Reset background music to begining that is from 0
    backgroundmusic.play(); // Play background music
    let hole;

    const startGame = setInterval(() => {
        // Create a list of 5 random number
        let arrayNo = Math.floor(Math.random() * 5);
        hole = holes[arrayNo];  // Here we set the holes selector to random num list
        // Create a professor like pic to pop up from deak
        // Create HTML image tag
        let image = document.createElement("img");
        image.setAttribute("src", "graphics_audio/cartoonprofessor.png");
        image.setAttribute("class", "mole");
        //image.setAttribute("data-id", "");
        hole.appendChild(image);
        // Remove professor image from desk after 0.8s
        setTimeout(() => {
            hole.removeChild(image);
        }, 900);
        count++;
        // If the missed score reached to 10, game stops with alert message
        if (missedscore >= 10) {
            GameModeOnOff = false;
            // clear the startGame interval
            clearInterval(startGame);
            backgroundmusic.pause();    // pause the background music 
            // Reset the background music time to 0, to play from begining when paused
            backgroundmusic.currentTime = 0;
            alert(`GAME OVER!\nYour Score: ${result}\nMissed moles: ${missedscore}`);
            playBtn.disabled = false;   // enabled the play button
            exitBtn.disabled = true;    // disable the exit button
            pauseBtn.disabled = true;   // disable the pause button
            missedscore = 0 //set missed score to 0
            count = 0;  // reset count to 0
            result = 0; // reset score to 0
            score.innerText = result;   //display score in the html score tag
            missed.innerText = count;   //display missedscore in the html missed tag
        }
        //var missed_moles = count - result;
        missedscore = Math.max(missedscore, count - result);
        missed.innerText = missedscore;

    }, 950);    //After 0.9s startGame function calls itself


    window.addEventListener("click", (e) => {
        // If turnOnOff is true and user hit the target
        // Then increment the score by 1
        if (GameModeOnOff === true && e.target == hole) {
            backgroundmusic.pause();    //Pause the background music 
            headshotaudio.pause();  //Pause the headshot music
            headshotaudio.currentTime = 0;  //Reset headshot audio ffile to 0
            headshotaudio.play();   //Play the headshot sound 
            result++    //increment the result
            score.innerText = result;   //Display the score simultaneously at score tag
            backgroundmusic.play(); // Continue play the background music 
        }
    });
    // Add eventlistener to Exit button, onclick
    exitBtn.addEventListener("click", () => {
        // clears the interval set By startgame setinterval()
        clearInterval(startGame);
        GameModeOnOff = false;  //Set turnonOff to false to prevent the score increment if user hit desk
        backgroundmusic.pause();    //pasue bg music 
        backgroundmusic.currentTime = 0;    //reset bg music to 0
        playBtn.disabled = false;   // Enable Play button
        exitBtn.disabled = true;    //Disable Exit button
        pauseBtn.disabled = true;   //Disable Pause button
        count = 0;  //reset the count to 0
        result = 0; ////reset the result to 0
        score.innerText = result;
        missed.innerText = count;

    });
    // Add eventlistener to Pause button, onclick
    pauseBtn.addEventListener('click', () => {
        GameModeOnOff = false;
        result2 = result;
        backgroundmusic.currentTime = 0;
        backgroundmusic.pause();
        // clears the interval set By startgame setinterval()
        clearInterval(startGame);
        playBtn.disabled = false;   // Enable Play Button
        exitBtn.disabled = false;   // Enable Exit Button
        pauseBtn.disabled = true;   // Disable Pause button
    });

});





