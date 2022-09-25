const rowHeight = 15;

function Row({ idx }: { idx: number }) {
  const ding = `M8 ${rowHeight * idx + 14} C21.1667 ${
    rowHeight * idx + 14
  } 151 ${rowHeight * idx + 14} 151 ${rowHeight * idx + 14}`;

  return (
    <>
      <rect y={rowHeight * idx} width="158" height="15" fill="white" />
      <path
        d={ding}
        stroke="#808080"
        stroke-width="0.5"
        stroke-dasharray="2 2"
      />
      <text
        fill="#222222"
        style={{ whiteSpace: 'pre' }}
        font-family="Inter"
        font-size="5"
        letter-spacing="0em"
      >
        <tspan x="8" y={rowHeight * idx + 8.8182}>
          QTY
        </tspan>
      </text>
      <text
        fill="#222222"
        style={{ whiteSpace: 'pre' }}
        font-family="Inter"
        font-size="5"
        letter-spacing="0em"
      >
        <tspan x="41" y={rowHeight * idx + 8.8182}>
          DESCRIPTION
        </tspan>
      </text>
      <text
        fill="#222222"
        style={{ whiteSpace: 'pre' }}
        font-family="Inter"
        font-size="5"
        letter-spacing="0em"
      >
        <tspan x="97" y={rowHeight * idx + 8.8182}>
          STATUS
        </tspan>
      </text>
      <text
        fill="#222222"
        style={{ whiteSpace: 'pre' }}
        font-family="Inter"
        font-size="5"
        letter-spacing="0em"
      >
        <tspan x="133" y={rowHeight * idx + 8.8182}>
          KG CO&#x2082;
        </tspan>
      </text>
    </>
  );
}

function Footer({ idx, score }: any) {
  return (
    <>
      <rect y={rowHeight * idx} width="158" height="15" fill="white" />
      <text
        fill="#222222"
        style={{ whiteSpace: 'pre' }}
        font-family="Inter"
        font-size="7"
        font-weight="bold"
        letter-spacing="0em"
      >
        <tspan x="104" y={rowHeight * idx + 10.5455}>
          VEGETARIAN
        </tspan>
      </text>
      <text
        fill="#222222"
        style={{ whiteSpace: 'pre' }}
        font-family="Inter"
        font-size="7"
        font-weight="bold"
        letter-spacing="0em"
      >
        <tspan x="23" y={rowHeight * idx + 10.5455}>
          TOTAL:
        </tspan>
      </text>
      <text
        fill="#222222"
        style={{ whiteSpace: 'pre' }}
        font-family="Inter"
        font-size="7"
        font-weight="bold"
        letter-spacing="0em"
      >
        <tspan x="66" y={rowHeight * idx + 10.5455}>
          {score}
        </tspan>
      </text>
      {/* <path d="M8 46C21.1667 46 151 46 151 46" stroke="#808080" stroke-width="0.5" stroke-dasharray="2 2" /> */}
    </>
  );
}
function End({ idx }: any) {
  const val0 = rowHeight * idx + 15;
  const val1 = rowHeight * idx + 6.96;
  const val2 = rowHeight * idx + 0.4416;
  const val3 = rowHeight * idx;

  const ding = `M20.9122 ${val0}C20.9122 ${val1} 27.4142 ${val2} 35.4339 ${val2}C43.4548 ${val2} 49.9555 ${val1} 49.9555 ${val0}H64.4772C64.4772 ${val1} 70.9791 ${val2} 78.9988 ${val2}C87.0185 ${val2} 93.5216 ${val1} 93.5216 ${val0}L108.043 ${val0}C108.043 ${val1} 114.545 ${val2} 122.565 ${val2}C130.586 ${val2} 137.087 ${val1} 137.087 ${val0}H158V${val3}L-6.67572e-06 ${val3}V${val0}H20.9122Z`;

  return <path d={ding} fill="white" />;
}
function Start({ idx }: any) {
  const val0 = rowHeight * idx;

  const val1 = rowHeight * idx + 8.04;

  const val2 = rowHeight * idx;

  const val3 = rowHeight * idx + 15;

  const ding = `M137.088 ${val2}C137.088 ${val1} 130.586 ${val0} 122.566 ${val0}C114.545 ${val0} 108.044 ${val1} 108.044 ${val2}H93.5228C93.5228 ${val1} 87.0209 ${val0} 79.0012 ${val0}C70.9815 ${val0} 64.4784 ${val1} 64.4784 ${val2}H49.9567C49.9567 ${val1} 43.4548 ${val0} 35.4351 ${val0}C27.4142 ${val0} 20.9135 ${val1} 20.9135 ${val2}H0V${val3}H158V${val2}H137.088Z`;

  return <path d={ding} fill="white" />;
}

