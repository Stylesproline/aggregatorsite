export default function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const fs = require('fs');
    const path = require('path');

    const filePath = path.join(process.cwd(), 'public', 'ads.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const ads = JSON.parse(data);

    res.status(200).json(ads);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
