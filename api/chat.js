export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const { domanda } = req.body;

  if (!domanda) {
    return res.status(400).json({ error: "Domanda mancante" });
  }

  try {
    const risposta = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: domanda
      })
    });

    const data = await risposta.json();

    const testo =
      data.output_text ||
      "Errore: nessuna risposta generata";

    res.status(200).json({ risposta: testo });

  } catch (errore) {
    res.status(500).json({ error: errore.message });
  }
}
