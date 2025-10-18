// post.js — envoie un message aléatoire via le webhook Discord
const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const messages = [
  "💡 Astuce du jour : garde tes commits petits et clairs.",
  "🔥 Ressource utile : https://roadmap.sh",
  "📈 Tip : poster à heures fixes augmente l'engagement.",
  "⏱️ Rappel : fais une sauvegarde de ton projet aujourd'hui.",
  "🧠 Focus : 25 minutes de deep work maintenant ?"
];

async function run() {
  const url = process.env.DISCORD_WEBHOOK;
  if (!url) throw new Error("❌ Variable d'environnement DISCORD_WEBHOOK absente.");

  const msg = messages[Math.floor(Math.random() * messages.length)];

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: msg })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`❌ Erreur Discord: ${res.status} ${res.statusText} — ${text}`);
  }

  console.log("✅ Message envoyé :", msg);
}

run().catch(err => { console.error(err); process.exit(1); });
