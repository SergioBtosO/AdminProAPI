const User = require('./../models/user.model');
const fs = require('fs');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const updateImage = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
                
        case 'users':

            const usuario = await User.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/users/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await User.save();
            return true;

        break;
    }


}



module.exports = { 
    updateImage
}
