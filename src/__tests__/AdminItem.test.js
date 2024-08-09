import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminItem from '../components/AdminItem/AdminItem';

const admin = {
  id: 1,
  username: 'admin1',
  account_status: 'active',
  storeLink: 'http://example.com/store'
};

test('renders AdminItem with admin details', () => {
  render(<AdminItem admin={admin} />);
  
  expect(screen.getByText(`ADMIN ${admin.id} [${admin.username}]`)).toBeInTheDocument();
  expect(screen.getByText(/Delete/i)).toBeInTheDocument();
  expect(screen.getByText(/active/i)).toBeInTheDocument();
  expect(screen.getByText(/View Store/i)).toHaveAttribute('href', admin.storeLink);
});
