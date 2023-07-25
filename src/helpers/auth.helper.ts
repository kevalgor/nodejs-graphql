import errorHelper from "./error.helper";
import { messageConstants } from "../constants";

const checkAuth = (context: any = {}) => {
  if (!context || !context.user) {
    errorHelper.throwCustomError(
      messageConstants.UNAUTHORIZED,
      errorHelper.errorTypes.UNAUTHORIZED
    );
  }
};

export default {
  checkAuth,
};
