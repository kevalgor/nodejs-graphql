interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
}

interface UserInput {
  name: string;
  email: string;
  mobile: string;
}

export { User, UserInput };
