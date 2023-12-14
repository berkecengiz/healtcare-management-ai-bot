import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';

// GET /api/doctors
export async function get(req, res) {
    let userId;
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        const decoded = jwt.decode(token);
        userId = decoded.userId;
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await prisma.doctor.findMany({
      where: {
        userId: userId,
      },
    });
    res.json(result);
  }
  

// POST /api/doctors
export async function post(req, res) {
    let userId;
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        const decoded = jwt.decode(token);
        userId = decoded.userId;
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const result = await prisma.doctor.create({
        data: {
          ...req.body,
          userId: userId, // Associate the new doctor with the user
        },
      });
    res.json(result);
}

// DELETE /api/doctors/:id
export async function del(req, res) {
  const { doctorId } = req.params;
  console.log(doctorId);

  try {
    const result = await prisma.doctor.delete({
        where: { id: doctorId },
    });
    res.json(result);
  } catch (error) {
      console.error("Error deleting doctor:", error);
      res.status(500).send("Error deleting doctor");
  }
}

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            await get(req, res);
            break;
    case 'POST':
            await post(req, res);
            break;
    case 'DELETE':
      console.log('delete');
          await del(req, res);
          break;
    default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
  }
}