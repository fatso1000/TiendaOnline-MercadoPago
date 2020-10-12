const mp = require('mercadopago');

// Agrega Credenciales
mp.configure({
    sandbox: true,
    // client_id: 'TEST-109754ab-dcff-46e8-bafa-da82b4fe0265',
    access_token: 'TEST-6470203640146131-100707-5bf61aa9bfb38c595a7a46bc4a0edbe1-239826398'
});

// Crea un objeto de preferencia
let preference = {
    items: [
      {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };

mp.preferences.create(preference)
.then(function(response){

  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});

module.exports = mp;