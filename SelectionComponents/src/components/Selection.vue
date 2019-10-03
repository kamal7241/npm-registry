<template>
  <div>
    <div>
      <v-dialog v-model="dialog" :width="getWidth()" :height="getHeight()">
        <template v-slot:activator="{ on }">
          <div class="containe">
            <input :style="btnStyles" type="submit" value="+" dark v-on="on" />

            <div class="div-tags-container">
              <div :style="tagStyles" class="div-tag-item" v-for="tag of tags" :key="tag">
                {{ tag }} &nbsp;
                <span class="close-icon" v-on:click="removeTag(tag)">&#10761;</span>
              </div>
            </div>
          </div>
        </template>

        <v-card>
          <v-card-title class="text-style" primary-title>{{tittle}}</v-card-title>

          <v-card-text>
            <div class="search-div">
              <input
                v-model="search"
                class="search-text"
                type="text"
                :placeholder="[[ seacrhTittle ]]"
              />
            </div>
            <div class="list-style">
              <div class="custom-control" v-bind:key="item.id" v-for="item in selectNameFilter">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  v-bind:id="item.id"
                  v-on:change="selectionItem(item.id)"
                />
                <p
                  class="label-style"
                  @click="selectionItem(item.id)"
                  v-bind:for="item.id"
                >{{item.name}}</p>
              </div>
            </div>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions class="Btn-contaner">
            <v-btn class="Btn-style" text @click="confirm">{{confirmTittle}}</v-btn>
            <v-btn class="Btn-style" text @click="close">{{cancelTittle}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- Start of  Dialog -->

    <!-- <div>
      <modal
        :scrollable="true"
        :top="getTop()"
        :left="getLeft()"
        :width="getWidth()"
        :height="getHeight()"
        name="showSelection"
      >
        <div v-bind:class="{'ar-div':isAr, 'en-div':!isAr}">
          <p class="text-style">{{tittle}}</p>

          <div class="search-div">
            <input
              v-model="search"
              class="search-text"
              type="text"
              :placeholder="[[ seacrhTittle ]]"
            />
          </div>
          <div class="list-style">
            <div class="custom-control" v-bind:key="item.id" v-for="item in selectNameFilter">
              <input
                type="checkbox"
                class="custom-control-input"
                v-bind:id="item.id"
                v-on:change="selectionItem(item.id)"
              />
              <p
                class="label-style"
                @click="selectionItem(item.id)"
                v-bind:for="item.id"
              >{{item.name}}</p>
            </div>
          </div>
          <div class="bottom-div">
            <button @click="confirm" class="ok-btn">{{confirmTittle}}</button>
            <button @click="close" class="ok-btn">{{cancelTittle}}</button>
          </div>
        </div>
      </modal>
    </div>-->

    <!-- End of  Dialog -->
  </div>
</template>

<script>
import {
  VCard,
  VCardTitle,
  VDialog,
  VDivider,
  VCardActions,
  VSpacer,
  VBtn
} from "vuetify/lib";

export default {
  name: "SelectionComponents",
  components: {
    VCard,
    VCardTitle,
    VDialog,
    VDivider,
    VCardActions,
    VSpacer,
    VBtn
  },
  props: [
    "tittle",
    "selectData",
    "SingleSelection",
    "isAr",
    "BtnColor",
    "TagColor",
    "TagtextColor"
  ],
  data() {
    return {
      dialog: false,

      search: "",
      selectionArray: [],
      tag: "",
      tags: [],
      isChecked: false,
      confirmTittle: null,
      cancelTittle: null,
      seacrhTittle: null
    };
  },
  methods: {
    getTop() {
      return " 150px";
    },
    getLeft() {
      return " 43px";
    },
    getWidth() {
      return "304.55px";
    },
    getHeight() {
      return " 426px";
    },
    ChangeTages(delitem) {
      this.tags = [];
      delitem.forEach(entry => {
        this.tags.push(entry.text);
      });
    },
    setLang: function() {
      if (this.isAr) {
        this.confirmTittle = "تاكيد";
        this.cancelTittle = "إلغاء";
        this.seacrhTittle = "بحث ...";
      } else {
        this.confirmTittle = "confirm";
        this.cancelTittle = "cancel";
        this.seacrhTittle = "Search ...";
      }
    },
    showDialog() {
      this.$modal.show("showSelection");
    },
    confirm() {
      if (!this.SingleSelection) {
        this.selectionArray.forEach(entry => {
          if (this.tags.includes(entry.name) === false) {
            this.tags.push(entry.name);
          }
        });
      } else {
        this.tags.push(
          this.selectionArray[this.selectionArray.length - 1].name
        );
      }

      this.dialog = false;
    },
    close() {
      this.dialog = false;
    },
    selectionItem(selectedItem) {
      this.selectData.forEach((entry, index) => {
        if (entry.id == selectedItem) {
          document.getElementById(selectedItem).checked = true;
          this.selectData[index].select = !entry.select;
          if (entry.select) {
            this.selectionArray.push(entry);
          } else {
            this.selectionArray = this.selectionArray.filter(
              item => item.id != selectedItem
            );
          }
        } else if (this.SingleSelection) {
          document.getElementById(entry.id).checked = false;
        }
      });
    },
    removeTag(tag) {
      let index = this.tags.indexOf(tag);
      if (index > -1) {
        this.tags.splice(index, 1);
      }
    }
  },
  computed: {
    selectNameFilter() {
      return this.selectData.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    tagStyles() {
      return {
        "background-color": this.TagColor,
        color: this.TagtextColor
      };
    },
    btnStyles() {
      return {
        "background-color": this.BtnColor
      };
    }
  },
  mounted: function() {
    this.setLang();
  }
};
</script>


<style scoped>
.Btn-contaner {
  width: 100%;
  background: #d3d3d3;
}
.Btn-style {
  width: 50%;
  color: white;
}

.custom-control-input {
  margin-top: 5px;
  margin-left: 6px;
  margin-right: 6px;
}
.bottom-div {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
}
.ar-div {
  direction: rtl;
  text-align: right;
}
.en-div {
  direction: ltr;
  text-align: left;
}
.label-style {
  margin-top: 0px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 18px;
  font-weight: bold;
  max-width: 200px;
}
.custom-control {
  position: relative;
  padding: 10px;
  height: 40px;
  display: flex;
  border-bottom: 1px #ccc dotted;
}

.round label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 25px;
  left: 0;
  position: absolute;
  top: 0;
  width: 25px;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  left: 7px;
  opacity: 0;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 9px;
}

.round input[type="checkbox"] {
  visibility: hidden;
}

.round input[type="checkbox"]:checked + label {
  background-color: #66bb6a;
  border-color: #66bb6a;
}

.round input[type="checkbox"]:checked + label:after {
  opacity: 1;
}

label span {
  position: absolute;
  left: 40px;
  top: 50%;
  width: 464px;

  transform: translateY(-50%);
  font-size: 18px;
  font-weight: bold;
}

.ok-btn {
  width: 50%;
  height: 39px;
  background: #4a4f5b;
  color: white;
  font-size: 17px;
}

.input-to {
  width: 100%;
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
  display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 30px;
  padding: 5px;
  font-size: 20px;
  position: absolute;
}
.search-style {
  width: 480px;
  border-radius: 5px;
  height: 30px;
  padding: 5px;
  font-size: 20px;
}
.search-div {
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
  display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.list-style {
  height: 41vh;
  overflow-x: hidden;
  overflow-x: auto;
  margin-top: 6px;
}
.scroll-list {
  margin: 10px;
  border-bottom: 1px solid #ccc;
  overflow-x: hidden;
  overflow-x: auto;
  text-align: justify;
}
.search-text {
  width: 80%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  background-color: white;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 20px;
}
.text-style {
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
  display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: black;
  font-weight: bold;
}
.select-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
  height: 40px;
}
.checktext-style {
  font-size: 20px;
  font-weight: bold;
}
.del {
  background: black;
  color: white;
  border-radius: -12px;
  width: 29px;
  height: 33px;
  font-size: 18px;
}
.containe {
  width: 51vh;
  border: 1px solid #a3a3a3;
  height: 46px;
  border-radius: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
  display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
  margin: 1px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 0 auto;
}

input[type="submit"] {
  width: 35px;
  height: 35px;
  cursor: pointer;
  color: white;
  border: 0;
  font-size: 27px;
  -webkit-appearance: none;
  border-radius: 25px;
  -webkit-transition: background-color 0.5s ease;
  transition: background-color 0.5s ease;
  padding-left: 7px;
  padding-right: 7px;
}
input[type="submit"]:hover {
  background-color: #7daede;
}

.div-tags-container {
  width: 85%;
  margin: auto;
  text-align: justify;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.div-tag-item {
  display: inline-block;
  border-radius: 8px;
  padding: 5px 10px;
  height: 27px;
  font-size: 14px;
  margin: 0px 3px;
}

.close-icon {
  text-align: center;
  cursor: pointer;
}
</style>
