document.getElementById('plan').addEventListener('click', function () {
  const limit = parseFloat(document.getElementById('carbonLimit').value);
  if (isNaN(limit) || limit <= 0) {
    alert("Please enter a valid carbon limit greater than 0.");
    return;
  }

  // Emission factors per minute of use, simplified for example
  const appliances = {
    "TV": 0.003,        // 0.5 per hour = 0.0083 per minute → reduce a bit
    "Fridge": 0.0012,   // 0.2 per hour
    "Microwave": 0.0018, 
    "AC": 0.033         // 2.0 per hour = 0.033 per minute
  };

  const sourceFactor = 1.0;      // Assume medium energy source
  const efficiency = 3;          // Mid-efficiency for now
  const adjusted = (6 - efficiency) / 5;

  let output = `<h2>Based on your ${limit}kg CO₂ limit:</h2><ul>`;

  for (let app in appliances) {
    const emissionsPerMinute = appliances[app] * adjusted * sourceFactor;
    let minutes = (limit * 1) / emissionsPerMinute; // kg to grams
    minutes = Math.max(10, Math.floor(minutes));
    output += `<li>${app}: up to ${minutes} minutes</li>`;
  }

  output += `</ul>`;
  document.getElementById('output').innerHTML = output;
});
