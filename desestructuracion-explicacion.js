let persona = {
        nombre: 'Fernando',
        apellido: 'Herrera'
    }

    //Desestructuracion de objetos
    /* 
    const {nombre, apellido} = persona
    
    console.log(`Hola me llamo ${nombre} y mi apellido es ${apellido}`) 
    */


    //Desestructuracion de objetos (en funciones que reciben un objeto)
    function saludar ({nombre, apellido}, tieneSuerte){
        
        console.log(`Hola me llamo ${nombre} y mi apellido es ${apellido}`)
    }

    saludar({nombre: 'juan', apellido: 'perez'}, true)