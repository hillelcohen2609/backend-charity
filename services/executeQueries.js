const sql = require("../db/connection");

//i
module.exports.insertNewUser = async (username, password, age, numberPhone) => {
  const insertUser = await sql.execute(
    "INSERT INTO `charity`.`users` (user_name,password,age,number_phone,access_rights,trusted) VALUES (?, ?, ?, ?, ?, ?)",
    [username, password, age, numberPhone, 1, 0]
  );
  const [resultSetHeader] = insertUser;
  const { fieldCount, affectedRows, insertId } = resultSetHeader;
  return { affectedRows, insertId };
};

module.exports.updateUserInfo = async (
  id,
  level,
  username,
  password,
  age,
  numberPhone,
  access,
  trusted
) => {
  let update = null;
  switch (level) {
    case 1:
      update = await sql.execute(
        "UPDATE `charity`.`users` SET user_name = ?, password = ?, age = ?, number_phone = ? WHERE user_id = ?"
        ,[username,password,age,numberPhone,id]
      );

      break;

    case 2:
      const trustedval = trusted<2||0;
      update = await sql.execute(
        "UPDATE `charity`.`users` SET user_name = ?, password = ?, age = ?, number_phone = ?,access_rights=access_rights,trusted = ? WHERE user_id = ?"
        ,[username,password,age,numberPhone,trustedval,id]
      );

      break;
      case 3:
      const trustedd = trusted<2||0;
      const accessval = access<4 || 1;
      update = await sql.execute(
        "UPDATE `charity`.`users` SET user_name = ?, password = ?, age = ?, number_phone = ?,access_rights=?,trusted = ? WHERE user_id = ?"
        ,[username,password,age,numberPhone,accessval,trustedval,id]
      );

      break;
  }
  console.log("update querie:",update);
  const [resultSetHeader] = update;
  const { fieldCount, affectedRows, insertId } = resultSetHeader;
  return  affectedRows;
  
};
