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
import NiStarStash from "./icons/starStash.vue";
import NiCalendarRemove from "./icons/calendarRemove.vue";
import NiBell from "./icons/bell.vue";
import NiArchiveBook from "./icons/archiveBook.vue";
import NiHome from "./icons/home.vue";
import NiFolderOpen from "./icons/folderOpen.vue";
import NiMedalStar from "./icons/medalStar.vue";
import NiStickyNote from "./icons/stickyNote.vue";
import NiUsersGuard from "./icons/userGuard.vue";
import NiDocumentPrevious from "./icons/documentPrevious.vue";
import NiDanger from "./icons/danger.vue";
import NiAppStash from "./icons/appStash.vue";
import NiHomeSandGlass from "./icons/homeSandGlass.vue";
import NiQualification from "./icons/qualification.vue";
import NiSpinnerLoader from "./icons/spinnerLoader.vue";
import NiFile from "./icons/file.vue";
import NiCancel from "./icons/cancel.vue";
import NiDownload from "./icons/download.vue";

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
    NiStarStash,
    NiCalendarRemove,
    NiBell,
    NiArchiveBook,
    NiHome,
    NiFolderOpen,
    NiMedalStar,
    NiStickyNote,
    NiUsersGuard,
    NiDocumentPrevious,
    NiDanger,
    NiAppStash,
    NiHomeSandGlass,
    NiQualification,
    NiSpinnerLoader,
    NiFile,
    NiCancel,
    NiDownload,
  },
  props: {
    name: {
      required: true,
      type: String,
      default: "",
    },
    width: {
      required: false,
      type: [String, Number],
      default: 25,
    },
    height: {
      required: false,
      type: [String, Number],
      default: 25,
    },
  },
};
</script>
