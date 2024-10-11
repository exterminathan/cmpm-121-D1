import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Sheep Counter";
document.title = gameName;

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
const sheep_button = document.createElement("button");
sheep_button.style.padding = "0";
sheep_button.style.border = "none";
sheep_button.style.width = "100px";
sheep_button.style.height = "100px";

// Main Sheep Emoji
const sheep_emoji = document.createElement("div");
sheep_emoji.innerHTML = "🐑";
sheep_emoji.style.fontSize = "50px"; 
sheep_emoji.style.display = "flex";  
sheep_emoji.style.justifyContent = "center"; 
sheep_emoji.style.alignItems = "center"; 
sheep_emoji.style.height = "100%"; 

sheep_button.append(sheep_emoji);
app.append(sheep_button);

// Shop Title
const shop_title = document.createElement("h2");
shop_title.innerHTML = "Shop";
shop_title.style.marginTop = "20px";
app.append(shop_title);

// shop container div
const shop_div = document.createElement("div");
shop_div.style.display = "flex"; 
shop_div.style.justifyContent = "space-between"; 
shop_div.style.gap = "20px"; 

// Upgrade buttons with labels
const upgrade_emoji_a = "🪄";
const upgrade_emoji_b = "✨";
const upgrade_emoji_c = "🎺";

const upgrade_button_a = document.createElement("button");
upgrade_button_a.innerHTML = upgrade_emoji_a;
upgrade_button_a.disabled = true;

const upgrade_button_b = document.createElement("button");
upgrade_button_b.innerHTML = upgrade_emoji_b;
upgrade_button_b.disabled = true;

const upgrade_button_c = document.createElement("button");
upgrade_button_c.innerHTML = upgrade_emoji_c;
upgrade_button_c.disabled = true;

// Dream Weaver Upgrade
const upgrade_a_div = document.createElement("div");
upgrade_a_div.style.textAlign = "center";
const upgrade_a_label = document.createElement("div");
upgrade_a_label.innerHTML = "Dream Weaver";
upgrade_a_div.append(upgrade_button_a);
upgrade_a_div.append(upgrade_a_label);

// Star Gazer Upgrade
const upgrade_b_div = document.createElement("div");
upgrade_b_div.style.textAlign = "center";
const upgrade_b_label = document.createElement("div");
upgrade_b_label.innerHTML = "Star Gazer";
upgrade_b_div.append(upgrade_button_b);
upgrade_b_div.append(upgrade_b_label);

// Counting Chant Upgrade
const upgrade_c_div = document.createElement("div");
upgrade_c_div.style.textAlign = "center";
const upgrade_c_label = document.createElement("div");
upgrade_c_label.innerHTML = "Counting Chant";
upgrade_c_div.append(upgrade_button_c);
upgrade_c_div.append(upgrade_c_label);

shop_div.append(upgrade_a_div);
shop_div.append(upgrade_b_div);
shop_div.append(upgrade_c_div);

app.append(shop_div);

// Statistics
const stats_div = document.createElement("div");
const stats_title = document.createElement("h2");
stats_title.innerHTML = "Statistics";
stats_div.append(stats_title);

// Bought counters
const a_bought_display = document.createElement("div");
const b_bought_display = document.createElement("div");
const c_bought_display = document.createElement("div");

a_bought_display.innerHTML = `Dream Weaver Bought: ${aBought}`;
b_bought_display.innerHTML = `Star Gazer Bought: ${bBought}`;
c_bought_display.innerHTML = `Counting Chant Bought: ${cBought}`;

stats_div.append(a_bought_display);
stats_div.append(b_bought_display);
stats_div.append(c_bought_display);

// Sheep counter
const count_display = document.createElement("div");
count_display.style.marginTop = "20px";
count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;
stats_div.append(count_display);

// Growth rate status display
const growth_rate_display = document.createElement("div");
growth_rate_display.innerHTML = `Current Growth Rate: ${defGrowRate.toFixed(1)} sheep/sec`;
stats_div.append(growth_rate_display);

app.append(stats_div);

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
