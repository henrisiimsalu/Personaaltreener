// Dynamically set year
document.getElementById('year').textContent = new Date().getFullYear();

// EmailJS init
emailjs.init("Kbs-Dqrq9NbG87khJ");

const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  status.textContent = "Saadan...";

  const params = {
    from_name: form.name.value,
    from_email: form.email.value,
    message: form.message.value
  };

  emailjs
    .send("service_u88b9il", "template_m1isyqq", params)
    .then(() => {
      status.textContent = "Sõnum saadetud!";
      form.reset();
    })
    .catch((err) => {
      status.textContent = "Viga: " + err.text;
    });
});
