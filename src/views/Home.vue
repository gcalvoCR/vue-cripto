<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#63b3ed'" :size="100" />
    <px-assets-table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import api from '@/api'
import PxAssetsTable from '@/components/PxAssetsTable'
export default {
  name: 'Home',
  components: {
    PxAssetsTable,
  },
  data() {
    return {
      isLoading: false,
      assets: [],
    }
  },
  created() {
    this.isLoading = true
    this
    api
      .getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => (this.isLoading = false))
  },
}
</script>

<style></style>
