function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function calculateBill() {
  const units = parseFloat(document.getElementById("units").value) || 0;
  const load = parseFloat(document.getElementById("load").value) || 0;
  const ppac = parseFloat(document.getElementById("ppac").value) || 0;
  const lateFee = parseFloat(document.getElementById("lateFee").value) || 0;
  const other = parseFloat(document.getElementById("otherCharges").value) || 0;

  const energyRate = 7.75;
  const fixedCharge = load * 20;

  const energyCharge = units * energyRate;
  const ppacOnEnergy = (ppac / 100) * energyCharge;
  const surcharge8 = 0.08 * (energyCharge + fixedCharge);
  const surcharge7 = 0.07 * (energyCharge + fixedCharge);
  const ppacOnFixed = (ppac / 100) * fixedCharge;
  const tax5 = 0.05 * energyCharge;

  const total = energyCharge + fixedCharge + ppacOnEnergy + surcharge8 + surcharge7 + ppacOnFixed + tax5 + lateFee + other;

  document.getElementById("result").innerHTML = `
    <strong>${lang.totalBill}: ₹${total.toFixed(2)}</strong><br>
    🔋 ${lang.energy}: ₹${energyCharge.toFixed(2)}<br>
    🧱 ${lang.fixed}: ₹${fixedCharge.toFixed(2)}<br>
    💡 ${lang.ppacE}: ₹${ppacOnEnergy.toFixed(2)}<br>
    ➕ ${lang.surcharge8}: ₹${surcharge8.toFixed(2)}<br>
    ➕ ${lang.surcharge7}: ₹${surcharge7.toFixed(2)}<br>
    🔌 ${lang.ppacF}: ₹${ppacOnFixed.toFixed(2)}<br>
    🧾 ${lang.tax}: ₹${tax5.toFixed(2)}<br>
    🐢 ${lang.late}: ₹${lateFee.toFixed(2)}<br>
    📦 ${lang.other}: ₹${other.toFixed(2)}
  `;
}

function downloadPDF() {
  const element = document.getElementById('billArea');
  html2pdf().from(element).save("Electricity_Bill.pdf");
}

const langSet = {
  en: {
    title: "Electricity Bill Calculator",
    units: "Current Consumption (Units):",
    load: "Sanctioned Load (kW):",
    ppac: "PPAC %",
    late: "Late Payment Fee (₹):",
    other: "Other Charges (₹):",
    calcBtn: "Calculate Bill",
    pdfBtn: "Download PDF",
    totalBill: "Total Bill",
    energy: "Energy Charge",
    fixed: "Fixed Charge",
    ppacE: "PPAC on Energy",
    ppacF: "PPAC on Fixed",
    surcharge8: "Surcharge 8%",
    surcharge7: "Surcharge 7%",
    tax: "Tax 5%",
    lateF: "Late Fee",
    otherC: "Other Charges"
  },
  hi: {
    title: "बिजली बिल कैलकुलेटर",
    units: "यूनिट खपत (Units):",
    load: "स्वीकृत लोड (किलोवाट):",
    ppac: "पीपीएसी %",
    late: "लेट फीस (₹):",
    other: "अन्य शुल्क (₹):",
    calcBtn: "बिल कैलकुलेट करें",
    pdfBtn: "PDF डाउनलोड करें",
    totalBill: "कुल बिल",
    energy: "ऊर्जा शुल्क",
    fixed: "स्थायी शुल्क",
    ppacE: "ऊर्जा पर पीपीएसी",
    ppacF: "स्थायी पर पीपीएसी",
    surcharge8: "सरचार्ज 8%",
    surcharge7: "सरचार्ज 7%",
    tax: "कर 5%",
    lateF: "लेट फीस",
    otherC: "अन्य शुल्क"
  }
};

let lang = langSet.en;

function setLanguage(val) {
  lang = langSet[val];
  document.getElementById("title").textContent = lang.title;
  document.getElementById("units-label").textContent = lang.units;
  document.getElementById("load-label").textContent = lang.load;
  document.getElementById("ppac-label").textContent = lang.ppac;
  document.getElementById("late-label").textContent = lang.late;
  document.getElementById("other-label").textContent = lang.other;
  document.getElementById("calc-btn").textContent = lang.calcBtn;
  document.getElementById("pdf-btn").textContent = lang.pdfBtn;
  calculateBill(); // refresh result if already calculated
}