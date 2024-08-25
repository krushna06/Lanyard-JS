const userService = require('../../services/userService');

exports.getUserData = async (req, res) => {
    const userId = req.params.userid;

    try {
        const userData = await userService.fetchUserData(userId);

        if (!userData || userData.success === false) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.json(userData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
