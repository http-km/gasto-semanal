//? Variables

//* Obtenemos presupuesto del usuario, mediante un prompt
const presupuestoUser = prompt('¿Cual es tu presupuesto Semanal?');
const form = document.getElementById('agregar-gasto');
let cantidadPresupuesto;



//? Clases

//* Maneja las operaciones del presupuesto
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    //? Metodos

    //* Restar del presupuesto
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }

    
    
}

//* Maneja toda la interfaz de Usuario
class UserI {
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //* Insertar al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(msg, type){
        //* Creamos un DIV que contendra los mensajes
        const divMsg = document.createElement('div');

        divMsg.classList.add('text-center', 'alert');

        //* Verificar si se produce algun error
        if(type === 'error'){
            divMsg.classList.add('alert-danger');
        } else {
            divMsg.classList.add('alert-success');
        }
        divMsg.appendChild(document.createTextNode(msg));

        //* Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMsg, form);

        //* Quitar el Alert despues de 3 segundos
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            form.reset()    //* Resetear Formulario
        }, 3000);
    }
    agregarGastoList(nombre, cantidad){
        const gastoList = document.querySelector('#gastos ul');

        //* Crear li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        //* Insertar el Gasto
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
        `;

        //* Insertar al HTML
        gastoList.appendChild(li);

    }

    //* Comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        //* Leemos el presupuesto restante
        const presupuestoRestanteUser = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presupuestoRestanteUser}`;
        // console.log(presupuestoRestanteUser);

        this.comprobarPresupuesto();
    }
    //* Cambia de Color el presupuesto Restante
    comprobarPresupuesto(){

        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //* Comprobar el 25%
        if((presupuestoTotal / 4) > presupuestoRestante ){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
        
        console.log(presupuestoRestante);
    }
}

//? EventListeners

//* Cargar pagina, hasta que el usuario ingrese un presupuesto
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUser === null || presupuestoUser === ''){
        window.location.reload(); //* Recargamos la pagina, si el usuario no ingresa presupuesto
    } else {
        //* Instanciamos un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUser);

        //* Instanciamos la Interfaz de Usuario
        const ui = new UserI();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
        
        // console.log(cantidadPresupuesto)
    }
})

//* Evento que se ejecuta al presionar el boton del formulario
form.addEventListener('submit', function(e){
    e.preventDefault();

    //* Leer del Formulario
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //* Instanciar la Interfaz
    const ui = new UserI();

    //* Comprobar que los campos no esten vacios, y que la cantidad sea de tipo number
    if(nombreGasto === '' || cantidadGasto === '' && cantidadGasto === Number){
        ui.imprimirMensaje('Oops... Algo paso', 'error');
    } else {
        //* Insertar en el HTML
        ui.imprimirMensaje('Agregado Correctamente', 'correcto');
        ui.agregarGastoList(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
})



















