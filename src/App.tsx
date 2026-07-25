import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppProviders } from '@context/AppProviders';
import { AppShell } from '@pages/AppShell';
import { CalculatorPage } from '@pages/CalculatorPage';
import { RouteLoadingFallback } from '@components/common/RouteLoadingFallback';

const PercentagePage = lazy(() =>
  import('@pages/PercentagePage').then((m) => ({ default: m.PercentagePage })),
);
const DiscountPage = lazy(() =>
  import('@pages/DiscountPage').then((m) => ({ default: m.DiscountPage })),
);
const GstPage = lazy(() => import('@pages/GstPage').then((m) => ({ default: m.GstPage })));
const TipPage = lazy(() => import('@pages/TipPage').then((m) => ({ default: m.TipPage })));
const BmiPage = lazy(() => import('@pages/BmiPage').then((m) => ({ default: m.BmiPage })));
const AgePage = lazy(() => import('@pages/AgePage').then((m) => ({ default: m.AgePage })));
const SimpleInterestPage = lazy(() =>
  import('@pages/SimpleInterestPage').then((m) => ({ default: m.SimpleInterestPage })),
);
const CompoundInterestPage = lazy(() =>
  import('@pages/CompoundInterestPage').then((m) => ({ default: m.CompoundInterestPage })),
);
const EmiPage = lazy(() => import('@pages/EmiPage').then((m) => ({ default: m.EmiPage })));
const LoanPage = lazy(() => import('@pages/LoanPage').then((m) => ({ default: m.LoanPage })));
const MortgagePage = lazy(() =>
  import('@pages/MortgagePage').then((m) => ({ default: m.MortgagePage })),
);
const InvestmentPage = lazy(() =>
  import('@pages/InvestmentPage').then((m) => ({ default: m.InvestmentPage })),
);
const ProfitLossPage = lazy(() =>
  import('@pages/ProfitLossPage').then((m) => ({ default: m.ProfitLossPage })),
);
const MarginPage = lazy(() => import('@pages/MarginPage').then((m) => ({ default: m.MarginPage })));
const SplitBillPage = lazy(() =>
  import('@pages/SplitBillPage').then((m) => ({ default: m.SplitBillPage })),
);
const RatioPage = lazy(() => import('@pages/RatioPage').then((m) => ({ default: m.RatioPage })));
const AveragePage = lazy(() =>
  import('@pages/AveragePage').then((m) => ({ default: m.AveragePage })),
);
const CurrencyPage = lazy(() =>
  import('@pages/CurrencyPage').then((m) => ({ default: m.CurrencyPage })),
);
const UnitConverterPage = lazy(() =>
  import('@pages/UnitConverterPage').then((m) => ({ default: m.UnitConverterPage })),
);
const LcmGcdPage = lazy(() => import('@pages/LcmGcdPage').then((m) => ({ default: m.LcmGcdPage })));
const StatisticsPage = lazy(() =>
  import('@pages/StatisticsPage').then((m) => ({ default: m.StatisticsPage })),
);
const ProbabilityPage = lazy(() =>
  import('@pages/ProbabilityPage').then((m) => ({ default: m.ProbabilityPage })),
);
const QuadraticPage = lazy(() =>
  import('@pages/QuadraticPage').then((m) => ({ default: m.QuadraticPage })),
);
const EquationSolverPage = lazy(() =>
  import('@pages/EquationSolverPage').then((m) => ({ default: m.EquationSolverPage })),
);
const MatrixPage = lazy(() => import('@pages/MatrixPage').then((m) => ({ default: m.MatrixPage })));
const VectorPage = lazy(() => import('@pages/VectorPage').then((m) => ({ default: m.VectorPage })));
const PolynomialPage = lazy(() =>
  import('@pages/PolynomialPage').then((m) => ({ default: m.PolynomialPage })),
);
const BaseConverterPage = lazy(() =>
  import('@pages/BaseConverterPage').then((m) => ({ default: m.BaseConverterPage })),
);
const RomanNumeralPage = lazy(() =>
  import('@pages/RomanNumeralPage').then((m) => ({ default: m.RomanNumeralPage })),
);
const TimezoneConverterPage = lazy(() =>
  import('@pages/TimezoneConverterPage').then((m) => ({ default: m.TimezoneConverterPage })),
);
const DateCalculatorPage = lazy(() =>
  import('@pages/DateCalculatorPage').then((m) => ({ default: m.DateCalculatorPage })),
);
const ProgrammerPage = lazy(() =>
  import('@pages/ProgrammerPage').then((m) => ({ default: m.ProgrammerPage })),
);
const RandomNumberPage = lazy(() =>
  import('@pages/RandomNumberPage').then((m) => ({ default: m.RandomNumberPage })),
);

