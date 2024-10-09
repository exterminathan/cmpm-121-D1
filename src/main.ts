import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Sheep Counter";
document.title = gameName;

// Important Values
let ct = 0;
let defGrowRate = 1;


// Title Card
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Sheep Button
const sheep_emoji = "🐑";
const sheep_button = document.createElement("button");

sheep_button.innerHTML = sheep_emoji;
app.append(sheep_button);


// Upgrade button
const upgrade_emoji = "⬆️";
const upgrade_button = document.createElement("button");

upgrade_button.innerHTML = upgrade_emoji;
upgrade_button.disabled = true;

app.append(upgrade_button);



// Sheep counter
const count_display = document.createElement("div");

count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;
app.append(count_display);

// Sheep button listener
sheep_button.addEventListener("click", () => {
  ct++;
  count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;
  checkUpgrade();
});


// lil bit of Extract Function (106) happening here
function checkUpgrade() {
  if (ct >= 10) {
    upgrade_button.disabled = false;
  } else {
    upgrade_button.disabled = true;
  }
}


// Upgrade button listener
upgrade_button.addEventListener("click", () => {
  if (ct >= 10) {
    ct -= 10;
    defGrowRate +=1;
    count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;
    checkUpgrade();
  }
})



// Continuous Growth
let lastFrameT = performance.now();

function updateCounter(time: number) {
  // time diff between frames
  const deltaT = (time - lastFrameT) / 1000;
  lastFrameT = time;

  ct += defGrowRate * deltaT;
  count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;

  checkUpgrade();

  requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);
