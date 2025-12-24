export default async function handler(req, res) {
  const { domanda } = req.body;

if (!domanda) {
  return res.status(400).json({ error: "Domanda mancante" });
}


  const risposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Rispondi in modo chiaro e semplice a qualsiasi domanda."
        },
        {
          role: "user",
          content: domanda
        }
      ]
    })
  });

  const dati = await risposta.json();
  res.json({ risposta: dati.choices[0].message.content });
}
