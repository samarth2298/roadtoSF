document.getElementById('checkPlan').addEventListener('click', function () {
    const activities = {
        ac: { label: "AC", factor: 2.0 },
        fridge: { label: "Fridge", factor: 0.2 },
        microwave: { label: "Microwave", factor: 0.3 },
        tv: { label: "TV", factor: 0.5 }
    };

    const energySourceFactor = 1.0;
    const energyConsumption = 1.0;

    let totalCO2 = 0;
    let breakdown = "";
    let exceeded = false;

    for (let key in activities) {
        const minutes = parseFloat(document.getElementById(key).value) || 0;
        const appliance = activities[key];

        const emission = (minutes * energyConsumption * appliance.factor * energySourceFactor) / 1000;
        totalCO2 += emission;

        breakdown += `<li>${appliance.label}: ${minutes} min → ${emission.toFixed(2)} kg CO₂</li>`;
    }

    const limit = parseFloat(document.getElementById('dailyLimit').value);
    const resultDiv = document.getElementById('optimizationResult');

    if (isNaN(limit) || limit <= 0) {
        resultDiv.innerHTML = "❌ Please enter a valid CO₂ limit.";
        return;
    }

    if (totalCO2 > limit) {
        exceeded = true;
    }

    resultDiv.innerHTML = `
      <h3>Total CO₂ Emissions: ${totalCO2.toFixed(2)} kg</h3>
      <ul>${breakdown}</ul>
      <p style="color: ${exceeded ? 'red' : 'green'};">
        ${exceeded ? "⚠️ You are over your limit! Try reducing high-usage items like AC or TV." : "✅ You're within your CO₂ limit. Good job!"}
      </p>
    `;
});
