const CONSTANTS = require('../constants');

// // format error.
// function formatError(res, body) {
//   console.log("errrrrrrrrrrrrrrrrror");
  
//   const isClientError = res.statusCode >= 400 && res.statusCode < 500;
//   return {
//     status: 'error',
//     success: false,
//     message: isClientError ? body.message : CONSTANTS.INTERNAL_SERVER_ERROR,
//     code: isClientError ? body.code : CONSTANTS.INTERNAL_SERVER_ERROR,
//     data: {}
//   };
// }

// // format success.
// function formatSuccess(res, body) {
//   console.log("errrrrrrrrrrrrrrrrror");
//   return {
//     status: 'success',
//     success: true,
//     message: body.message || '',
//     data: body
//   };
// }

// // format requests response.
// function formatResponse(req, res, body) {
//   console.log("errrrrrrrrrrrrrrrrror");
//   console.log('body', body);
//   let response;
//   if (body instanceof Error) {
//     response = formatError(res, body);
//   } else {
//     response = formatSuccess(res, body);
//   }

//   response = JSON.stringify(response);
//   return response;
// }


// format success.
// function formatSuccess(res, body) {
//   return {
//     status: 'success',
//     success: true,
//     message: body.message || '',
//     data: body
//   };
// }


// // format requests response.
// function formatResponse(req, res, body) {
//   console.log("errrrrrrrrrrrrrrrrror");
//   console.log('body', body);
//   let response;
//   if (body instanceof Error) {
//     response = formatError(res, body);
//   } else {
//     response = formatSuccess(res, body);
//   }

//   response = JSON.stringify(response);
//   return response;
// }

// Errors 404(Routes Not Found)
function formatResponse(req, res, next) {
    req.status = 404;
    const error = new Error("Routes Not Found");
    next(error);
  }

  // Errors All
  function responseFormat(error, req, res, next)  {
      var statuscode = res.status(req.status).statusCode;
    const isClientError = statuscode >= 400 && statuscode < 500;
      res.status(req.status || 500).send({
        status: 'error',
        success: false,
          data: {
          },
          message: isClientError ? error.message : CONSTANTS.MESSAGES.INTERNAL_SERVER_ERROR,
          message:error,
          stack: res.statusCode,
          method:req.method,
          url:req.url
      })
  }

  // format success.
function formatSuccess(res, body) {  
  res.send( {
    status: 'success',
    success: true,
    // message: body || '',
    data: body
  });
}

module.exports = {responseFormat, formatResponse,formatSuccess};
