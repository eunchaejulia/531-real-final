export default async function handler(req, res) {
  try {
    const prompt = req.body.prompt;

    const response = await fetch("https://eunchaejulia-noala.hf.space/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: [prompt] })
    });

    const data = await response.json();
    const reply = data?.data?.[0] || "모델 응답 없음";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ 서버 오류:", err);
    res.status(500).json({ reply: "서버 오류 발생" });
  }
}
