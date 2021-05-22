const rangeR = document.getElementById("rangeR");
const rangeG = document.getElementById("rangeG");
const rangeB = document.getElementById("rangeB");
const boxHEX = document.querySelector(".boxHEX");
let boxNumHEX = document.querySelector(".boxHEX").innerText;
const bgHEX = document.querySelector(".container-fluid");

rangeR.addEventListener("change", function (event) {
  let numR = rangeR.value;
  document.getElementById("numR").textContent = numR;

  numR = rgbToHex(Number(numR));
  boxNumHEX = "#" + numR + "0000";
  boxHEX.textContent = boxNumHEX;
  bgHEX.style.backgroundColor = boxNumHEX;

  rangeG.addEventListener("change", function (event) {
    let numG = rangeG.value;
    document.getElementById("numG").textContent = numG;

    numG = rgbToHex(Number(numG));
    boxNumHEX = "#" + numR + numG + "00";
    boxHEX.textContent = boxNumHEX;
    bgHEX.style.backgroundColor = boxNumHEX;

    rangeB.addEventListener("change", function (event) {
      let numB = rangeB.value;
      document.getElementById("numB").textContent = numB;

      numB = rgbToHex(Number(numB));
      boxNumHEX = "#" + numR + numG + numB;
      boxHEX.textContent = boxNumHEX;
      bgHEX.style.backgroundColor = boxNumHEX;
    });
  });
});

function rgbToHex(num) {
  num = Number(num);
  return String(numToHex(parseInt(num / 16))) + String(numToHex(num % 16));
}

function numToHex(num) {
  switch (num) {
    case 10:
      return (num = "A");
      break;
    case 11:
      return (num = "B");
      break;
    case 12:
      return (num = "C");
      break;
    case 13:
      return (num = "D");
      break;
    case 14:
      return (num = "E");
      break;
    case 15:
      return (num = "F");
      break;
    case 0:
      return (num = "0");
      break;
    default:
      return num;
  }
}

// function numToHex(num) {
//   if (num === 10) {
//     return (num = "A");
//   } else if (num === 11) {
//     return (num = "B");
//   } else if (num === 12) {
//     return (num = "C");
//   } else if (num === 13) {
//     return (num = "D");
//   } else if (num === 14) {
//     return (num = "E");
//   } else if (num === 15) {
//     return (num = "F");
//   } else if (num === 0) {
//     return (num = "0");
//   } else {
//     return num;
//   }
// }
