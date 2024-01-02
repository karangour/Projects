function kellyCriterionBet(bankroll, probability, odds) {
    // Calculate the bet size using the Kelly Criterion
    return bankroll * ((odds * probability - (1 - probability)) / odds);
}

function simulateBetsKellyCriterion() {
    let totalAmount = 10000;
    let odds = 6; // Payout is 6 to 1

    // Probabilities of winning each bet
    let probabilityBet1 = 18 / 37; // Bet on numbers 1-12 or 25-30
    let probabilityBet2 = 14 / 37; // Bet on numbers 13-26

    let total = totalAmount;
    let negativeCount = 0;

    for (let i = 0; i < 100; i++) {
        let bet1 = kellyCriterionBet(total, probabilityBet1, odds);
        let bet2 = kellyCriterionBet(total, probabilityBet2, odds);
        console.log
        total -= bet1 + bet2;

        if (total <= 0) {
            break;
        }

        let number = Math.floor(Math.random() * 100) % 37;

        if ((number > 0 && number < 13) || (number > 24 && number < 31)) {
            total += bet1 * odds;
        } else if (number > 12 && number < 27) {
            total += bet2 * odds;
        }
    }

    return total - totalAmount;
}

// Running the Kelly Criterion simulation 10,000 times
let negativeResults = 0;
for (let i = 0; i < 10000; i++) {
    if (simulateBetsKellyCriterion() < 0) {
        negativeResults++;
    }
}
let percentageNegative = (negativeResults / 10000) * 100;
console.log(`Percentage of Negative Results: ${percentageNegative}%`);
