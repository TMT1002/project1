const responseTemp = (mess, data = null) => {
    return {
        message: mess,
        data,
    };
};
  
module.exports = responseTemp;
  