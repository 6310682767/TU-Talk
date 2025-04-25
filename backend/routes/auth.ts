import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { studentId, citizenId } = req.body;

  try {
    const response = await fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Application-Key': process.env.APPLICATION_KEY || '',
      },
      body: JSON.stringify({
        UserName: studentId,
        PassWord: citizenId,
      }),
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: err.message || 'เกิดข้อผิดพลาด' });
  }
});

export default router;
