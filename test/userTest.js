import chai from "chai";
import server from "../server";
import chaiHttp from "chai-http";
import faker from "faker";
import bcrypt from "bcryptjs";

chai.use(chaiHttp);

const { expect } = chai;

let DbUserToken;
let parentToken;
let nannyToken;
let loggedInUserToken;

const userDb = {
  fname: faker.name.firstName(),
  lname: faker.name.lastName(),
  email: faker.internet.email(),
  password: "Sweetmum",
  address: "20,Okusaga",
  phone: "09087654321"
};

const nanny = {
  fname: faker.name.firstName(),
  lname: faker.name.lastName(),
  email: faker.internet.email(),
  password: "Sweetmum",
  address: "20,Okusaga",
  phone: "09087654321",
  language: "english",
  skills: "cooking",
  canDrive: "true",
  firstAid: "true"
};

const wronguserDb = {
  firstname: "Adeola",
  lastname: "Laid3e",
  email: "lamijih@gmail.com",
  password: "Sweetmum",
  address: "20,Okusaga"
};

describe("GET /", () => {
  it("Should redirect to home route", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0].message).to.be.a("string");
        expect(body.data[0].message).to.be.equal("Welcome to NANNY SCHEDULER");
        done();
      });
  });
});

describe("GET *", () => {
  it("Should throw a 404 error", done => {
    chai
      .request(server)
      .get("/dsd")
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.a("string");
        done();
      });
  });
});

describe("POST api/parent/signup", () => {
  it("Should successfully create a user account if inputs are valid", done => {
    chai
      .request(server)
      .post("/api/parent/signup")
      .send(userDb)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        DbUserToken = body.data.token;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(201);
        expect(body.data).to.be.an("object");
        expect(body.data).to.haveOwnProperty("newUser");
        expect(body.data.newUser).to.be.an("object");
        expect(body.data.token).to.be.a("string");
        expect(body.data.newUser.lastName).to.be.a("string");

        done();
      });
  });
});

describe("POST api/parent/signup", () => {
  it("Should successfully create a nanny account if inputs are valid", done => {
    chai
      .request(server)
      .post("/api/nannies/signup")
      .send(nanny)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        parentToken = body.data.token;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(201);
        expect(body.data).to.be.an("object");
        expect(body.data).to.haveOwnProperty("newUser");
        expect(body.data.newUser).to.be.an("object");
        // expect(body.data.token).to.be.a("string");
        // expect(body.data.newUser.lastName).to.be.a("string");

        done();
      });
  });
});

// // test suite for POST /signup db user already exists
describe("POST api/parent/signup", () => {
  it("should return an error if email already exists", done => {
    chai
      .request(server)
      .post("/api/parent/signup")
      .send({
        fname: "alagba",
        lname: "Adeola",
        email: "Shaun_Bruen39@yahoo.com",
        password: "dele1989",
        address: "20,okusaga",
        phone: "08007574444"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(409);
        expect(body.error).to.be.a("string");
        done();
      });
  });
});

//test for POST /login suite
describe("POST /api/parent/login", () => {
  it("should login successfully if user inputs are valid", done => {
    chai
      .request(server)
      .post("/api/parent/login")
      .send({
        email: "Shaun_Bruen39@yahoo.com",
        password: "Sweetmum"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        loggedInUserToken = body.data[0].token;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        expect(body.data[0].message).to.be.a("string");
        expect(body.data[0].message).to.be.equal("Logged in successfully");
        expect(body.data[0].token).to.be.a("string");

        done();
      });
  });
});

// test for POST /nanny login suite
describe("POST /api/nannies/login", () => {
  it("should login successfully if user inputs are valid", done => {
    chai
      .request(server)
      .post("/api/nannies/login")
      .send({
        email: "Connie.Harris96@hotmail.com",
        password: "Sweetmum"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        nannyToken = body.data[0].token;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        expect(body.data[0].message).to.be.a("string");
        expect(body.data[0].message).to.be.equal("Logged in successfully");
        expect(body.data[0].token).to.be.a("string");

        done();
      });
  });
});

// test for POST /login suite
describe("POST /api/parent/login", () => {
  it("should throw an error if inputs are invalid", done => {
    chai
      .request(server)
      .post("/api/parent/login")
      .send({
        email: "Shaun_Bruen39@yahoo.com",
        password: "Sweemum"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(401);
        expect(body.error).to.be.a("string");

        done();
      });
  });
});

// test for POST /login suite
describe("POST /api/parent/login", () => {
  it("should throw an error if inputs are not provided", done => {
    chai
      .request(server)
      .post("/api/parent/login")
      .send({
        email: "Shaun_Bruen39@yahoo.com"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(422);
        expect(body.message).to.be.a("string");

        done();
      });
  });
});

// test for POST /login suite
describe("POST api/nannies/", () => {
  it("should successfully get all nannies", done => {
    chai
      .request(server)
      .get("/api/nannies/")
      .set("token", DbUserToken)

      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.a("array");
        done();
      });
  });
});

// TEST SUITE FOR GET ALL NANNIES
describe("POST api/nannies/", () => {
  it("should successfully get all nannies within a specific location", done => {
    chai
      .request(server)
      .get("/api/nannies/nanny")
      .send({ location: "20,Okusaga" })
      .set("token", DbUserToken)

      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.a("array");
        done();
      });
  });
});

describe("POST api/nannies/", () => {
  it("should throw an error if token is not provided", done => {
    chai
      .request(server)
      .get("/api/nannies/nanny")
      .send({ location: "20,Okusaga" })

      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.a("string");
        done();
      });
  });
});

// TEST SUITE TO REQUEST FOR A NANNY
describe("POST api/nannies/", () => {
  it("should successfully request for a nanny", done => {
    chai
      .request(server)
      .post("/api/parent/request/2")
      .send({
        no_of_kids: "2",
        time_needed: "4-6pm",
        notes: "need nanny",
        ages_of_kids: "4,6yrs"
      })
      .set("token", DbUserToken)

      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(201);
        expect(body.data).to.be.an("object");
        done();
      });
  });
});

// TEST SUITE TO ACCEPT OR REJECT A REQUEST
describe("POST api/nannies/", () => {
  it("should successfully request for a nanny", done => {
    chai
      .request(server)
      .post("/api/nannies/approve/2")
      .send({
        status: "Accepted"
      })
      .set("token", nannyToken)

      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("object");
        done();
      });
  });
});
