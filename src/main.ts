import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Sheep Counter";
document.title = gameName;

// Important Values
let ct = 0;
let defGrowRate = 1;
let aBought = 0;
let bBought = 0;
let cBought = 0;

// Title Card
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Sheep Button
const sheep_emoji = "🐑";
const sheep_button = document.createElement("button");

sheep_button.innerHTML = sheep_emoji;
app.append(sheep_button);

// Shop Title
const shop_name = document.createElement("div");
shop_name.innerHTML = "Shop";
app.append(shop_name);

// Upgrade buttons
const upgrade_emoji_a = "🅰️⬆️";
const upgrade_emoji_b = "🅱️⬆️";
const upgrade_emoji_c = "©️⬆️";

const upgrade_button_a = document.createElement("button");
upgrade_button_a.innerHTML = upgrade_emoji_a;
upgrade_button_a.disabled = true;

const upgrade_button_b = document.createElement("button");
upgrade_button_b.innerHTML = upgrade_emoji_b;
upgrade_button_b.disabled = true;

const upgrade_button_c = document.createElement("button");
upgrade_button_c.innerHTML = upgrade_emoji_c;
upgrade_button_c.disabled = true;

app.append(upgrade_button_a);
app.append(upgrade_button_b);
app.append(upgrade_button_c);

// Bought counters
const a_bought_display = document.createElement("div");
const b_bought_display = document.createElement("div");
const c_bought_display = document.createElement("div");

a_bought_display.innerHTML = `A Bought: ${aBought}`;
b_bought_display.innerHTML = `B Bought: ${bBought}`;
c_bought_display.innerHTML = `C Bought: ${cBought}`;

app.append(a_bought_display);
app.append(b_bought_display);
app.append(c_bought_display);

// Sheep counter
const count_display = document.createElement("div");
count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;
app.append(count_display);

// Growth rate status display
const growth_rate_display = document.createElement("div");
growth_rate_display.innerHTML = `Current Growth Rate: ${defGrowRate.toFixed(1)} sheep/sec`;
app.append(growth_rate_display);

// Sheep button listener
sheep_button.addEventListener("click", () => {
  ct++;
  count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;
  checkUpgrade();
});

let upgrade_a_cost = 10;
let upgrade_b_cost = 100;
let upgrade_c_cost = 1000;

// lil bit of Extract Function (106) happening here
function checkUpgrade() {
  if (ct >= upgrade_a_cost) {
    upgrade_button_a.disabled = false;
  } else {
    upgrade_button_a.disabled = true;
  }
  if (ct >= upgrade_b_cost) {
    upgrade_button_b.disabled = false;
  } else {
    upgrade_button_b.disabled = true;
  }
  if (ct >= upgrade_c_cost) {
    upgrade_button_c.disabled = false;
  } else {
    upgrade_button_c.disabled = true;
  }
}



const upgrade_increase_factor = 1.15;



// Upgrade button listeners
upgrade_button_a.addEventListener("click", () => {
  if (ct >= upgrade_a_cost) {
    ct -= upgrade_a_cost;
    defGrowRate += 0.1;
    aBought++;
    upgrade_a_cost *= upgrade_increase_factor;

    count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;
    a_bought_display.innerHTML = `Bought: ${aBought}`;
    growth_rate_display.innerHTML = `Current Growth Rate: ${defGrowRate.toFixed(1)} sheep/sec`;
    checkUpgrade();
  }
});

upgrade_button_b.addEventListener("click", () => {
  if (ct >= upgrade_b_cost) {
    ct -= upgrade_b_cost;
    defGrowRate += 2;
    bBought++;
    upgrade_b_cost *= upgrade_increase_factor;

    count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;
    b_bought_display.innerHTML = `Bought: ${bBought}`;
    growth_rate_display.innerHTML = `Current Growth Rate: ${defGrowRate.toFixed(1)} sheep/sec`;
    checkUpgrade();
  }
});

upgrade_button_c.addEventListener("click", () => {
  if (ct >= upgrade_c_cost) {
    ct -= upgrade_c_cost;
    defGrowRate += 50;
    cBought++;
    upgrade_c_cost *= upgrade_increase_factor;


    count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;
    c_bought_display.innerHTML = `Bought: ${cBought}`;
    growth_rate_display.innerHTML = `Current Growth Rate: ${defGrowRate.toFixed(1)} sheep/sec`;
    checkUpgrade();
  }
});

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
