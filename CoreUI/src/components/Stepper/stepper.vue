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
          <template v-for="(step, index) in steps">
            <v-stepper-step
              :key="`step-${index + 1}`"
              color="secondary"
              :complete="currentStep > index + 1"
              :step="index + 1"
            >
              {{ step.title }}
            </v-stepper-step>

            <!-- <v-divider v-if="index !== steps.length - 1" :key="`divider-${index+1}`"></v-divider> -->
          </template>
        </v-stepper-header>
      </slot>

      <v-stepper-items>
        <v-stepper-content
          v-for="(step, index) in steps"
          v-if="index + 1 === currentStep"
          :key="`content-${index + 1}`"
          :step="index + 1"
        >
          <slot :name="step.slotName" :actions-props="actionsProps" />
        </v-stepper-content>
      </v-stepper-items>
    </template>
    <template v-for="(step, index) in steps" v-if="isMobile">
      <v-stepper-step
        :key="`step-${index + 1}`"
        :color="$vuetify.theme.primary"
        :complete="currentStep > index + 1"
        :step="index + 1"
      >
        {{ step.title }}
      </v-stepper-step>
      <v-stepper-content :key="`content-${index + 1}`" :step="index + 1">
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
