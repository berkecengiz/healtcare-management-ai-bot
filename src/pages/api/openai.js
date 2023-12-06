// pages/api/openai.js
import axios from 'axios';

// Create an instance of OpenAI with your API key
// const openai = new OpenAI({ apiKey: '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' });

function constructUserProfileMessage(userProfile) {
    // Example: Construct a message based on user profile fields
    return `The user is ${userProfile.age} years old, has a height of ${userProfile.height}, weight of ${userProfile.weight}, heart rate of ${userProfile.heartRate}, and vo2Max is ${userProfile.vo2Max}.`;
}


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a chatbot that answers questions about the healthcare domain." },
                { role: "system", content: constructUserProfileMessage(req.body.userProfile) },
                { role: "user", content: req.body.userQuestion }
            ]
        };
        console.log('API KEY', process.env.OPENAI_API_KEY)
        const headers = {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers: headers });
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error communicating with OpenAI:', error);
            res.status(500).json({ message: 'Error communicating with OpenAI', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

