function handleClick(){
    alert("I got clicked");
}


for(let i = 0; i < document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function(){
        this.style.color = 'blue';
    });

}



// new Audio('./sounds/crash.mp3').play();