import { MonthVM } from './model/MonthVM';
import { DayVM } from './model/DayVM';


export interface ICalenderProvider {
    size: number | any;
    pageNumber: number | any;
    currentDate: any;
    maxDate: string;
    minDate: string;
    months: MonthVM[];
    selectedMonthDays: DayVM[];
    dayNames: string[];
    yearsList: number[];
    addMonth(): any;
    subtractMonth(): any;
    addYear(): any;
    subtractYear(): any;
    getMonthFormated(): string;
    getYearFormated(): string;
    getCurrentYear(): number;
    getCurrentMonth(): number;
    selectedDate(value: string | any): string;
    isDateDisabled(date: string): boolean;
    onMonthChange(value: string): void;
    onYearChange(value: string): void;
    reFillMonthDays(): void;
    setDate(value: string): void;
    isSelectedDateYear(year: number): boolean;
    recalculateYearPage(): void;
    reGetYears(): number[];
    ChangeYearSelected(year: number): void;
    GetYears();
    nextPage();
    prevPage();
    getMonthFormatedGregorian();
    getYearFormatedGregorian();
}
