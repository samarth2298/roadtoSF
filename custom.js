document.getElementById('addCustom').addEventListener('click', function () {
    const name = document.getElementById('customName').value;
    const wattage = parseFloat(document.getElementById('customWattage').value);
    const minutes = parseInt(document.getElementById('customMinutes').value);
    const energySource = document.getElementById('customSource').value;

    if (!name || isNaN(wattage) || isNaN(minutes)) {
        alert('Please enter valid appliance details.');
        return;
    }

    const kWhUsed = (wattage * minutes) / (1000 * 60);

    const energySourceFactors = {
        coal: 1.5,
        natural_gas: 1.0,
        renewable: 0.2
    };

    const carbonFactor = energySourceFactors[energySource] || 1.5;

    const carbonEmission = kWhUsed * carbonFactor * 1000; // Convert to grams

    const result = `
        Custom Appliance: ${name}<br>
        Estimated Emissions: ${carbonEmission.toFixed(2)}g CO₂`;

    document.getElementById('customResult').innerHTML = result;

    // Save to localStorage (optional)
    const customData = {
        name,
        wattage,
        minutes,
        carbonEmission
    };

    let history = JSON.parse(localStorage.getItem('customAppliances')) || [];
    history.push(customData);
    localStorage.setItem('customAppliances', JSON.stringify(history));
});
