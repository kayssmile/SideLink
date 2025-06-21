import { render, screen } from '@testing-library/react';
import TabPanel from 'src/components/dashboard/shared/TabPanel';

const renderTabPanelComponent = props => {
  const { value = 0, index = 0, children = null, ...rest } = props;

  return render(
    <TabPanel value={value} index={index} {...rest}>
      {children}
    </TabPanel>
  );
};

describe('TabPanel component', () => {
  it('renders tabpanel component and content correctly', () => {
    renderTabPanelComponent({
      value: 1,
      index: 1,
      children: <div>Test Content</div>,
    });
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render content when value does not match index', () => {
    renderTabPanelComponent({
      value: 0,
      index: 1,
      children: <div>Test Content</div>,
    });
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
});
