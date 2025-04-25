type Config = {
  buttons: {
    icon: string;
    name: string;
    color: string;
    href: string;
  }[];
};

function validateConfigFile(config: any): asserts config is Config {
  if (!config?.buttons || !Array.isArray(config.buttons))
    throw "Invalid config type syntax!";
  return config;
}

const btnWrapperEl = document.querySelector("#btnWrapper") as HTMLDivElement;
const arrowIconEl = document.querySelector("#svgArrow") as SVGElement;

function textColor(hexBgColor: string) {
  const calculate_lum = (hexColor: string) => {
    function fix_hexColor(hexColor: string) {
      hexColor = hexColor.replace(/#/g, "");
      if (hexColor.length === 3) {
        hexColor = hexColor.replace(/(.)/g, "$1$1");
      }
      return hexColor;
    }

    hexColor = fix_hexColor(hexColor);
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
    const to_linear = (c: number) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return (
      0.2126 * to_linear(r) + 0.7152 * to_linear(g) + 0.0722 * to_linear(b)
    );
  };

  const bgLum = calculate_lum(hexBgColor);
  const a = bgLum / 0.05;
  const b = 1.05 / bgLum;
  return a > b ? "#000" : "#fff";
}

fetch("./config.json")
  .then((resp) => resp.json())
  .then((config) => {
    validateConfigFile(config);

    config.buttons.forEach((b) => {
      const color = textColor(b.color);
      const aEl = document.createElement("a");
      aEl.setAttribute("href", b.href);
      aEl.setAttribute("target", "_blank");
      aEl.setAttribute(
        "style",
        `background-color: ${b.color}; color: ${color}; fill: ${color}`,
      );
      aEl.innerHTML = `
        <img src="${b.icon}" alt="btn-icon" aria-hidden="true"/>
        <div>${b.name}</div>
        <div>${arrowIconEl.innerHTML}</div>
      `;
      btnWrapperEl.appendChild(aEl);
    });
  });
