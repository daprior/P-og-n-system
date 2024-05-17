// Importér OpenAI SDK til at kommunikere med ChatGPT
import OpenAI from "openai";

// Funktion til at sende forespørgsler til ChatGPT
async function sendMessage(req, res) {
    try {
        // Modtag brugerens besked fra request body
        const { message } = req.body;
        console.log('Modtaget besked fra brugeren:', message);

        // Opret en instance af OpenAI med din API-nøgle fra miljøvariablen
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        console.log('OpenAI-instantiering vellykket');

        // Send forespørgsel til ChatGPT's API for at generere svar
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: message }], // Brugerens besked
            model: "gpt-3.5-turbo", // Vælg den ønskede model
            max_tokens: 150, // Angiv maksimalt antal tokens i svaret
        });
        console.log('Forespørgsel sendt til ChatGPT API');

        // Returnér svaret fra ChatGPT
        const botResponse = completion.choices[0].message.content.trim();
        console.log('Modtaget svar fra ChatGPT:', botResponse);
        res.status(200).json(botResponse);
    } catch (error) {
        console.error('Fejl under kommunikation med ChatGPT:', error);
        res.status(500).json('Beklager, der opstod en fejl under behandlingen af din anmodning.');
    }
}

// Eksportér funktionen til brug i API-ruten
export default sendMessage;
