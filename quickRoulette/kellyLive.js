function kellyCriterionBet(bankroll, probability, odds) {
  // Calculate the bet size using the Kelly Criterion
  return bankroll * ((odds * probability - (1 - probability)) / odds);
}

function simulateBetsKellyCriterion(bank) {
  let odds = 3; // Payout is 6 to 1

  // Probabilities of winning each bet
  let probabilityBet1 = 12 / 37; // Bet on numbers 1-12 or 25-30
  let probabilityBet2 = 12 / 37; // Bet on numbers 13-24

  let total = bank;

  let bet1 = kellyCriterionBet(total, probabilityBet1, odds);
  let bet2 = kellyCriterionBet(total, probabilityBet2, odds);
  console.log(bet1+bet2, bet1, bet2);
}

simulateBetsKellyCriterion(700);

