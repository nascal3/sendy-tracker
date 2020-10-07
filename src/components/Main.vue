<template>
  <v-container>
    <v-row class="main-section">
      <v-col md="6" cols="12">
        <div class="map-container">
          <Map :driver-coordinates="driverPosition" :driver-name="driverName" />
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <delivery-status :delivery-status="deliveryStatus" :driver-name="driverName"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeliveryStatus from '@/components/DeliveryStatus'
import Map from '@/components/Map'

export default {
  name: 'Main',
  components: {
    Map,
    DeliveryStatus
  },
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
    driverBCoordinates: [-1.288360, 36.822092],
    driverPosition: {},
    driverName: 'driver A',
    deliveryStatus: 'Dispatching'
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
          } else { this.deliveryState() }
        }, 4000)
      }
      startCoordinatesSetter()
    },
    timeout (ms) {
      return new Promise((resolve, reject) => setTimeout(resolve, ms))
    },
    async deliveryState () {
      await this.timeout(10000)
      const options = { icon: 'error_outline' }
      this.$toasted.error('Delivery cancelled', options)

      this.deliveryStatus = 'cancelled'
      await this.timeout(5000)
      await this.redeployingPackage()
    },
    async redeployingPackage () {
      this.deliveryStatus = 'pending dispatch...'
      this.driverName = ''
      this.driverPosition = {}
      await this.timeout(10000)
      this.deployPackage()
    },
    deployPackage () {
      const options = { icon: 'check_circle_outline' }
      this.$toasted.info('Delivery dispatched', options)
      this.deliveryStatus = 'dispatching'
      this.driverName = 'driver B'
      this.driverPosition = {
        lat: this.driverBCoordinates[0],
        lng: this.driverBCoordinates[1]
      }
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
  width: 500px;
  height: 480px;
  margin-bottom: 10px;
}
</style>
