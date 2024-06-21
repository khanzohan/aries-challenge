// types.ts

export interface OptionsContract {
  strikePrice: number;
  premium: number;
  type: 'call' | 'put';
  quantity: number;  // Quantity can represent multiple contracts of the same type
}
