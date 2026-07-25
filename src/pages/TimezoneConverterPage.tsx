import { useMemo, useState } from 'react';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { SelectField } from '@components/common/SelectField';
import { ResultCard } from '@components/common/ResultCard';
import {
  convertBetweenTimeZones,
  getSupportedTimeZones,
} from '@utils/calculations/timezoneConverter';

function nowAsDateTimeLocal(): string {
  const now = new Date();
  now.setSeconds(0, 0);
  return now.toISOString().slice(0, 16);
}

export function TimezoneConverterPage() {
  const zones = useMemo(() => getSupportedTimeZones(), []);
  const [dateTime, setDateTime] = useState(nowAsDateTimeLocal());
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState(zones.find((zone) => zone !== 'UTC') ?? 'UTC');

  const result = convertBetweenTimeZones(dateTime, fromZone, toZone);
  const zoneOptions = zones.map((zone) => ({ value: zone, label: zone }));

  return (
    <FormPage
      title="Timezone Converter"
      fields={
        <>
          <FormField
            label="Date & time"
            type="datetime-local"
            value={dateTime}
            onChange={setDateTime}
          />
          <SelectField
            label="From timezone"
            value={fromZone}
            onChange={setFromZone}
            options={zoneOptions}
          />
          <SelectField
            label="To timezone"
            value={toZone}
            onChange={setToZone}
            options={zoneOptions}
          />
        </>
      }
      result={
        <ResultCard rows={[{ label: 'Converted time', value: result || '—', emphasis: true }]} />
      }
    />
  );
}
