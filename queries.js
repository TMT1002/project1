const getAllQuestions = "SELECT * FROM questions";
const getAllUser = "SELECT * FROM users";
const getToken = "SELECT * FROM tokens";
const addToken = "INSERT INTO tokens (user_id,refresh_token,token) VALUES ($1,$2,$3)";
const addUser = "INSERT INTO users (first_name,last_name,gmail,account,password) VALUES ($1,$2,$3,$4,$5)";
const checkEmailExists = "SELECT gmail FROM users s WHERE s.gmail = $1";
const checkAccountExists = "SELECT account FROM users s WHERE s.account = $1";
const checkLogin = "SELECT password FROM users s WHERE s.account = $1";
const getUserByAccount = "SELECT*FROM users s WHERE s.account = $1";
const getQuestionById = "SELECT*FROM questions WHERE questions.question_id = $1";
const getUserById = "SELECT*FROM users s WHERE s.user_id = $1" 
const deleteUserById = "DELETE FROM users WHERE user_id = $1"

module.exports = {getAllQuestions,
    getAllUser,
    getToken,
    addToken,
    addUser,
    checkEmailExists,
    checkLogin,
    checkAccountExists,
    getUserByAccount,
    getQuestionById,
    getUserById,
    deleteUserById
};