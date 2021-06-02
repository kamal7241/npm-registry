import withRender from './PastDateTime.html';
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import SelectTo from '@t2/selectto';
import MonthModel from './MonthModel';
import moment from 'moment';
import momenthijri from 'moment-hijri';
@withRender
@Component({
    components: { SelectTo },
})
export default class PastDateTime extends Vue {
    @Prop({ default: true })
    public isGregorian!: boolean;
    @Prop({ default: '' })
    public date!: string;
    @Prop({ default: 'Add' })
    public mode!: string;

    public bindedDate: string = '';
    public years: number[] = [];
    public months: MonthModel[] = [];
    public days: number[] = [];
    public currentDate: string = '';
    public isMounted: boolean = false;
    public cultureType: boolean = true;
    public selectedYear: string = '';
    public selectedMonth: MonthModel = { key: '', value: 0 };
    public selectedDay: string = '';
    public gregorianMonths = [
        'يناير - 1',
        'فبراير - 2',
        'مارس - 3',
        'أبريل - 4',
        'مايو - 5',
        'يونيو - 6',
        'يوليو - 7',
        'أغسطس - 8',
        'سبتمبر - 9',
        'أكتوبر - 10',
        'نوفمبر - 11',
        'ديسمبر - 12',
    ];
    public hijriMonths = [
        'محرّم - 1',
        'صفر - 2',
        'ربيع الأول - 3',
        'ربيع الآخر - 4',
        'جمادى الأول - 5',
        'جمادى الآخر - 6',
        'رجب - 7',
        'شعبان - 8',
        'رمضان - 9',
        'شوّال - 10',
        'ذو القعدة - 11',
        'ذو الحجة - 12',
    ];
    public mounted() {
        this.cultureType = this.isGregorian;
        moment.locale('en-us');
        if (this.isGregorian) {
            this.currentDate = moment().format('YYYY-MM-DD');
        } else {
            this.currentDate = momenthijri().format('iYYYY-iMM-iDD');
        }
        this.getBindedDate();
        this.isMounted = true;
        this.getYears();
        this.getMonths();
        this.fillDates();

    }
    public getYears() {
        this.years = [];
        let year = Number.parseInt(this.currentDate.split('-')[0], 10);
        while (this.isGregorian ? year > 1925 : year > 1343) {
            this.years.push(year);
            year--;
        }
    }
    public getMonths() {
        this.months = [];
        for (let i = 1; i <= 12; i++) {
            this.months.push({
                key: this.isGregorian ?
                    this.gregorianMonths[i - 1]
                    : this.hijriMonths[i - 1], value: i,
            });
        }
    }
    public getDays(month: number, year: number) {
        this.days = [];
        let daysCount = 0;
        if (this.isGregorian) {
            daysCount = moment(year + '-' + month, 'yyyy-MM').daysInMonth();
        } else {
            daysCount = 30;
        }
        while (daysCount >= 1) {
            this.days.push(daysCount);
            daysCount--;
        }
    }
    public get isViewMode() {
        return this.mode === 'View';
    }
    public getCalenderType() {
        if (this.cultureType) {
            this.currentDate = momenthijri(this.currentDate, 'iYYYY-iMM-iDD').format('YYYY-MM-DD');
            if (this.bindedDate) {
                this.bindedDate = momenthijri(this.bindedDate, 'iYYYY-iMM-iDD').format('YYYY-MM-DD');
            }
        } else {
            this.currentDate = momenthijri(this.currentDate).format('iYYYY-iMM-iDD');
            if (this.bindedDate) {
                this.bindedDate = momenthijri(this.bindedDate, 'YYYY-MM-DD').format('iYYYY-iMM-iDD');
            }
        }
        this.isGregorian = this.cultureType;
        this.getYears();
        this.getMonths();
        this.getDays(Number.parseInt(this.currentDate.split('-')[1], 10)
            , Number.parseInt(this.currentDate.split('-')[0], 10));
        this.fillDates();
    }

    public fillDates() {
        this.selectedYear = this.bindedDate.split('-')[0];
        this.selectedMonth = this.months.find((x) =>
            x.value === Number.parseInt(this.bindedDate.split('-')[1], 10)) as MonthModel;
        this.selectedDay = this.bindedDate.split('-')[2];
    }
    public getBindedDate() {
        if (this.date) {
            const year = this.date.split('-')[0];
            if (this.isGregorian) {
                if (year.startsWith('14') || year.startsWith('13')) {
                    this.bindedDate = momenthijri(this.date, 'iYYYY-iMM-iDD').format('YYYY-MM-DD');
                } else {
                    this.bindedDate = this.date;
                }
            } else {
                if (year.startsWith('14') || year.startsWith('13')) {
                    this.bindedDate = this.date;
                } else {
                    this.bindedDate = momenthijri(this.date).format('iYYYY-iMM-iDD');
                }
            }
        }
    }
    // Return The Date In Gregorian And Hijri

    @Emit('gregoriandate')
    public gregorianDate() {

        const date = this.checkDate();
        if (!date) {
            return '';
        }
        if (!this.cultureType) {
            return momenthijri(date, 'iYYYY-iMM-iDD').format('YYYY-MM-DD');
        }
        this.bindedDate = date;
        return date;
    }
    @Emit('hijridate')
    public hijriDate() {
        const date = this.checkDate();
        if (!date) {
            return '';
        }
        if (this.cultureType) {
            return momenthijri(date, 'YYYY-MM-DD').format('iYYYY-iMM-iDD');
        }
        this.bindedDate = date;
        return date;
    }
    public checkDate() {
        if (!this.selectedYear || !this.selectedMonth || !this.selectedDay) {
            return '';
        }
        if (this.selectedMonth.value === 0) {
            return '';
        }
        return this.selectedYear.toString().concat('-', this.selectedMonth.value.toString(), '-', this.selectedDay);
    }
    public onSelectedYear() {
        this.selectedMonth = { key: '', value: 0 };
        this.selectedDay = '';
        this.gregorianDate();
        this.hijriDate();
    }
    public onSelectedMonth(selectedMonth: MonthModel) {
        this.selectedDay = '';
        this.selectedMonth = selectedMonth;
        this.getDays(selectedMonth.value, Number.parseInt(this.selectedYear, 10));
        this.gregorianDate();
        this.hijriDate();
    }
    public onSelectedDay(day: string) {
        this.selectedDay = day;
        this.gregorianDate();
        this.hijriDate();
    }


}

