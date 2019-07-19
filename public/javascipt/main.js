var app = new Vue({
    el:'#app',
    data:{
        brand: "Vue Master",
        product: 'Socks',
        selectedValiant: 0,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants:[
            {
                variantId:2234,
                variantColor:"Green",
                variantImage:"./public/images/vmSocks-green.png",
                variantQuantity:10
            },{
                variantId:2235,
                variantColor:"Blue",
                variantImage:"./public/images/vmSocks-blue.png",
                variantQuantity:0
            }
        ],
        cart:0
    },
    methods:{
        addToCart(){
            this.cart +=1
        },updateProductImg(index){
                this.selectedValiant = index
                console.log(index)
            }
    },
    computed:{
        title() {
            return this.brand + ' ' + this.product
        },
    image(){
        return this.variants[this.selectedValiant].variantImage 
    },
    inStock(){
        return this.variants[this.selectedValiant].variantQuantity
    }
    }
})