const defaultSourceConfigs = {
  language: "vuejs",
  type: "auto",
};

const defaultParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <Stepper :steps="steps" />
</template>
<script>
  export default {
    data() {
      steps: [
        {
          title: "الخطوة الأولى",
          slotName: "firstStep",
        },
        {
          title: "الخطوة الثانية",
          slotName: "secondStep",
        },
      ],
    }
  }
</script>
        `,
    },
  },
};

const stepsContentParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <Stepper :steps="steps">
    <template #firstStep>
      <div>
        <p>This is the content of first step (step 1)</p>
      </div>
    </template>

    <template #secondStep>
      <div>
        <p>This is the content of second step (step 2)</p>
      </div>
    </template>
  </Stepper>
</template>
<script>
  export default {
    data() {
      steps: [
        {
          title: "الخطوة الأولى",
          slotName: "firstStep",
        },
        {
          title: "الخطوة الثانية",
          slotName: "secondStep",
        },
      ],
    }
  }
</script>
        `,
    },
  },
};

const stepsNavigationParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <Stepper :steps="steps">
    <template #firstStep="{ actionsProps }">
      <div>
        <p>This is the content of first step (step 1)</p>

        <v-btn color="primary" @click="actionsProps.next">الخطوة التالية</v-btn>
      </div>
    </template>

    <template #secondStep="{ actionsProps }">
      <div>
        <p>This is the content of second step (step 2)</p>

        <v-btn color="primary" @click="actionsProps.prev">الخطوة السابقة</v-btn>
      </div>
    </template>
  </Stepper>
</template>
<script>
  export default {
    data() {
      steps: [
        {
          title: "الخطوة الأولى",
          slotName: "firstStep",
        },
        {
          title: "الخطوة الثانية",
          slotName: "secondStep",
        },
      ],
    }
  }
</script>
        `,
    },
  },
};

const headerSlotParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <Stepper :steps="steps">
    <template #header="{currentStep}">
      <header class="headers-placeholders">
        <v-container class="pb-0 ma-0">
          <h3 class="page-title">عنوان الصفحة</h3>

          <v-stepper-header class="custom-stepper-header">
            <v-stepper-step
              v-for="(step, index) in steps"
              color="secondary"
              :key="index"
              :complete="currentStep > index+1"
              :step="index+1"
            >
              {{ step.title }}
            </v-stepper-step>
          </v-stepper-header>
        </v-container>
      </header>
    </template>

    <template #firstStep="{ actionsProps }">
      <div>
        <p>This is the content of first step (step 1)</p>

        <v-btn color="primary" @click="actionsProps.next">الخطوة التالية</v-btn>
      </div>
    </template>

    <template #secondStep="{ actionsProps }">
      <div>
        <p>This is the content of second step (step 2)</p>

        <v-btn color="primary" @click="actionsProps.prev">الخطوة السابقة</v-btn>
      </div>
    </template>
  </Stepper>
</template>
<script>
  export default {
    data() {
      steps: [
        {
          title: "الخطوة الأولى",
          slotName: "firstStep",
        },
        {
          title: "الخطوة الثانية",
          slotName: "secondStep",
        },
      ],
    }
  }
</script>
        `,
    },
  },
};

export {
  defaultParams,
  stepsContentParams,
  stepsNavigationParams,
  headerSlotParams,
};
