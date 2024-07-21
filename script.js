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

    // Use the provided unit-based calculation
    const biMonthlyBill = calculateBiMonthlyBill(usage);
    const monthlyBill = calculateMonthlyBill(usage);
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

function calculateBiMonthlyBill(usage) {
    let totalBill = 0;
    for (let i = 0; i < usage.length; i += 2) {
        const biMonthlyUsage = usage[i] + (usage[i + 1] || 0);
        totalBill += calculateBillForUnits(biMonthlyUsage);
    }
    return totalBill;
}

function calculateMonthlyBill(usage) {
    let totalBill = 0;
    for (const monthlyUsage of usage) {
        totalBill += calculateBillForUnits(monthlyUsage);
    }
    return totalBill;
}

function calculateBillForUnits(units) {
    let billAmount = 0;
    if (units <= 100) {
        billAmount = units * 1.5;
    } else if (units <= 200) {
        billAmount = (100 * 1.5) + ((units - 100) * 2.5);
    } else if (units <= 300) {
        billAmount = (100 * 1.5) + (100 * 2.5) + ((units - 200) * 4);
    } else {
        billAmount = (100 * 1.5) + (100 * 2.5) + (100 * 4) + ((units - 300) * 6);
    }
    return billAmount;
}
