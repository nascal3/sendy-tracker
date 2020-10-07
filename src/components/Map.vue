<template>
  <GmapMap
    ref="mapRef"
    :center="center"
    :zoom="zoom"
    :options="options"
  >
    <GmapMarker
      :position="driverLocation"
      :clickable="true"
      :offsetX="-10"
      :offsetY="17.5"
      :icon="markerOptions"
    />
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen=true"
    >
      <map-info-window :location-name="locationName" :driver-name="driver" />
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
      required: false
    }
  },
  components: {
    MapInfoWindow
  },
  data: () => ({
    driver: 'driver A',
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
      scaledSize: { width: 55, height: 75, f: 'px', b: 'px' },
      pixelOffset: {
        width: 0,
        height: 35
      }
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
      if (!oldCoordinates.lat) return
      this.getLocationName(newCoordinates)
      this.transition(oldCoordinates, newCoordinates)
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
      this.driverLocation = { lat: this.oldLat, lng: this.oldlng }
      this.infoWindowPos = this.driverLocation
      this.map.panTo(this.driverLocation)
      if (this.count !== 100) {
        this.count++
        setTimeout(this.moveMarker, 10)
      }
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
  .map-error {
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: lighten(#9e9e9e, 30%);
      content: '';
      z-index: 3;
    }
  }
</style>
