import express from 'express';
import http from 'http';
import multer from 'multer';
import tesseract from 'node-tesseract-ocr';

const app: express.Express = express();
const httpServer = http.createServer(app);
app.use((req, res, next) => {
  console.log('default ', req.path, req.body);
  next();
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/ocr', (req, res) => {
  console.log('posted', req);
  multer({dest: 'uploads/'}).single('test')(req, res, async () => {
    console.log(req);
    const filePath = req.file?.path;
    if (filePath) {
      const result = await tesseract.recognize(filePath, {
        lang: 'jpn',
        psm: 6,
        'tessdata-dir': './',
      });
      res.json({
        result,
      });
    } else {
      res.json({
        result: '',
      });
    }
  });
});

const PORT = process.env.PORT || 3100;
httpServer.listen(PORT, () => {
  console.log(`Start on port ${PORT}.`);
});
