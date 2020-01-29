function getError(error, show) {
  let msg;
  if (error.response) {
    msg = error.response.data;
    if (error.response.data.error) {
      msg = error.response.data.error.message;
    }
  } else if (error.request) {
    msg = error.request;
  } else {
    msg = error.message;
  }
  show(msg);
}

export default getError;
