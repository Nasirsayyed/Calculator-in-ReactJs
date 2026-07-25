import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateAge } from '@utils/calculations/age';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function AgePage() {
  const { t } = useTranslation();
  const [birthDate, setBirthDate] = useState('');
  const [asOfDate, setAsOfDate] = useState(today());

  const result = birthDate
    ? calculateAge(new Date(birthDate), asOfDate ? new Date(asOfDate) : new Date())
    : null;

  return (
    <FormPage
      title={t('pages.age.title')}
      fields={
        <>
          <FormField
            label={t('pages.age.dateOfBirth')}
            type="date"
            value={birthDate}
            onChange={setBirthDate}
          />
          <FormField
            label={t('pages.age.asOf')}
            type="date"
            value={asOfDate}
            onChange={setAsOfDate}
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: t('pages.age.age'),
              value: result ? `${result.years}y ${result.months}m ${result.days}d` : '—',
              emphasis: true,
            },
            {
              label: t('pages.age.totalDaysLived'),
              value: result ? result.totalDays.toLocaleString() : '—',
            },
          ]}
        />
      }
    />
  );
}
