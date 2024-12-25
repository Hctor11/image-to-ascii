const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });
const port = 3333;

app.use(cors());
app.use(express.json());

const asciiChars = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."];

function pixelToAscii(pixel) {
  const index = Math.floor((pixel / 255) * (asciiChars.length - 1));
  return asciiChars[index];
}

function imageToAscii(buffer) {
  return sharp(buffer)
    .resize({ width: 100 }) // Ajustar el ancho de la salida ASCII
    .grayscale()
    .raw()
    .toBuffer()
    .then((data) => {
      const asciiArt = [];
      for (let i = 0; i < data.length; i += 100) {
        const row = Array.from(data.slice(i, i + 100))
          .map(pixelToAscii)
          .join("");
        asciiArt.push(row);
      }
      return asciiArt.join("\n");
    });
}

app.post("/convert", upload.single("image"), async (req, res) => {
  try {
    const fileBuffer =
      req.file.buffer || require("fs").readFileSync(req.file.path);
    const asciiArt = await imageToAscii(fileBuffer);
    res.status(200).send({ ascii: asciiArt });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the image");
  }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });