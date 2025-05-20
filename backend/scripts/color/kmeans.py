import cv2
import matplotlib.pyplot as plt
import numpy as np
import os
import timeit
from sklearn.cluster import KMeans
from color import Color
from palette import Palette

def getPalette(image, k=5):
    pixels = cv2.cvtColor(image, cv2.COLOR_BGR2RGB).reshape(-1, 3).astype(np.float32)
    kmeans = KMeans(n_clusters=k, n_init='auto', random_state=42)
    kmeans.fit(pixels)
    centroids = kmeans.cluster_centers_.astype(int)
    palette = Palette([Color(r, g, b) for r, g, b in centroids])
    return palette


def test():
    img = cv2.imread(os.getcwd() + '/backend/scripts/test-assets/test.jpg')
    palette = getPalette(img)
    print(palette)

# Measure runtime
runtime = timeit.timeit("test()", globals=globals(), number=1)
print(f"Runtime: {runtime:.4f} seconds") # 0.16s comparing to 0.35s
