//Desafío entregable N°2

const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./datos.json";
    try {
      let products = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(products);
    } catch {
      this.products = [];
    }
  }

  async addProduct(product) {
    try {
      //falta leer los archivos existentes
      let existeCodigo = false;
      this.products.forEach((prod) => {
        prod.code.includes(product.code)
          ? (existeCodigo = true)
          : (existeCodigo = false);
      });

      let datosCompletos = Object.values(product);

      if (existeCodigo === true) {
        console.log("El código ya existe");
        return;
      }
      if (
        (datosCompletos.length !== 5 && datosCompletos.includes(undefined)) ||
        datosCompletos.includes("")
      ) {
        console.log("Hay campos incompletos");
        return;
      }

      //si todo salió bien
      console.log("Éxito");

      if (this.products.length === 0) {
        product.id = 1;
      } else {
        product.id = this.products[this.products.length - 1].id + 1;
      }
      this.products.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (error) {
      console.log(`Hay un error: ${error}`);
    }
  }

  getProducts() {
    return this.products;
    //   let info = fs.readFileSync(this.path, "utf-8")
    //  this.info = JSON.stringify(info)
    //  console.log(this.info);
    // console.log(this.products);
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

  async updateProduct(idProducto, key, newValue) {
    let productoAmodificar = this.products.find(
      (producto) => producto.id === idProducto
    );
    if (!productoAmodificar) {
      console.log("Error. El producto no existe.");
      return;
    }

    productoAmodificar[key] = newValue;

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, "\t")
    );
    console.log("Producto actualizado");
  }

  async deleteProduct(idProducto) {
    const productoEncontrado = this.products.find(
      (prod) => prod.id === idProducto
    );

    if (!productoEncontrado) {
      return console.log("No se puede borrar. El producto no existe");
    }

    try {
      this.products.splice(idProducto - 1, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      console.log("Producto borrado");
    } catch (error) {
      console.log(`Hubo un error al guardar los datos: ${error}`);
      return;
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

// 1) Instancio la clase
const prueboProducto = new ProductManager();

// 2) Agrego productos y pruebo las validaciones. Si hay campos vacios o si se repite el código, no se agregan
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
    "a este le falta el stock",
    243,
    "SinImagen",
    "woeiefjwijw"
  )
);

prueboProducto.addProduct(
  new Product(
    "Producto prueba3",
    "Acá repito el código",
    232230,
    "SinImagen",
    "abc143",
    "4999"
  )
);

prueboProducto.addProduct(
  new Product(
    "Producto prueba4",
    "Acá tiene todo bien",
    12345,
    "SinImagen",
    "otrocodigo",
    "4999"
  )
);

prueboProducto.addProduct(
  new Product(
    "",
    "A este le falta el titulo",
    12345,
    "SinImagen",
    "32rhiof2oi",
    "4999"
  )
);

// 3) Busco productos por id
prueboProducto.getProductById(2);

// // 4) Borro productos por id
prueboProducto.deleteProduct(2);

// // 5) Actualizo productos por parámetros (id, llave, valor a modificar)
prueboProducto.updateProduct(1, "price", "300");

// 6) Por último obtengo el array de productos final
console.log(prueboProducto.getProducts())
