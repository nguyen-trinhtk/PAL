from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import numpy as np
import cv2
from skimage import io

url = "./assets/yellow.png"

def getHEXcluster(k: int, url: str, showHistogram: bool):
    img = io.imread(url)
    img_init = img.copy()
    img = img.reshape((img.shape[0] * img.shape[1],img.shape[2]))
    clt = KMeans(n_clusters = k)
    clt.fit(img)
    label_indx = np.arange(0,len(np.unique(clt.labels_)) + 1)
    (hist, _) = np.histogram(clt.labels_, bins = label_indx)
    hist = hist.astype('float')
    hist /= hist.sum()

    if showHistogram:
        bin_width = 300 / len(hist)
        hist_bar = np.zeros((50, 300, 3), dtype = "uint8")
        startX = 0

    color_hex_codes = []

    for (percent, color) in zip(hist,  clt.cluster_centers_):
        if len(list(map(int, color))) == 3:
            r, g, b = map(int, color)
        elif len(list(map(int, color))) == 4:
            r, g, b, _ = map(int, color)
        else:
            print('conversion error')
        hex_code = '#%02x%02x%02x' % (r, g, b)
        color_hex_codes.append(hex_code)
        if showHistogram:
            endX = startX + (bin_width) # to match grid
            cv2.rectangle(hist_bar, (int(startX), 0), (int(endX), 50), color.astype("uint8").tolist(), -1)
            startX = endX
    if showHistogram:
        plt.figure(figsize=(15, 15))
        plt.subplot(121)
        plt.imshow(img_init)
        plt.subplot(122)
        plt.imshow(hist_bar)
        plt.show()
    color_hex_codes = sorted(color_hex_codes)
    return color_hex_codes

print(getHEXcluster(6, url, showHistogram=True))