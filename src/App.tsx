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
import { LoanPage } from '@pages/LoanPage';
import { MortgagePage } from '@pages/MortgagePage';
import { InvestmentPage } from '@pages/InvestmentPage';
import { ProfitLossPage } from '@pages/ProfitLossPage';
import { MarginPage } from '@pages/MarginPage';
import { SplitBillPage } from '@pages/SplitBillPage';
import { RatioPage } from '@pages/RatioPage';
import { AveragePage } from '@pages/AveragePage';
import { CurrencyPage } from '@pages/CurrencyPage';
import { UnitConverterPage } from '@pages/UnitConverterPage';
import { LcmGcdPage } from '@pages/LcmGcdPage';
import { StatisticsPage } from '@pages/StatisticsPage';
import { ProbabilityPage } from '@pages/ProbabilityPage';
import { QuadraticPage } from '@pages/QuadraticPage';
import { EquationSolverPage } from '@pages/EquationSolverPage';
import { MatrixPage } from '@pages/MatrixPage';
import { VectorPage } from '@pages/VectorPage';
import { PolynomialPage } from '@pages/PolynomialPage';
import { BaseConverterPage } from '@pages/BaseConverterPage';
import { RomanNumeralPage } from '@pages/RomanNumeralPage';
import { TimezoneConverterPage } from '@pages/TimezoneConverterPage';

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
          <Route path="/loan" element={<LoanPage />} />
          <Route path="/mortgage" element={<MortgagePage />} />
          <Route path="/investment" element={<InvestmentPage />} />
          <Route path="/profit-loss" element={<ProfitLossPage />} />
          <Route path="/margin" element={<MarginPage />} />
          <Route path="/split-bill" element={<SplitBillPage />} />
          <Route path="/ratio" element={<RatioPage />} />
          <Route path="/average" element={<AveragePage />} />
          <Route path="/currency" element={<CurrencyPage />} />
          <Route path="/convert" element={<UnitConverterPage />} />
          <Route path="/lcm-gcd" element={<LcmGcdPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/probability" element={<ProbabilityPage />} />
          <Route path="/quadratic" element={<QuadraticPage />} />
          <Route path="/equation-solver" element={<EquationSolverPage />} />
          <Route path="/matrix" element={<MatrixPage />} />
          <Route path="/vector" element={<VectorPage />} />
          <Route path="/polynomial" element={<PolynomialPage />} />
          <Route path="/base-converter" element={<BaseConverterPage />} />
          <Route path="/roman-numeral" element={<RomanNumeralPage />} />
          <Route path="/timezone" element={<TimezoneConverterPage />} />
        </Route>
      </Routes>
    </AppProviders>
  );
}

export default App;
