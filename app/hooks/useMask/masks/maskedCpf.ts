export const maskedCpfandCnpjOccult = (maskedOcult: any) => {
  return (
    maskedOcult.substring(0, 3) +
    maskedOcult.substring(3, maskedOcult.length).replace(/[0-9]/g, '*')
  );
};
