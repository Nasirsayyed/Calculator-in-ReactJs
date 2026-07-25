import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateLoan } from '@utils/calculations/loan';
import { formatNumber } from '@utils/formatNumber';
import styles from './LoanPage.module.css';

export function LoanPage() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  const { monthlyPayment, totalInterest, totalPayment, yearlyBreakdown } = calculateLoan(
    Number(principal) || 0,
    Number(rate) || 0,
    Number(years) || 0,
  );

  return (
    <FormPage
      title="Loan Calculator"
      fields={
        <>
          <FormField
            label="Loan amount"
            value={principal}
            onChange={setPrincipal}
            placeholder="0"
          />
          <FormField
            label="Annual interest rate"
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label="Tenure"
            value={years}
            onChange={setYears}
            suffix="years"
            placeholder="0"
          />
        </>
      }
      result={
        <>
          <ResultCard
            rows={[
              { label: 'Monthly payment', value: formatNumber(monthlyPayment, 2), emphasis: true },
              { label: 'Total interest', value: formatNumber(totalInterest, 2) },
              { label: 'Total payment', value: formatNumber(totalPayment, 2) },
            ]}
          />
          {yearlyBreakdown.length > 0 && (
            <div className={styles.breakdown}>
              <span className={styles.breakdownTitle}>Yearly breakdown</span>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Principal paid</th>
                    <th scope="col">Interest paid</th>
                    <th scope="col">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyBreakdown.map((row) => (
                    <tr key={row.year}>
                      <td>{row.year}</td>
                      <td>{formatNumber(row.principalPaid, 2)}</td>
                      <td>{formatNumber(row.interestPaid, 2)}</td>
                      <td>{formatNumber(row.remainingBalance, 2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      }
    />
  );
}
