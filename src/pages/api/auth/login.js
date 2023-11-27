import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function login(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.status(200).json({ token });
  } else {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
}
