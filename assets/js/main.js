import { activeProduct } from './components/activeProduct.js'
import { cartMenu } from './components/cartMenu.js'
import { darkTheme } from './components/darkTheme.js'
import { headerScroll } from './components/headerScroll.js'
import { load } from './components/load.js'
import { navMenu } from './components/navMenu.js'
import { sectionActive } from './components/sectionActive.js'

window.addEventListener('load', function () {
  load()
})

document.addEventListener('DOMContentLoaded', function () {
  darkTheme()
  headerScroll()
  navMenu()
  cartMenu()
  sectionActive()
  activeProduct()
  mixitup('.products__content', {
    selectors: {
      target: '.products__card'
    },
    animation: {
      duration: 300
    }
  }).filter('all')
})


const homeProducts = [
  {
    id: 1,
    title: 'Nueva Procesador<br> Intel I9-13900k',
    description: 'El nuevo procesador gama alta de intel con 24 nucleos, caché de 36M y 5.8 GHz.',
    img: 'assets/img/i9-13900k.png',
    price: 15500
  },
  {
    id: 3,
    title: 'De lo mas Poderoso<br> Ryzen 7950X',
    description: 'El procesador tope de gama de AMD con 16 nucleos, 32 hilos y una velocidad de 5.7Ghz',
    img: 'assets/img/ryzen-7950X.png',
    price: 10150
  },
  {
    id: 6,
    title: 'Nuevo GPU<br> NVIDIA 4090 GIGABYTE',
    description: 'La nueva tarjeta grafica de NVDIA el doble de poderosa que la anterior generacion y 24GB RAM',
    img: 'assets/img/rtx_4090.png',
    price: 34800
  },
  {
    id: 9,
    title: 'GPU Gama Alta<br> Radeon 6950XT',
    description: 'El mejor procesador AMD con 16GB de RAM listo para jugar en Realidad virtual con la mejor calidad',
    img: 'assets/img/radeon-6950XT.png',
    price: 15500
  },
  {
    id: 16,
    title: 'La mejor RAM<br> Dominator DDR5 64GB',
    description: 'Una de las RAM 2x32GB mas rapidas del mercado con una velocidad de 6200MHz y luces RGB',
    img: 'assets/img/dominator-DDR5-2x32gb-6200mhz.png',
    price: 4700
  }
]
let productsIndex = [0]

const homeContainer = document.getElementById('home__content')

const checkList = function cList() {
  if (productsIndex.length == homeProducts.length) {
    productsIndex = []
  }
}

const aObject = function aleatoryObject() {
  const rnd = Math.random() * homeProducts.length
  const index = Math.floor(rnd)
  if (productsIndex.includes(index)) {
    return aObject()
  } else {
    productsIndex.push(index)
    const homeProduct = homeProducts[index]
    return homeProduct
  }
}

const printProduct = function discover() {
  checkList()
  const printObject = aObject()
  let html = `
  <div class="home__img-bg">
  <img src="${printObject.img}" alt="" class="home__img">
  </div>
  
  <div class="home__data">
  <h1 class="home__title"> ${printObject.title}</h1>
  <p class="home__description">
  ${printObject.description}
  </p>
  <span class="home__price">${numberToCurrency(printObject.price)}</span>
  
  <div class="home__btns">
  <button class="button button--transparent button--small" id="random-button">
  Descubrir
  </button>

    <button class="button home__button addToCart" data-id=${printObject.id} id="home-button">AÑADIR AL CARRITO</button>
  </div>
</div>`
  homeContainer.innerHTML = html
  document.getElementById('home-button').addEventListener('click', function (e) {
    const add = e.target.closest('.addToCart')

    if (add) {
      const id = +add.dataset.id
      addToCart(id)
    }
  })
  document.getElementById('random-button').addEventListener('click', printProduct)
}

const randonButton = document.getElementById('random-button')

randonButton.addEventListener('click', printProduct)

const footerProductsLinks = document.querySelectorAll('.product-footer__link')

for (let i = 0; i < footerProductsLinks.length; i++) {
  footerProductsLinks[i].addEventListener('click', function () {
    console.log('si funciono')
    const filter = document.getElementById(`product-footer__link${i}`)
    filter.click()
  })
}