import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Extract and verify the JWT token
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
      const userId = decoded.userId;
      console.log('User ID:', userId);

      // Fetch the user profile from the database
      const userProfile = await prisma.userProfile.findUnique({
        where: { userId: userId }
      });

      if (!userProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.status(200).json(userProfile);
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token" });
      }
      console.error('Server error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
