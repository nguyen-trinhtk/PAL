
function CCtoHEX(colorlist) {
    let result = "#";
    for (let color of colorlist) {
      let temp = color.toString(16);
      if (color < 16) {
        result += "0" + temp;
      } else {
        result += temp;
      }
    }
    return result;
  }
  
  function HEXtoCC(hex) {
    let R = parseInt(hex.substr(1, 2), 16);
    let G = parseInt(hex.substr(3, 2), 16);
    let B = parseInt(hex.substr(5, 2), 16);
    return [R, G, B];
  }
  
  function RGBtoRYB(colorlist) {
    let R = colorlist[0];
    let G = colorlist[1];
    let B = colorlist[2];
    
    let white = Math.min(R, G, B);
    R -= white;
    G -= white;
    B -= white;
    
    let mg = Math.max(R, G, B);
    
    let Y = Math.min(R, G);
    R -= Y;
    G -= Y;
    
    if (B && G) {
      B /= 2.0;
      G /= 2.0;
    }
    
    Y += G;
    B += G;
    
    let my = Math.max(R, Y, B);
    
    if (my) {
      let n = mg / my;
      R *= n;
      Y *= n;
      B *= n;
    }
    
    R += white;
    Y += white;
    B += white;
    
    return [R, Y, B];
  }
  
  function RYBtoRGB(colorlist) {
    let R = colorlist[0];
    let Y = colorlist[1];
    let B = colorlist[2];
    
    let white = Math.min(R, Y, B);
    R -= white;
    Y -= white;
    B -= white;
    
    let my = Math.max(R, Y, B);
    
    let G = Math.min(Y, B);
    Y -= G;
    B -= G;
    
    if (B && G) {
      B *= 2.0;
      G *= 2.0;
    }
    
    R += Y;
    G += Y;
    
    let mg = Math.max(R, G, B);
    
    if (mg) {
      let n = my / mg;
      R *= n;
      G *= n;
      B *= n;
    }
    
    R += white;
    G += white;
    B += white;
    
    return [R, G, B];
  }
  
function RGBtoHSL(colorlist) {
  // decimal R, G, B
  var R = colorlist[0] / 255;
  var G = colorlist[1] / 255;
  var B = colorlist[2] / 255;
  var Cmax = Math.max(R, G, B);
  var Cmin = Math.min(R, G, B);
  var L = (Cmax + Cmin) / 2;
  var dif = Cmax - Cmin;
  var H = 0;
  var S = 0;
  var maxIndex = colorlist.indexOf(Cmax);

  if (dif != 0) {
    S = dif / (1 - Math.abs(2 * L - 1));
    if (maxIndex == 0) {
      H = 60 * (((G - B) / dif) % 6);
    } else if (maxIndex == 1) {
      H = 60 * (((B - R) / dif) + 2);
    } else {
      H = 60 * (((R - G) / dif) + 4);
    }
  }
  return [H, S, L];
}

function HSLtoRGB(hsllist) {
  var H = hsllist[0];
  var S = hsllist[1];
  var L = hsllist[2];
  var C = (1 - Math.abs(2 * L - 1)) * S;
  var X = C * (1 - Math.abs((H / 60) % 2 - 1));
  var m = L - C / 2;
  var RGBlist = [];

  if (0 <= H && H < 60) {
    RGBlist = [C, X, 0];
  } else if (60 <= H && H < 120) {
    RGBlist = [X, C, 0];
  } else if (120 <= H && H < 180) {
    RGBlist = [0, C, X];
  } else if (180 <= H && H < 240) {
    RGBlist = [0, X, C];
  } else if (240 <= H && H < 300) {
    RGBlist = [X, 0, C];
  } else {
    RGBlist = [C, 0, X];
  }
  return [(RGBlist[0] + m) * 255, (RGBlist[1] + m) * 255, (RGBlist[2] + m) * 255];
}

//palette creating - not finished
  function complimentary(hex){
    var RGBlist = HEXtoCC(hex);
    var RYBlist = RGBtoRYB(RGBlist);
    var newR = 255.0 - RYBlist[0];
    var newY = 255.0 - RYBlist[1];
    var newB = 255.0 - RYBlist[2];
    return (CCtoHEX([newR, newY, newB]))
  }
  function monochromatic(hex){
    var RGBlist = HEXtoCC(hex);
    var HSLlist = RGBtoHSL(RGBlist);
    return (CCtoHEX([newR, newY, newB]));
  }
  function tetrachordic(hex){
    return 0;
  }



  const input_hex = '#00ffff';
  const colorlist = HEXtoCC(input_hex);
  const ccToHexResult = CCtoHEX(colorlist);
  const rgbToRybResult = RGBtoRYB(colorlist);
  const rybToRgbResult = RYBtoRGB(rgbToRybResult);
  
  console.log("Input HEX: " + input_hex);
  console.log("CC to HEX: " + ccToHexResult);
  console.log("RGB to RYB: " + rgbToRybResult);
  console.log("RYB to RGB: " + rybToRgbResult);


//   reference: 
//   1. http://nishitalab.org/user/UEI/publication/Sugita_IWAIT2015.pdf
//   2. https://bahamas10.github.io/ryb/assets/ryb.pdf