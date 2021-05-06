// Vue.component('counter', {
//     data(){
//         return {
//             counter: 0
//         }
//     },
//     methods: {
//         increaseCount(){
//             this.counter ++;
//         }
//     },
//     template: `
//     <div>
//         <button v-on:click="increaseCount">Click me! </button>
//         <span>{{counter}}</span>
//     </div>
//     `
// })

Vue.component('CoinDetail', {
    name: "coin-detail",
    
    props:["coin"],

    data(){
        return {
            showPrices: false,
            value: 0,
        }
    },

    created(){
        console.log("Coin created")
    },
    beforeCreate(){
        console.log("Coin not created yet")
    },
    mounted(){
        console.log("Coin mounted")
    },

    methods: {
        toggleShowPrices(){
            this.showPrices = !this.showPrices;
            this.$emit('change-color', 
            this.showPrices? 'FF96C8': '3d3d3d')
        }
    },

    computed:{
        title(){
            return `${this.coin.name} - ${this.coin.symbol}`
        },
        convertedValue(){
            if(!this.value){
                return 0
            }
            return this.value/this.coin.price
        }
    },

    template: `
    <div>
        <img 
        v-on:mouseover="toggleShowPrices" 
        v-on:mouseout="toggleShowPrices" 
        v-bind:src="coin.img" 
        v-bind:alt="coin.name">

        <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
            {{title}}
            <span v-if="coin.changePercent > 0">☝️</span>
            <span v-else-if="coin.changePercent < 0">☝️</span>
            <span v-else>🤞</span>
            <span v-on:click="toggleShowPrices">
                {{showPrices ? "🙉" : "🙈"}}
            </span>
        </h1>
        <input type="number" v-model="value">

        <span>{{convertedValue}}</span>

        <slot name="text"></slot>
        <slot name="link"></slot>

        <ul v-show="showPrices">
            <li 
            v-bind:class="{orange: p.value === coin.price, red: p.value < coin.price, green: p.value > coin.price }"
            v-for="(p, i) in coin.pricesWithDays" 
            v-bind:key="p.day">
               {{i}} - {{p.day}}: {{p.value}}
            </li>
        </ul>
    </div>
    `
})

new Vue({
    el: '#app',
    data(){
        return{
            btc:{
                name: "Bitcoin",
                symbol: 'BTC',
                img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
                changePercent: 0,
                price: 8400,
                pricesWithDays:[
                    {day: 'Lunes', value: 8400},
                    {day: 'Martes', value: 8700},
                    {day: 'Miercoles', value: 400},
                    {day: 'Jueves', value: 9400},
                    {day: 'Viernes', value: 10400},
                    {day: 'Sabado', value: 8400},
                    {day: 'Domingo', value: 7400},
                ],
            },
            color: ``,
        }
    },
    watch:{
        showPrices(newVal, oldVal){
            console.log(newVal, oldVal)
        }
    },
    created(){
        console.log("Component created")
    },
    beforeCreate(){
        console.log("Component not created yet")
    },
    mounted(){
        console.log("Component mounted")
    },
    methods:{
        updateColor(color){
            console.log(color)
            this.color = color || this.color
            .split('')
            .reverse()
            .join('');
        }
    }
})