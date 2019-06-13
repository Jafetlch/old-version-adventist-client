<template>
  <CustomHeader :title="title">
    <!-- Edit -->
    <CreateEditAdvertisement
      v-if="this.$store.getters.getEditAdvertisements"
      title="Anuncio"
      :action="!this.$store.getters.getEditAdvertisements">
    </CreateEditAdvertisement>
    <!-- Create -->
    <CreateEditAdvertisement
      v-else
      title="Anuncio">
    </CreateEditAdvertisement>
  </CustomHeader>
</template>

<script>
import CustomHeader from '@/components/CustomHeader'
import CreateEditAdvertisement from '@/components/crud/CreateEditAdvertisement'

export default {
  name: 'AdvertisementMain',
  components: {
    CustomHeader,
    CreateEditAdvertisement
  },
  data: () => ({
    title: 'Anuncios'
  })
}
</script>
