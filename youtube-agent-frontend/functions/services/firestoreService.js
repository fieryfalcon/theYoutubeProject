const { db } = require("../firebaseConfig");

const upsertUser = async (userId, userData) => {
  try {
    const userRef = db.collection("Users").doc(userId);
    const userSnapshot = await userRef.get();

    if (userSnapshot.exists) {
      await userRef.update({
        ...userData,
        lastActiveAt: new Date().toISOString(),
      });
    } else {
      await userRef.set({
        ...userData,
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error upserting user:", error);
    throw new Error("Error upserting user");
  }
};

module.exports = { upsertUser };
