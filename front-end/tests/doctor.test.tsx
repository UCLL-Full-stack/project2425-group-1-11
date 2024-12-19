import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import DoctorOverviewTable from '@components/doctors/DoctorOverviewTable';


jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('DoctorOverviewTable', () => {
  const mockDoctors = [
    {
      id: 1,
      user: { firstName: 'John', lastName: 'Doe' },
      department: 'Cardiology',
    },
    {
      id: 2,
      user: { firstName: 'Jane', lastName: 'Smith' },
      department: 'Neurology',
    },
  ];

  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders a table with doctors data', () => {
    // Given: The component is rendered with mockDoctors
    render(<DoctorOverviewTable doctors={mockDoctors} />);

    // Then: The table headers should be displayed
    expect(screen.getByText('Name')).not.toBeNull();
    expect(screen.getByText('Department')).not.toBeNull();
    expect(screen.getByText('Details')).not.toBeNull();

    // Then: Each doctor should be displayed in the table
    mockDoctors.forEach((doctor) => {
      expect(screen.getByText(`${doctor.user.firstName} ${doctor.user.lastName}`)).not.toBeNull();
      expect(screen.getByText(doctor.department)).not.toBeNull();
    });
  });

  it('triggers handleViewDetails when "View Details" button is clicked', () => {
    // Given: The component is rendered with mockDoctors
    render(<DoctorOverviewTable doctors={mockDoctors} />);
    const viewDetailsButtons = screen.getAllByText('View Details');

    // When: The "View Details" button is clicked
    fireEvent.click(viewDetailsButtons[0]);

    // Then: The mockPush function should be called with the correct URL
    expect(mockPush).toHaveBeenCalledWith('/doctors/1');

    // When: The second "View Details" button is clicked
    fireEvent.click(viewDetailsButtons[1]);

    // Then: The mockPush function should be called with the correct URL
    expect(mockPush).toHaveBeenCalledWith('/doctors/2');
  });

  it('renders an empty table when doctors prop is empty', () => {
    // Given: The component is rendered with an empty doctors array
    render(<DoctorOverviewTable doctors={[]} />);

    // Then: The table headers should not be displayed
    expect(screen.queryByText('Name')).toBeNull();
    expect(screen.queryByText('Department')).toBeNull();
    expect(screen.queryByText('Details')).toBeNull();

    // Then: No rows should be displayed
    expect(screen.queryByText('John Doe')).toBeNull();
    expect(screen.queryByText('Cardiology')).toBeNull();
  });
});
