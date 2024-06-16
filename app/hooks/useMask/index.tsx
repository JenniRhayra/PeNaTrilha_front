import React from 'react';

import cnpj from './masks/cnpj';
import cpf from './masks/cpf';
import document from './masks/document';
import money from './masks/money';
import number from './masks/number';
import phone from './masks/phone';
import zipcode from './masks/zipcode';

const maskHandlers = { cnpj, cpf, document, money, phone, zipcode, number };

export default function useMask(mask: any, value: any) {
  const { apply: maskApply, clean: maskClean } = React.useMemo(() => {
    let maskFunc = maskHandlers[mask];

    if (!maskFunc) {
      maskFunc = { apply: (v: any) => v, clean: (v: any) => v };
      mask && console.warn(`Mask '${mask}' not found`);
    }

    return maskFunc;
  }, [mask]);

  const maskedValue = React.useMemo(
    () => (maskApply ? maskApply(value) : value),
    [value, maskApply],
  );

  const cleanedValue = React.useMemo(
    () => (maskClean ? maskClean(value) : value),
    [value, maskClean],
  );

  return { maskApply, maskClean, maskedValue, cleanedValue };
}
