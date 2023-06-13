const getThemeColor = (target, prefix = "layout") => {
  const color = getComputedStyle(document.documentElement).getPropertyValue(
    `--${prefix}-${target}-color`
  );

  return color.trim();
};

const updateAppVariable = (packageTarget, layoutTarget) => {
  const root = document.documentElement.style;
  const fallbackSrc = "package";

  const color =
    getThemeColor(layoutTarget) || getThemeColor(packageTarget, fallbackSrc);

  root.setProperty(`--${fallbackSrc}-${packageTarget}-color`, color);
};

const updatePackageThemingVariables = () => {
  const variables = [
    "primary",
    "dark-primary",
    "light-primary",
    "lighter-primary",
    "primary-rgb",
    "info",
    "error",
    "secondary",
    "light-secondary",
  ];

  variables.forEach((variable) => updateAppVariable(variable, variable));
};

export { getThemeColor, updatePackageThemingVariables };
