const kakaoStrategy = require('passport-kakao').Strategy
const User = require('../schemas/user')

module.exports = async (passport) => {
    passport.use('kakao-login', new kakaoStrategy({
        clientID: process.env.CLIENTID,
        callbackURL: process.env.CALLBACKURL,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await User.findOne({userID: profile.id})
            const tokenUser = {
                user: exUser,
                accessToken: accessToken || '',
            }
            if (exUser) {
                done(null, tokenUser)
            } else {
                const newUser = await User.create({
                    userID: profile.id,
                    email: profile._json.kakao_account.email,
                    nickname: profile.displayName,
                })
                done(null, newUser)
            }
        } catch (error) {
            console.error(error)
            done(error)
        }
    }))
}