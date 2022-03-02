module.exports = (req, res, next) => {

  let sessionUser = {
    "user": {
        "id": "6209490cf9a8fc2c209ee45a",
        "corporationName": "Empresa S.A.",
        "descriptionCorporate": "Me describo la empresa",
        "international": false,
        "email": "gesrse@fakemail.ez",
        "role": "recruiter",
        "surname1": "García",
        "surname2": "Fernandez",
        "contactData": "C/ Falsa 123",
        "offers": [],
        "img": "/path/filename.jpg",
        "creationDate": "2022-02-13T18:08:12.241Z",
        "__v": 0
      },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjQzNTYzMDU5LCJleHAiOjE2NDM1NjY2NTl9.G9PB_0IZcF0gBkpkxXDCKqY_2jPNOPUW1ri1xHBNTd4"
  };

  if (req.url === '/session') {
    req.body = sessionUser;
    res.body = sessionUser;
    console.log("Session middleware are runing!!!");
  }
  next();
};

// TODO: wrapper for new CustomResponses like this examples:

  /*
  router.render = (req, res) => {
    let data = res.locals.data;
    if (url === "/api/quotes" && req.method === "GET") {
      data = data.map(toQuoteSummary);
    }
    res.jsonp(data);
  };

  https://chrissloan.info/2019/11/29/Local-development-with-json-server-and-JSON-API/
  https://www.rahulpnath.com/blog/setting-up-a-fake-rest-api-using-json-server/

  Remember to restore the part of the README.md that talks about the api mock, in a previous commit.
  */