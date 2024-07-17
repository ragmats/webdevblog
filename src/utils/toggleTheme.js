const lightThemeVariables = [
  { name: "--cube-back-shadow", color: "rgb(225, 225, 225)" },
  { name: "--interact-color", color: "lightseagreen" },
  { name: "--interact-color-hover", color: "darkcyan" },
  { name: "--bg-color-body", color: "whitesmoke" },
  { name: "--bg-color-card", color: "white" },
  { name: "--bg-color-filter-selected", color: "gainsboro" },
  { name: "--text-color", color: "black" },
  { name: "--featured-border-color", color: "black" },
  { name: "--featured-border-color-hover", color: "darkgray" },
  { name: "--border-color-card", color: "lightgray" },
];

const darkThemeVariables = [
  { name: "--cube-back-shadow", color: "rgb(40, 40, 40)" },
  { name: "--interact-color", color: "steelblue" },
  { name: "--interact-color-hover", color: "rgb(88, 161, 221)" },
  { name: "--bg-color-body", color: "rgb(25, 25, 25)" },
  { name: "--bg-color-card", color: "rgb(32, 33, 39)" },
  { name: "--bg-color-filter-selected", color: "rgb(53, 53, 53)" },
  { name: "--text-color", color: "rgb(133, 145, 170)" },
  { name: "--featured-border-color", color: "rgb(53, 53, 53)" },
  { name: "--featured-border-color-hover", color: "dimgray" },
  { name: "--border-color-card", color: "rgb(50, 50, 50)" },
];

export function setThemeToLight() {
  console.log("setting theme to light colors");
  // Save current theme in local storage
  localStorage.setItem("theme", "light");
  lightThemeVariables.forEach((color) =>
    document.documentElement.style.setProperty(color.name, color.color)
  );
}

export function setThemeToDark() {
  console.log("setting theme to dark colors");
  localStorage.setItem("theme", "dark");
  darkThemeVariables.forEach((color) =>
    document.documentElement.style.setProperty(color.name, color.color)
  );
}
