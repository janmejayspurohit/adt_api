module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("Users", [
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@yopmail.com",
        password: "$2a$12$f6OMJ9gRcEPGriKXjSCFF.i/KBM4I6nuidQC5UHwfmt15.Sj6ye.a",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "User",
        lastName: "User",
        email: "user@yopmail.com",
        password: "$2a$12$f6OMJ9gRcEPGriKXjSCFF.i/KBM4I6nuidQC5UHwfmt15.Sj6ye.a",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Users"),
};
