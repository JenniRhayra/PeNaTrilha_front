const number = {
  apply: (value: any) => {
    if (value === null || value === undefined || value === '') return '';
    return (value || '').replace(/\D/gi, '');
  },
  clean: (value: any) => {
    if (value === null || value === undefined || value === '') return '';
    return (value || '').replace(/\D/gi, '');
  },
};

export default number;
