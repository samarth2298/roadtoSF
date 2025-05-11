document.getElementById('calculate').addEventListener('click', function () {
    var appliance = document.getElementById('appliance').value;
    var energyConsumption = parseFloat(document.getElementById('energy').value);
    var minutesUsed = parseInt(document.getElementById('minutes').value);
    var efficiency = parseInt(document.getElementById('efficiency').value);
    var energySource = document.getElementById('energySource').value;
    var period = document.getElementById('period').value;

    if (isNaN(energyConsumption) || isNaN(minutesUsed) || efficiency < 1 || efficiency > 5) {
        alert('Please enter valid values for energy consumption, minutes, and efficiency.');
        return;
    }

    var carbonFootprint = calculateCarbonFootprint(appliance, energyConsumption, efficiency, energySource, period, minutesUsed);

    document.getElementById('result').innerHTML = "Your estimated carbon footprint is: " + carbonFootprint + " kg CO2";
});

function calculateCarbonFootprint(appliance, energyConsumption, efficiency, energySource, period, minutesUsed) {
    var carbonFactors = {
        tv: 0.5,
        fridge: 0.2,
        microwave: 0.3,
        ac: 2.0,
        other: 1.0
    };

    var energySourceFactors = {
        coal: 1.5,     // High emissions
        natural_gas: 1.0, // Medium emissions
        renewable: 0.2  // Low emissions
    };

    var applianceFactor = carbonFactors[appliance] || carbonFactors.other;
    var energySourceFactor = energySourceFactors[energySource];

    // Adjusting for efficiency (lower value means less consumption)
    var adjustedEnergy = energyConsumption * (6 - efficiency) / 5;

    // Carbon footprint calculation
    var carbonFootprint = adjustedEnergy * applianceFactor * minutesUsed * energySourceFactor;

    if (period === 'month') {
        carbonFootprint *= 30; // For a month calculation
    }

    carbonFootprint = carbonFootprint / 1000; // Convert to kilograms

    return Math.round(carbonFootprint * 100.0) / 100.0; // Round to two decimal places
}