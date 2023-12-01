import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      // Extract and verify the JWT token
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      // Extract updated profile data from the request body
      const { name, age, height, weight, heartRate, vo2Max } = req.body;

      // Update the user profile in the database
      const updatedProfile = await prisma.userProfile.update({
        where: { userId: userId },
        data: {
          name,
          age,
          height,
          weight,
          heartRate,
          vo2Max
        },
      });

      return res.status(200).json(updatedProfile);
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token" });
      }
      console.error('Server error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
