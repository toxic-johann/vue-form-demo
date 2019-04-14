<template>
  <div class="result-area" ref="resultArea" @mouseleave="mouseleaveArea">
    <header>Form name</header>
    <div v-for="(item, index) in this.$store.state.results" :key="index" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)" class="result-area-item" :class="{ hover: $store.state.resultHoverIndex === index && $store.state.resultSelectedItemIndex !== index, active: $store.state.resultSelectedItemIndex === index, belowFix: typeof $store.state.resultHoverIndex === 'number' && $store.state.resultHoverIndex < index }">
      <BaseElement :isInResultArea="false" :hoverIndex="index" :item="item"/>
    </div>
    <div class="result-area-bottom result-area-item" @mouseenter="mouseenter()" @mouseleave="mouseleave()" :class="{ hover: $store.state.results.length === $store.state.resultHoverIndex }"></div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapMutations } from 'vuex';
export default {
  name: 'ResultArea',
  created() {
    document.addEventListener('mouseup', this.mouseup);
  },
  methods: {
    ...mapMutations([
      'addItem',
      'clearSelected',
      'clearHoverIndex',
      'setHoverIndex',
      'moveItem',
      'clearResultSelected',
      'deleteResultSelected',
    ]),
    mouseup(evt) {
      const {
        selected,
        selectedItemKeyPaths,
        resultHoverIndex,
        resultSelected,
      } = this.$store.state;
      if (!selected && !resultSelected) {
        return;
      }
      const { left, right, top, bottom } = this.$refs.resultArea.getBoundingClientRect();
      const { pageX, pageY } = evt;
      if (pageX < left || pageX > right || pageY > bottom || pageY < top) {
        if (selected) {
          this.clearSelected();
        }
        if (resultSelected) {
          this.deleteResultSelected();
          this.clearResultSelected();
        }
        return;
      }
      if (selected) {
        this.addItem({
          keyPaths: selectedItemKeyPaths,
          index: resultHoverIndex,
        });
        this.clearSelected();
      }
      if (resultSelected) {
        this.moveItem({ index: resultHoverIndex });
        this.clearResultSelected();
      }
    },
    mouseenter(hoverIndex = this.$store.state.results.length) {
      const {
        selected,
        resultSelected,
      } = this.$store.state;
      if (!selected && !resultSelected) {
        return;
      }
      this.setHoverIndex(hoverIndex);
    },
    mouseleave(hoverIndex = this.$store.state.results.length) {
      const {
        selected,
        resultSelected,
      } = this.$store.state;
      if (!selected && !resultSelected) {
        return;
      }
      this.clearHoverIndex({ index: hoverIndex || this.$store.state.results });
    },
    mouseleaveArea() {
      this.clearHoverIndex({ force: true });
    }
  },
}
</script>

<style>
.result-area {
  width: 40%;
  margin: 3%;
  min-height: 200px;
  display: inline-block;
  vertical-align: top;
  border: 1px solid black;
  padding: 5px;
}

.result-area-bottom {
  width: 100%;
  height: 50px;
}

.result-area-item {
  position: relative;
}

.result-area-item.hover::before {
  content: "";
  width: 100%;
  height: 50px;
  background-color: #e5e5e5;
  display: block;
  border-bottom: 1px dotted gray;
  opacity: 0.3;
}

.result-area-item.active {
  max-height: 0;
}
.result-area-item.active.belowFix {
  position: reletive;
  bottom: 100px;
}

.result-area header {
  display: block;
  width: 100%;
  padding: 5px;
  margin-bottom: 20px;
  font-size: 21px;
  line-height: inherit;
  color: #333;
  border: 0;
  border-bottom: 1px solid #e5e5e5;
  text-align: left;
}
</style>


