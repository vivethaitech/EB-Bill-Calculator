function calculateBill() {
    const units = document.getElementById('units').value;
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
    
    document.getElementById('result').innerText = `Total Bill: ₹${billAmount.toFixed(2)}`;
    }
    
