class GeneticAlgorithm {
    constructor(targetString, populationSize, mutationRate) {
        this.targetString = targetString;
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.generation = 1;
        this.population = [];
        this.initializePopulation();
    }


    // Create a population of random strings
    initializePopulation() {
        for (let i = 0; i < this.populationSize; i++) {
            const randomPassword = this.generateRandomPassword(this.targetString.length);
            this.population.push(randomPassword);
        }
    }

    // Generate a random string of a given length
    generateRandomPassword(passwordLength) {
        let password = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    }

    // Calculate the fitness of a given string
    calculateFitness(password) {
        let fitness = 0;
        for (let i = 0; i < password.length; i++) {
            if (password[i] === this.targetString[i]) {
                fitness++;
            }
        }
        return fitness;
    }

    // Select a parent from the population
    selectParent() {
        const index = Math.floor(Math.random() * this.populationSize);
        return this.population[index];
    }

    // Crossover two parents to produce a child
    crossover(parent1, parent2) {
        const crossoverPoint = Math.floor(Math.random() * parent1.length);
        const child = parent1.slice(0, crossoverPoint) + parent2.slice(crossoverPoint);
        return child;
    }

    // Mutate a given string
    mutate(child) {
        const randomIndex = Math.floor(Math.random() * child.length);
        const randomCharacter = String.fromCharCode(Math.floor(Math.random() * 128));
        child = child.substr(0, randomIndex) + randomCharacter + child.substr(randomIndex + 1);
        return child;
    }

    // Evolve the population
    evolve() {
        const newPopulation = [];

        while (newPopulation.length < this.populationSize) {
            const parent1 = this.selectParent();
            const parent2 = this.selectParent();

            let child = this.crossover(parent1, parent2);

            if (Math.random() < this.mutationRate) {
                child = this.mutate(child);
            }

            newPopulation.push(child);
        }

        this.population = newPopulation;
        this.generation++;
    }

    // Find the best solution in the population
    findBestSolution() {
        let bestFitness = -1;
        let bestPassword = '';

        for (const password of this.population) {
            const fitness = this.calculateFitness(password);

            if (fitness > bestFitness) {
                bestFitness = fitness;
                bestPassword = password;
            }
        }

        return bestPassword;
    }
}

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



