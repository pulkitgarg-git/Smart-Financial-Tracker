import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from '../layout/AppShell';
import AnalyticsModule from '../modules/analytics/AnalyticsModule';
import InsightsModule from '../modules/insights/InsightsModule';
import FinanceNewsModule from '../modules/news/FinanceNewsModule';
import OverviewModule from '../modules/overview/OverviewModule';
import TransactionsModule from '../modules/transactions/TransactionsModule';

export default function AppPage() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<OverviewModule />} />
        <Route path="transactions" element={<TransactionsModule />} />
        <Route path="analytics" element={<AnalyticsModule />} />
        <Route path="news" element={<FinanceNewsModule />} />
        <Route path="insights" element={<InsightsModule />} />
        <Route path="*" element={<Navigate to="overview" replace />} />
      </Route>
    </Routes>
  );
}
