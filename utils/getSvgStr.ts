import Receipt, { Product } from "../definitions/Receipt";
import getColorFromScore from "./getColorFromScore";

const rowHeight = 15;

const getStart = (idx: number) => {
  const val0 = rowHeight * idx + 14.5584;

  const val1 = rowHeight * idx + 8.04;

  const val2 = rowHeight * idx;

  const val3 = rowHeight * idx + 15;

  const ding = `M137.088 ${val2}C137.088 ${val1} 130.586 ${val0} 122.566 ${val0}C114.545 ${val0} 108.044 ${val1} 108.044 ${val2}H93.5228C93.5228 ${val1} 87.0209 ${val0} 79.0012 ${val0}C70.9815 ${val0} 64.4784 ${val1} 64.4784 ${val2}H49.9567C49.9567 ${val1} 43.4548 ${val0} 35.4351 ${val0}C27.4142 ${val0} 20.9135 ${val1} 20.9135 ${val2}H0V${val3}H158V${val2}H137.088Z`;

  return `<path d="${ding}" fill="white"></path>`;
};
const getEnd = (idx: number) => {
  const val0 = rowHeight * idx + 15;
  const val1 = rowHeight * idx + 6.96;
  const val2 = rowHeight * idx + 0.4416;
  const val3 = rowHeight * idx;

  const ding = `M20.9122 ${val0}C20.9122 ${val1} 27.4142 ${val2} 35.4339 ${val2}C43.4548 ${val2} 49.9555 ${val1} 49.9555 ${val0}H64.4772C64.4772 ${val1} 70.9791 ${val2} 78.9988 ${val2}C87.0185 ${val2} 93.5216 ${val1} 93.5216 ${val0}L108.043 ${val0}C108.043 ${val1} 114.545 ${val2} 122.565 ${val2}C130.586 ${val2} 137.087 ${val1} 137.087 ${val0}H158V${val3}L-6.67572e-06 ${val3}V${val0}H20.9122Z`;

  return `<path d="${ding}" fill="white"></path>`;
};
const getHeader = (idx: number) => {
  return `<rect y="${rowHeight * idx
    }" width="158" height="15" fill="white"></rect>`;
};
const getFooter = (idx: number, score: number) => {
  return `
          <rect y="${rowHeight * idx
    }" width="158" height="15" fill="white"></rect>
  
          <text fill="#222222" style="white-space: pre" font-size="7" font-weight="bold" letter-spacing="0em"><tspan x="8" y="${rowHeight * idx + 10.5455
    }">TOTAL:</tspan></text>
          <text fill="${getColorFromScore(score)}" style="white-space: pre" font-size="7" font-weight="bold" letter-spacing="0em"><tspan x="137" y="${rowHeight * idx + 10.5455
    }">${score}</tspan></text>
      `;
  // <text fill="#222222" style="white-space: pre" font-size="7" font-weight="bold" letter-spacing="0em"><tspan x="90" y="${rowHeight * idx + 10.5455
  // }">VEGETARIAN</tspan></text>
};
const toHex = (str: string) => str.split("").map((_, idx) => str.charCodeAt(idx).toString(16)).join("")

const toRow =
  (isHeaderRow = false) =>
    (item: Product, idx: number) => {

      const { quantity, label, score, item: itemName, group, typology } = item

      const description = [group, typology, itemName].filter(i => i != null).join(" - ").replaceAll("&", "&amp;")

      // account for start and header rows
      idx += isHeaderRow ? 1 : 2;

      const ding = `M8 ${rowHeight * idx + 14} C21.1667 ${rowHeight * idx + 14
        } 151 ${rowHeight * idx + 14} 151 ${rowHeight * idx + 14}`;

      return `
          <rect y="${rowHeight * idx
        }" width="158" height="15" fill="white"></rect>
          ${isHeaderRow
          ? `<path d="${ding}" stroke="#808080" stroke-width="0.5" stroke-dasharray="2 2"></path>`
          : ''
        }
          <text fill="#222222" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="8" y="${rowHeight * idx + 8.8182
        }">${quantity}</tspan></text>
          <text fill="#222222" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="41" y="${rowHeight * idx + 8.8182
        }">${label}</tspan></text>

        <text fill="#222222" style="white-space: pre" font-size="2" letter-spacing="0em"><tspan x="41" y="${rowHeight * idx + 13
        }">${description}</tspan></text>
  
          <text fill="#222222" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="133" y="${rowHeight * idx + 8.8182
        }">${score}</tspan></text>
      `;
      // <text fill="#222222" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="97" y="${rowHeight * idx + 8.8182
      // }">${status}</tspan></text>
    };

export default function getSvgStr(receipt: Receipt) {

  const { products, score } = receipt;

  const numRows = products.length + 4;

  const viewBox = `0 0 158 ${numRows * rowHeight}`;

  const content = [
    getStart(0),
    getHeader(1),
    // @ts-ignore
    // TODO: make toRow take string args instead of Product
    toRow(true)({ quantity: "QTY", label: "DESCRIPTION", score: "KG CO&#x2082;" }, 0),
    ...products.map(toRow()),
    getFooter(products.length + 2, score),
    getEnd(products.length + 3),
  ];
  const str = `<svg width="158" height="${numRows * rowHeight}" 
        viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        <style>
          text, tspan {
              font-family:Avenir,Arial,sans-serif
          }
        </style>
        
        ${content.join('')}</svg>`;

  return str;
}