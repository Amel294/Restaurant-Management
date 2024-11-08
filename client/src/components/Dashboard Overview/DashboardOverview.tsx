// Path: client\src\components\Dashboard Overview\DashboardOverview.tsx

import { CardDashboardOverviewData } from '../../constants/CardDashboardOverviewData';
import CardDashboardOverview from './CardDashboardOverview';

function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10">
      {CardDashboardOverviewData.map((data, index) => (
        <CardDashboardOverview key={index} {...data} />
      ))}
    </div>
  );
}

export default DashboardOverview;