export const ADD_SOLD_ITEM = 'ADD_SOLD_ITEM';

export const addSoldItem = (soldItem) => ({
  type: ADD_SOLD_ITEM,
  payload: soldItem,
});