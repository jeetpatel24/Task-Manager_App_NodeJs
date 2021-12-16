//here fn is a function which is passed as a parameter from the controller
//and in controller we have async so here we have await fn(req,res,next)

const asyncWrapper = (fn) => {
    return async (req,res,next) => {
        try {
            await fn(req,res,next);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = asyncWrapper