import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateLoan } from '@utils/calculations/loan';
import { formatNumber } from '@utils/formatNumber';
import styles from './LoanPage.module.css';

export function LoanPage() {
  const { t } = useTranslation();
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
      title={t('pages.loan.title')}
      fields={
        <>
          <FormField
            label={t('pages.loan.loanAmount')}
            value={principal}
            onChange={setPrincipal}
            placeholder="0"
          />
          <FormField
            label={t('pages.loan.annualInterestRate')}
            value={rate}
            onChange={setRate}
            suffix="%"
            placeholder="0"
          />
          <FormField
            label={t('pages.loan.tenure')}
            value={years}
            onChange={setYears}
            suffix={t('pages.loan.years')}
            placeholder="0"
          />
        </>
      }
      result={
        <>
          <ResultCard
            rows={[
              {
                label: t('pages.loan.monthlyPayment'),
                value: formatNumber(monthlyPayment, 2),
                emphasis: true,
              },
              { label: t('pages.loan.totalInterest'), value: formatNumber(totalInterest, 2) },
              { label: t('pages.loan.totalPayment'), value: formatNumber(totalPayment, 2) },
            ]}
          />
          {yearlyBreakdown.length > 0 && (
            <div className={styles.breakdown}>
              <span className={styles.breakdownTitle}>{t('pages.loan.yearlyBreakdown')}</span>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">{t('pages.loan.year')}</th>
                    <th scope="col">{t('pages.loan.principalPaid')}</th>
                    <th scope="col">{t('pages.loan.interestPaid')}</th>
                    <th scope="col">{t('pages.loan.balance')}</th>
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
