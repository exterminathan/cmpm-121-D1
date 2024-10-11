import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Sheep Counter";
document.title = gameName;

let ct = 0;
let defGrowRate = 1;
let aBought = 0;
let bBought = 0;
let cBought = 0;
let dBought = 0;
let eBought = 0;
const upgrade_increase_factor = 1.15;

const upgradeButtons: HTMLButtonElement[] = [];
const boughtDisplays: HTMLElement[] = [];

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "Dream Weaver", cost: 10, rate: 0.1, description: "Enhances your sheep-dreaming power."},
  { name: "Moonlit Meander", cost: 50, rate: 1, description: "Harness the calming glow of moonlight to steady your counting." },
  { name: "Star Gazer", cost: 100, rate: 2, description: "Unleash the celestial magic to illuminate your counting path." },
  { name: "Nighttime Navigator", cost: 500, rate: 10, description: "Chart the constellations to find the optimal counting route." },
  { name: "Counting Chant", cost: 1000, rate: 50, description: "Boosts the rhythm of your counting." },
];

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

// Shop container div
const shop_div = document.createElement("div");
shop_div.style.display = "flex";
shop_div.style.justifyContent = "space-between";
shop_div.style.gap = "20px";

// Upgrade buttons
availableItems.forEach((item) => {
  let button_emoji = "";
  if (item.name === "Dream Weaver") {
    button_emoji = "🪄";
  } else if (item.name === "Star Gazer") {
    button_emoji = "✨";
  } else if (item.name === "Counting Chant") {
    button_emoji = "🎺";
  } else if (item.name === "Moonlit Meander") {
    button_emoji = "🌙";
  } else if (item.name === "Nighttime Navigator") {
    button_emoji = "🧭";
  }

  const upgrade_button = document.createElement("button");
  upgrade_button.innerHTML = button_emoji;
  upgrade_button.disabled = true;

  const upgrade_div = document.createElement("div");
  upgrade_div.style.textAlign = "center";
  const upgrade_label = document.createElement("div");
  upgrade_label.innerHTML = item.name;
  upgrade_div.append(upgrade_button);
  upgrade_div.append(upgrade_label);

  shop_div.append(upgrade_div);

  const bought_display = document.createElement("div");
  if (item.name === "Dream Weaver") {
    bought_display.innerHTML = `Dream Weaver Bought: ${aBought}`;
  } else if (item.name === "Star Gazer") {
    bought_display.innerHTML = `Star Gazer Bought: ${bBought}`;
  } else if (item.name === "Counting Chant") {
    bought_display.innerHTML = `Counting Chant Bought: ${cBought}`;
  } else if (item.name === "Moonlit Meander") {
    bought_display.innerHTML = `Moonlit Meander Bought: ${dBought}`;
  } else if (item.name === "Nighttime Navigator") {
    bought_display.innerHTML = `Nighttime Navigator Bought: ${eBought}`;
  }


  boughtDisplays.push(bought_display);
  app.append(bought_display);

  // Upgrade button listener
  upgrade_button.addEventListener("click", () => {
    if (ct >= item.cost) {
      ct -= item.cost;
      defGrowRate += item.rate;

      if (item.name === "Dream Weaver") {
        aBought++;
        item.cost *= upgrade_increase_factor;
        bought_display.innerHTML = `Dream Weaver Bought: ${aBought}`;
      } else if (item.name === "Star Gazer") {
        bBought++;
        item.cost *= upgrade_increase_factor;
        bought_display.innerHTML = `Star Gazer Bought: ${bBought}`;
      } else if (item.name === "Counting Chant") {
        cBought++;
        item.cost *= upgrade_increase_factor;
        bought_display.innerHTML = `Counting Chant Bought: ${cBought}`;
      } else if (item.name === "Moonlit Meander") {
        dBought++;
        item.cost *= upgrade_increase_factor;
        bought_display.innerHTML = `Moonlit Meander Bought: ${dBought}`;
      } else if (item.name === "Nighttime Navigator") {
        eBought++;
        item.cost *= upgrade_increase_factor;
        bought_display.innerHTML = `Nighttime Navigator Bought: ${eBought}`;
      }

      count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;
      growth_rate_display.innerHTML = `Current Growth Rate: ${defGrowRate.toFixed(1)} sheep/sec`;
      checkUpgrade();
    }
  });

  // put buttons in array
  upgradeButtons.push(upgrade_button);
});

app.append(shop_div);

// Statistics
const stats_div = document.createElement("div");
const stats_title = document.createElement("h2");
stats_title.innerHTML = "Statistics";
stats_div.append(stats_title);

// Sheep counter display
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

function checkUpgrade() {
  availableItems.forEach((item, index) => {
    if (ct >= item.cost) {
      upgradeButtons[index].disabled = false;
    } else {
      upgradeButtons[index].disabled = true;
    }
  });
}

// Continuous Growth
let lastFrameT = performance.now();

function updateCounter(time: number) {
  const deltaT = (time - lastFrameT) / 1000;
  lastFrameT = time;

  ct += defGrowRate * deltaT;
  count_display.innerHTML = `${ct.toFixed(1)} Sheep Counted`;

  checkUpgrade();

  requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);
