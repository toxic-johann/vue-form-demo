/* eslint-disable no-console */
export function addItem(state, { keyPaths, index = 0 }) {
  const [ listIndex, optionIndex ] = keyPaths;
  const { options, results } = state;
  const optionList = options[listIndex];
  if (!optionList) {
    return;
  }
  const option = optionList.list[optionIndex];
  if (!option) {
    return;
  }
  const cloneOption = JSON.parse(JSON.stringify(option));
  results.splice(index, 0, cloneOption);
}

export function clearSelected(state) {
  state.selected = false;
  state.selectedItemKeyPaths = [];
  state.resultHoverIndex = undefined;
}

export function clearResultSelected(state) {
  state.resultSelected = false;
  state.resultSelectedItemIndex = -1;
  state.resultHoverIndex = undefined;
}

export function clearHoverIndex(state, { index, force }) {
  if (state.resultHoverIndex !== index && !force) {
    return;
  }
  state.resultHoverIndex = undefined;
}

export function deleteResultSelected(state) {
  const { results, resultSelectedItemIndex } = state;
  results.splice(resultSelectedItemIndex, 1);
}

export function moveItem(state, { index }) {
  const { results, resultSelectedItemIndex } = state;
  if (resultSelectedItemIndex < 0 || resultSelectedItemIndex === index || typeof index !== 'number') {
    return;
  }
  const obj = results[resultSelectedItemIndex];
  results.splice(index, 0, obj);
  results.splice(resultSelectedItemIndex < index ? resultSelectedItemIndex : resultSelectedItemIndex + 1, 1);
}

export function selectResultItem(state, index) {
  state.resultSelected = true;
  state.resultSelectedItemIndex = index;
}

export function selectItem(state, { keyPaths }) {
  state.selected = true;
  state.selectedItemKeyPaths = keyPaths;
}

export function setHoverIndex(state, index) {
  state.resultHoverIndex = index;
}