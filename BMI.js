// CALCUL D'IMC = poids en kg/taille² (en m)
const BMIData = [
  { name: "Slim", color: "midnightblue", range: [0, 18.5] },
  { name: "Good Health", color: "green", range: [18.5, 25] },
  { name: "Hyper Weight", color: "lightcoral", range: [25, 30] },
  { name: "Modered Obesity", color: "orange", range: [30, 35] },
  { name: "Severe Obesity", color: "crimson", range: [35, 40] },
  { name: "Morbid Obesity", color: "purple", range: [40,80] },
];

// ANNULATION DU SUBMIT FORMULAIRE
const form = document.querySelector("form");
form.addEventListener("submit", handleForm);
function handleForm(e) {
  e.preventDefault();
  calculateBMI();
}

// CALCUL IMC
const inputs = document.querySelectorAll("input");
function calculateBMI() {
  const height = inputs[0].value;
  const weight = inputs[1].value;

  if (!height || !weight || height <= 0 || weight <= 0) {
    handleError();
    return;
  }
  // la taille est en cm et arrondie 1 chiffre après la virgule avec la formule
  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1);
  showResult(BMI);
}

// AFFICHAGE MESSAGE ERREUR
const displayBMI = document.querySelector(".bmi-value");
const result = document.querySelector(".result");
function handleError() {
  displayBMI.textContent = "Wops !";
  displayBMI.style.color = "Inherit";
  result.textContent = "Fill correctly the fields";
}

// AFFICHAGE IMC
function showResult(BMI) {
  const rank = BMIData.find((data) => {
    // RETROUVE LE BON ELEMENT DE L'OBJET BMIData
    if (BMI >= data.range[0] && BMI < data.range[1]) {
      return data;
    } else if (typeof data.range === "number" && BMI >= data.range) {
      return data;
    }
  });
  displayBMI.textContent = BMI;
  displayBMI.style.color = `${rank.color}`;
  result.textContent = `Result : ${rank.name}`;
  console.log(rank);
}