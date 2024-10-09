import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Sheep Counter";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const emoji = "🐑";
const button = document.createElement("button");

button.innerHTML = emoji;
app.append(button);
