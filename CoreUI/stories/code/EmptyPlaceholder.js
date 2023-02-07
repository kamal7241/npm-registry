const defaultSourceConfigs = {
  language: "vuejs",
  type: "auto",
};

const customIconWithIconSlotParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<EmptyPlaceholder>
  <template #iconContent>
    <img 
      alt='mountain'
      src='https://b.thumbs.redditmedia.com/AVBmf4vIlR5Q0ocCwZbSZQpdkpRHfx7GMtaec6bbbxU.jpg'
    />
  </template>
</EmptyPlaceholder>
`,
    },
  },
};

const customActionWithActionSlotParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<EmptyPlaceholder>
  <template #actions>
    <v-btn color='info'>Click Me !</v-btn>
  </template>
</EmptyPlaceholder>
`,
    },
  },
};

export { customIconWithIconSlotParams, customActionWithActionSlotParams };
