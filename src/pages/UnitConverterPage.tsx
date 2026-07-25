import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPage } from '@components/common/FormPage';
import { FormField } from '@components/common/FormField';
import { SelectField } from '@components/common/SelectField';
import { ResultCard } from '@components/common/ResultCard';
import { UNIT_CATEGORIES, convertUnit, type UnitCategory } from '@utils/calculations/unitConverter';
import { formatNumber } from '@utils/formatNumber';

export function UnitConverterPage() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<UnitCategory>('length');
  const [value, setValue] = useState('');

  const units = useMemo(
    () => UNIT_CATEGORIES.find((entry) => entry.id === category)?.units ?? [],
    [category],
  );

  const [fromUnit, setFromUnit] = useState(units[0]?.id ?? '');
  const [toUnit, setToUnit] = useState(units[1]?.id ?? units[0]?.id ?? '');

  const handleCategoryChange = (nextCategory: string) => {
    const nextUnits = UNIT_CATEGORIES.find((entry) => entry.id === nextCategory)?.units ?? [];
    setCategory(nextCategory as UnitCategory);
    setFromUnit(nextUnits[0]?.id ?? '');
    setToUnit(nextUnits[1]?.id ?? nextUnits[0]?.id ?? '');
  };

  const result = convertUnit(category, Number(value) || 0, fromUnit, toUnit);

  return (
    <FormPage
      title={t('pages.unitConverter.title')}
      fields={
        <>
          <SelectField
            label={t('pages.unitConverter.category')}
            value={category}
            onChange={handleCategoryChange}
            options={UNIT_CATEGORIES.map((entry) => ({ value: entry.id, label: entry.label }))}
          />
          <FormField
            label={t('pages.unitConverter.value')}
            value={value}
            onChange={setValue}
            placeholder="0"
          />
          <SelectField
            label={t('pages.unitConverter.from')}
            value={fromUnit}
            onChange={setFromUnit}
            options={units.map((unit) => ({ value: unit.id, label: unit.label }))}
          />
          <SelectField
            label={t('pages.unitConverter.to')}
            value={toUnit}
            onChange={setToUnit}
            options={units.map((unit) => ({ value: unit.id, label: unit.label }))}
          />
        </>
      }
      result={
        <ResultCard
          rows={[
            {
              label: t('pages.unitConverter.result'),
              value: formatNumber(result, 6),
              emphasis: true,
            },
          ]}
        />
      }
    />
  );
}
