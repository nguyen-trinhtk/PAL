import numpy as np
import colorsys
class Color:
    rgbToXyz = np.array([[0.4124, 0.3576, 0.1805],
                        [0.2126, 0.7152, 0.0722],
                        [0.0193, 0.1192, 0.9505]])
    xyzToRgb = np.linalg.inv(rgbToXyz)
    xyzToLms= np.array([[0.4002, 0.7076, -0.0808],
                        [-0.2263, 1.1653, 0.0457],
                        [0.0000, 0.0000, 0.9182]])
    lmsToXyz = np.linalg.inv(xyzToLms)

    @staticmethod
    def fromLMS(lms):
        xyz = np.dot(Color.lmsToXyz, lms)
        linRgb = np.dot(Color.xyzToRgb, xyz)
        r, g, b = Color.nonLinearize(linRgb[0], linRgb[1], linRgb[2])
        return r, g, b
    
    @staticmethod
    def nonLinearize(r, g, b):  # Gamma corrected RGB
        r = np.where(r <= 0.0031308, 12.92 * r, 1.055 * (r ** (1 / 2.4)) - 0.055)
        g = np.where(g <= 0.0031308, 12.92 * g, 1.055 * (g ** (1 / 2.4)) - 0.055)
        b = np.where(b <= 0.0031308, 12.92 * b, 1.055 * (b ** (1 / 2.4)) - 0.055)
        r = int(np.clip(r * 255.0, 0, 255))
        g = int(np.clip(g * 255.0, 0, 255))
        b = int(np.clip(b * 255.0, 0, 255))
        return r, g, b
    
    def __init__(self, red = 0, green = 0, blue = 0):
        self.__red = red
        self.__green = green
        self.__blue = blue
        self.validateColor()

    def __str__(self):
        return self.toHex()
    
    def validateColor(self):
        if self.__red < 0 or self.__red > 255:
            raise ValueError("Red value must be between 0 and 255")
        if self.__green < 0 or self.__green > 255:
            raise ValueError("Green value must be between 0 and 255")
        if self.__blue < 0 or self.__blue > 255:
            raise ValueError("Blue value must be between 0 and 255")
        
    def getRed(self):
        return self.__red
    
    def getGreen(self):
        return self.__green
    
    def getBlue(self):
        return self.__blue
    
    def getRGB(self):
        return self.__red, self.__green, self.__blue
    
    def getYellow(self):
        return self.toRYB()[1]
    
    def toHex(self):
        return '#{:02x}{:02x}{:02x}'.format(self.__red, self.__green, self.__blue)
    
    def setFromHex(self, hexColor):
        if not isinstance(hexColor, str) or not hexColor.startswith('#') or len(hexColor) != 7:
            raise ValueError("Input must be a hex string in the format '#RRGGBB'")
        self.__red = int(hexColor[1:3], 16)
        self.__green = int(hexColor[3:5], 16)
        self.__blue = int(hexColor[5:7], 16)
        self.validateColor()

    def toHSL(self):
        h, l, s = colorsys.rgb_to_hls(self.__red / 255.0, self.__green / 255.0, self.__blue / 255.0)
        return round(h * 360), round(s*100), round(l*100)
    
    def setFromHSL(self, hslList):
        h, s, l = hslList[0], hslList[1], hslList[2]
        if not (0 <= h <= 360 and 0 <= s <= 100 and 0 <= l <= 100):
            raise ValueError("HSL values must be in the ranges: H(0-360), S(0-100), L(0-100)")
        h /= 360.0
        s /= 100.0
        l /= 100.0
        r, g, b = colorsys.hls_to_rgb(h, l, s)
        self.__red = round(r * 255)
        self.__green = round(g * 255)
        self.__blue = round(b * 255)
        self.validateColor()
        return self.__red, self.__green, self.__blue

    def linearize(self):  # sRGB to linear RGB
        r = self.__red / 255.0
        g = self.__green / 255.0
        b = self.__blue / 255.0
        r = np.where(r <= 0.03928, r / 12.92, ((r + 0.055) / 1.055) ** 2.4)
        g = np.where(g <= 0.03928, g / 12.92, ((g + 0.055) / 1.055) ** 2.4)
        b = np.where(b <= 0.03928, b / 12.92, ((b + 0.055) / 1.055) ** 2.4)
        return float(r), float(g), float(b)

    def toLMS(self):
        r, g, b = self.linearize()
        xyz = np.dot(Color.rgbToXyz, [r, g, b])
        lms = np.dot(Color.xyzToLms, xyz)
        return lms.tolist()
    
    def getLuminance(self):
        r, g, b = self.linearize()
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
    
    def contrastRatio(self, other):
        L1, L2 = sorted([self.getLuminance(), other.getLuminance()], reverse=True)
        return (L1 + 0.05) / (L2 + 0.05)


