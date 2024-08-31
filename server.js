const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由处理电话号码查询请求
app.post('/lookup', async (req, res) => {
  const phoneNumber = req.body.phone;
  const apiKey = process.env.TRUECALLER_API_KEY;

  try {
    // 调用 Truecaller API
    const response = await axios.get(`https://api.truecaller.com/v1/lookup/${phoneNumber}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    });

    // 返回查询结果
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Truecaller' });
  }
});

// 监听端口
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
