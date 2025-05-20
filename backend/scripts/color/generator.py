import numpy as np
from color import Color
from palette import Palette

def rotateHue(h, angle):
    return (h + angle) % 360

def monochromatic(color):
    h, s, l = color.toHSL()
    lMod = l % 20
    palette = Palette([color])
    for i in range(5):
        currentL = 20*i + lMod
        if currentL == l:
            continue
        currentColor = Color()
        currentColor.setFromHSL((h, s, currentL))
        palette.addColor(currentColor)
    palette.sortByLuminance()
    return palette


# currently 2-4 colors
def analogus(color):
    h, s, l = color.toHSL()
    palette = Palette([color])
    left = Color()
    right = Color()
    left.setFromHSL((rotateHue(h, -30), s, l))
    right.setFromHSL((rotateHue(h, 30), s, l))
    palette.addColor(left)
    palette.addColor(right)
    return palette

def triadic(color):
    h, s, l = color.toHSL()
    palette = Palette([color])
    left = Color()
    right = Color()
    left.setFromHSL((rotateHue(h, -120), s, l))
    right.setFromHSL((rotateHue(h, 120), s, l))
    palette.addColor(left)
    palette.addColor(right)
    return palette

# currently 3-4 colors
def complementary(color):
    h, s, l = color.toHSL()
    palette = Palette([color])
    comp = Color()
    comp.setFromHSL((rotateHue(h, 180), s, l))
    palette.addColor(comp)
    return palette

def tetradic(color):
    h, s, l = color.toHSL()
    palette = Palette([color])
    one = Color()
    two = Color()
    three = Color()
    one.setFromHSL((rotateHue(h, 60), s, l))
    two.setFromHSL((rotateHue(h, 180), s, l))
    three.setFromHSL((rotateHue(h, 240), s, l))
    palette.addColor(one)
    palette.addColor(two)
    palette.addColor(three)
    return palette

def splitComplementary(color):
    h, s, l = color.toHSL()
    palette = Palette([color])
    one = Color()
    two = Color()
    three = Color()
    one.setFromHSL((rotateHue(h, 30), s, l))
    two.setFromHSL((rotateHue(h, 180), s, l))
    three.setFromHSL((rotateHue(h, -150), s, l))
    palette.addColor(one)
    palette.addColor(two)
    palette.addColor(three)
    return palette

color = Color(255, 4, 65)
palette = splitComplementary(color)
palette.plot()


'''
import numpy as np
from color import Color
from palette import Palette

def rotateHue(h, angle):
    return (h + angle) % 360

def generateHighContrastPalette(base_color, count=5):
    h, s, l = base_color.toHSL()
    palette = Palette([base_color])
    
    # Generate evenly spaced hues around the circle
    hue_step = 360 // count
    base_hues = [(rotateHue(h, i * hue_step)) for i in range(1, count)]
    
    # Programmatically vary saturation and luminance
    for i, new_h in enumerate(base_hues):
        new_s = 100 - (i * 15 % 50)  # Vary saturation between 50–100
        new_l = 30 + (i * 20 % 40)   # Vary luminance between 30–70

        color = Color()
        color.setFromHSL((new_h, new_s, new_l))
        
        # Optional: check perceptual contrast with base_color here

        palette.addColor(color)
    palette.sortByLuminance()
    return palette
'''
