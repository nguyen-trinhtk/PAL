import numpy as np
from color import Color
from palette import Palette

def rotateHue(h, angle):
    return (h + angle) % 360

def monochromatic(color, numColors=5, minContrast=4.5, step=22):
    h, s, _ = color.toHSL()
    resultPalette = Palette([color])
    contrast = minContrast
    while len(resultPalette.getPalette()) < numColors and contrast > 1.0:
        resultPalette = Palette([color])
        for l in range(10, 101, step):
            newColor = Color()
            newColor.setFromHSL((h, s, l))
            if all(newColor.contrastRatio(existing) >= contrast for existing in resultPalette.getPalette()):
                resultPalette.addColor(newColor)
                if len(resultPalette.getPalette()) >= numColors:
                    break
        contrast -= 0.1
    resultPalette.sortByLuminance()
    return resultPalette

def analogus(color, numColors=5, minContrast=4.5, step=18):
    h, s, _ = color.toHSL()
    resultPalette = Palette([color])
    contrast = minContrast
    while len(resultPalette.getPalette()) < numColors and contrast > 1.0:
        resultPalette = Palette([color])
        for l in range(10, 101, step):
            leftColor = Color()
            leftColor.setFromHSL((rotateHue(h, -30), s, l))
            rightColor = Color()
            rightColor.setFromHSL((rotateHue(h, 30), s, l))
            if all(leftColor.contrastRatio(existing) >= contrast for existing in resultPalette.getPalette()):
                resultPalette.addColor(leftColor)
            if len(resultPalette.getPalette()) >= numColors:
                break
            if all(rightColor.contrastRatio(existing) >= contrast for existing in resultPalette.getPalette()):
                resultPalette.addColor(rightColor)
            if len(resultPalette.getPalette()) >= numColors:
                break
        contrast -= 0.1
    resultPalette.sortByLuminance()
    return resultPalette


def triadic(color, numColors=5, minContrast=4.5, step=18):
    h, s, _ = color.toHSL()
    resultPalette = Palette([color])
    contrast = minContrast
    while len(resultPalette.getPalette()) < numColors and contrast > 1.0:
        resultPalette = Palette([color])
        for l in range(10, 101, step):
            leftColor = Color()
            leftColor.setFromHSL((rotateHue(h, -120), s, l))
            rightColor = Color()
            rightColor.setFromHSL((rotateHue(h, 120), s, l))
            if all(leftColor.contrastRatio(existing) >= contrast for existing in resultPalette.getPalette()):
                resultPalette.addColor(leftColor)
            if len(resultPalette.getPalette()) >= numColors:
                break
            if all(rightColor.contrastRatio(existing) >= contrast for existing in resultPalette.getPalette()):
                resultPalette.addColor(rightColor)
            if len(resultPalette.getPalette()) >= numColors:
                break
        contrast -= 0.1
    resultPalette.sortByLuminance()
    return resultPalette

def complementary(color, numColors=5, minContrast=4.5, step=22):
    h, s, _ = color.toHSL()
    resultPalette = Palette([color])
    contrast = minContrast
    while len(resultPalette.getPalette()) < numColors and contrast > 1.0:
        resultPalette = Palette([color])
        for l in range(10, 101, step):
            comp = Color()
            comp.setFromHSL((rotateHue(h, 180), s, l))
            if all(comp.contrastRatio(existing) >= contrast for existing in resultPalette.getPalette()):
                resultPalette.addColor(comp)
                if len(resultPalette.getPalette()) >= numColors:
                    break
        contrast -= 0.1
    resultPalette.sortByLuminance()
    return resultPalette


def tetradic(color, numColors=5, minContrast=4.5, step=18):
    h, s, _ = color.toHSL()
    resultPalette = Palette([color])
    contrast = minContrast
    hues = [60, 180, 240]
    while len(resultPalette.getPalette()) < numColors and contrast > 1.0:
        resultPalette = Palette([color])
        for l in range(10, 101, step):
            for hueShift in hues:
                c = Color()
                c.setFromHSL((rotateHue(h, hueShift), s, l))
                if all(c.contrastRatio(existing) >= contrast for existing in resultPalette.getPalette()):
                    resultPalette.addColor(c)
                    if len(resultPalette.getPalette()) >= numColors:
                        break
            if len(resultPalette.getPalette()) >= numColors:
                break
        contrast -= 0.1
    resultPalette.sortByLuminance()
    return resultPalette

def splitComplementary(color, numColors=5, minContrast=4.5, step=16):
    h, s, _ = color.toHSL()
    resultPalette = Palette([color])
    contrast = minContrast
    hues = [30, 180, -150]
    while len(resultPalette.getPalette()) < numColors and contrast > 1.0:
        resultPalette = Palette([color])
        for l in range(10, 101, step):
            for hueShift in hues:
                c = Color()
                c.setFromHSL((rotateHue(h, hueShift), s, l))
                if all(c.contrastRatio(existing) >= contrast for existing in resultPalette.getPalette()):
                    resultPalette.addColor(c)
                    if len(resultPalette.getPalette()) >= numColors:
                        break
            if len(resultPalette.getPalette()) >= numColors:
                break
        contrast -= 0.1
    resultPalette.sortByLuminance()
    return resultPalette

