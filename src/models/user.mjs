import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";
import Article from "./article.mjs";

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Article);
Article.belongsTo(User);

export default User