export  function errorHandler (err,req,res,next) {
    const responce = {
        message:err.message
    }
    if(process.env.NODE_ENVIOURMENT === 'development'){
        responce.stack = err.stack
    }

    res.status(err.status).json(responce);
}