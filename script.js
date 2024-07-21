document.getElementById('eb-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    calculateBill();
});

function calculateBill() {
    const salary = parseFloat(document.getElementById('salary').value);
    const usage = [];
    for (let i = 1; i <= 6; i++) {
        const usageValue = parseFloat(document.getElementById(`month${i}`).value);
        if (!isNaN(usageValue)) {
            usage.push(usageValue);
        } else {
            usage.push(0); // Push 0 if the input is empty or invalid
        }
    }

    const RATE_PER_UNIT = 9.65;
    const FREE_UNITS = 100;

    const biMonthlyBill = calculateBiMonthlyBill(usage, RATE_PER_UNIT, FREE_UNITS);
    const monthlyBill = calculateMonthlyBill(usage, RATE_PER_UNIT, FREE_UNITS);
    const savings = monthlyBill - biMonthlyBill;
    const percentageSavings = (savings / monthlyBill) * 100;

    const results = document.getElementById('results');
    results.innerHTML = `
        <h4>BiMonthly bill: ₹${biMonthlyBill.toFixed(2)}</h4>
        <h4>Monthly bill: ₹${monthlyBill.toFixed(2)}</h4>
        <h4>Savings(if monthly bill): ₹${savings.toFixed(2)} and saving percentage(if monthly bill): ${percentageSavings.toFixed(2)}% </h4>
        <h4>percentage of salary for BiMonthly payment: ${(biMonthlyBill / salary * 100).toFixed(2)}%</h4>
        <h4>percentage of salary for Monthly payment: ${(monthlyBill / salary * 100).toFixed(2)}%</h4>
    `;
}

function calculateBiMonthlyBill(usage, ratePerUnit, freeUnits) {
    let totalBill = 0;
    for (let i = 0; i < usage.length; i += 2) {
        const biMonthlyUsage = usage[i] + (usage[i + 1] || 0);
        const chargeableUnits = Math.max(0, biMonthlyUsage - freeUnits);
        totalBill += chargeableUnits * ratePerUnit;
    }
    return totalBill;
}

function calculateMonthlyBill(usage, ratePerUnit, freeUnits) {
    let totalBill = 0;
    for (const monthlyUsage of usage) {
        const chargeableUnits = Math.max(0, monthlyUsage - freeUnits);
        totalBill += chargeableUnits * ratePerUnit;
    }
    return totalBill;
}
