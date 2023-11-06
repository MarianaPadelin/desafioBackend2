//Desafío entregable N°2

const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./datos.json";
    try {
      this.products = JSON.parse(this.products);
    } catch {
      this.products = [];
    }
  }

  async addProduct(product) {
    let existeCodigo = false;
    this.products.forEach((prod) => {
      prod.code.includes(product.code)
        ? (existeCodigo = true)
        : (existeCodigo = false);
    });


    //ESTA ES LA VALIDACIÓN PROBLEMÁTICA
    let datosCompletos = Object.values(Product);

    if ((datosCompletos.length = 5 && !datosCompletos.includes(""))) {
      return true
    }
  //con esta nueva forma me devuelve siempre false
 
    if (!existeCodigo) {
      if (this.products.length === 0 && datosCompletos === true) {
        product.id = 1;

        try {
          this.products.push(product);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(this.products, null, "\t")
          );
        } catch (error) {
          console.log(`Error: ${error}`);
          return;
        }

      } else if (datosCompletos == true) {
        product.id = this.products[this.products.length - 1].id + 1;

        try {
          this.products.push(product);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(this.products, null, "\t")
          );
        } catch (error) {
          console.log(`Error: ${error}`);
          return;
        }
      } else console.log("Todos los campos deben estar completos");

    } else console.log("Error, el producto ya existe.");
  }

  async updateProduct(id) {
    const producto = this.products.find((prod) => prod.id === id);

    if (!producto) {
      return console.log("No se puede actualizar, el producto no existe");
    }

    // const index = this.posts.findIndex(producto);

    try {
      //no se como actualizar
      // this.products.splice(index, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (error) {
      console.log(`Hubo un error al guardar los datos: ${error}`);
      return;
    }
  }

  async deleteProduct(idProducto) {
    const productoEncontrado = this.products.find((prod) => prod.id === idProducto);

    if (!productoEncontrado) {
      return console.log("No se puede borrar. El producto no existe");
    } 

    try {
      this.products.splice(idProducto, 1);
      console.log("Producto borrado")
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (error) {
      console.log(`Hubo un error al guardar los datos: ${error}`);
      return;
    }
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(idProducto) {
    const producto = this.products.find(
      (producto) => producto.id === idProducto
    );

    if (!producto) {
      console.log("Not found");
    } else {
      console.log("El producto encontrado es", producto);
    }
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.thumbnail = thumbnail),
      (this.code = code),
      (this.stock = stock);
  }
}

//-------- Pruebas --------
const prueboProducto = new ProductManager();


prueboProducto.addProduct(
  new Product(
    "Producto prueba1",
    "Este es un producto prueba",
    2030,
    "SinImagen",
    "abc143",
    "44"
    
  )
);


prueboProducto.addProduct(
  new Product(
    "Producto prueba2",
    "Este también es un producto prueba",
    2030,
    "SinImagen",
    "abc13",
    
  )
);

prueboProducto.addProduct(
  new Product(
    "Producto prueba3",
    "Este también es un producto prueba",
    232230,
    "SinImagen",
    "23diojo2"
  )
);


prueboProducto.getProductById(2);
//se corre el indice
prueboProducto.deleteProduct(1);
prueboProducto.getProducts()


//4-Llamo nuevamente al método getProducts para mostrar el producto recién agregado
// console.log(prueboProducto.getProducts());

// async function fetchDatos() {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await response.json();

//     // console.log(data);

//     const manager = new ProductManager("./posts.json");
//   } catch (error) {
//     console.log(`Hubo un error al utilizar fetch: ${error}`);
//   }
// }

// fetchDatos();
