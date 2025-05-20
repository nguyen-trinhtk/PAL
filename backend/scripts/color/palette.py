import numpy as np
from color import Color
import matplotlib.pyplot as plt
class Palette:
    # rethink about the WCAG, maybe just set a threshold instead of aa/aaa
    def __init__(self, colorList = [], minContrast = 4.5):
        self.__colorList = colorList
        self.__contrastRatioDict = {}
        self.__WCAGDict = {}
        self.__minContrast = minContrast
    
    def __str__(self):
        self.sortByLuminance()
        return "Palette with colors: " + ', '.join([str(color) for color in self.__colorList])

    def addColor(self, color):
        if isinstance(color, Color):
            self.__colorList.append(color)
        else:
            raise ValueError("Input must be a Color object")
        
    def __getitem__(self, index):
        return self.__colorList[index]
    
    def __setitem__(self, index, value):
        if index < len(self.__colorList) and isinstance(value, Color):
            self.__colorList[index] = value

    def sortByLuminance(self):
        self.__colorList.sort(key=lambda color: color.getLuminance())

    def getPalette(self):
        return self.__colorList
    
    def checkContrast(self):
        self.__contrastRatioDict = {}
        for i in range(len(self.__colorList)):
            for j in range(i+1, len(self.__colorList)):
                color1, color2 = self.__colorList[i], self.__colorList[j]
                cRatio = color1.contrastRatio(color2)
                self.__contrastRatioDict.update({(color1, color2):cRatio})
        return self.__contrastRatioDict   
    
    def getMeanContrast(self):
        self.checkContrast()
        return np.mean(list(self.__contrastRatioDict.values()))
    
    def getWCAGCompliance(self):
        for key, value in self.__contrastRatioDict.items():
            if value >= 7.0:
                self.__WCAGDict.update({key: "AAA"})
            elif value >= 4.5:
                self.__WCAGDict.update({key: "AA"})
            else:
                self.__WCAGDict.update({key: "Fail"})
        return self.__WCAGDict
    
    def plot(self):
        colors = self.__colorList
        plt.figure(figsize=(8, 2))
        for i, color_obj in enumerate(colors):
            plt.subplot(1, len(colors), i + 1)
            plt.axis("off")
            rgb = np.array([color_obj._Color__red, color_obj._Color__green, color_obj._Color__blue], dtype=np.uint8)
            img = np.ones((10, 10, 3), dtype=np.uint8) * rgb.reshape((1, 1, 3))
            plt.imshow(img)
        plt.show()


