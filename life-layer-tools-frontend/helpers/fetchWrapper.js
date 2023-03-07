function fetchWrapper(url, method, body) {
  if (method === "GET" || method === "DELETE") {
    fetch(url).then((response) => {
      response
        .json()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          return err;
        });
    });
  }
  if (method === "PUT" || method === "POST") {
    fetch(url, {
      method,
      body,
    }).then((response) => {
      response
        .json()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
    }).catch;
  }
}
