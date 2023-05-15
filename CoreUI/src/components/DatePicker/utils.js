import moment from "moment-hijri";
import { padNumber } from "../../utils/calendar";

const formatters = {};

const checkFormatterValidity = (calendar) => {
  const support = [
    "islamic-umalqura",
    "islamic-civil",
    "islamic-tbla",
    "islamic-rgsa",
    "islamic",
  ];

  if (!support.includes(calendar)) {
    throw new Error(`calendar must be one of '${support.join("', '")}'`);
  }

  if (!Intl || typeof Intl.DateTimeFormat !== "function") {
    throw new Error("Intl.DateTimeFormat is not available in this environment");
  }
};

const getFormatter = (calendar = "islamic-umalqura") => {
  const locale = `en-u-ca-${calendar}`;
  let returnFormatter = formatters[locale];

  if (returnFormatter) {
    return returnFormatter;
  }

  checkFormatterValidity(calendar);

  try {
    returnFormatter = new Intl.DateTimeFormat(locale, {
      dateStyle: "short",
      timeZone: "UTC",
    });
  } catch (err) {
    throw new Error(
      `Intl.DateTimeFormat threw an error, usually because locale '${locale}' is unsupported, cause ${err}`
    );
  }

  formatters[locale] = returnFormatter;

  return formatters[locale];
};

const getFormattedDate = (dateTimeFormatter, dateTime) =>
  dateTimeFormatter
    .format(dateTime)
    .split("/")
    .map((n) => parseInt(n, 10));

const hijriToGregorian = (configs) => {
  const { day, month, year, fromCalendar = "islamic-umalqura" } = configs;

  const dateTimeFormatter = getFormatter(fromCalendar);

  let gregorianDate = new Date(Date.UTC(2000, 0, 1));

  gregorianDate.setUTCDate(
    gregorianDate.getUTCDate() +
      Math.trunc(227022 + (year + (month - 1) / 12 + day / 354) * 354.367)
  );

  const generatedYear = gregorianDate.getUTCFullYear() - 2000;

  gregorianDate = new Date(
    Date.UTC(
      generatedYear,
      gregorianDate.getUTCMonth(),
      gregorianDate.getUTCDate()
    )
  );

  let [iM, iD, iY] = getFormattedDate(dateTimeFormatter, gregorianDate);

  gregorianDate.setUTCDate(
    gregorianDate.getUTCDate() +
      Math.trunc(
        year * 354 + month * 29.53 + day - (iY * 354 + iM * 29.53 + iD * 1) - 2
      )
  );

  for (let i = 0; i < 4; i += 1) {
    [iM, iD, iY] = getFormattedDate(dateTimeFormatter, gregorianDate);

    if (iD === day && iM === month && iY === year) {
      const daysCount = gregorianDate.getDate();
      gregorianDate.setDate(daysCount);
      return {
        date: moment(gregorianDate).locale("en").format("YYYY/MM/DD"),
        format: "YYYY/MM/DD",
      };
    }

    gregorianDate.setUTCDate(gregorianDate.getUTCDate() + 1);
  }

  throw new Error(`Invalid ${fromCalendar} date!`);
};

const gregorianToHijri = (configs) => {
  const { day, month, year } = configs;

  const constructedDate = new Date(year, month - 1, day);
  const locale = "en-u-ca-islamic-umalqura-nu-latn";
  // ? It will give a result like '01/12/1915 AH'
  const formattedDate = Intl.DateTimeFormat(locale).format(constructedDate);
  const [hMonth, hDay, hYear] = formattedDate
    .split("/")
    .map((n) => parseInt(n, 10));

  return {
    format: "iYYYY/iMM/iDD",
    date: `${hYear}/${padNumber(hMonth, 2)}/${padNumber(hDay, 2)}`,
  };
};

const getHijriMonthInfo = (date) => {
  if (date) {
    const startDate = new Date(date);
    // use 'islamic-umalqura' calendar for the islamic date
    const calendar = "en-u-ca-islamic-umalqura-nu-latn";
    let gregorianDate = startDate;
    let gDays = 0;
    let iMonthTotalDays = 0;
    let hijriDay = 0;
    const numeric = "numeric";
    const iDay = new Intl.DateTimeFormat(calendar, { day: numeric }).format(
      startDate
    );
    const iMonth = new Intl.DateTimeFormat(calendar, { month: numeric }).format(
      startDate
    );
    // ? '1300 AH'
    const iYear = new Intl.DateTimeFormat(calendar, { year: numeric })
      .format(startDate)
      .split(" ")[0];
    for (let i = 0; i < 32; i += 1) {
      hijriDay = Number(
        new Intl.DateTimeFormat(calendar, { day: numeric }).format(
          gregorianDate
        )
      );
      if (hijriDay > iMonthTotalDays) {
        iMonthTotalDays = Number(hijriDay);
        gDays += 1;
      } else {
        break;
      }
      // ? next Gregorian day
      gregorianDate = new Date(
        gregorianDate.setDate(gregorianDate.getDate() + 1)
      );
    }
    // ? Meta info
    const gEndT = new Date(startDate.setDate(startDate.getDate() + gDays - 2));
    const gEnd = new Date(gEndT);
    const gStart = new Date(
      gEndT.setDate(gEndT.getDate() - iMonthTotalDays + 1)
    );

    const [year, month, day] = new Date(date)
      .toISOString()
      .split("T")[0]
      .split("-");
    const totalDaysInGregorianMonth = new Date(
      Number(year),
      Number(month),
      0
    ).getDate();

    return {
      gregorianDate,
      gregorianDay: Number(day),
      gregorianMonth: Number(month),
      gregorianYear: Number(year),
      hijriDay: Number(iDay),
      hijriMonth: Number(iMonth),
      hijriYear: Number(iYear),
      totalDaysInHijriMonth: iMonthTotalDays,
      totalDaysInGregorianMonth,
      hijriMonthStartsOn: gStart,
      hijriMonthEndsOn: gEnd,
    };
  }
  return {
    gregorianDate: 0,
    gregorianDay: 0,
    gregorianMonth: 0,
    gregorianYear: 0,
    hijriDay: 0,
    hijriMonth: 0,
    hijriYear: 0,
    totalDaysInHijriMonth: 0,
    totalDaysInGregorianMonth: 0,
    hijriMonthStartsOn: 0,
    hijriMonthEndsOn: 0,
  };
};

export { gregorianToHijri, hijriToGregorian, getHijriMonthInfo };
