const passport = require('passport');
const { User } = require('../models');
const local = require('./local');
module.exports = () => {
    // route에서 local 검증 끝나고 req.login 부분과 같이 실행됨
    passport.serializeUser((user, done) => { 
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findOne({ where: { id }});
            done(null, user);
        }catch(err){
            console.eroor(err);
            done(err);
        }
    });
    local();
};