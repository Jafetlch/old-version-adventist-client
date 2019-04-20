<template>
  <CustomHeader :title="title">
    <h1 v-if="this.$store.getters.getDeleteAdvertisements">Delete</h1>
      <template v-else>
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
    </template>
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
