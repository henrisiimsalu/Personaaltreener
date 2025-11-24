function calculate() {

  const weight = Number(document.getElementById("weight").value);
  const height = Number(document.getElementById("height").value);
  const age = Number(document.getElementById("age").value);
  const activity = Number(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;
  const result = document.getElementById("result");

  if (!weight || !height || !age) {
    result.innerHTML = "Täida kõik väljad!";
    return;
  }

  // BMR – Mifflin St Jeor (mees)
  let BMR = 10 * weight + 6.25 * height - 5 * age + 5;

  // Säilituskalorid
  const maintenance = Math.round(BMR * activity);

  // Eesmärk kalorites (1 kg = ca 7700 kcal → /7 päeva)
  let goalCalories = 0;
  let goalText = "Säilitamine";

  switch(goal) {

    case "lose05":
      goalCalories = -550;
      goalText = "-0.5 kg nädalas";
      break;

    case "lose1":
      goalCalories = -1100;
      goalText = "-1 kg nädalas";
      break;

    case "gain05":
      goalCalories = 550;
      goalText = "+0.5 kg nädalas";
      break;

    case "gain1":
      goalCalories = 1100;
      goalText = "+1 kg nädalas";
      break;
  }

  const targetCalories = Math.round(maintenance + goalCalories);

  // Makrod
  const protein = Math.round(weight * 2); // 2g/kg
  const fats = Math.round(weight * 1);    // 1g/kg
  let carbs = Math.round((targetCalories - (protein * 4 + fats * 9)) / 4);

  if (carbs < 0) carbs = 0;

  let warning = "";

  if (targetCalories < 1400) {
    warning = "<p style='color:red'><b>Hoiatus:</b> Kalorid on väga madalad</p>";
  }

  result.innerHTML = `
    <h3>Sinu tulemused</h3>

    <p>Säilituskalorid: <b>${maintenance} kcal</b></p>
    <p>Eesmärk (${goalText}): <b>${targetCalories} kcal</b></p>

    ${warning}

    <h4>Soovituslikud makrod</h4>
    <p>Valk: <b>${protein} g</b></p>
    <p>Rasv: <b>${fats} g</b></p>
    <p>Süsivesikud: <b>${carbs} g</b></p>
  `;
}

function resetForm(){
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
  document.getElementById("age").value = "";
  document.getElementById("result").innerHTML = "";
}


(function () {
  emailjs.init("r5OGPyocKkCqhSUnv"); // Public key
})();

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  status.innerHTML = "Saatmine...";

  emailjs.send("service_yg4etbl", "template_a0x80lb", params)
    .then(function (response) {
      status.innerHTML = "✅ Sõnum saadetud!";
      form.reset();
    }, function (error) {
      status.innerHTML = "❌ Midagi läks valesti...";
      console.log("ERROR:", error);
    });
});
