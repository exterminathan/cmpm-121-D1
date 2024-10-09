import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Sheep Counter";
document.title = gameName;


//Title Card
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);


//Sheep Button
const emoji = "🐑";
const button = document.createElement("button");

button.innerHTML = emoji;
app.append(button);



//Sheep counter
const count_display = document.createElement("div");
let ct = 0;

count_display.innerHTML = `${ct} Sheep Counted`;
app.append(count_display);




//Sheep button listener
button.addEventListener("click", () => {
    ct++;
    count_display.innerHTML = `${ct} Sheep Counted`;
})