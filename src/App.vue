<template>
  <div id="app">
   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.cl-w{
  color: #fff;
}
.bg-c{
  background-color: #2d3a4b;
}
.fz-16{
  font-size: 16px;
}
.fz-18{
  font-size: 18px;
}
.fz-20{
  font-size: 20px;
}
.fw{
  font-weight: 500;
}
.img{
  width: 100%;
}
/* a{
  text-decoration: none;
}
li{
  list-style: none;
} */
</style>
