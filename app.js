const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const InitialColor = "#000000";
const save = document.getElementById("jsSave");

canvas.width = 450;
canvas.height = 450;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = InitialColor;
ctx.fillStyle = InitialColor;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPaintig(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
        
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleCanvasClick(event) {
    if (filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
   event.preventDefault();
}

function handleModeClick(event) {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "Paint"
     
    }
}

function handleSaveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "myPainting";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPaintig);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleCM);
    

}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
//color는 각각의 색상을 가리키는 변수명이므로 다른 이름 써도 무관함

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}