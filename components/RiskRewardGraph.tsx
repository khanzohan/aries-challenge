// components/RiskRewardGraph.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { OptionsContract } from '../types';
import { calculateProfitLoss, findExtremesAndBreakevens } from '../lib/optionLogic';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

interface RiskRewardGraphProps {
  contracts: OptionsContract[];
}

const RiskRewardGraph: React.FC<RiskRewardGraphProps> = ({ contracts }) => {
  const labels = Array.from({ length: 301 }, (_, i) => i * 1);
  const dataPoints = labels.map(price => calculateProfitLoss(contracts, price));
  const { maxProfit, maxLoss, breakevens } = findExtremesAndBreakevens(contracts);

  const data = {
    labels,
    datasets: [{
      label: 'Profit/Loss',
      data: dataPoints,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <div>
      <Line data={data} />
      <div>Max Profit: {maxProfit}</div>
      <div>Max Loss: {maxLoss}</div>
      <div>Break-even Points: {breakevens.join(', ')}</div>
    </div>
  );
};

export default RiskRewardGraph;
