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
    billAmount = units * 0;
    } else if (units>100 && units <= 200) {
    billAmount = (100 * 0) + ((units - 100) * 2.25);
    } else if (units>200 && units <= 400) {
    billAmount = (100 * 0) + (100 * 2.25) + ((units - 200) * 4.50);
    } else if(units>400 && units <= 500){
    billAmount = (100 * 0) + (100 * 2.25) + (200 * 4.50) + ((units - 400) * 6.00);
    } else if(units>500 && units <= 600){
    billAmount = (100 * 0) + (300 * 4.50) + (100 * 6.00)+((units - 500) * 8.00);
    } else if(units>600 && units <= 800){
    billAmount = (100 * 0) + (300 * 4.50) + (100 * 6.00)+ (100 * 8.00)+ ((units - 600) * 9.00);
    } else if(units>800 && units<=1000){
    billAmount = (100 * 0) + (300 * 4.50) + (100 * 6.00)+ (100 * 8.00)+ (200 * 9.00) + ((units - 800) * 10.00);
    } else if(units>1000){
    billAmount = (100 * 0) + (300 * 4.50) + (100 * 6.00)+ (100 * 8.00)+ (200 * 9.00) + (200 * 10.00) + ((units - 1000) * 11.00);
    }
    return billAmount;
}
