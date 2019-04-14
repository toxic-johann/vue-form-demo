<template>
  <div class="base-element" @mousedown="mousedown" :style="style">
    <!-- {{ item.name }}-->
    <label class="control-label">{{ item.name }}</label>  
    <div class="content-box">
      <BaseInput :item="item" v-if="item.component === 'input'" />
      <span class="help-block">{{ item.help }}</span>  
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapMutations } from 'vuex';
export default {
  name: 'BaseElement',
  props: {
    keyPaths: Array,
    isInResultArea: {
      type: Boolean,
      default: true,
    },
    hoverIndex: {
      type: Number,
    },
    item: {
      type: Object,
      required: true,
    }
  },
  data(){
    return {
      x: 0,
      y: 0,
      originalClientX: 0,
      originalClientY: 0,
      active: false,
    };
  },
  computed: {
    style() {
      return {
        transform: `translate(${this.x}px, ${this.y}px)`,
        'pointer-events': this.active ? 'none' : 'auto',
      }
    }
  },
  created() {
    document.addEventListener('mousemove', this.mousemove);
    document.addEventListener('mousewheel', this.mousemove);
    document.addEventListener('mouseup', this.mouseup);
  },
  methods: {
    ...mapMutations([
      'selectItem',
      'selectResultItem',
    ]),
    mousedown(evt) {
      evt.preventDefault();
      this.active = true;
      const { pageX, pageY } = evt;
      this.originalClientX = pageX;
      this.originalClientY = pageY;
      if (this.isInResultArea) {
        this.selectItem({ keyPaths: this.keyPaths });
      } else {
        this.selectResultItem(this.hoverIndex);
      }
      
    },
    mousemove(evt) {
      if (!this.active) {
        return;
      }
      const { pageX, pageY } = evt;
      this.x = pageX - this.originalClientX;
      this.y = pageY - this.originalClientY;
    },
    mouseup() {
      if (!this.active) {
        return;
      }
      this.x = 0;
      this.y = 0;
      this.active = false;
    },
    
  },
}
</script>

<style>
.base-element {
  width: 90%;
  padding: 5px;
  margin: 10px;
  text-align: left;
}

.base-element .control-label {
  display: inline-block;
  width: 30%;
  text-align: right;
  margin-right: 10%;
  vertical-align: top;
}

.base-element .content-box {
  display: inline-block;
  width: 60%;
  vertical-align: top;
}

.base-element .content-box .form-control,
.base-element .content-box .help-block {
  display: block;
}

.base-element .content-box .form-control {
  margin-bottom: 20px;
}
</style>
