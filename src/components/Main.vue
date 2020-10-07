<template>
  <v-container>
    <v-row class="main-section">
      <v-col md="6" cols="12">
        <div class="map-container">
          <Map :driver-coordinates="driverPosition" />
        </div>
      </v-col>

      <v-col md="6" cols="12">

      </v-col>

    </v-row>
  </v-container>
</template>

<script>

import Map from '@/components/Map'

export default {
  name: 'Main',
  components: { Map },
  data: () => ({
    driverCoordinates: [
      [-1.298982, 36.776811],
      [-1.297459, 36.776747],
      [-1.296193, 36.776726],
      [-1.296097, 36.779236],
      [-1.296151, 36.777637],
      [-1.296215, 36.776693],
      [-1.294252, 36.776586],
      [-1.294048, 36.776790],
      [-1.293973, 36.779118],
      [-1.292622, 36.779075],
      [-1.291844, 36.779049]
    ],
    driverPosition: {}
  }),
  methods: {
    setCoordinates () {
      let i = 0
      const positionsCount = this.driverCoordinates.length
      const startCoordinatesSetter = () => {
        setTimeout(() => {
          const coords = this.driverCoordinates[i]
          this.driverPosition = {
            lat: coords[0],
            lng: coords[1]
          }
          i++
          if (i < positionsCount) {
            startCoordinatesSetter()
          }
        }, 5000)
      }
      startCoordinatesSetter()
    }
  },
  mounted () {
    this.setCoordinates()
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;
  width: 54rem;
  height: 30rem;
  margin-bottom: 1rem;
}
</style>
