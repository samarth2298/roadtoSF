document.getElementById('compare').addEventListener('click', function () {
    const appliance1 = document.getElementById('appliance1').value;
    const appliance2 = document.getElementById('appliance2').value;
    const minutes1 = parseInt(document.getElementById('minutes1').value);
    const minutes2 = parseInt(document.getElementById('minutes2').value);
    const energySource = document.getElementById('energySource').value;

    if (isNaN(minutes1) || isNaN(minutes2)) {
        alert('Please enter valid usage times.');
        return;
    }

    const carbonFactors = {
        tv: 0.5,
        fridge: 0.2,
        microwave: 0.3,
        ac: 2.0,
        other: 1.0
    };

    const energySourceFactors = {
        coal: 1.5,
        natural_gas: 1.0,
        renewable: 0.2
    };

    const factor1 = carbonFactors[appliance1] || 1.0;
    const factor2 = carbonFactors[appliance2] || 1.0;
    const energyFactor = energySourceFactors[energySource];

    const carbon1 = factor1 * minutes1 * energyFactor;
    const carbon2 = factor2 * minutes2 * energyFactor;

    let result = `Appliance 1 emits: ${carbon1.toFixed(2)}g CO₂<br>`;
    result += `Appliance 2 emits: ${carbon2.toFixed(2)}g CO₂<br>`;

    if (carbon1 > carbon2) {
        result += `${appliance1} has a higher carbon impact.`;
    } else if (carbon2 > carbon1) {
        result += `${appliance2} has a higher carbon impact.`;
    } else {
        result += `Both appliances emit the same carbon footprint.`;
    }

    document.getElementById('compareResult').innerHTML = result;
});
