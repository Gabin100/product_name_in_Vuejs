var app = new Vue({
    el:'#app',
    data:{
        product: 'Socks',
        image:'./public/images/vmSocks-blue.png',
        inventory:4,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants:[
            {
                variantId:2234,
                variantColor:"Green",
                variantImage:"./public/images/vmSocks-green.png"
            },{
                variantId:2235,
                variantColor:"Blue",
                variantImage:"./public/images/vmSocks-blue.png"
            }
        ],
        cart:0
    },
    methods:{
        addToCart(){
            this.cart +=1
        },updateProductImg(variantImage){
                this.image = variantImage
            }
    }
})