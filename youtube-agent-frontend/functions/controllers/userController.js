const { upsertUser } = require("../services/firestoreService");

exports.handleUser = async (req, res) => {
  const { userId, userData } = req.body;
    console.log("request received", req.body);
  try {
    await upsertUser(userId, userData);
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
