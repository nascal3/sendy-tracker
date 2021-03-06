<template>
  <GmapMap
    ref="mapRef"
    :center="center"
    :zoom="zoom"
    :options="options"
  >
    <GmapMarker
      v-if="showMarker"
      :position="driverLocation"
      :clickable="true"
      @click="toggleInfoWindow(driverLocation)"
      :icon="markerOptions"
    />
    <gmap-info-window
      v-if="showMarker"
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen=true"
    >
      <map-info-window v-if="showMarker" :location-name="locationName" :driver-name="driverName" />
    </gmap-info-window>
  </GmapMap>
</template>

<script>
import { mapCoordinates } from '@/helpers/CoordinatesConfig'
import MapInfoWindow from '@/components/MapInfoWindow'

export default {
  name: 'Map',
  props: {
    driverCoordinates: {
      type: Object,
      required: true
    },
    driverName: {
      type: String,
      required: true
    }
  },
  components: {
    MapInfoWindow
  },
  data: () => ({
    center: mapCoordinates.center,
    zoom: 17,
    driverLocation: null,
    locationName: '',
    infoContent: '',
    infoWindowPos: { lat: 0, lng: 0 },
    infoWinOpen: true,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35
      }
    },
    noCoordinates: mapCoordinates.center,
    markerOptions: {
      url: require('@/assets/maker.svg'),
      scaledSize: { width: 55, height: 75, f: 'px', b: 'px' }
    },
    count: 0,
    steps: 7,
    deltaLat: null,
    deltaLng: null,
    oldLat: null,
    oldLng: null,
    options: {
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUi: true
    }
  }),
  watch: {
    driverCoordinates (newCoordinates, oldCoordinates) {
      if (!oldCoordinates.lat) oldCoordinates = newCoordinates
      if (this.showMarker) {
        this.getLocationName(newCoordinates)
        this.transition(oldCoordinates, newCoordinates)
      }
    }
  },
  computed: {
    showMarker () {
      return Object.keys(this.driverCoordinates).length
    }
  },
  methods: {
    transition (oldCoordinates, newCoordinates) {
      this.count = 0
      this.deltaLat = (newCoordinates.lat - oldCoordinates.lat) / 100
      this.deltaLng = (newCoordinates.lng - oldCoordinates.lng) / 100
      this.oldLat = oldCoordinates.lat
      this.oldlng = oldCoordinates.lng
      this.moveMarker()
    },
    moveMarker () {
      this.oldLat += this.deltaLat
      this.oldlng += this.deltaLng
      this.map.panTo(this.driverLocation)
      this.driverLocation = { lat: this.oldLat, lng: this.oldlng }
      this.infoWindowPos = this.driverLocation
      if (this.count !== 100) {
        this.count++
        setTimeout(this.moveMarker, 10)
      }
    },
    toggleInfoWindow (marker) {
      this.center = marker
      this.infoWindowPos = marker
      this.infoContent = marker
      this.infoWinOpen = !this.infoWinOpen
    },
    getLocationName (coordinates) {
      // eslint-disable-next-line no-undef
      const geoCoder = new google.maps.Geocoder()
      const scope = this
      geoCoder.geocode({ location: coordinates }, (results, status) => {
        const locationData = { name: '', coordinates: this.noCoordinates }
        if (status === 'OK') {
          scope.error = false
          if (results[0]) {
            scope.locationName = results[0].formatted_address

            locationData.name = scope.locationName
            locationData.coordinates = coordinates
            scope.$emit('locationName', locationData)
          } else {
            window.alert('No results found :(')
          }
        } else {
          scope.$emit('locationName', locationData)
          scope.error = true
          console.error(`Geocoder failed due to: ${status}!`)
          window.alert('Please zoom out to set correct property location on the map!')
        }
      })
    },
    async mapInit () {
      this.driverLocation = mapCoordinates.center
      this.infoWindowPos = this.driverLocation
      this.map = await this.$refs.mapRef.$mapPromise
      this.map.panTo(this.driverLocation)
      this.getLocationName(this.driverLocation)
    }
  },
  async mounted () {
    await this.mapInit()
  }
}
</script>

<style lang="scss" scoped>
  .vue-map-container {
    width: 100%;
    height: 100%;
    background-color: grey;
  }
</style>
