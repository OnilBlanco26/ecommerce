// Carrito v1
// #1 BASE DE DATOS
const db = [
  {
    id: 1,
    name: 'I9-13900K',
    price: 15500,
    image: 'assets/img/i9-13900k.png',
    category: 'CPUs',
    quantity: 37
  },
  {
    id: 2,
    name: 'I9-12900kf',
    price: 11600,
    image: 'assets/img/i9-12900kf.png',
    category: 'CPUs',
    quantity: 53
  },
  {
    id: 3,
    name: 'Ryzen 7950X',
    price: 10150,
    image: 'assets/img/ryzen-7950X.png',
    category: 'CPUs',
    quantity: 41
  },
  {
    id: 4,
    name: 'Ryzen 7900X',
    price: 8700,
    image: 'assets/img/ryzen-7900X.png',
    category: 'CPUs',
    quantity: 32
  },
  {
    id: 5,
    name: 'Ryzen 7700X',
    price: 6750,
    image: 'assets/img/ryzen-7700X.png',
    category: 'CPUs',
    quantity: 43
  },
  {
    id: 6,
    name: 'RTX 4090 GYGABYTE',
    price: 34800,
    image: 'assets/img/rtx_4090.png',
    category: 'GPUs',
    quantity: 15
  },
  {
    id: 7,
    name: 'NVDIA RTX 3090 MSI',
    price: 17390,
    image: 'assets/img/rtx-3090-msi.png',
    category: 'GPUs',
    quantity: 34
  },
  {
    id: 8,
    name: 'NVDIA RTX 3080 MSI',
    price: 13525,
    image: 'assets/img/rtx-3080-msi.png',
    category: 'GPUs',
    quantity: 37
  },
  {
    id: 9,
    name: 'Radeon 6950 XT MSI',
    price: 15500,
    image: 'assets/img/radeon-6950XT.png',
    category: 'GPUs',
    quantity: 33
  },
  {
    id: 10,
    name: 'Radeon 6900 XT Aorus',
    price: 13525,
    image: 'assets/img/radeon-6900XT.png',
    category: 'GPUs',
    quantity: 26
  },
  {
    id: 11,
    name: 'GYGABYTE Z790 Aero G',
    price: 9500,
    image: 'assets/img/GIGABYTE-Z790-AERO-G.png',
    category: 'Motherboard',
    quantity: 18
  },
  {
    id: 12,
    name: 'GIGABYTE Z690I AORUS Ultra Plus D4',
    price: 11600,
    image: 'assets/img/GIGABYTE-Z690I-AORUS-Ultra-Plus-D4.png',
    category: 'Motherboard',
    quantity: 11
  },
  {
    id: 13,
    name: 'ASUS TUF Gaming X670E PLUS',
    price: 12000,
    image: 'assets/img/ASUS-TUF-Gaming-X670E-PLUS.png',
    category: 'Motherboard',
    quantity: 23
  },
  {
    id: 14,
    name: 'ASUS ROG Strix X670E E',
    price: 10000,
    image: 'assets/img/ASUS-ROG-Strix-X670E-E.png',
    category: 'Motherboard',
    quantity: 19
  },
  {
    id: 15,
    name: 'ASUS ROG Crosshair X670E Hero',
    price: 8700,
    image: 'assets/img/ASUS-ROG-Crosshair-X670E-Hero.png',
    category: 'Motherboard',
    quantity: 9
  },
  {
    id: 16,
    name: 'Dominator DDR5 2x32 GB 6200 mHz',
    price: 4700,
    image: 'assets/img/dominator-DDR5-2x32gb-6200mhz.png',
    category: 'RAM',
    quantity: 12
  },
  {
    id: 17,
    name: 'Corsair DDR5 2x32 GB 5500 mHz',
    price: 3800,
    image: 'assets/img/corsair-DDR5-2x32gb-5500mhz.png',
    category: 'RAM',
    quantity: 26
  },
  {
    id: 18,
    name: 'Dominator DDR5 2x16 GB 5600 mHz',
    price: 2500,
    image: 'assets/img/dominator-DDR5-2x16gb-5600mhz.png',
    category: 'RAM',
    quantity: 18
  },
  {
    id: 19,
    name: 'Vengeance DDR5 2x16 GB 6000 mHz',
    price: 3300,
    image: 'assets/img/vengeance-DDR5-2x16gb-6000mhz.png',
    category: 'RAM',
    quantity: 11
  },
  {
    id: 20,
    name: 'Vengeance DDR4 2x16 GB 3600 mHz',
    price: 1600,
    image: 'assets/img/vengeance-DDR4-2x16gb-3600mhz.png',
    category: 'RAM',
    quantity: 14
  },
]

const products = window.localStorage.getItem('productsDB') ? JSON.parse(window.localStorage.getItem('productsDB')) : db

// #2 Pintar los productos en el DOM
const productContainer = document.getElementById('products__content')

function printProducts() {
  let html = ''

  for (let product of products) {
    html += `
    <article class="products__card ${product.category}">
    <div class="products__shape">
      <img src="${product.image}" alt="${product.name}" class="products__img">
    </div>

    <div class="products__data">
      <h2 class="products__name">${product.name}</h2>
      <div class="">
        <h3 class="products__price"> ${numberToCurrency(product.price)}</h3>
        <span class="products__quantity">Quedan solo ${product.quantity} unidades</span>
      </div>
      <button type="button" class="button products__button addToCart" data-id="${product.id}">
        <i class="bx bx-plus"></i>
      </button>
    </div>
  </article>`
  }

  productContainer.innerHTML = html
  window.localStorage.setItem('productsDB', JSON.stringify(products))
}

