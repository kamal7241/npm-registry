
import * as moment from 'moment-hijri';
import { ICalenderProvider } from './ICalenderProvider';
import { MonthVM } from './model/MonthVM';
import { DayVM } from './model/DayVM';


export default class HijriCalenderProvider implements ICalenderProvider {
    public size: number | any = 21;
    public pageNumber: number | any = 0;
    public currentDate: any;
    public maxDate: string;
    public minDate: string;
    public months: MonthVM[] = [
        { number: 0, name: 'محرم' },
        { number: 1, name: 'صفر' },
        { number: 2, name: 'ربيع الأول' },
        { number: 3, name: 'ربيع الثاني' },
        { number: 4, name: 'جمادي الأولى' },
        { number: 5, name: 'جمادي الآخرة' },
        { number: 6, name: 'رجب' },
        { number: 7, name: 'شعبان' },
        { number: 8, name: 'رمضان' },
        { number: 9, name: 'شوال' },
        { number: 10, name: 'ذو القعدة' },
        { number: 11, name: 'ذو الحجة' },
    ];
    public dayNames: string[] = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    public selectedMonthDays: DayVM[] = [];
    public yearsList: number[];
    public minSupportedDate: any = new moment('1937-03-14', 'YYYY-MM-DD');
    public maxSupportedDate: any = new moment('2077-10-17', 'YYYY-MM-DD');
    public constructor(maxDate: string, minDate: string) {
        this.currentDate = moment();
        this.maxDate = maxDate;
        this.minDate = minDate;
        this.yearsList = [];
        const startYear = this.minSupportedDate.iYear();
        const endYear = this.maxSupportedDate.iYear();
        for (let year = startYear; year <= endYear; year++) {
            this.yearsList.push(year);
        }
    }
    public addMonth() {
        const temp = new moment(this.currentDate);
        const tempAdd = temp.add(1, 'iMonth');
        if (!tempAdd.isAfter(this.maxSupportedDate)) {
            if (!this.isDateDisabled(tempAdd.locale('en').format('YYYY-MM-DD'))) {
                this.currentDate = this.currentDate.add(1, 'iMonth');
                this.reFillMonthDays();
            }
        }
    }
    public subtractMonth() {
        const temp = new moment(this.currentDate);
        const tempsubtract = temp.subtract(1, 'iMonth');
        if (!tempsubtract.isBefore(this.minSupportedDate)) {
            if (!this.isDateDisabled(tempsubtract.locale('en').format('YYYY-MM-DD'))) {
                this.currentDate = this.currentDate.subtract(1, 'iMonth');
                this.reFillMonthDays();
            }
        }
    }
    public addYear() {
        const temp = new moment(this.currentDate);
        const tempAdd = temp.add(1, 'iYear');
        if (!tempAdd.isAfter(this.maxSupportedDate)) {
            if (this.reGetYears().findIndex(tempAdd.locale('en').iYear()) != -1) {
                this.currentDate = this.currentDate.add(1, 'iYear');
                this.reFillMonthDays();
            }
        }
    }
    public subtractYear() {
        const temp = new moment(this.currentDate);
        const tempsubtract = temp.subtract(1, 'iYear');
        if (!tempsubtract.isBefore(this.minSupportedDate)) {
            if (this.reGetYears().findIndex(tempsubtract.locale('en').iYear()) != -1) {
                this.currentDate = this.currentDate.subtract(1, 'iYear');
                this.reFillMonthDays();
            }
        }
    }
    public getYearFormated(): string {
        return this.currentDate.locale('ar-SA').format('iYYYY');
    }
    public getYearFormatedEn(): string {
        return this.currentDate.locale('en').format('iYYYY');
        // return this.currentDate.locale('ar-SA').format('iMMMM') +
        // ' (' + this.currentDate.format('iMM') +
        // ') ' + this.currentDate.format('iYYYY');
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
    public getMonthFormated(): string {
        return this.currentDate.locale('ar-SA').format('iMMMM');
    }
    public getCurrentYear(): number {
        return this.currentDate.iYear();
    }
    public getCurrentMonth(): number {
        return this.currentDate.iMonth();
    }
    public selectedDate(value: string | any): string {
        if (value) {
            return moment(value, 'YYYY-MM-DD').locale('en').format('iYYYY-iMM-iDD');
        } else {
            return '';
        }
    }
    public ChangeYearSelected(Year: number) {
        this.currentDate.iYear(Year);
    }
    public GetYears() {
        const start = this.pageNumber * this.size;
        const end = start + this.size;
        return this.reGetYears().slice(start, end);
    }
    public nextPage() {
        const start = this.pageNumber * this.size;
        const end = start + this.size;
        if (end < this.reGetYears().length) {
            this.pageNumber++;
        }
    }
    public prevPage() {
        const start = this.pageNumber * this.size;
        if (start > 0) {
            this.pageNumber--;
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
        const year = this.currentDate.locale('en').format('iYYYY');
        const month = (parseInt(value, 10) + 1);
        const day = this.currentDate.locale('en').format('iDD');
        const result = year + '-' + month + '-' + day;
        this.currentDate = new moment(result, 'iYYYY-iM-iDD');
        this.reFillMonthDays();
    }
    public onYearChange(value: string): void {
        const year = value;
        const month = this.currentDate.locale('en').format('iMM');
        const day = this.currentDate.locale('en').format('iDD');
        const result = year + '-' + month + '-' + day;
        this.currentDate = new moment(result, 'iYYYY-iM-iDD');
        this.reFillMonthDays();
    }
    public reFillMonthDays(): void {
        this.selectedMonthDays = [];
        const monthStartDay = this.getCurrentMonthStartDayNumber();
        const temp = new moment(this.currentDate).startOf('iMonth');
        for (let i = monthStartDay; i > 0; i--) {
            const x = new moment(temp).subtract(i, 'Day');
            x.locale('en');
            if (x.isAfter(this.minSupportedDate)) {
                this.selectedMonthDays.push({
                    number: x.format('iD'),
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
        const temp2 = new moment(this.currentDate).startOf('iMonth');
        const monthDays = this.monthDays();
        for (let i = 0; i < monthDays; i++) {
            const x = new moment(temp2).add(i, 'Day');
            x.locale('en');
            if (x.isSameOrAfter(this.minSupportedDate)) {
                this.selectedMonthDays.push({
                    number: x.format('iD'),
                    date: x.format('YYYY-MM-DD'),
                    isSameMonth: true,
                    isSelectableDate: true,
                });
            }
        }
        const monthEndDay = (Number)(this.getCurrentMonthEndDayNumber());
        const temp3 = new moment(this.currentDate).endOf('iMonth');
        if (temp3.isAfter(this.currentDate)) {
            for (let index = 1; index < 7 - monthEndDay; index++) {
                const x = new moment(temp3).add(index, 'Day');
                x.locale('en');
                if (x.isBefore(this.maxSupportedDate)) {
                    this.selectedMonthDays.push({
                        number: x.format('iD'),
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
        return year === this.currentDate.iYear();
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

    private getCurrentMonthStartDayNumber() {
        const time = new moment(this.currentDate);
        time.startOf('iMonth');
        return time.locale('en').format('d');
    }
    private getCurrentMonthEndDayNumber() {
        const time = new moment(this.currentDate);
        time.endOf('iMonth');
        return time.locale('en').format('d');
    }
    private monthDays() {
        const time = new moment(this.currentDate);
        return time.locale('en').iDaysInMonth();
    }
}
