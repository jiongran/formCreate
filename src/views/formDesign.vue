<template>
  <form-design @onSave="onSave" class="form-design" />
</template>
<script setup>
const onSave = (schema)=>{
  console.log(schema)
}
</script>
<style>
.form-design{
  width: 100%;
}
</style>
