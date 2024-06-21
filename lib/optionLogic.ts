// lib/optionLogic.ts

import { OptionsContract } from '../types';

export function calculateProfitLoss(contracts: OptionsContract[], priceAtExpiry: number): number {
  return contracts.reduce((total, contract) => {
    const { type, strikePrice, premium, quantity } = contract;
    let profitLoss = 0;

    if (type === 'call') {
      profitLoss = priceAtExpiry > strikePrice ? (priceAtExpiry - strikePrice - premium) * quantity : -premium * quantity;
    } else { // 'put'
      profitLoss = priceAtExpiry < strikePrice ? (strikePrice - priceAtExpiry - premium) * quantity : -premium * quantity;
    }

    return total + profitLoss;
  }, 0);
}

export function findExtremesAndBreakevens(contracts: OptionsContract[]): { maxProfit: number, maxLoss: number, breakevens: number[] } {
  let maxProfit = -Infinity;
  let maxLoss = Infinity;
  let breakevens: number[] = [];

  // Sample range to evaluate the profit/loss to find extremes and breakevens
  const range = Array.from({ length: 500 }, (_, i) => i);
  
  range.forEach(price => {
    const profitLoss = calculateProfitLoss(contracts, price);
    if (profitLoss > maxProfit) maxProfit = profitLoss;
    if (profitLoss < maxLoss) maxLoss = profitLoss;
    if (profitLoss === 0) breakevens.push(price);
  });

  return { maxProfit, maxLoss, breakevens };
}
