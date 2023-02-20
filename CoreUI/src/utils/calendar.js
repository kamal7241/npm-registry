import {
  HijriMonthsLookup,
  GregorianMonthsLookup,
} from "../services/monthsLookups";

function generateMonthLabel(value, isHijri) {
  const monthsLabels = isHijri ? HijriMonthsLookup : GregorianMonthsLookup;

  return monthsLabels[value];
}

export function padNumber(no, length) {
  const pad = `${"0".repeat(length)}${no}`;
  return pad.substr(pad.length - length);
}

export function generateRange(rangeOptions) {
  const {
    start,
    end,
    valueLength = 2,
    reverse,
    isMonthMode = false,
    isHijri,
  } = rangeOptions;

  const length = 1 + end - start;
  const range = new Array(length).fill(1).map((_, index) => {
    const value = start + index;
    const label = padNumber(value, valueLength);

    return {
      value,
      label: isMonthMode ? generateMonthLabel(value, isHijri || false) : label,
    };
  });

  return reverse ? range.reverse() : range;
}
