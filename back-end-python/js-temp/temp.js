
const getHEXcluster = async (k, url, showHistogram) => {
    try {
      const response = await axios.get('/getHEXcluster', {
        params: {
          k: k,
          url: url,
          showHistogram: showHistogram
        }
      });
      console.log(response.data); // Handle the response from the backend
    } catch (error) {
      console.error(error); // Handle any errors that occur during the request
    }
  };
  
  const generateImage = async (colorHex, savePath, width = 100, height = 100) => {
    try {
      const response = await axios.get('/generate_image', {
        params: {
          color_hex: colorHex,
          save_path: savePath,
          width: width,
          height: height
        }
      });
      console.log(response.data); // Handle the response from the backend
    } catch (error) {
      console.error(error); // Handle any errors that occur during the request
    }
  };
  
  const CCtoHEX = async (colorList) => {
    try {
      const response = await axios.get('/CCtoHEX', {
        params: {
          colorlist: colorList
        }
      });
      console.log(response.data); // Handle the response from the backend
    } catch (error) {
      console.error(error); // Handle any errors that occur during the request
    }
  };
  
  const HEXtoCC = async (hex) => {
    try {
      const response = await axios.get('/HEXtoCC', {
        params: {
          hex: hex
        }
      });
      console.log(response.data); // Handle the response from the backend
    } catch (error) {
      console.error(error); // Handle any errors that occur during the request
    }
  };
  
  const RGBtoRYB = async (colorList) => {
    try {
      const response = await axios.get('/RGBtoRYB', {
        params: {
          colorlist: colorList
        }
      });
      console.log(response.data); // Handle the response from the backend
    } catch (error) {
      console.error(error); // Handle any errors that occur during the request
    }
  };
  
  const RYBtoRGB = async (colorList) => {
    try {
      const response = await axios.get('/RYBtoRGB', {
        params: {
          colorlist: colorList
        }
      });
      console.log(response.data); // Handle the response from the backend
    } catch (error) {
      console.error(error); // Handle any errors that occur during the request
    }
  };
  
  const complimentary = async (colorList) => {
    try {
      const response = await axios.get('/complimentary', {
        params: {
          colorList: colorList
        }
      });
      console.log(response.data); // Handle the response from the backend
    } catch (error) {
      console.error(error); // Handle any errors that occur during the request
    }
  };
  
  const generateCVDs = async (hex) => {
    try {
      const response = await axios.get('/generateCVDs', {
        params: {
          hex: hex
        }
      });
      console.log(response.data); // Handle the response from the backend
    } catch (error) {
      console.error(error); // Handle any errors that occur during the request
    }
  };
  
  const imgurl = 'https://www.shutterstock.com/shutterstock/photos/2290874791/display_1500/stock-vector-tricycle-called-tuk-tuk-is-popular-ampng-foreign-tourists-in-thailand-2290874791.jpg';
  getHEXcluster(1, imgurl, true);
  CCtoHEX([255, 0, 255]);
  HEXtoCC('#ff0000');
  generateCVDs('#ff00ff');
  console.log(0);