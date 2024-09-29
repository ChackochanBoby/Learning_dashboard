const handleError = async (error, req, res, next) => {
    
    try {
        console.log(error)
        const statusCode = error.statusCode || 500
        const message = error.message || "internal server error"
        res.status(statusCode).json({message})
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({ message: error.message || "internal server error" })
    }
} 

module.exports = {handleError}