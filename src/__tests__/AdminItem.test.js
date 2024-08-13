import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminItem from '../components/AdminItem/AdminItem'; // Adjust the path if necessary

const admin = {
  id: 1,
  username: 'adminuser',
};

test('renders AdminItem with admin details', () => {
  render(
    <BrowserRouter>
      <AdminItem admin={admin} />
    </BrowserRouter>
  );

  expect(screen.getByText(`ADMIN ${admin.id} [${admin.username}]`)).toBeInTheDocument();
  expect(screen.getByText(/Delete/i)).toBeInTheDocument();
});
