async function run() {

    // BAIXA O JSON
    const response = await fetch(
        "https://raw.githubusercontent.com/ulisses-jurisdev/StoriaRanking/main/assets/ranking.json"
    );

    const data = await response.json();

    // TOP 10
    const top = data.season.slice(0, 10);

    let desc = "";

    top.forEach((p, i) => {

        const medal =
            i === 0 ? "🥇" :
            i === 1 ? "🥈" :
            i === 2 ? "🥉" :
            "▫️";

        desc += `${medal} **${p.name}** Lv.${p.level}\n`;
        desc += `└ ${Number(p.exp).toLocaleString()} EXP\n\n`;
    });

    // EMBED
    const payload = {
        embeds: [
            {
                title: "🏆 Ranking Mensal",
                description: desc,
                color: 16755200,
                footer: {
                    text: `Season ${data.seasonKey} • Atualizado em ${data.updatedAt}`
                }
            }
        ]
    };

    // ENVIA PRO DISCORD
    await fetch(process.env.WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    console.log("Ranking enviado!");
}

run();