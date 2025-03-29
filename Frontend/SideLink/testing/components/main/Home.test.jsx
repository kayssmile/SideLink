import { render, screen, fireEvent } from '@testing-library/react';
import Home from 'src/components/main/Home';
import { BrowserRouter } from 'react-router-dom';

describe('Home Component', () => {
  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <Home {...props} />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByTestId('home-component')).toBeInTheDocument();
  });
  /*
  it('displays the hero section', () => {
    renderComponent();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });

  it('displays the features section', () => {
    renderComponent();
    expect(screen.getByTestId('features-section')).toBeInTheDocument();
  });

  it('displays the call-to-action section', () => {
    renderComponent();
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
  });

  it('handles button clicks correctly', () => {
    renderComponent();
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      fireEvent.click(button);
      // Add appropriate assertions based on button functionality
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom props', () => {
    const customProps = {
      title: 'Custom Title',
      description: 'Custom Description',
    };
    renderComponent(customProps);
    expect(screen.getByText(customProps.title)).toBeInTheDocument();
    expect(screen.getByText(customProps.description)).toBeInTheDocument();
  });
  */
});
