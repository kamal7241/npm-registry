import moment from 'moment-hijri';
import { ICalenderProvider } from './ICalenderProvider';
import { MonthVM } from './model/MonthVM';
import { DayVM } from './model/DayVM';


export default class GregorianCalenderProvider implements ICalenderProvider {

    public size: number | any = 21;
    public pageNumber: number | any = 0;
    public currentDate: any;
    public maxDate: string;
    public minDate: string;
    public months: MonthVM[] = [
        { number: 0, name: 'كانون الثاني' },
        { number: 1, name: 'شباط' },
        { number: 2, name: 'آذار' },
        { number: 3, name: 'نيسان' },
        { number: 4, name: 'أيار' },
        { number: 5, name: 'حزيران' },
        { number: 6, name: 'تموز' },
        { number: 7, name: 'آب' },
        { number: 8, name: 'أيلول' },
        { number: 9, name: 'تشرين الأول' },
        { number: 10, name: 'تشرين الثاني' },
        { number: 11, name: 'كانون الأول' },
    ];
    public dayNames: string[] = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
    public selectedMonthDays: DayVM[] = [];
    public yearsList: number[];
    public minSupportedDate: any = new moment('1937-03-14', 'YYYY-MM-DD');
    public maxSupportedDate: any = new moment('2077-10-17', 'YYYY-MM-DD');
    public constructor(maxDate: string, minDate: string) {
        this.currentDate = moment();
        this.maxDate = maxDate;
        this.minDate = minDate;
        this.yearsList = [];
        const startYear = this.minSupportedDate.year();
        const endYear = this.maxSupportedDate.year();
        for (let year = startYear; year <= endYear; year++) {
            this.yearsList.push(year);
        }
    }
    public addMonth() {
        const temp = new moment(this.currentDate);
        const tempAdd = temp.add(1, 'Month');
        if (!tempAdd.isAfter(this.maxSupportedDate)) {
            if (!this.isDateDisabled(tempAdd.locale('en').format('YYYY-MM-DD'))) {
                this.currentDate = this.currentDate.add(1, 'Month');
                this.reFillMonthDays();
            }
        }
    }
    public subtractMonth() {
        const temp = new moment(this.currentDate);
        const tempsubtract = temp.subtract(1, 'Month');
        if (!tempsubtract.isBefore(this.minSupportedDate)) {
            if (!this.isDateDisabled(tempsubtract.locale('en').format('YYYY-MM-DD'))) {
                this.currentDate = this.currentDate.subtract(1, 'Month');
                this.reFillMonthDays();
            }
        }
    }
    public addYear() {
        const temp = new moment(this.currentDate);
        const tempAdd = temp.add(1, 'Year');
        if (!tempAdd.isAfter(this.maxSupportedDate)) {
            if (this.reGetYears().findIndex(tempAdd.locale('en').year()) != -1) {
                this.currentDate = this.currentDate.add(1, 'Year');
                this.reFillMonthDays();
            }
        }
    }
    public subtractYear() {
        const temp = new moment(this.currentDate);
        const tempsubtract = temp.subtract(1, 'Year');
        if (!tempsubtract.isBefore(this.minSupportedDate)) {
            if (this.reGetYears().findIndex(tempsubtract.locale('en').year()) != -1) {
                this.currentDate = this.currentDate.subtract(1, 'Year');
                this.reFillMonthDays();
            }
        }
    }
    public getCurrentDateFormated(): string {
        return this.currentDate.format('MMMM') +
            ' (' + this.currentDate.format('MM') +
            ') ' + this.currentDate.format('YYYY');
    }
    public getYearFormated(): string {
        return this.currentDate.format('YYYY');
        // return this.currentDate.format('MMMM') +
        //     ' (' + this.currentDate.format('MM') +
        //     ') ' + this.currentDate.format('YYYY');
    }

