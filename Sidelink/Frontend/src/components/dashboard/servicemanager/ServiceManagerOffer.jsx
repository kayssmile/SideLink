import { breadcrumpConfig } from 'src/config/NavigationConfigurations';
import Breadcrumb from 'src/components/dashboard/shared/Breadcrumb';
import PublicServiceMenu from './parts/PublicServiceMenu';

function ServiceManagerOffer() {
  return (
    <>
      <Breadcrumb title="Dienstleistungen Angebote" items={breadcrumpConfig.serviceOffer} sx={{ margin: '30px 0' }} />
      <PublicServiceMenu type="offer" />
    </>
  );
}

export default ServiceManagerOffer;
