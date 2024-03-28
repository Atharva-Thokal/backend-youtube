//these are wrapper codes used to wrap around async await type of code

//type 2 using promise
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {asyncHandler}


// const asyncHandler = () => {}
// const asyncHandler = (fn) => { () => {} }
// const asyncHandler = (fn) => async () => {}


// type 1 using try catch
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }