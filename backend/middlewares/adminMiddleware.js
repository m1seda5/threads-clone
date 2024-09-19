// middlewares/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // User is admin, proceed to the route handler
    } else {
        res.status(403).json({ error: "Access denied. Admins only." });
    }
};

export default adminMiddleware;
