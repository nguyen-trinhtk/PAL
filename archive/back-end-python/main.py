from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import numpy as np
from skimage import io
from daltonlens import simulate
from PIL import Image
import PIL, cv2, os
import json

def getHEXcluster(k: int, url: str, showHistogram: bool):
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
    return color_hex_codes

current_directory = os.getcwd()

def generate_image(color_hex, save_path, width=100, height=100):
    rgb = tuple(int(color_hex[i:i+2], 16) for i in (1, 3, 5))
    image = Image.new("RGB", (width, height), rgb)
    os.makedirs(os.path.dirname(save_path), exist_ok=True)  # Create directory if it doesn't exist
    image.save(save_path)

numbercode = 0

def CCtoHEX(colorlist):
    result = "#"
    for color in colorlist:
        temp = hex(int(color))
        if (color < 16): 
            result += "0" + temp[2:]
        else: result += temp[2:]
    return result

def HEXtoCC(hex):
    #hex to RGB
    R = int(hex[1:3],base = 16)
    G = int(hex[3:5], base = 16)
    B = int(hex[5:7], base = 16)
    return R,G,B

def RGBtoRYB(colorlist):
    R = colorlist[0]
    G = colorlist[1]
    B = colorlist[2]
    #RGB clear whiteness
    white = float(min(R, G, B))
    R = float(R) - white
    G = float(G) - white
    B = float(B) - white

    mg = max(R, G, B)

    #get yellow out
    Y = min(R, G)
    R -= Y
    G -= Y

    if B and G:
        B /= 2.0
        G /= 2.0
    
    Y += G
    B += G

    my = max(R,Y,B)
    if my:
        n = mg/my
        R *= n
        Y *= n
        B *= n

    #add white
    R += white
    Y += white
    B += white

    return R, Y, B

def RYBtoRGB(colorlist):
    R = colorlist[0]
    Y = colorlist[1]
    B = colorlist[2]
    white = float(min(R,Y,B))
    R = float(R) - white
    Y = float(Y) - white
    B = float(B) - white

    my = max(R, Y, B)

    #get green
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
        n = my/mg
        R *= n
        G *= n
        B *= n

    R += white
    G += white
    B += white

    return R, G, B

def complimentary(colorList):
    newR = 255.0 - colorList[0]
    newY = 255.0 - colorList[1]
    newB = 255.0 - colorList[2]
    return newR, newY, newB

def generateCVDs(hex):
    Machado = simulate.Simulator_Machado2009()
    Brettel = simulate.Simulator_Brettel1997()
    #------------Start here------------------------------------------------------------------
    global numbercode
    numbercode += 1
    normal_url = os.path.join(current_directory, 'temp-colors', str(numbercode), 'normal.jpg')
    generate_image(hex, normal_url)
    #------------Protan----------------------------------------------------------------------
    im = np.asarray(PIL.Image.open(normal_url).convert('RGB'))
    protan_im = Machado.simulate_cvd(im, simulate.Deficiency.PROTAN, severity=0.8)
    protan_url = os.path.join(current_directory, 'temp-colors', str(numbercode), 'protan.jpg')
    Image.fromarray(protan_im).save(protan_url)  
    protan_hex = getHEXcluster(1, protan_url, showHistogram=False)[0]
    #------------Deutan----------------------------------------------------------------------
    im = np.asarray(PIL.Image.open(normal_url).convert('RGB'))
    deutan_im = Brettel.simulate_cvd(im, simulate.Deficiency.DEUTAN, severity=0.8)
    deutan_url = os.path.join(current_directory, 'temp-colors', str(numbercode), 'deutan.jpg')
    Image.fromarray(deutan_im).save(deutan_url)  
    deutan_hex = getHEXcluster(1, protan_url, showHistogram=False)[0]
    #------------Tritan (use Brettel)---------------------------------------------------------
    im = np.asarray(PIL.Image.open(normal_url).convert('RGB'))
    tritan_im = Brettel.simulate_cvd(im, simulate.Deficiency.TRITAN, severity=0.8)
    tritan_url = os.path.join(current_directory, 'temp-colors', str(numbercode), 'tritan.jpg')
    Image.fromarray(tritan_im).save(tritan_url)  
    tritan_hex = getHEXcluster(1, tritan_url, showHistogram=False)[0]
    return (protan_hex, deutan_hex, tritan_hex)

def adjust_luminance(hex_code, luminance_factor):
    hex_code = hex_code.lstrip('#')
    rgb = tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))
    adjusted_rgb = tuple(int(min(max(0, channel + (luminance_factor * 255)), 255)) for channel in rgb)
    adjusted_hex_code = '#{:02x}{:02x}{:02x}'.format(*adjusted_rgb)
    return adjusted_hex_code
def json_save(filepath, key, value):
    with open(filepath, 'r') as file:
        data = json.load(file)
    data[key] = value
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)

def generate_from_color(hex_input): 
    ryb_input = RGBtoRYB(HEXtoCC(hex_input))
    lum_og_1 = adjust_luminance(hex_input, 0.4)
    lum_og_2 = adjust_luminance(hex_input, 0.8)
    comp = CCtoHEX(RYBtoRGB(complimentary(ryb_input)))
    lum_com = adjust_luminance(comp, 0.8)
    result = [hex_input, lum_og_1, lum_og_2, comp, lum_com]
    path = os.path.join(current_directory, '0-json/color.json')
    json_save(path, 'normal', result)
    return result

def get_cvds(hex_list, suffix):
    protan = []
    deutan = []
    tritan = []
    for hex in hex_list: 
        result = generateCVDs(hex)
        protan.append(result[0])
        deutan.append(result[1])
        tritan.append(result[2])
    path = os.path.join(current_directory, suffix)
    json_save(path, 'protan', protan)
    json_save(path, 'deutan', deutan)
    json_save(path, 'tritan', tritan)

def color_result(hex_input):
    normal = generate_from_color(hex_input)
    get_cvds(normal, '0-json/color.json')

def photo_result(img_url):
    normal = getHEXcluster(5, img_url, False)
    path = os.path.join(current_directory, '0-json/photo.json')
    json_save(path, 'normal', normal)
    get_cvds(normal, '0-json/photo.json')

color_result('#293810')
photo_result('C:/Users/ADMIN/Documents/myfolder/GitHub/PAL/image-request/upload.jpg')

    
