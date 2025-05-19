import numpy as np
class Palette:
    # rethink about the WCAG, maybe just set a threshold instead of aa/aaa
    def __init__(self, colorList, minContrast = 4.5):
        self.__colorList = colorList
        self.__contrastRatioDict = {}
        self.__WCAGDict = {}
        self.__minContrast = minContrast

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

