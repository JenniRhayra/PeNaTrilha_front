const moneyMask = {
  apply: (value: any) => {
    if (value === null || value === undefined || value === '') return '';

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(value) || 0);
  },
  clean: (value: any) => {
    value = (value || '').toString().replace(/[^\d,]/gi, '');

    if (!value.includes(',')) {
      value = '0,' + padStart(value, 2, '0');
    }

    const [, cents] = value.split(',');

    if (cents && cents.length !== 2) {
      value = value
        .replace(',', '')
        .replace(/(\d+)?(\d{2})/gi, '$1,$2')
        .replace(/^,/gi, '0,');
    }

    return parseFloat(value.replace(/\./gi, '').replace(',', '.'));
  },
};

function padStart(string: any, length: any, chars: any) {
  const strLength = length ? string.length : 0;
  return strLength < length ? createPadding(length - strLength, chars) + string : string || '';
}

function createPadding(length: any, chars: any) {
  return new Array(length).fill(chars).join('');
}

export default moneyMask;
