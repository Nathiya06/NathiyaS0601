document.addEventListener


let diamond=['one','two','three','four','five'];
let windowWidth=window.innerWidth;
let body=document.body;
let windowHeight=window.innerHeight;
let scores=document.querySelectorAll('.score');
let nocrush=0;
let total=50;
let currentdiamond=0;
let gameOver=false;
let shadow=document.querySelector('.shadow');
let startBtn=document.querySelector('.start-btn');

function creatediamond(){
let div=document.createElement('div')
let rand=Math.floor(Math.random()* diamond.length);
div.className='diamond diamond-'+ diamond[rand];
rand=Math.floor(Math.random()* (windowWidth-100));
div.style.left=rand+'px';
div.style.right=rand+'px';



div.dataset.number = currentdiamond;
currentdiamond++;

document.body.appendChild(div);
animatediamond(div);
}

function animatediamond(elem){
let position = 0;
let random = Math.floor(Math.random() * 6-3);
let interval = setInterval(frame,12-Math.floor(nocrush/10)+random);

function frame(){
if(position >=(windowHeight + 150)&&(document.querySelector('[data-number ="'+ elem.dataset.number +'"]') !==null)){
    clearInterval(interval);
}
else{

    position++;
    elem.style.top = windowHeight - position + 'px';
}
}
}

function deletediamond(elem){
elem.remove();
nocrush++;
scoreUpdate();
}

function scoreUpdate(){
for (let i=0; i< scores.length;i++){
    scores[i].textContent = nocrush;
}

}
function startGame(){

restartGame();
let timeout=0;
let loop = setInterval(function(){
    timeout = Math.floor(Math.random()* 600 - 100);

if(!gameOver && nocrush !==total){
    creatediamond();
}
else if(nocrush !==total){
    clearInterval(loop);
    shadow.style.display = 'flex';
    shadow.querySelector('.loser').style.display='block';
}
else{
    clearInterval(loop);
    shadow.style.display = 'flex';
    shadow.querySelector('.winner').style.display='block';
}


}, 800 + timeout);
}


function restartGame(){

    let forRemoving = document.querySelectorAll('.diamond');
    for (let i=0; i< forRemoving.length; i++){
forRemoving[i].remove();

}
gameOver = false;
nocrush = 0;
scoreUpdate();
}
document.addEventListener('click',function(event){
if(event.target.classList.contains('diamond')){
   deletediamond(event.target);
}
})
document.querySelector('.restart').addEventListener('click',function(){
    shadow.style.display = 'none';
    shadow.querySelector('.winner').style.display = 'none';
    shadow.querySelector('.loser').style.display = 'none';
   startGame();
})
document.querySelector('.cancel').addEventListener('click',function(){
shadow.style.display = 'none';

});
startBtn.addEventListener('click',function(){
startGame();
document.querySelector('.main-game').style.display = 'none';

});

  


