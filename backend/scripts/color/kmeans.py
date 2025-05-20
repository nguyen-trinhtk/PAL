import cv2
import matplotlib.pyplot as plt
import numpy as np
import os
import timeit
from sklearn.cluster import KMeans
from color import Color

def getPalette(image, k=5):
    pixels = cv2.cvtColor(image, cv2.COLOR_BGR2RGB).reshape(-1, 3).astype(np.float32)
    kmeans = KMeans(n_clusters=k, n_init='auto', random_state=42)
    kmeans.fit(pixels)
    centroids = kmeans.cluster_centers_.astype(int)
    palette = [Color(r, g, b) for r, g, b in centroids]
    return palette

# Testing
def plotPalette(colors):
    plt.figure(figsize=(8, 2))
    for i, color in enumerate(colors):
        plt.subplot(1, len(colors), i + 1)
        plt.axis("off")
        plt.imshow(np.ones((10, 10, 3), dtype=np.uint8) * color)
    plt.show()

def test():
    img = cv2.imread(os.getcwd() + '/backend/scripts/test-assets/test.jpg')
    palette = getPalette(img)
    for color in palette: 
        print(color)

# Measure runtime
runtime = timeit.timeit("test()", globals=globals(), number=1)
print(f"Runtime: {runtime:.4f} seconds") # 0.16s comparing to 0.35s
