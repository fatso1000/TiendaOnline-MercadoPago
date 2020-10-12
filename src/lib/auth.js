// VERIFICA CUANDO EL USUARIO PUEDE ACCEDER A UNA RUTA
module.exports = {
    // SOLO PUEDE ACCEDER CUANDO ESTA LOGEADO
    isLoggedIn(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },
    // SOLO PUEDE ACCEDER CUANDO NO ESTA LOGEADO
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } 
        return res.redirect('/profile');
    },
     isAdmin(req, res, next) {
         if(req.isAuthenticated() && (req.user.id == 1)) {
             return next();
         }
         return res.redirect('/');
     }
     
}