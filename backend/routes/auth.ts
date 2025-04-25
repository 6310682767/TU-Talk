import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

interface TUAuthResponseSuccess {
  status: true;
  firstname: string;
  lastname: string;
}

interface TUAuthResponseError {
  status: false;
  message: string;
}

type TUAuthResponse = TUAuthResponseSuccess | TUAuthResponseError;

router.post('/login', async (req, res) => {
  const { student_id, citizen_id } = req.body;

  try {
    const response = await fetch('https://restapi.tu.ac.th/api/v1/auth/AdLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Application-Key': 'YOUR_APPLICATION_KEY', // แทนด้วย key ที่ได้จาก มธ.
        'Request-URL': 'https://tu-talk.app/login', // เปลี่ยนเป็น URL ของแอป
      },
      body: JSON.stringify({
        UserName: student_id,
        PassWord: citizen_id,
      }),
    });

    const data = (await response.json()) as TUAuthResponse;

    if (data.status) {
      res.status(200).json({
        success: true,
        name: `${data.firstname} ${data.lastname}`,
      });
    } else {
      res.status(401).json({
        success: false,
        message: data.message,
      });
    }
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: err.message || 'เกิดข้อผิดพลาด' });
  }
});

export default router;
