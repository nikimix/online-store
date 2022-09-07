export type CallbackHandlerType = (arg: Event) => void;

export interface ICard {
  id: string;
  name: string;
  material: string;
  manufacturer: string;
  amount: number;
  color: string;
  year: number;
  popular: boolean;
  price: number;
  src: string;
  isAdded: boolean;
}
