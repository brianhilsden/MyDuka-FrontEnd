
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import ClerksPage from '../components/ClerksPage';
import productReducer from '../features/productSlice';
import truthValueReducer from '../features/truthValueSlice';
import userReducer from '../features/userSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    truthValue: truthValueReducer,
    user: userReducer,
  },
  preloadedState: {
    user: { user: { id: 1, store_id: 1, username: 'test_user' } },
    product: { packages: [] },
    truthValue: { truthValue: false }
  }
});

describe('ClerksPage Component', () => {
 /* it('should render login message if user is not authenticated', () => {
    render(
      <Provider store={store}>
        <Router>
          <ClerksPage />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Kindly log in/i)).toBeInTheDocument();
  });
*/
  it('should render the page with correct user info if authenticated', async () => {
    // Modify store state to simulate an authenticated user
    store.dispatch({
      type: 'user/setUser',
      payload: { id: 1, store_id: 1, username: 'test_user' }
    });

    render(
      <Provider store={store}>
        <Router>
          <ClerksPage />
        </Router>
      </Provider>
    );

    expect(await screen.findByText(/test_user/i)).toBeInTheDocument();
    expect(screen.getByText(/Sell Item/i)).toBeInTheDocument();
    expect(screen.getByText(/Request Products/i)).toBeInTheDocument();
  });

  it('should open and close the add package modal', () => {
    render(
      <Provider store={store}>
        <Router>
          <ClerksPage />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Request Products/i));

    expect(screen.getByText(/Add Package/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Close/i)); // Assuming "Close" button exists in modal

    expect(screen.queryByText(/Add Package/i)).not.toBeInTheDocument();
  });

  // Add more tests for functionality such as fetching data and other modals as needed
});
