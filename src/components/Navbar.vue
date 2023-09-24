<template>
  <b-navbar toggleable type="dark" variant="dark">
    <b-container>
      <b-navbar-brand href="#" class="logo-container">
        <div class="logo-wrapper" @click="goToDashboard">
          <img src="../../public/logo-no-background.png" alt="bilfen-logo" class="logo-img" />
        </div>
      </b-navbar-brand>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  methods : {
    goToDashboard() {
      this.$router.push("/dashboard");
    },
  }
};
</script>

<style>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo-img {
  max-height: 70px;
}
</style>
