import numpy as np
from color import Color

def relativeLuminance(color):
    r_lin, g_lin, b_lin = color.linearize()
    return 0.2126 * r_lin + 0.7152 * g_lin + 0.0722 * b_lin

def contrastRatio(color1, color2):
    L1, L2 = sorted([relativeLuminance(color1), relativeLuminance(color2)], reverse=True)
    return (L1 + 0.05) / (L2 + 0.05)

def contrastChecker(colorList):
    contrastRatioDict = {}
    for i in range(len(colorList)):
        for j in range(i+1, len(colorList)):
            color1, color2 = colorList[i], colorList[j]
            cRatio = contrastRatio(color1, color2)
            contrastRatioDict.update({(color1, color2):cRatio})
    return contrastRatioDict

def getMeanContrastRatio(contrastRatioDict):
    return np.mean(list(contrastRatioDict.values()))

def getWCAGCompliance(contrastRatioDict):
    WCAGDict = {}
    for key, value in contrastRatioDict.items():
        if value >= 7.0:
            WCAGDict.update({key: "AAA"})
        elif value >= 4.5:
            WCAGDict.update({key: "AA"})
        else:
            WCAGDict.update({key: "Fail"})
    return WCAGDict
