const argTypesConfigs = {
  name: {
    description: "Icon name <b>can be selected from the dropdown menu</b>",
    control: {
      type: "select",
      options: [
        "map",
        "folder",
        "holiday",
        "add-group",
        "add-users",
        "users-group",
        "judge-gavel",
        "calendar-edit",
        "marriage-rings",
        "chat-judge-gavel",
        "judge-gavel-plus",
        "property-trend-up",
      ],
    },
  },
  width: {
    description: "Icon width",
  },
  height: {
    description: "Icon height",
  },
};

export { argTypesConfigs };