    public getMonthFormated(): string {
        return this.currentDate.format('MMMM');
        // return this.currentDate.format('MMMM') +
        //     ' (' + this.currentDate.format('MM') +
        //     ') ' + this.currentDate.format('YYYY');
    }
    public getCurrentYear(): number {
        return this.currentDate.year();
    }
    public getCurrentMonth(): number {
        return this.currentDate.month();
    }
    public selectedDate(value: string | any): string {
        if (value) {
            return moment(value, 'YYYY-MM-DD').locale('en').format('YYYY-MM-DD');
        } else {
            return '';
        }
    }
    public isDateDisabled(date: string): boolean {
        let result: boolean = false;
        if (this.maxDate) {
            result = moment(date, 'YYYY-MM-DD').isAfter(moment(this.maxDate, 'YYYY-MM-DD')) || result;
        }
        if (this.minDate) {
            result = moment(date, 'YYYY-MM-DD').isBefore(moment(this.minDate, 'YYYY-MM-DD')) || result;
        }
        return result;
    }
    public onMonthChange(value: string): void {
        const year = this.currentDate.locale('en').format('YYYY');
        const month = (parseInt(value, 10) + 1);
        const day = this.currentDate.locale('en').format('DD');
        const result = year + '-' + month + '-' + day;
        this.currentDate = new moment(result, 'YYYY-M-DD');
        this.reFillMonthDays();
    }
    public onYearChange(value: string): void {
        const year = value;
        const month = this.currentDate.locale('en').format('MM');
        const day = this.currentDate.locale('en').format('DD');
        const result = year + '-' + month + '-' + day;
        this.currentDate = new moment(result, 'YYYY-M-DD');
        this.reFillMonthDays();
    }
    public reFillMonthDays(): void {
        this.selectedMonthDays = [];
        const monthStartDay = this.getCurrentMonthStartDayNumber();
        const temp = new moment(this.currentDate).startOf('Month');
        for (let i = monthStartDay; i > 0; i--) {
            const x = new moment(temp).subtract(i, 'Day');
            x.locale('en');
            if (x.isSameOrAfter(this.minSupportedDate) && x.isSameOrBefore(this.maxSupportedDate)) {
                this.selectedMonthDays.push({
                    number: x.format('D'),
                    date: x.format('YYYY-MM-DD'),
                    isSameMonth: false,
                    isSelectableDate: true,
                });
            } else {
                this.selectedMonthDays.push({
                    number: '',
                    date: x.format('YYYY-MM-DD'),
                    isSameMonth: false,
                    isSelectableDate: false,
                });
            }
        }
        const temp2 = new moment(this.currentDate).startOf('Month');
        const monthDays = this.monthDays();
        for (let i = 0; i < monthDays; i++) {
            const x = new moment(temp2).add(i, 'Day');
            x.locale('en');
            if (x.isSameOrAfter(this.minSupportedDate) && x.isSameOrBefore(this.maxSupportedDate)) {
                this.selectedMonthDays.push({
                    number: x.format('D'),
                    date: x.format('YYYY-MM-DD'),
                    isSameMonth: true,
                    isSelectableDate: true,
                });
            } else {
                this.selectedMonthDays.push({
                    number: '',
                    date: x.format('YYYY-MM-DD'),
                    isSameMonth: true,
                    isSelectableDate: false,
                });
            }
        }
        const monthEndDay = (Number)(this.getCurrentMonthEndDayNumber());
        const temp3 = new moment(this.currentDate).endOf('Month');
        if (temp3.isAfter(this.currentDate)) {
            for (let index = 1; index < 7 - monthEndDay; index++) {
                const x = new moment(temp3).add(index, 'Day');
                x.locale('en');
                if (x.isSameOrAfter(this.minSupportedDate) && x.isSameOrBefore(this.maxSupportedDate)) {
                    this.selectedMonthDays.push({
                        number: x.format('D'),
                        date: x.format('YYYY-MM-DD'),
                        isSameMonth: false,
                        isSelectableDate: true,
                    });
                } else {
                    this.selectedMonthDays.push({
                        number: '',
                        date: x.format('YYYY-MM-DD'),
                        isSameMonth: true,
                        isSelectableDate: false,
                    });
                }
            }
        }
    }
    public setDate(value: string): void {
        if (value) {
            this.currentDate = new moment(value, 'YYYY-MM-DD');
        } else {
            this.currentDate = moment();
        }
    }
    public isSelectedDateYear(year: number): boolean {
        return year === this.currentDate.year();
    }
    public reGetYears(): number[] {
        const MinYear = moment(this.minDate, 'YYYY-MM-DD').iYear();
        const MaxYear = moment(this.maxDate, 'YYYY-MM-DD').iYear();
        let ArrayofYears = this.yearsList;
        if (this.maxDate && this.minDate) {
            ArrayofYears = this.yearsList.filter((Year) => (Year >= MinYear && Year <= MaxYear));
        } else if (this.maxDate) {
            ArrayofYears = this.yearsList.filter((Year) => Year <= MaxYear);
        } else if (this.minDate) {
            ArrayofYears = this.yearsList.filter((Year) => Year >= MinYear);
        }
        return ArrayofYears;
    }

