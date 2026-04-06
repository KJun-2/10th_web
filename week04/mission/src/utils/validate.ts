export type UserSigninInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformation) {
  const errors: Record<keyof UserSigninInformation, string> = {
    email: '',
    password: '',
  };
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = 'Password must be between 8 and 20 characters';
  }
  return errors;
}

//나중에 코드가 복잡해졌을 떄 로그인 전용 로직을 안전하게 추가할 수 있도록 도와줌
function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}

export { validateSignin };