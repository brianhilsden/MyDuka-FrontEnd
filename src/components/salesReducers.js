import { ADD_SOLD_ITEM } from '../actions/salesActions';

const initialState = {
  soldItems: [],
};

const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SOLD_ITEM:
      return {
        ...state,
        soldItems: [...state.soldItems, action.payload],
      };
    default:
      return state;
  }
};

export default salesReducer;