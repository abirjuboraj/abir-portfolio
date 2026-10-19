const sharp = require('sharp');
const path = require('path');

function rgb2hsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, v];
}

async function removeBackground() {
  const inputPath = path.resolve(__dirname, '../public/photo.jpg');
  const outputPath = path.resolve(__dirname, '../public/photo-nobg.png');

  console.log('Loading image from:', inputPath);
  const resized = sharp(inputPath).resize(1200, 1500, { fit: 'cover' });
  const { data, info } = await resized.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;
  console.log(`Processing ${width}x${height} image...`);

  const isBgPixel = new Uint8Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const [h, s, v] = rgb2hsv(r, g, b);

      // Studio green background:
      // Hair is protected by strict upper hue limit of 188° in upper body
      const maxHue = y < 1350 ? 188 : 215;
      const isTealOrGreen = (h >= 140 && h <= maxHue);
      const isLowRed = r < 95;
      const isGreenDom = (g > r + 8);
      const isBgGreen = isTealOrGreen && isLowRed && isGreenDom && v > 0.08 && (v < 0.65 || s > 0.25);

      if (isBgGreen) {
        isBgPixel[y * width + x] = 1;
      }

      // Bottom corner shadow check
      if (y > 1430 && (x > 710 || x < 230)) {
        if (r < 95 && (g > r || b > r)) {
          isBgPixel[y * width + x] = 1;
        }
      }
    }
  }

  // Flood fill from outer edges
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let qHead = 0;
  let qTail = 0;

  for (let x = 0; x < width; x++) {
    if (isBgPixel[x]) {
      visited[x] = 1;
      queue[qTail++] = x;
    }
    const bIdx = (height - 1) * width + x;
    if (isBgPixel[bIdx]) {
      visited[bIdx] = 1;
      queue[qTail++] = bIdx;
    }
  }

  for (let y = 0; y < height; y++) {
    const lIdx = y * width;
    if (isBgPixel[lIdx] && !visited[lIdx]) {
      visited[lIdx] = 1;
      queue[qTail++] = lIdx;
    }
    const rIdx = y * width + (width - 1);
    if (isBgPixel[rIdx] && !visited[rIdx]) {
      visited[rIdx] = 1;
      queue[qTail++] = rIdx;
    }
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  while (qHead < qTail) {
    const curr = queue[qHead++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    for (let d = 0; d < 4; d++) {
      const nx = cx + dx[d];
      const ny = cy + dy[d];
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx] && isBgPixel[nIdx]) {
          visited[nIdx] = 1;
          queue[qTail++] = nIdx;
        }
      }
    }
  }

  // Binary mask
  const rawMask = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i++) {
    rawMask[i] = visited[i] ? 0 : 255;
  }

  // Clean floating noise:
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      if (rawMask[idx] === 255) {
        let opaqueNeighbors = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            if (rawMask[(y + ky) * width + (x + kx)] === 255) {
              opaqueNeighbors++;
            }
          }
        }
        if (opaqueNeighbors <= 3) {
          rawMask[idx] = 0;
        }
      }
    }
  }

  // Soft feathering (3x3 blur)
  const featheredMask = new Float32Array(width * height);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sum = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          sum += rawMask[(y + ky) * width + (x + kx)];
        }
      }
      featheredMask[y * width + x] = sum / 9;
    }
  }

  // Edge pixels
  for (let x = 0; x < width; x++) {
    featheredMask[x] = rawMask[x];
    featheredMask[(height - 1) * width + x] = rawMask[(height - 1) * width + x];
  }
  for (let y = 0; y < height; y++) {
    featheredMask[y * width] = rawMask[y * width];
    featheredMask[y * width + width - 1] = rawMask[y * width + width - 1];
  }

  // Build RGBA output
  const outData = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pIdx = y * width + x;
      const inIdx = pIdx * channels;
      const outIdx = pIdx * 4;

      let r = data[inIdx];
      let g = data[inIdx + 1];
      let b = data[inIdx + 2];
      let alpha = featheredMask[pIdx];

      // Smooth bottom edge fade (lowest 30px fade cleanly to 0)
      if (y > height - 35) {
        alpha *= (height - 1 - y) / 35;
      }

      // Spill suppression on transition pixels:
      if (alpha > 0 && alpha < 255) {
        const maxRB = Math.max(r, b * 0.95);
        if (g > maxRB) {
          g = Math.round(maxRB);
        }
      }

      outData[outIdx] = r;
      outData[outIdx + 1] = g;
      outData[outIdx + 2] = b;
      outData[outIdx + 3] = Math.round(alpha);
    }
  }

  console.log('Writing output PNG...');
  await sharp(outData, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png({ compressionLevel: 8 })
    .toFile(outputPath);

  console.log('Successfully created:', outputPath);
}

removeBackground().catch(console.error);
