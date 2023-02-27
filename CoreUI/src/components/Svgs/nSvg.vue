<template>
  <component :is="`ni-${name}`" v-if="name" :height="height" :width="width" />
</template>

<script>
import NiHoliday from "./icons/holiday.vue";
import NiMap from "./icons/map.vue";
import NiAddGroup from "./icons/addGroup.vue";
import NiAddUsers from "./icons/addUsers.vue";
import NiCalendarEdit from "./icons/calendarEdit.vue";
import NiChatJudgeGavel from "./icons/chatJudgeGavel.vue";
import NiFolder from "./icons/folder.vue";
import NiJudgeGavel from "./icons/judgeGavel.vue";
import NiJudgeGavelPlus from "./icons/judgeGavelPlus.vue";
import NiMarriageRings from "./icons/marriageRings.vue";
import NiPropertyTrendUp from "./icons/propertyTrendUp.vue";
import NiUsersGroup from "./icons/usersGroup.vue";

export default {
  name: "NSvg",
  components: {
    NiHoliday,
    NiMap,
    NiAddGroup,
    NiAddUsers,
    NiCalendarEdit,
    NiChatJudgeGavel,
    NiFolder,
    NiJudgeGavel,
    NiJudgeGavelPlus,
    NiMarriageRings,
    NiPropertyTrendUp,
    NiUsersGroup,
  },
  props: {
    name: {
      required: true,
      type: String,
      default: "",
    },
    width: {
      required: false,
      type: Number,
      default: 25,
    },
    height: {
      required: false,
      type: Number,
      default: 25,
    },
  },
};
</script>
