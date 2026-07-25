import { AppProviders } from '@context/AppProviders';
import { CalculatorPage } from '@pages/CalculatorPage';

function App() {
  return (
    <AppProviders>
      <CalculatorPage />
    </AppProviders>
  );
}

export default App;
