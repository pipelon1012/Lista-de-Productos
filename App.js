class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}
//Clase de interfaz de usuario
class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        //creo un div para mostrar en pantalla el producto
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card text-center mb-4">
         <div class="card-body">
            <strong>Nombre del producto</strong>: ${product.name}
            <strong>Precio del producto</strong>: ${product.price}
            <strong>Año del producto</strong>: ${product.year}
            <a href="#" class="btn btn-danger" name="delete">Borrar</a>
          </div>
        </div>
        
        `;

        productList.appendChild(element);
        this.resetForm();

    }

    resetForm() {
        document.getElementById('product-form').reset();
    }
    deleteProduct(element) {

        if(element.name === 'delete')
        element.parentElement.parentElement.parentElement.remove();
        this.showMessage('Producto eliminado con exito' , 'info')

    }
    showMessage(message, cssClass) {
        const div = document.createElement('div')
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //Mostrando en Dom
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div,app);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);

    }
}

//Dom Events
document.getElementById('product-form')
    .addEventListener('submit', function (e) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        const product = new Product(name, price, year);
        //Creo un objeto de la clase UI llamado ui
        const ui = new UI();
        if(name === '' || price === '' || year === '' ) {
            return ui.showMessage('Complete los campos porfavor','info')
        }
        ui.addProduct(product);
        ui.showMessage('Producto ingresado con exito', 'success');

        e.preventDefault();
    });


document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
})