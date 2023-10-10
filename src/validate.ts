export const checkPhone = (phone: string) => {
  let re = /^1([3-9]){1}(\d){9}$/;
  return re.test(phone);
};
