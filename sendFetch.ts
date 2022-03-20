import fetch, {RequestInit} from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

const formData = new FormData();

const filePath = `./images/e776ec3d23e7255c09c2a0def7b19474`;
const stats = fs.statSync(filePath);
const fileSizeInBytes = stats.size;
const fileStream = fs.createReadStream(filePath);
formData.append('test', fileStream, {knownLength: fileSizeInBytes});

// 送信用データを設定
const options: RequestInit = {
  method: 'POST',
  body: formData,
};

// ここで明示的に消してあげる

// 設定したデータをPOST
fetch('http://localhost:3100/ocr', options);
