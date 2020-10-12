const userCtrl = {};

const pool = require('../database');


userCtrl.renderUserProfile = (req, res, next) => {
    res.render('profile');
};

userCtrl.renderEditUserProfile = async (req, res, next) => {
    const {id} = req.params;
    const profile = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

    res.render('profile/edit', {profile: profile[0]});
};

userCtrl.editUserProfile = async (req, res, next) => {
    const {id} = req.params;
    const {username, fullname} = req.body;
    const newProfile = {
        username,
        fullname
    };
    await pool.query('UPDATE users set ? WHERE id = ?', [newProfile, id]);
    req.flash('success', 'Perfil editado exitosamente.');
    res.redirect('/profile');
};

module.exports = userCtrl;
