// pages/index.tsx
import type { NextPage } from 'next';
import React, { useState } from 'react';
import RiskRewardGraph from '../components/RiskRewardGraph';
import { OptionsContract } from '../types';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [contracts, setContracts] = useState<OptionsContract[]>([
    { strikePrice: 100, premium: 10, type: 'call', quantity: 1 }
  ]);

  const handleChange = (index: number, field: keyof OptionsContract, value: any) => {
    const updatedContracts = contracts.map((contract, i) => {
      if (i === index) {
        return { ...contract, [field]: field === 'quantity' ? parseInt(value, 10) : value };
      }
      return contract;
    });
    setContracts(updatedContracts);
  };

  const addContract = () => {
    if (contracts.length < 4) {
      setContracts([...contracts, { strikePrice: 0, premium: 0, type: 'call', quantity: 1 }]);
    }
  };

  const removeContract = (index: number) => {
    const filteredContracts = contracts.filter((_, i) => i !== index);
    setContracts(filteredContracts);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Options Strategy Analysis</h1>
      {contracts.map((contract, index) => (
        <div key={index} className={styles.form}>
          <select
            className={styles.selectField}
            value={contract.type}
            onChange={(e) => handleChange(index, 'type', e.target.value)}
          >
            <option value="call">Call</option>
            <option value="put">Put</option>
          </select>
          <input
            className={styles.inputField}
            type="number"
            value={contract.strikePrice}
            onChange={(e) => handleChange(index, 'strikePrice', e.target.value)}
            placeholder="Strike Price"
          />
          <input
            className={styles.inputField}
            type="number"
            value={contract.premium}
            onChange={(e) => handleChange(index, 'premium', e.target.value)}
            placeholder="Premium"
          />
          <input
            className={styles.inputField}
            type="number"
            value={contract.quantity}
            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
            placeholder="Quantity"
          />
          <button
            className={styles.removeButton}
            onClick={() => removeContract(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className={styles.addButton}
        onClick={addContract}
        disabled={contracts.length >= 4}
      >
        Add Contract
      </button>
      <div className={styles.graphContainer}>
        <RiskRewardGraph contracts={contracts} />
      </div>
    </div>
  );
};

export default Home;
