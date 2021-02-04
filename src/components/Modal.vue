<template>
  <div>
    <div>{{ value }}</div>
    <v-select
      v-model="select"
      :hint="`${select.state}, ${select.abbr}`"
      :items="items"
      item-text="state"
      item-value="abbr"
      label="Select"
      persistent-hint
      return-object
      single-line
    ></v-select>
  </div>
</template>
<script>
export default {
  props: {
    value: Number,
  },
  data() {
    return {
      select: { state: 'Florida', abbr: 'FL' },
      items: [
        { state: '123', abbr: 'FL' },
        { state: '1234', abbr: 'GA' },
        { state: '125', abbr: 'NE' },
        { state: '126', abbr: 'CA' },
        { state: 'New 61', abbr: 'NY' },
      ],
    };
  },
};
</script>
