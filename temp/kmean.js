// Define the K-means clustering function
function kMeansClustering(data, k) {
    // Initialize cluster centroids randomly
    let centroids = [];
    for (let i = 0; i < k; i++) {
      centroids.push(data[Math.floor(Math.random() * data.length)]);
    }
  
    // Assign data points to clusters
    let clusters = [];
    for (let i = 0; i < data.length; i++) {
      const point = data[i];
      const distances = centroids.map(centroid => euclideanDistance(point, centroid));
      const clusterIndex = distances.indexOf(Math.min(...distances));
      if (!clusters[clusterIndex]) {
        clusters[clusterIndex] = [];
      }
      clusters[clusterIndex].push(point);
    }
  
    // Update cluster centroids
    centroids = clusters.map(cluster => calculateCentroid(cluster));
  
    // Repeat until convergence or maximum iterations
    const maxIterations = 100;
    let iterations = 0;
    while (iterations < maxIterations) {
      // Assign data points to clusters
      clusters = [];
      for (let i = 0; i < data.length; i++) {
        const point = data[i];
        const distances = centroids.map(centroid => euclideanDistance(point, centroid));
        const clusterIndex = distances.indexOf(Math.min(...distances));
        if (!clusters[clusterIndex]) {
          clusters[clusterIndex] = [];
        }
        clusters[clusterIndex].push(point);
      }
  
      // Update cluster centroids
      const newCentroids = clusters.map(cluster => calculateCentroid(cluster));
  
      // Check for convergence
      let converged = true;
      for (let i = 0; i < centroids.length; i++) {
        if (!arraysEqual(centroids[i], newCentroids[i])) {
          converged = false;
          break;
        }
      }
  
      if (converged) {
        break;
      }
  
      centroids = newCentroids;
      iterations++;
    }
  
    return centroids;
  }
  
  // Euclidean distance function
  function euclideanDistance(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += Math.pow(a[i] - b[i], 2);
    }
    return Math.sqrt(sum);
  }
  
  // Calculate centroid function
  function calculateCentroid(points) {
    const centroid = Array(points[0].length).fill(0);
    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < points[i].length; j++) {
        centroid[j] += points[i][j];
      }
    }
    for (let i = 0; i < centroid.length; i++) {
      centroid[i] /= points.length;
    }
    return centroid;
  }
  
  // Array equality function
  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  
// Modify the generateColorPalette function
function generateColorPalette(imageData, k) {
    // Convert the imageData to a 2D array of pixels
    const pixels = [];
    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      pixels.push([r, g, b]);
    }
  
    // Apply K-means clustering
    const centroids = kMeansClustering(pixels, k);
  
    // Convert the centroids to color hex codes
    const colorPalette = centroids.map((color) => {
      const [r, g, b] = color.map((val) => Math.round(val));
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    });
  
    return colorPalette;
  }

  // Example usage
  const image = new Image();
  image.src = '../assets/splash.png';
  image.onload = function() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, image.width, image.height).data;
    const k = 100; // Number of colors in the palette
    const colorPalette = generateColorPalette(imageData, k);
    console.log("Color palette:"+colorPalette);
  };