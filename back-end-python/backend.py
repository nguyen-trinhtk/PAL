from flask import Flask, jsonify, request
from PIL import Image
import cv2
import numpy as np
import os
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from skimage import io
from daltonlens import simulate

app = Flask(__name__)

@app.route('/getHEXcluster')
def getHEXcluster():
    k = int(request.args.get('k'))
    url = request.args.get('url')
    showHistogram = bool(request.args.get('showHistogram'))

    img = io.imread(url)
    img_init = img.copy()
    img = img.reshape((img.shape[0] * img.shape[1], img.shape[2]))
    clt = KMeans(n_clusters=k)
    clt.fit(img)
    label_indx = np.arange(0, len(np.unique(clt.labels_)) + 1)
    (hist, _) = np.histogram(clt.labels_, bins=label_indx)
    hist = hist.astype('float')
    hist /= hist.sum()
    if showHistogram:
        bin_width = 300 / len(hist)
        hist_bar = np.zeros((50, 300, 3), dtype="uint8")
        startX = 0
    color_hex_codes = []
    for (percent, color) in zip(hist, clt.cluster_centers_):
        if len(list(map(int, color))) == 3:
            r, g, b = map(int, color)
        elif len(list(map(int, color))) == 4:
            r, g, b, _ = map(int, color)
        else:
            print('conversion error')
        hex_code = '#%02x%02x%02x' % (r, g, b)
        color_hex_codes.append(hex_code)
        if showHistogram:
            endX = startX + (bin_width)
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
    return jsonify(color_hex_codes)

current_directory = os.getcwd()

@app.route('/generate_image')
def generate_image():
    color_hex = request.args.get('color_hex')
    save_path = request.args.get('save_path')
    width = int(request.args.get('width', 100))
    height = int(request.args.get('height', 100))

    rgb = tuple(int(color_hex[i:i+2], 16) for i in (1, 3, 5))
    image = Image.new("RGB", (width, height), rgb)
    os.makedirs(os.path.dirname(save_path), exist_ok=True)  # Create directory if it doesn't exist
    image.save(save_path)

numbercode = 0

@app.route('/CCtoHEX')
def CCtoHEX():
    colorlist = request.args.getlist('colorlist[]')

    result = "#"
    for color in colorlist:
        temp = hex(int(color))
        if (int(color) < 16): 
            result += "0" + temp[2:]
        else:
            result += temp[2:]
    return result

@app.route('/HEXtoCC')
def HEXtoCC():
    hex_code = request.args.get('hex')

    R = int(hex_code[1:3], base=16)
    G = int(hex_code[3:5], base=16)
    B = int(hex_code[5:7], base=16)
    return R, G, B

@app.route('/RGBtoRYB')
def RGBtoRYB():
    colorlist = request.args.getlist('colorlist[]')

    R = int(colorlist[0])
    G = int(colorlist[1])
    B = int(colorlist[2])

    white = float(min(R, G, B))
    R = float(R) - white
    G = float(G) - white
    B = float(B) - white
    mg = max(R, G, B)

    Y = min(R, G)
    R -= Y
    G -= Y

    if B and G:
        B /= 2.0
        G /= 2.0

    Y += G
    B += G
    my = max(R, Y, B)

    if my:
        n = mg / my
        R *= n
        Y *= n
        B *= n

    R += white
    Y += white
    B += white

    return R, Y, B

@app.route('/RYBtoRGB')
def RYBtoRGB():
    colorlist = request.args.getlist('colorlist[]')

    R = int(colorlist[0])
    Y = int(colorlist[1])
    B = int(colorlist[2])

    white = float(min(R, Y, B))
    R = float(R) - white
    Y = float(Y) - white
    B = float(B) - white

    my = max(R, Y, B)
    
    G = min(Y, B)
    Y -= G
    B -= G

    if B and G:
        B *= 2.0
        G *= 2.0

    R += Y
    G += Y
    mg = max(R, G, B)

    if mg:
        n = my / mg
        R *= n
        G *= n
        B *= n

    R += white
    G += white
    B += white

    return R, G, B

@app.route('/complimentary')
def complimentary():
    colorList = request.args.getlist('colorList[]')

    newR = 255.0 - int(colorList[0])
    newY = 255.0 - int(colorList[1])
    newB = 255.0 - int(colorList[2])

    return newR, newY, newB

@app.route('/generateCVDs')
def generateCVDs():
    hex_code = request.args.get('hex')

    Machado = simulate.Simulator_Machado2009()
    Brettel = simulate.Simulator_Brettel1997()

    global numbercode
    numbercode += 1

    normal_url = os.path.join(current_directory, 'temp-colors', str(numbercode), 'normal.jpg')
    generate_image(hex_code, normal_url)

    im = np.asarray(Image.open(normal_url).convert('RGB'))

    protan_im = Machado.simulate_cvd(im, simulate.Deficiency.PROTAN, severity=0.8)
    protan_url = os.path.join(current_directory, 'temp-colors', str(numbercode), 'protan.jpg')
    Image.fromarray(protan_im).save(protan_url)
    protan_hex = getHEXcluster(1, protan_url, showHistogram=False)[0]

    deutan_im = Brettel.simulate_cvd(im, simulate.Deficiency.DEUTAN, severity=0.8)
    deutan_url = os.path.join(current_directory, 'temp-colors', str(numbercode), 'deutan.jpg')
    Image.fromarray(deutan_im).save(deutan_url)
    deutan_hex = getHEXcluster(1, deutan_url, showHistogram=False)[0]

    tritan_im = Brettel.simulate_cvd(im, simulate.Deficiency.TRITAN, severity=0.8)
    tritan_url = os.path.join(current_directory, 'temp-colors', str(numbercode), 'tritan.jpg')
    Image.fromarray(tritan_im).save(tritan_url)
    tritan_hex = getHEXcluster(1, tritan_url, showHistogram=False)[0]

    return jsonify(hex_code=hex_code, protan_hex=protan_hex, deutan_hex=deutan_hex, tritan_hex=tritan_hex)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)