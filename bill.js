document.getElementById('calculateBill').addEventListener('click', function () {
    const appliance = document.getElementById('appliance').value;
    const wattage = parseFloat(document.getElementById('wattage').value);
    const minutesUsed = parseInt(document.getElementById('minutes').value);
    const energySource = document.getElementById('energySource').value;

    if (isNaN(wattage) || isNaN(minutesUsed) || minutesUsed < 1) {
        alert('Please enter valid wattage and usage time.');
        return;
    }

    const kWhUsed = (wattage * minutesUsed) / (1000 * 60); // watts to kWh

    const sourceMultiplier = {
        coal: 6,
        natural_gas: 5,
        renewable: 4
    };

    const pricePerKwh = sourceMultiplier[energySource] || 6; // Rs per kWh

    const estimatedBill = kWhUsed * pricePerKwh;

    document.getElementById('billResult').innerHTML = 
        `Estimated Electricity Bill: ₹${estimatedBill.toFixed(2)}`;
});