function Header({ idx }: any) {
  return <rect y={rowHeight * idx} width="158" height="15" fill="white" />;
}

export default function ReceiptSvg({ receipt, ...props }: any) {
  return (
    <img
      src={`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(toSvgStr(receipt))))}`}
      {...props}
    />
  );
  

  return (
    <div dangerouslySetInnerHTML={{ __html: toSvgStr(receipt) }} {...props} />
  );

  const { receipts: items } = receipt;

  const numRows = items.length + 4;

  const viewBox = `0 0 158 ${numRows * rowHeight}`;

  return (
    <svg
      width="158"
      height={numRows * rowHeight}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Start idx={0} />
      <Header idx={1} />

      {items.map((item: any, idx: number) => (
        <Row key={item._id} idx={idx + 2} />
      ))}

      <Footer idx={items.length + 2} />
      <End idx={items.length + 3} />
    </svg>
  );
}

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
  return `<rect y="${
    rowHeight * idx
  }" width="158" height="15" fill="white"></rect>`;
};
const getFooter = (idx: number, score: number) => {
  return `
        <rect y="${rowHeight * idx
    }" width="158" height="15" fill="white"></rect>
        <text fill="#222222" style="white-space: pre" font-size="7" font-weight="bold" letter-spacing="0em"><tspan x="90" y="${rowHeight * idx + 10.5455
    }">VEGETARIAN</tspan></text>
        <text fill="#222222" style="white-space: pre" font-size="7" font-weight="bold" letter-spacing="0em"><tspan x="8" y="${rowHeight * idx + 10.5455
    }">TOTAL:</tspan></text>
        <text fill="${getColor(score)}" style="white-space: pre" font-size="7" font-weight="bold" letter-spacing="0em"><tspan x="137" y="${rowHeight * idx + 10.5455
    }">${score}</tspan></text>
    `;
};
const toRow =
  (isHeaderRow = false) =>
    (item: any, idx: number) => {

      const { quantity, label, status, score } = item

    // account for start and header rows
    idx += isHeaderRow ? 1 : 2;

    const ding = `M8 ${rowHeight * idx + 14} C21.1667 ${
      rowHeight * idx + 14
    } 151 ${rowHeight * idx + 14} 151 ${rowHeight * idx + 14}`;

    return `
        <rect y="${
          rowHeight * idx
        }" width="158" height="15" fill="white"></rect>
        ${
          isHeaderRow
            ? `<path d="${ding}" stroke="#808080" stroke-width="0.5" stroke-dasharray="2 2"></path>`
            : ''
        }
        <text fill="#222222" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="8" y="${rowHeight * idx + 8.8182
        }">${quantity}</tspan></text>
        <text fill="#222222" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="41" y="${rowHeight * idx + 8.8182
        }">${label}</tspan></text>
        <text fill="#222222" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="97" y="${rowHeight * idx + 8.8182
        }">${status}</tspan></text>
        <text fill="#222222" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="133" y="${rowHeight * idx + 8.8182
        }">${score}</tspan></text>
    `;
  };

// {
//   "data": {
//     "products": [
//       {
//         "quantity": 1,
//         "label": "salat mexicana  a",
//         "score": null
//       },
//       {
//         "quantity": 1,
//         "label": "udelsalat  a",
//         "score": 2.14
//       },
//       {
//         "quantity": 1,
//         "label": "ee mini frikadellen  a",
//         "score": 2.74
//       },
//       {
//         "quantity": 1,
//         "label": "en weizenbrtchen x  a",
//         "score": 0.52
//       }
//     ],
//     "score": 1.8
//   }
// }

const getColor = (score: number) => {

  if (score < 0.5) return "green"
  if (score < 1) return "green" // opacity 0.75
  if (score < 1.5) return "green" // opacity 0.5
  if (score < 2) return "orange"
  if (score < 2.5) return "orange"
  if (score < 3) return "red" // opacity 0.5
  if (score < 3.5) return "red" // opacity 0.75

  return "red"
}

export function toSvgStr(receipt: any) {
  const exampleProduct = {
    quantity: 2,
    label: "mexican salad",
    status: "VEGETARIAN",
    score: 0.2,
  }
  console.log(receipt)

  const { products = [exampleProduct, exampleProduct, exampleProduct], score } = receipt;

  const numRows = products.length + 4;

  const viewBox = `0 0 158 ${numRows * rowHeight}`;

  const content = [
    getStart(0),
    getHeader(1),
    toRow(true)({ quantity: "QTY", label: "DESCRIPTION", status: "STATUS", score: "KG CO&#x2082;" }, 0),
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
