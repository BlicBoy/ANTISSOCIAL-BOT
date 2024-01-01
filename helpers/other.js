/**
 * Date formater
 * @returns 
 */
function dateFormater() {
    let date_ob = new Date();
    
    let dia = date_ob.getDate();
    let mes = ("0" + (date_ob.getMonth() + 1)).slice(-2); 
    let ano = date_ob.getFullYear();
    let hora = ("0" + date_ob.getHours()).slice(-2);
    let minuto = ("0" + date_ob.getMinutes()).slice(-2);
    let dataFormatada = `${ano}${mes}${dia}T${hora}${minuto}`;

    return dataFormatada
}

exports.dateFormater = dateFormater