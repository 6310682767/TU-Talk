import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

interface LoginResponse {
  status: boolean;
  displayname_th?: string;
  faculty?: string;
  department?: string;
  email?: string;
  [key: string]: any;
}

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

    const data = await response.json() as LoginResponse;
    console.log('API Response:', data);
    if (data.status === true) {
      res.status(200).json({
        success: true,
        displayname_th: data.displayname_th,
        name: data.displayname_th,
        faculty: data.faculty,        // เพิ่ม faculty
        department: data.department,  // เพิ่ม department
        email: data.email,
      });
    } else {
      res.status(401).json({ success: false, message: 'รหัสผ่านไม่ถูกต้อง' });
    }

  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: err.message || 'เกิดข้อผิดพลาด' });
  }
});

export default router;
