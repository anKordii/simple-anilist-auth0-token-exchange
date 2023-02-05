import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("json spaces", 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/token", async (req, res) => {
  const response = await fetch("https://anilist.co/api/v2/oauth/token", {
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      grant_type: req.body.grant_type,
      client_id: req.body.client_id,
      client_secret: req.body.client_secret,
      code: req.body.code,
      redirect_uri: req.body.redirect_uri,
    }),
  });
  const data = await response.json();
  res.json(data);
});

app.use((req, res, next) => {
  res.status(404).json({
    message: `Route ${req.method}:${req.url} not found`,
    error: "Not Found",
    statusCode: 404,
  });
});

app.listen(PORT, () => console.log(`API Server listening on port ${PORT}`));
