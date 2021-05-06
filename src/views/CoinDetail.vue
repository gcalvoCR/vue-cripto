<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#63b3ed'" :size="100" />
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="toggleConverter"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ fromUsd ? `USD to ${asset.symbol}` : `${asset.symbol} to USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                :placeholder="
                  !fromUsd ? `amount in ${asset.symbol}` : `amount in USD`
                "
              />
            </label>
          </div>

          <span class="text-xl"
            >{{ convertResult }} {{ fromUsd ? `${asset.symbol}` : `USD` }}</span
          >
        </div>
      </div>
      <line-chart
        class="my-10"
        :colors="['']"
        :min="min"
        :max="max"
        :data="data"
      />
      <h3 class="text-xl my-10">Mejores Ofertas de cambio</h3>
      <table>
        <tr
          v-for="m in markets"
          :key="`${m.exchangeId}-${m.priceUsd}`"
          class="border-b"
        >
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ m.priceUsd | dollar }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <px-button
            :is-loading="m.isLoading"
            v-if="!m.url"
            @custom-click="getWebsite(m)"
          >
            <slot v-show="isLoading || false">Obtener link</slot>
          </px-button>
          <a v-else target="_blank" class="hover:underline text-green-600">
            {{ m.url }}
          </a>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from '@/api'
import PxButton from '@/components/PxButton'

export default {
  name: 'CoinDetail',

  components: {
    PxButton,
  },

  data() {
    return {
      isLoading: false,
      asset: {},
      history: [],
      markets: [],
      fromUsd: true,
      convertValue: null,
    }
  },

  computed: {
    convertResult() {
      if (!this.convertValue) {
        return 0
      }
      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd

      return result.toFixed(2)
    },
    min() {
      return Math.min(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    max() {
      return Math.max(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    avg() {
      return (
        this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) /
        this.history.length
      )
    },
    data() {
      return this.history.map((h) => [
        h.date,
        parseFloat(h.priceUsd).toFixed(2),
      ])
    },
  },

  created() {
    this.isLoading = true
    this.getCoin()
  },

  watch: {
    $route() {
      this.getCoin()
    },
  },

  methods: {
    toggleConverter() {
      this.convertValue = 0
      this.fromUsd = !this.fromUsd
    },
    getWebsite(exchange) {
      this.$set(exchange, 'isLoading', true)

      return api
        .getExchange(exchange.exchangeId)
        .then((res) => {
          this.$set(exchange, 'url', res.exchangeUrl)
        })
        .finally(() => {
          this.$set(exchange, 'isLoading', false)
        })
    },
    getCoin() {
      const id = this.$route.params.id

      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset
          this.history = history
          this.markets = markets
        })
        .finally(() => (this.isLoading = false))
    },
  },
}
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
