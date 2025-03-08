const container = document.querySelector(".sketchArea");
let setSize = 600;
let rows = 0;
let cols = 0;
let slider = document.querySelector("#slider");
let sliderLabel = document.querySelector("#sliderLabel");
let sliderVal = 0;
let click = false;
let defMode = "color";

document.body.onmousedown = () => (click = true);
// console.log(click)
document.body.onmouseup = () => (click = false);
// console.log(click)

container.style.width = `${setSize}px`;
container.style.height = `${setSize}px`;

slider.oninput = () => makeGrids();

// container.addEventListener("mousedown",() => click = true);
// console.log(click)
// container.addEventListener("mouseup", () => click = false);
// console.log(click)

function makeGrids() {
  clearGrids();
  // let setSize = prompt("Enter the size of Sketch Area", 600);
  // rows = prompt("Enter the number of rows and columns", 16);
  // cols = rows;
  // if (
  //   (rows >= 2 || rows === null) &&
  //   (cols >= 2 || cols === null) &&
  //   (rows <= 100 || rows === null) &&
  //   (cols <= 100 || cols === null)
  // ) {
  sliderVal = slider.value;
  sliderLabel.textContent = `${sliderVal}X${sliderVal}`;
  // console.log(sliderVal);
  if (sliderVal === 0 || sliderVal === null) return;
  for (let r = 0; r < sliderVal * sliderVal; r++) {
    let create = document.createElement("div");
    create.style.width = `${setSize / sliderVal}px`;
    create.style.height = `${setSize / sliderVal}px`;
    // let test = `${setSize / cols}px`;
    // console.log(test);

    create.classList.add("cells");
    create.addEventListener("mouseover", setMode);
    create.addEventListener("mousedown", setMode);
    // console.log(click)
    container.appendChild(create);
  }
  // } else {
  //   alert("Enter a Num between 2 and 100");
  //   makeGrids();
  // }
}

function clearGrids() {
  container.innerHTML = "";
}

function clearGrids2() {
  makeGrids();
}

function setColor(e) {
  if (defMode === "reset") return;
  if (defMode === "color") {
    e.target.style.backgroundColor = "black";
  } else if (defMode === "eraser") {
    e.target.style.backgroundColor = "white";
  }
}

// document.querySelector(".select").addEventListener("click", () => makeGrids());

document.querySelector("#reset").addEventListener("click", () => {
  clearGrids();
  makeGrids();
});

// document.querySelector("#eraser").addEventListener("click", (e) => test(e));

// function changeColor(e) {
//   setMode(e);
// }

function setMode(e) {
  if (e.type === "mouseover" && !click) return;

  if (defMode === "color" || defMode === "eraser") {
    setColor(e);
  } else if (defMode === "rainbow") {
    genColor(e);
  }
}

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => test(e));
});

function test(e) {
  defMode = e.target.id;
}

function genColor(e) {
  let R = Math.floor(Math.random() * 256);
  let G = Math.floor(Math.random() * 256);
  let B = Math.floor(Math.random() * 256);

  e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}

makeGrids();
