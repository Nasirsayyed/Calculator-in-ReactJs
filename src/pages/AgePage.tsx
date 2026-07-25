import { useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { ResultCard } from '@components/common/ResultCard';
import { calculateAge } from '@utils/calculations/age';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function AgePage() {
  const [birthDate, setBirthDate] = useState('');
  const [asOfDate, setAsOfDate] = useState(today());

  const result = birthDate
    ? calculateAge(new Date(birthDate), asOfDate ? new Date(asOfDate) : new Date())
    : null;

  return (
    <FormPage
      title="Age Calculator"
      fields={
        <>
          <FormField label="Date of birth" type="date" value={birthDate} onChange={setBirthDate} />
          <FormField label="As of" type="date" value={asOfDate} onChange={setAsOfDate} />
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: 'Age',
              value: result ? `${result.years}y ${result.months}m ${result.days}d` : '—',
              emphasis: true,
            },
            { label: 'Total days lived', value: result ? result.totalDays.toLocaleString() : '—' },
          ]}
        />
      }
    />
  );
}
