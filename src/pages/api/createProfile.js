import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Extract and verify the JWT token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Extract profile data from the request body
    const { name, age, height, weight, heartRate, vo2Max } = req.body;

    // Create a new user profile in the database
    const userProfile = await prisma.userProfile.create({
      data: {
        name,
        age: parseInt(age, 10),
        height,
        weight,
        heartRate,
        vo2Max,
        user: {
          connect: {
            id: userId
          }
        }
      },
    });

    return res.status(200).json(userProfile);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.error('Server error:', error);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
