import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MerchantDashboard from '../components/MerchantDashboard/MerchantDashboard';
import '@testing-library/jest-dom';


// Mock components with correct paths and file extensions
jest.mock('../components/Sidebar/Sidebar.jsx', () => () => <div>Sidebar Mock</div>);
jest.mock('../components/AdminItem/AdminItem.jsx', () => ({ admin }) => <div>{admin.name}</div>);
jest.mock('../components/AddAdminForm/AddAdminForm.jsx', () => ({ onClose }) => (
  <div>
    Add Admin Form Mock
    <button onClick={onClose}>Close</button>
  </div>
));

describe('MerchantDashboard Component', () => {
  beforeEach(() => {
    // Mocking the fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, name: 'Admin 1' }, { id: 2, name: 'Admin 2' }]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the MerchantDashboard component', () => {
    render(<MerchantDashboard />);
    
    expect(screen.getByText('Merchant')).toBeInTheDocument();
    expect(screen.getByText('Add Admin')).toBeInTheDocument();
    expect(screen.getByText('Sidebar Mock')).toBeInTheDocument();
  });

  test('should fetch and display admins', async () => {
    render(<MerchantDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Admin 1')).toBeInTheDocument();
      expect(screen.getByText('Admin 2')).toBeInTheDocument();
    });
  });

  test('should toggle the Add Admin form', () => {
    render(<MerchantDashboard />);
    
    // Click the "Add Admin" button
    fireEvent.click(screen.getByText('Add Admin'));

    // The Add Admin Form should be visible
    expect(screen.getByText('Add Admin Form Mock')).toBeInTheDocument();

    // Click the "Close" button inside the form
    fireEvent.click(screen.getByText('Close'));

    // The Add Admin Form should not be visible
    expect(screen.queryByText('Add Admin Form Mock')).not.toBeInTheDocument();
  });
});
