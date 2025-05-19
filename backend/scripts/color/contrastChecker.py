
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
