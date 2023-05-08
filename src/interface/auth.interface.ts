interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export { LoginInput, RegisterInput };
