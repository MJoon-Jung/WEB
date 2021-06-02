const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: Sequelize.STRING(20),
          allowNull: true,
          // unique: true,
        },
        email: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        role: {
          type: Sequelize.INTEGER,
          default: 0,
        },
        token: {
          type: Sequelize.STRING,
        },
        tokenExp: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: "false",
        charset: "utf8",
        collate: "utf8_general_ci",

        hooks: {
          beforeCreate: async function (user) {
            const hash = await bcrypt.hash(user.password, saltRounds);
            user.password = hash;
            return user;
          },
        },
      }
    );
  }
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
  generateToken(cb) {
    const user = this;
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);
    console.log(user._id);
    user.token = token;
    user.save(function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  }
  findByToken(token, cb) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      User.findOne(
        { where: { id: decoded.id, token: token } },
        function (err, user) {
          if (err) return cb(err);
          cb(null, user);
        }
      );
    });
  }
}

module.exports = User;
