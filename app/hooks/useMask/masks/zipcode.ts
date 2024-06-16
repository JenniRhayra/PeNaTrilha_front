const zipcodeMask = {
  apply: (value: any) => {
    if (!value) return '';
    return value.replace(/^(\d{0,5})(\d{0,3}).*/, '$1-$2').replace(/-$/, '');
  },
  clean: (value: any) => (value || '').replace(/\D/gi, '').substr(0, 8),
};

export default zipcodeMask;
