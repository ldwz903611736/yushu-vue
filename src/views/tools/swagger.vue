<template>
  <elFrame :src="'http://49.234.233.53:9037/swagger-ui.html'" />
</template>
<script>
  import elFrame from '@/components/Iframe/index'
  export default {
    name: 'Swagger',
    components: { elFrame }
  }
</script>
