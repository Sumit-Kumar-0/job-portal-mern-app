class SuccessHandler {
    constructor(data, statusCode = 200) {
      this.data = data;
      this.statusCode = statusCode;
    }
  }
  
  export const successMiddleware = (req, res, next) => {
    let data = null;
    let statusCode = 200;
    data = req.body;
    const success = new SuccessHandler(data, statusCode);
    return res.status(success.statusCode).json({
      success: true,
      data: success.data,
    });
  };
  
  export default SuccessHandler;
  