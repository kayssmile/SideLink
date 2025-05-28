import { breadcrumpConfig } from 'src/config/NavigationConfigurations';
import Breadcrumb from 'src/components/dashboard/shared/Breadcrumb';
import PublicServiceMenu from './parts/PublicServiceMenu';

function ServiceManagerSearch() {
  return (
    <>
      <Breadcrumb title="Dienstleistungen Suche" items={breadcrumpConfig.serviceSearch} sx={{ margin: '30px 0' }} />
      <PublicServiceMenu type="search" />
    </>
  );
}

export default ServiceManagerSearch;