    public recalculateYearPage(): void {
        const MinYear = moment(this.minDate, 'YYYY-MM-DD').iYear();
        const MaxYear = moment(this.maxDate, 'YYYY-MM-DD').iYear();
        let indexcurrentYear = this.yearsList.indexOf(this.currentDate.iYear());
        if (this.maxDate && this.minDate) {
            indexcurrentYear = this.yearsList.filter((Year) => (Year >= MinYear && Year <= MaxYear))
                .indexOf(this.currentDate.iYear());
        } else if (this.maxDate) {
            indexcurrentYear = this.yearsList.filter((Year) => Year <= MaxYear).indexOf(this.currentDate.iYear());
        } else if (this.minDate) {
            indexcurrentYear = this.yearsList.filter((Year) => Year >= MinYear).indexOf(this.currentDate.iYear());
        }
        this.pageNumber = Math.floor((indexcurrentYear / 21));
    }
    public ChangeYearSelected(Year: number) {
        this.currentDate.year(Year);
    }
    private getCurrentMonthStartDayNumber() {
        const time = new moment(this.currentDate);
        time.startOf('Month');
        return time.locale('en').format('d');
    }
    private getCurrentMonthEndDayNumber() {
        const time = new moment(this.currentDate);
        time.endOf('Month');
        return time.locale('en').format('d');
    }
    private monthDays() {
        const time = new moment(this.currentDate);
        return time.locale('en').daysInMonth();
    }

    GetYears() {
        const start = this.pageNumber * this.size;
        const end = start + this.size;
        return this.reGetYears().slice(start, end);
    }
    nextPage() {
        const start = this.pageNumber * this.size;
        const end = start + this.size;
        if (end < this.reGetYears().length) {
            this.pageNumber++;
        }
    }
    prevPage() {
        const start = this.pageNumber * this.size;
        if (start > 0) {
            this.pageNumber--;
        }
    }
    public getMonthFormatedGregorian(): string {
        const currentDateHijry = this.currentDate;
        const currentYearHijry = currentDateHijry.locale('en').format('iYYYY');
        const currentMonthHijry = currentDateHijry.locale('en').format('iMM');
        const time = new moment(this.currentDate);
        const NumberDaysInMonth = time.locale('en').iDaysInMonth();
        const startHijry = moment('' + currentYearHijry + '-' + currentMonthHijry + '-01', 'iYYYY-iMM-iDD')
            .format('MMMM');
        const EndHijry = moment('' + currentYearHijry + '-' + currentMonthHijry + '-' + NumberDaysInMonth + '', 'iYYYY-iMM-iDD')
            .format('MMMM');
        if (startHijry === EndHijry) {
            return startHijry;
        } else {
            return startHijry + ' / ' + EndHijry;
        }
    }
    public getYearFormatedGregorian(): string {
        const currentDateHijry = this.currentDate;
        const currentYearHijry = currentDateHijry.locale('en').format('iYYYY');
        const currentMonthHijry = currentDateHijry.locale('en').format('iMM');
        const time = new moment(this.currentDate);
        const NumberDaysInMonth = time.locale('en').iDaysInMonth();
        const startHijry = moment('' + currentYearHijry + '-' + currentMonthHijry + '-01', 'iYYYY-iMM-iDD')
            .format('YYYY');
        const EndHijry = moment('' + currentYearHijry + '-' + currentMonthHijry + '-' + NumberDaysInMonth + '', 'iYYYY-iMM-iDD')
            .format('YYYY');
        if (startHijry === EndHijry) {
            return startHijry;
        } else {
            return startHijry + ' / ' + EndHijry;
        }
    }
}
