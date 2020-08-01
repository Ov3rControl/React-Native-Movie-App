import { atom } from 'recoil';

export const CartAtom = atom({
  key: 'cart',
  default: {
    products: [],
  },
});
