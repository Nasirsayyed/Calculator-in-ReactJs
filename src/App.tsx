import { Route, Routes } from 'react-router-dom';
import { AppProviders } from '@context/AppProviders';
import { AppShell } from '@pages/AppShell';
import { CalculatorPage } from '@pages/CalculatorPage';
import { PercentagePage } from '@pages/PercentagePage';
import { DiscountPage } from '@pages/DiscountPage';
import { GstPage } from '@pages/GstPage';
import { TipPage } from '@pages/TipPage';
import { BmiPage } from '@pages/BmiPage';
import { AgePage } from '@pages/AgePage';
import { SimpleInterestPage } from '@pages/SimpleInterestPage';
import { CompoundInterestPage } from '@pages/CompoundInterestPage';
import { EmiPage } from '@pages/EmiPage';

function App() {
  return (
    <AppProviders>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<CalculatorPage />} />
          <Route path="/scientific" element={<CalculatorPage />} />
          <Route path="/percentage" element={<PercentagePage />} />
          <Route path="/discount" element={<DiscountPage />} />
          <Route path="/gst" element={<GstPage />} />
          <Route path="/tip" element={<TipPage />} />
          <Route path="/bmi" element={<BmiPage />} />
          <Route path="/age" element={<AgePage />} />
          <Route path="/simple-interest" element={<SimpleInterestPage />} />
          <Route path="/compound-interest" element={<CompoundInterestPage />} />
          <Route path="/emi" element={<EmiPage />} />
        </Route>
      </Routes>
    </AppProviders>
  );
}

export default App;
