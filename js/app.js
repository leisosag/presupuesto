// VARIABLES
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

// CLASES
// clase del presupuesto
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    
    // metodo para ir restando del presupuesto actual
    presupuestoRestante(cantidad=0) {
        return this.restante -= Number(cantidad);
    }
}

// clase de interfaz para todo lo que es HTML
class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        // insertar al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-succes');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));

        // insertar en DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // quitar alert
        setTimeout(function() {
            document.querySelector('.primario .alert').remove();
        }, 2000);
    }
    agregarGastoListado(nombre, cantidad) {
        const gastosListado = document.querySelector('#gastos ul');
        
        // creo li
        const li = document.createElement('li');
        li.classList = 'list-group-item d-flex justify-content-between align-items-center'
        
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
        `;
        
        //insertar en HTML
        gastosListado.appendChild(li);
    };

    //comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('#restante');

        // leer el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        this.comprobarPresupuesto();
    }

    // cambia de color el presupuesto restante
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // comprobar 25%
        if( (presupuestoTotal/4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-succes', 'alert-warning');
            restante.classList.add('alert-danger');
            // comprobar 50%
        } else if ( (presupuestoTotal/2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-succes', 'alert-warning');
            restante.classList.add('alert-warning');
        }
    };
}
// EVENT LISTENERS
// no se inicia si no agrego un presupuesto en el prompt
document.addEventListener('DOMContentLoaded', function() {
    if(presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        // defino el presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        // instanciar clase interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

// para cuando hago click en agregar
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // leer del form de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // instanciar la interfaz
    const ui = new Interfaz();

    // comprobar que los campos no esten vacios
    if (nombreGasto === '' || cantidadGasto === '') {
        // dos parametros = mensaje y tipo
        ui.imprimirMensaje('Revisa el formulario', 'error');
    } else {
        // insertar en el HTML
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});