module.exports = (req, res, next) => {

  let sessionUser = {
    "user": {
        "_id": "6209490cf9a8fc2c209ee45a",
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