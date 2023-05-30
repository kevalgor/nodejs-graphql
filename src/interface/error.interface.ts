export interface IHttpErrorConstants {
  [key: string]: number;
}

export interface IErrorTypes {
  [key: string]: {
    errorCode: string;
    errorStatus: number;
  };
}
