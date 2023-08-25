<template>
  <div :class="{ modal: true, 'modal--opened': isOpened }">
    <div class="modal__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpened: false,
    };
  },
  methods: {
    open() {
      this.isOpened = true;
    },
    close() {
      this.isOpened = false;
    },
  },
};
</script>

<style lang="scss">
.modal {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  // background: rgba(15, 15, 15, 0.4);

  background: rgba(13, 13, 13, 0.452);
  z-index: 200;
}

.modal--opened {
  display: block;
}

.modal__content {
  box-shadow: 0px -2px 10px 0px rgba(74, 74, 74, 0.8);
  border-radius: 10px;
  height: 365px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>
