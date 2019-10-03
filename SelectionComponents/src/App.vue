<template>
  <div class="mainDiv">
    <SelectionComponents
      :isAr="false"
      :tittle="DialogTittle"
      :selectData="selectName"
      :SingleSelection="false"
      :BtnColor="blue"
      :TagColor="gray"
      :TagtextColor="white"
    />
  </div>
</template>

<script>
import SelectionComponents from "./components/Selection";

export default {
  name: "App",
  components: {
    SelectionComponents
  },
  data() {
    return {
      black: "#000",
      red: "#FF0000",
      gray: "#696969",
      blue: "#337ab7",
      white: "#fff",
      DialogTittle: "Send To :",
      selectName: [
        {
          id: 1,
          name: "Vel Ltd",
          select: false
        },
        {
          id: 2,
          name: "Pellentesque PC",
          select: false
        },
        {
          id: 3,
          name: "Justo Nec Ante LLC",
          select: false
        },
        {
          id: 4,
          name: "Diam Industries Associates LLC Company",
          select: false
        },
        {
          id: 5,
          name: "Lectus Company",
          select: false
        },
        {
          id: 6,
          name: "Lorem Vitae Inc",
          select: false
        },

        {
          id: 7,
          name: "Est Vitae Associates",
          select: false
        },
        {
          id: 8,
          name: "Tempor PC",
          select: false
        },
        {
          id: 9,
          name: "Risus Nunc Corporation",
          select: false
        },
        {
          id: 10,
          name: "Dictum Associates",
          select: false
        }
      ]
    };
  }
};
</script>

<style>
.mainDiv {
  margin: 10px;
}
</style>

