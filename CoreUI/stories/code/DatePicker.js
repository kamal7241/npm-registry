const defaultSourceConfigs = {
  language: "vuejs",
  type: "auto",
};

const FutureModeParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: "<DatePicker futureOnly />",
    },
  },
};

const IncludeTodayInFutureModeParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<DatePicker 
  futureOnly
  skipTodayInFutureMode="false" 
/>
        `,
    },
  },
};

const GregorianModeParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: "<DatePicker :initialIsHijri='false' />",
    },
  },
};

const MinimumGregorianYearParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: "<DatePicker :minimumGregorianYear='2015' />",
    },
  },
};

const MaxPreviewedYearsParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: "<DatePicker :maxPreviewedYears='3' />",
    },
  },
};

const HijriValueParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: "<DatePicker value='1443/02/15' />",
    },
  },
};
const GregorianValueParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<DatePicker 
  :initialIsHijri="false"
  value='2010/02/15' 
/>
      `,
    },
  },
};

export {
  FutureModeParams,
  GregorianModeParams,
  HijriValueParams,
  MaxPreviewedYearsParams,
  MinimumGregorianYearParams,
  GregorianValueParams,
  IncludeTodayInFutureModeParams,
};
