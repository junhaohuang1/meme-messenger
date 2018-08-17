module.exports = function(sequelize, DataTypes){
  var friendslist = sequelize.define('Friendslist', {

    userOneID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userTwoID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  return friendslist;
}
