<template>
  <v-stepper
    v-if="steps.length"
    v-model="currentStep"
    v-bind="$attrs"
    :vertical="isMobile"
    :class="styles.rootStepper"
  >
    <template v-if="!isMobile">
      <slot name="header" :currentStep="currentStep">
        <v-stepper-header>
          <v-stepper-step
            v-for="(step, index) in steps"
            :key="`step-${index + 1}`"
            color="secondary"
            :complete="currentStep > index + 1"
            :step="index + 1"
          >
            {{ step.title }}
          </v-stepper-step>
        </v-stepper-header>
      </slot>

      <v-stepper-items>
        <v-stepper-content
          v-for="(step, index) in steps"
          :key="`content-${index + 1}`"
          :step="index + 1"
        >
          <slot
            v-if="index + 1 === currentStep"
            :name="step.slotName"
            :actions-props="actionsProps"
          />
        </v-stepper-content>
      </v-stepper-items>
    </template>
    <template v-else>
      <v-stepper-step
        v-for="(step, index) in steps"
        :key="`step-${index + 1}`"
        :color="$vuetify.theme.primary"
        :complete="currentStep > index + 1"
        :step="index + 1"
      >
        {{ step.title }}
      </v-stepper-step>
      <v-stepper-content :step="index + 1">
        <slot :name="step.slotName" :actionsProps="actionsProps" />
      </v-stepper-content>
    </template>
  </v-stepper>
</template>

<script>
export default {
  name: "Stepper",
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentStep: 1,
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth < 992;
    },

    actionsProps() {
      return {
        goTo: this.goTo,
        next: this.next,
        prev: this.prev,
        currentStep: this.currentStep,
      };
    },
  },
  methods: {
    next() {
      if (this.steps.length && this.currentStep < this.steps.length) {
        this.currentStep += 1;

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    prev() {
      if (this.steps.length && this.currentStep > 1) {
        this.currentStep -= 1;

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    goTo(step) {
      this.currentStep = step;

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="sass" scoped></style>
