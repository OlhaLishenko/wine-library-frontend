export const fullNameValidate = (userName: string) => {
  if (userName.length === 0) {
    return 'Full name is required';
  } else if (userName.length < 3) {
    return 'Full name must be at least 3 characters long';
  } else {
    return null;
  }
};
