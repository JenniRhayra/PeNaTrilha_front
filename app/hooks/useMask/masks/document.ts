import cnpjMask from './cnpj';
import cpfMask from './cpf';

const documentMask = {
  apply: (value: any) => {
    if (!value) return '';
    return value.length > 11 ? cnpjMask.apply(value) : cpfMask.apply(value);
  },
  clean: (value: any) => {
    if (!value) return '';
    return value.length > 11 ? cnpjMask.clean(value) : cpfMask.clean(value);
  },
};

export default documentMask;
