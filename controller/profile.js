const Profile = require('../schemas/profile');

exports.savedog = async (req, res, next) => {
  const { petName, petGender, petBirth, petBreed } = req.body;
  const { user } = res.locals;
  try {
    await Profile.create({
      petImage: req.file.location,
      petName,
      petGender,
      petBirth,
      petBreed,
      userID: user.userID,
    });
    res.status(200).send({ success: '정보가 등록되었습니다.' });
  } catch (error) {
    res.status(400).send({ fail: '정보를 다시 확인해주세요' });
    next(error);
  }
};

exports.mypageMain = async (req, res, next) => {
  const { user } = res.locals;
  try {
    const [userData] = await Profile.find({ userID: user.userID });
    console.log(user.nickname);
    console.log(userData);
    if (!userData) {
      res.status(401).send('데이터가 존재하지 않습니다.');
      return;
    }
    res.status(200).send(userData);
  } catch (error) {
    res.status(400).send();
    next(error);
  }
};