function App() {
  return (
    <AppProviders>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<CalculatorPage />} />
          <Route path="/scientific" element={<CalculatorPage />} />
          <Route
            path="/percentage"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <PercentagePage />
              </Suspense>
            }
          />
          <Route
            path="/discount"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <DiscountPage />
              </Suspense>
            }
          />
          <Route
            path="/gst"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <GstPage />
              </Suspense>
            }
          />
          <Route
            path="/tip"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <TipPage />
              </Suspense>
            }
          />
          <Route
            path="/bmi"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <BmiPage />
              </Suspense>
            }
          />
          <Route
            path="/age"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AgePage />
              </Suspense>
            }
          />
          <Route
            path="/simple-interest"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <SimpleInterestPage />
              </Suspense>
            }
          />
          <Route
            path="/compound-interest"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <CompoundInterestPage />
              </Suspense>
            }
          />
          <Route
            path="/emi"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <EmiPage />
              </Suspense>
            }
          />
          <Route
            path="/loan"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <LoanPage />
              </Suspense>
            }
          />
          <Route
            path="/mortgage"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <MortgagePage />
              </Suspense>
            }
          />
          <Route
            path="/investment"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <InvestmentPage />
              </Suspense>
            }
          />
          <Route
            path="/profit-loss"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <ProfitLossPage />
              </Suspense>
            }
          />
          <Route
            path="/margin"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <MarginPage />
              </Suspense>
            }
          />
          <Route
            path="/split-bill"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <SplitBillPage />
              </Suspense>
            }
          />
          <Route
            path="/ratio"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <RatioPage />
              </Suspense>
            }
          />
          <Route
            path="/average"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AveragePage />
              </Suspense>
            }
          />
          <Route
            path="/currency"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <CurrencyPage />
              </Suspense>
            }
          />
          <Route
            path="/convert"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <UnitConverterPage />
              </Suspense>
            }
          />
          <Route
            path="/lcm-gcd"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <LcmGcdPage />
              </Suspense>
            }
          />
          <Route
            path="/statistics"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <StatisticsPage />
              </Suspense>
            }
          />
          <Route
            path="/probability"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <ProbabilityPage />
              </Suspense>
            }
          />
          <Route
            path="/quadratic"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <QuadraticPage />
              </Suspense>
            }
          />
          <Route
            path="/equation-solver"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <EquationSolverPage />
              </Suspense>
            }
          />
          <Route
            path="/matrix"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <MatrixPage />
              </Suspense>
            }
          />
          <Route
            path="/vector"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <VectorPage />
              </Suspense>
            }
          />
          <Route
            path="/polynomial"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <PolynomialPage />
              </Suspense>
            }
          />
          <Route
            path="/base-converter"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <BaseConverterPage />
              </Suspense>
            }
          />
          <Route
            path="/roman-numeral"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <RomanNumeralPage />
              </Suspense>
            }
          />
          <Route
            path="/timezone"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <TimezoneConverterPage />
              </Suspense>
            }
          />
          <Route
            path="/date"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <DateCalculatorPage />
              </Suspense>
            }
          />
          <Route
            path="/programmer"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <ProgrammerPage />
              </Suspense>
            }
          />
          <Route
            path="/random"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <RandomNumberPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </AppProviders>
  );
}

export default App;
