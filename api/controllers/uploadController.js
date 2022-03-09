// * UPLOAD AN AVATAR *

module.exports.uploadAvatar_POST = async (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (err) {
        console.error(err);
    }
}
