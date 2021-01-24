const checkEmail = (email) => {
  const rgExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return rgExEmail.test(String(email).toLowerCase());
};

const checkEmpty = (stringCheck) => {
  if (stringCheck === null) {
    return false;
  }
  if (stringCheck.length === 0) {
    return false;
  }
  if (typeof stringCheck === 'undefined') {
    return false;
  }
  return true;
};

export {checkEmail, checkEmpty};
