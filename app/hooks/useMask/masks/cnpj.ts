const cnpjMask = {
  apply: (value: any) => {
    if (!value) return '';

    const regexp = /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2}).*/;
    const result = '$1.$2.$3/$4-$5';

    return value
      .replace(regexp, result)
      .replace(/[-./]$/, '')
      .replace(/[-./]$/, '')
      .replace(/[-./]$/, '');
  },
  clean: (value: any) => (value || '').replace(/\D/gi, '').substr(0, 14),
};

export default cnpjMask;
