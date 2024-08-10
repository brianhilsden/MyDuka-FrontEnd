
// adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  supplyRequests: [],
  products: [],
  clerks: [],
  reports: {},
};

export const fetchSupplyRequests = createAsyncThunk(
  'admin/fetchSupplyRequests',
  async () => {
    const response = await axios.get('/api/supply-requests');
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  'admin/fetchProducts',
  async () => {
    const response = await axios.get('/api/products');
    return response.data;
  }
);

export const fetchClerks = createAsyncThunk(
  'admin/fetchClerks',
  async () => {
    const response = await axios.get('/api/clerks');
    return response.data;
  }
);

export const updateClerk = createAsyncThunk(
  'admin/updateClerk',
  async ({ id, status }) => {
    const response = await axios.patch(`/api/clerks/${id}`, { status });
    return response.data;
  }
);

export const fetchReports = createAsyncThunk(
  'admin/fetchReports',
  async () => {
    const response = await axios.get('/api/reports');
    return response.data;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setSupplyRequests: (state, action) => {
      state.supplyRequests = action.payload;
    },
    approveSupplyRequest: (state, action) => {
      const index = state.supplyRequests.findIndex(req => req.id === action.payload);
      if (index !== -1) {
        state.supplyRequests[index].status = 'approved';
      }
    },
    declineSupplyRequest: (state, action) => {
      const index = state.supplyRequests.findIndex(req => req.id === action.payload);
      if (index !== -1) {
        state.supplyRequests[index].status = 'declined';
      }
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    markProductAsPaid: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload);
      if (index !== -1) {
        state.products[index].payment_status = 'paid';
      }
    },
    setClerks: (state, action) => {
      state.clerks = action.payload;
    },
    addClerk: (state, action) => {
      state.clerks.push(action.payload);
    },
    removeClerk: (state, action) => {
      state.clerks = state.clerks.filter(clerk => clerk.id !== action.payload);
    },
    setReports: (state, action) => {
      state.reports = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSupplyRequests.fulfilled, (state, action) => {
      state.supplyRequests = action.payload;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchClerks.fulfilled, (state, action) => {
      state.clerks = action.payload;
    });
    builder.addCase(fetchReports.fulfilled, (state, action) => {
      state.reports = action.payload;
    });
    builder.addCase(updateClerk.fulfilled, (state, action) => {
      const index = state.clerks.findIndex(clerk => clerk.id === action.payload.id);
      if (index !== -1) {
        state.clerks[index] = action.payload;
      }
    });
  },
});

export const {
  setSupplyRequests,
  approveSupplyRequest,
  declineSupplyRequest,
  setProducts,
  markProductAsPaid,
  setClerks,
  addClerk,
  removeClerk,
  setReports,
} = adminSlice.actions;

export default adminSlice.reducer;