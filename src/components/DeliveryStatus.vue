<template>
   <section class="status-section">
     <div class="heading">Deliver Status</div>
     <div>
       Delivery status:
       <span :class="{'cancelled': deliveryStatus === 'cancelled', 'pending': deliveryStatus === 'pending dispatch...' }">
         {{deliveryStatus}}
       </span>
     </div>
     <div>Driver name: <span>{{driverName}}</span></div>
   </section>
</template>

<script>
export default {
  name: 'DeliveryStatus',
  props: {
    deliveryStatus: {
      type: String,
      required: true
    },
    driverName: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .status-section {
    .heading {
      font-size: 40px;
      text-transform: capitalize;
      font-weight: 300;
    }
    div {
      text-transform: capitalize;
      font-size: 16px;
      margin-bottom: 15px;

      span {
        font-weight: 600;
        color: green;
      }
    }
     div:last-child {
       span {
         color: #1F80BB;;
       }
     }

    .cancelled {
      color: red;
    }
    .pending {
      color: #ED7C38;;
    }
  }
</style>
