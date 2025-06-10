import App from 'src/App';
import { renderWithAllReducers } from '@tests/utils/RenderWithRedux';
import { MemoryRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';

//import { checkAuth, getToken } from 'src/services/AuthService';
//import getDashboardData from 'src/store/dashboard/shared/actions/GetDashboardDataAction';
//import getPublicData from 'src/store/publicdata/actions/GetPublicDataAction';

import * as AuthService from 'src/services/AuthService';
import * as DashboardActions from 'src/store/dashboard/shared/actions/GetDashboardDataAction';
import * as PublicDataActions from 'src/store/publicdata/actions/GetPublicDataAction';

vi.mock('src/services/AuthService');
vi.mock('src/store/dashboard/shared/actions/GetDashboardDataAction');
vi.mock('src/store/publicdata/actions/GetPublicDataAction');

describe('App', () => {
  const mockStatePublicData = {
    mobileSidebar: false,
    themeMode: 'dark',
  };

  it('renders without crashing', async () => {
    window.scrollTo = vi.fn();
    AuthService.checkAuth.mockResolvedValue(true);
    AuthService.getToken.mockReturnValue('FAKE_TOKEN');
    const mockDashboardAction = { type: 'GET_DASHBOARD_DATA' };
    const mockPublicAction = { type: 'GET_PUBLIC_DATA' };
    DashboardActions.default.mockReturnValue(mockDashboardAction);
    PublicDataActions.default.mockReturnValue(mockPublicAction);

    const { store } = renderWithAllReducers(<App />, { publicData: mockStatePublicData });
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    await new Promise(resolve => setTimeout(resolve, 0)); // flush microtasks

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(mockPublicAction);
      expect(dispatchSpy).toHaveBeenCalledWith(mockDashboardAction);
    });
  });
});
