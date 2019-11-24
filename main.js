
var app = new Vue({
  el:'#app',
  data:{
    product: 'Socks',
    description: "This socks is awesome",
    image: './assets/socks.png',
    inStock: false,
    details: ["80% cotton", "20% polyester", "Gender-natural"],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage: './assets/socks.png'

      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: './assets/socks-blue.jpg'
      }
    ],
    sizes: [39,40,41,42,43],
    cart: 0,
  },
  methods:{
    addToCart () {
      this.cart++;
    },
    removeFromCart(){
      this.cart -- ;
    },
    updateProduct(variant){
      this.image = variant
    }
  }
});