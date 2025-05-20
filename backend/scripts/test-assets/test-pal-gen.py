from generator import *
import matplotlib.pyplot as plt
from color import Color
import numpy as np

def get_all_contrast_ratios(palette):
    colors = palette.getPalette()
    ratios = []
    for i in range(len(colors)):
        for j in range(i+1, len(colors)):
            ratios.append(colors[i].contrastRatio(colors[j]))
    return ratios

def evaluate_steps_for_palette(palette_func, base_colors, step_values, numColors=5, minContrast=4.5):
    step_results = {}
    for step in step_values:
        all_ratios = []
        for base_color in base_colors:
            palette = palette_func(base_color, numColors=numColors, minContrast=minContrast, step=step)
            ratios = get_all_contrast_ratios(palette)
            all_ratios.extend(ratios)
        avg_contrast = np.mean(all_ratios) if all_ratios else 0
        min_contrast = np.min(all_ratios) if all_ratios else 0
        step_results[step] = {'avg': avg_contrast, 'min': min_contrast}
    return step_results

def generate_base_colors(hue_steps=36):
    base_colors = []
    for h_step in range(hue_steps):
        base_hue = h_step * (360 / hue_steps)
        c = Color()
        c.setFromHSL((base_hue, 100, 50))
        base_colors.append(c)
    return base_colors

def plot_step_vs_contrast(step_results, palette_name):
    steps = sorted(step_results.keys())
    avg_contrasts = [step_results[s]['avg'] for s in steps]
    min_contrasts = [step_results[s]['min'] for s in steps]

    plt.figure(figsize=(10,6))
    plt.plot(steps, avg_contrasts, label='Average Contrast')
    plt.plot(steps, min_contrasts, label='Minimum Contrast')
    plt.title(f'Contrast Ratios vs Step for {palette_name} Palette')
    plt.xlabel('Step value (lightness increment)')
    plt.ylabel('Contrast Ratio')
    plt.legend()
    plt.grid(True)
    plt.show()

def generate_palettes_and_collect_contrast():
    palette_functions = {
        'Monochromatic': monochromatic,
        'Analogous': analogus,
        'Triadic': triadic,
        'Complementary': complementary,
        'Tetradic': tetradic,
        'Split Complementary': splitComplementary,
    }
    
    contrast_data = {name: [] for name in palette_functions}

    hue_steps = 36
    for h_step in range(hue_steps):
        base_hue = h_step * (360 / hue_steps)
        base_color = Color()
        base_color.setFromHSL((base_hue, 100, 50))
        
        for name, func in palette_functions.items():
            palette = func(base_color, numColors=5)
            ratios = get_all_contrast_ratios(palette)
            contrast_data[name].extend(ratios)

    return contrast_data



def plot_contrast_ratios(contrast_data):
    plt.figure(figsize=(12, 7))

    for name, ratios in contrast_data.items():
        plt.hist(ratios, bins=30, alpha=0.6, label=name, density=True)

    plt.title("Distribution of Contrast Ratios per Palette Type")
    plt.xlabel("Contrast Ratio")
    plt.ylabel("Density")
    plt.legend()
    plt.grid(True)
    plt.show()


if __name__ == "__main__":
    palette_functions = {
        'Monochromatic': monochromatic,
        'Analogous': analogus,
        'Triadic': triadic,
        'Complementary': complementary,
        'Tetradic': tetradic,
        'Split Complementary': splitComplementary,
    }

    # base_colors = generate_base_colors(hue_steps=36)
    # step_values = range(1, 25, 1)

    # best_steps = {}

    # for name, func in palette_functions.items():
    #     print(f"Evaluating {name} palette...")
    #     results = evaluate_steps_for_palette(func, base_colors, step_values)
    #     best_step = max(results, key=lambda s: results[s]['avg'])
    #     best_avg = results[best_step]['avg']
    #     best_min = results[best_step]['min']
    #     print(f"Best step for {name}: {best_step} (Avg: {best_avg:.2f}, Min: {best_min:.2f})")
    #     best_steps[name] = (best_step, best_avg, best_min)

    #     plot_step_vs_contrast(results, name)
    contrast_data = generate_palettes_and_collect_contrast()
    plot_contrast_ratios(contrast_data)
