function handleClick(){
    alert("I got clicked");
}

// for touch presses
for(let i = 0; i < document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function(){
            makeSound(this.innerHTML);
            buttonAnimation(this.innerHTML);
    })
}
    
//for key presses
document.addEventListener('keydown', function(keyboard){
     makeSound(keyboard.key); // this gives the key of the keyboard which is pressed
     buttonAnimation(keyboard.key);
})

function makeSound(key){
    switch (key) {
        case "w":
            new Audio('./sounds/crash.mp3').play();
            break;
        case "a":
            new Audio('./sounds/kick-bass.mp3').play();
            break;

        case "s":
            new Audio('./sounds/snare.mp3').play();
            break;

        case "d":
            new Audio('./sounds/tom-1.mp3').play();
            break;

        case "j":
            new Audio('./sounds/tom-2.mp3').play();
            break;
        
        case "k":
            new Audio('./sounds/tom-3.mp3').play();
            break;

        case "l":
            new Audio('./sounds/tom-4.mp3').play();
            break;

        default:
            console.log(this.innerHTML);
            break;
    }
}

function buttonAnimation(key){
    const activeButton = document.querySelector("." + key);
    activeButton.classList.add('pressed');
    setTimeout(function (){
        activeButton.classList.remove('pressed');
    }, 100);
}


// this.style.color = 'blue';                  //for changing color
// new Audio('./sounds/crash.mp3').play();