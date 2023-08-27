import GeneticAlgorithm from "./geneticAlgorithm.js";
const generateButton = document.getElementById("generateButton");
const passwordDisplay = document.getElementById("password-part");

// set default target password
document.getElementById("targetPassword").value = "Hello World!";
const result = GeneratePassword("Hello World!", 100, 0.01);
passwordDisplay.textContent = result;

generateButton.addEventListener("click", () => {
    const targetPassword = document.getElementById("targetPassword").value;
    const populationSize = parseInt(document.getElementById("populationSize").value);
    const mutationRate = parseFloat(document.getElementById("mutationRate").value);

    passwordDisplay.textContent = GeneratePassword(targetPassword, populationSize, mutationRate);
});
function GeneratePassword(targetPassword, populationSize, mutationRate) {
    const geneticAlgorithm = new GeneticAlgorithm(targetPassword, populationSize, mutationRate);
    geneticAlgorithm.evolve();
    return  geneticAlgorithm.findBestSolution();
}

