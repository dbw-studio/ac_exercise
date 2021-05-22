const convert = document.querySelector(".btn-convert");

convert.addEventListener("click", function (event) {
  const colorR = document.getElementById("colorR").value;
  const colorG = document.getElementById("colorG").value;
  const colorB = document.getElementById("colorB").value;

  if (colorR === "" || colorG === "" || colorB === "") {
    alert("RGB數值未完整輸入，請重新輸入");
  }

  //因為要保留空值去判斷輸入狀況，所以上面不轉Number，到下面再轉
  const numR = Number(colorR);
  const numG = Number(colorG);
  const numB = Number(colorB);

  if (
    numR < 0 ||
    numR > 255 ||
    numG < 0 ||
    numG > 255 ||
    numB < 0 ||
    numB > 255
  ) {
    alert("數值需介於0~255，請重新輸入");
  }

  if (isNaN(numR) || isNaN(numG) || isNaN(numB)) {
    alert("輸入值中有文字，請重新輸入數字0~255");
  }

  //調整RGB小色塊的顏色
  document.querySelector(".color-R").style.backgroundColor =
    "#" + rgbToHex(numR) + "0000";
  document.querySelector(".color-G").style.backgroundColor =
    "#00" + rgbToHex(numG) + "00";
  document.querySelector(".color-B").style.backgroundColor =
    "#0000" + rgbToHex(numB);

  //調整並呈現HEX的顏色
  let hexColor = rgbToHex(numR) + rgbToHex(numG) + rgbToHex(numB);
  document.querySelector(".color-HEX").style.backgroundColor = "#" + hexColor;

  //調整並呈現HEX的色碼
  document.getElementById("colorHEX").value = hexColor;
});

function rgbToHex(num) {
  return String(numToHex(parseInt(num / 16))) + String(numToHex(num % 16));
}

function numToHex(num) {
  if (num === 10) {
    return (num = "A");
  } else if (num === 11) {
    return (num = "B");
  } else if (num === 12) {
    return (num = "C");
  } else if (num === 13) {
    return (num = "D");
  } else if (num === 14) {
    return (num = "E");
  } else if (num === 15) {
    return (num = "F");
  } else if (num === 0) {
    return (num = "0");
  } else {
    return num;
  }
}
