import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const zones = useMemo(() => getSupportedTimeZones(), []);
  const [dateTime, setDateTime] = useState(nowAsDateTimeLocal());
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState(zones.find((zone) => zone !== 'UTC') ?? 'UTC');

  const result = convertBetweenTimeZones(dateTime, fromZone, toZone);
  const zoneOptions = zones.map((zone) => ({ value: zone, label: zone }));

  return (
    <FormPage
      title={t('pages.timezoneConverter.title')}
      fields={
        <>
          <FormField
            label={t('pages.timezoneConverter.dateTime')}
            type="datetime-local"
            value={dateTime}
            onChange={setDateTime}
          />
          <SelectField
            label={t('pages.timezoneConverter.fromTimezone')}
            value={fromZone}
            onChange={setFromZone}
            options={zoneOptions}
          />
          <SelectField
            label={t('pages.timezoneConverter.toTimezone')}
            value={toZone}
            onChange={setToZone}
            options={zoneOptions}
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: t('pages.timezoneConverter.convertedTime'),
              value: result || '—',
              emphasis: true,
            },
          ]}
        />
      }
    />
  );
}
