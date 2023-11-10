
const Validation = ({name, description, platforms, image, releasedate, rating, genres}) => {
    const errors = {};

    if (!rating || !/^(?!0{2,})\d+(\.\d{0,2})?$/.test(rating) || parseFloat(rating) < 0 || parseFloat(rating) > 5) {
        errors.rating = "El rating no puede ser menor a 0 o mayor que 5. Puede tener como máximo dos decimales, y debes usar un punto."
    }

    if (!(/^.{4,}$/.test(name))) {
        errors.name = "El nombre debe superar los 3 carácteres."
    }

    if (description.length < 50) {
        errors.description = "La descripción debe superar los 50 carácteres."
    }

    if (platforms.length < 2) {
        errors.platforms = "Debe especificar una plataforma."
    }

    if (!/^(https?:\/\/[\w.-]+\.\w{2,})/.test(image)) {
        errors.image = "La imagen debe ser una URL. Es necesario que la ruta empiece con 'http://' o 'https://'."
    }

    if (!(/^(?:\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(releasedate))) {
        errors.releasedate = "La fecha debe ser válida y estar en el siguiente formato 'YYYY-MM-DD'. Ejemplo: 2023-11-08."
    }

    if (!genres.length) {
        errors.genres = "Debe seleccionar al menos un género."
    }

    return errors;
}

export default Validation