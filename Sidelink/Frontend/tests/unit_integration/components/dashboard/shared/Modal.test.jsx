import { render, screen, fireEvent } from '@testing-library/react';
import Modal from 'src/components/shared/Modal';

const renderModalComponent = defaultProps => {
  return render(<Modal {...defaultProps} />);
};

describe('Modal component', () => {
  const defaultProps = {
    modalTitle: 'Test Modal Title',
    modalContent: 'Test Modal Content',
    modalState: true,
    handleAgree: vi.fn(),
    handleCancel: vi.fn(),
  };

  it('renders modal title and content correctly', () => {
    renderModalComponent(defaultProps);
    expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Test Modal Content')).toBeInTheDocument();
  });

  it('calls handleCancel when Abbrechen button is clicked', () => {
    renderModalComponent(defaultProps);
    const cancelButton = screen.getByRole('button', { name: /Abbrechen/i });
    fireEvent.click(cancelButton);
    expect(defaultProps.handleCancel).toHaveBeenCalledTimes(1);
  });

  it('calls handleAgree when Bestätigen button is clicked', () => {
    renderModalComponent(defaultProps);
    const agreeButton = screen.getByRole('button', { name: /Bestätigen/i });
    fireEvent.click(agreeButton);
    expect(defaultProps.handleAgree).toHaveBeenCalledTimes(1);
  });

  it('does not render when modalState is false', () => {
    render(<Modal {...defaultProps} modalState={false} />);
    expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Modal Content')).not.toBeInTheDocument();
  });
});