printProducts()

// #3 Carrito
let cart = window.localStorage.getItem('cartDB') ? JSON.parse(window.localStorage.getItem('cartDB')) : []

const cartContainer = document.getElementById('cart__container')
const cartCount = document.getElementById('cart-count')
const itemsCount = document.getElementById('items-count')
const cartTotal = document.getElementById('cart-total')

function printCart() {
  let html = ''
  for (let article of cart) {
    const product = products.find(p => p.id === article.id)

    html += `
    <article class="cart__card">
    <div class="cart__box">
      <img src="${product.image}" alt="${product.name}" class="cart__img">
    </div>

    <div class="cart__details">
      <h3 class="cart__title">${product.name} <span class="cart__price"> ${numberToCurrency(product.price)}</span></h3>

      <div class="cart__amount">
        <div class="cart__amount-content">
          <span class="cart__amount-box removeToCart" data-id="${product.id}">
            <i class="bx bx-minus"></i>
          </span>

          <span class="cart__amount-number">${article.qty}</span>

          <span class="cart__amount-box addToCart" data-id="${product.id}">
            <i class="bx bx-plus"></i>
          </span>
        </div>

        <i class="bx bx-trash-alt cart__amount-trash deleteToCart" data-id="${product.id}"></i>
      </div>

      <span class="cart__subtotal">
        <span class="cart__stock">Quedan ${product.quantity - article.qty} unidades</span>
        <span class="cart__subtotal-price">${numberToCurrency(product.price * article.qty)}</span>
      </span>
    </div>
  </article>`
  }

  cartContainer.innerHTML = html
  cartCount.innerHTML = totalArticles()
  itemsCount.innerHTML = totalArticles()
  cartTotal.innerHTML = numberToCurrency(totalAmount())
  checkButtons()

  window.localStorage.setItem('cartDB', JSON.stringify(cart))
}

// #4 agregar al carrito
function addToCart(id, qty = 1) {
  const product = products.find(p => p.id === id)

  if (product && product.quantity > 0) {
    const article = cart.find(a => a.id === id)

    if (article) {
      if (checkStock(id, qty + article.qty)) {
        article.qty++
      } else {
        window.alert('No hay stock suficiente')
      }
    } else {
      cart.push({ id, qty })
    }
  } else {
    window.alert('Producto agotado')
  }
  printCart()
}

function checkStock(id, qty) {
  const product = products.find(p => p.id === id)
  return product.quantity - qty >= 0
}

// #5 remover articulos
function removeFromCart(id, qty = 1) {
  const article = cart.find(a => a.id === id)

  if (article && article.qty - qty > 0) {
    article.qty--
  } else {
    const confirm = window.confirm('Estás Seguro???')

    if (confirm) {
      cart = cart.filter(a => a.id !== id)
    }
  }
  printCart()
}

// #6 Eliminar del carrito
function deleteFormCart(id) {
  const article = cart.find(a => a.id === id)
  cart.splice(cart.indexOf(article), 1)
  printCart()
}

// #7 Contar Articulos
function totalArticles() {
  // let acc = 0
  // for (let article of cart) {
  //   acc += article.qty
  // }
  // return acc

  return cart.reduce((acc, article) => acc + article.qty, 0)
}

// #8 El total
function totalAmount() {
  return cart.reduce((acc, article) => {
    const product = products.find(p => p.id === article.id)

    return acc + product.price * article.qty
  }, 0)
}

// #9 Limpiar carrito
function clearCart() {
  cart = []
  // cart.length = 0
  printCart()
}

// #10 Comparar
function checkout() {
  cart.forEach(artcile => {
    const product = products.find(p => p.id === artcile.id)

    product.quantity -= artcile.qty
  })
  clearCart()
  printCart()
  printProducts()
  window.alert('Gracias por su compra')
}

function checkButtons() {
  if (cart.length > 0) {
    document.getElementById('cart-checkout').removeAttribute('disabled')
    document.getElementById('cart-empty').removeAttribute('disabled')
  } else {
    document.getElementById('cart-checkout').setAttribute('disabled', 'disabled')
    document.getElementById('cart-empty').setAttribute('disabled', 'disabled')
  }
}

function numberToCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

printCart()

productContainer.addEventListener('click', function (e) {
  const add = e.target.closest('.addToCart')

  if (add) {
    const id = +add.dataset.id
    addToCart(id)
  }
  console.log('me estoy ejecutando')
})

const homeButton = document.getElementById('home-button')

homeButton.addEventListener('click', function (e) {
  const add = e.target.closest('.addToCart')

  if (add) {
    const id = +add.dataset.id
    addToCart(id)
  }
})

cartContainer.addEventListener('click', function (e) {
  const remove = e.target.closest('.removeToCart')
  const add = e.target.closest('.addToCart')
  const deleteCart = e.target.closest('.deleteToCart')

  if (remove) {
    const id = +remove.dataset.id
    removeFromCart(id)
  }

  if (add) {
    const id = +add.dataset.id
    addToCart(id)
  }

  if (deleteCart) {
    const id = +deleteCart.dataset.id
    deleteFormCart(id)
  }
})

const actionButtons = document.getElementById('action-buttons')

actionButtons.addEventListener('click', function (e) {
  const clear = e.target.closest('#cart-empty')
  const buy = e.target.closest('#cart-checkout')

  if (clear) {
    clearCart()
  }

  if (buy) {
    checkout()
  }
})