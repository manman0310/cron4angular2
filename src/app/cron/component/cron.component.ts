import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
declare var CodeMirror: any;
declare var $: any;
@Component({
    selector: 'cron',
    templateUrl: './../view/cron.component.html',
    styleUrls: ['../view/style.css']
})
export class CronComponent implements OnInit, OnDestroy {

    @Input()
    timingExpression: string = '******';

    // 天数
    weekday: Array<any> = [
        {
            name: '星期一',
            select: false,
            value: 'MON'
        }, {
            name: '星期二',
            select: false,
            value: 'TUE'
        }, {
            name: '星期三',
            select: false,
            value: 'WED'
        }, {
            name: '星期四',
            select: false,
            value: 'THU'
        }, {
            name: '星期五',
            select: false,
            value: 'FRI'
        }, {
            name: '星期六',
            select: false,
            value: 'SAT'
        }, {
            name: '星期日',
            select: false,
            value: 'SUN'
        }
    ];
    // 小时
    hours: Array<any> = []
    // 分钟
    mins: Array<any> = []
    // 每天
    everyday: boolean = false
    // 每小时
    everyhours: boolean = false
    // 每分钟
    everymins: boolean = false
    // 选分钟方式 true选间隔 false选分钟
    minsModel: boolean = false

    // 各种表达式
    minutes1: string = '0';
    minutes2: string = '5';
    minutesExpression: string = '*';
    hoursExpression: string = '*';
    daysExpression: string = '*';
    monthsExpression: string = '?'
    weeksExpression: string = '?'

    @Output()
    cronChange: EventEmitter<any> = new EventEmitter<any>()

    constructor() { }

    ngOnInit() {
        for (let i = 0; i < 24; i++) {
            this.hours.push({
                name: i,
                select: false
            })
        }
        for (let i = 0; i < 60; i++) {
            this.mins.push({
                name: i,
                select: false
            })
        }

    }

    //选中全选框 1每天 2 每小时 3 每分钟 4切换选分钟模式
    selectAll(ind: string) {
        if (ind === "1") {
            if (this.everyday) {
                for (let day of this.weekday) {
                    day.select = true
                }
            } else {
                for (let day of this.weekday) {
                    day.select = false
                }
            }
            this.weeksChecked()
        } else if (ind === "2") {
            if (this.everyhours) {
                for (let hour of this.hours) {
                    hour.select = true
                }
            } else {
                for (let hour of this.hours) {
                    hour.select = false
                }
            }
            this.hoursChecked()
        } else if (ind === "3") {
            if (this.everymins) {
                for (let min of this.mins) {
                    min.select = true
                }
            } else {
                for (let min of this.mins) {
                    min.select = false
                }
            }
            this.minutesChecked()
        } else if (ind === "4") {
            if (this.minsModel) {
                this.initTimingExpression()
            } else {
                this.minutesChecked()
            }
        }
    }

    //选星期几
    weeksChecked() {
        let seledtedTimes = this.weekday.filter(data => data.select)

        this.weeksExpression = seledtedTimes.length == 0 ? '*' : seledtedTimes.map(data => data.value).join(',')
        this.initTimingExpressionWeek()
    }

    initTimingExpressionWeek() {
        this.timingExpression = '0' + ' ' + this.minutesExpression + ' ' + this.hoursExpression + ' ' + this.daysExpression + ' ' + this.monthsExpression + ' ' + this.weeksExpression;
        this.cronChange.emit(this.timingExpression)
    }
    //选小时
    hoursChecked() {
        let seledtedTimes = this.hours.filter(data => data.select)
        this.hoursExpression = seledtedTimes.length == 0 ? '*' : seledtedTimes.map(data => data.name).join(',')
        this.initTimingExpressionHour()
    }
    initTimingExpressionHour() {
        this.timingExpression = '0' + ' ' + this.minutesExpression + ' ' + this.hoursExpression + ' ' + this.daysExpression + ' ' + this.monthsExpression + ' ' + this.weeksExpression;
        this.cronChange.emit(this.timingExpression)
    }
    //选分钟
    minutesChecked() {
        let seledtedTimes = this.mins.filter(data => data.select)
        // this.minutesExpression = seledtedTimes.length == 0 ? this.minutes1 + '/' + this.minutes2 : seledtedTimes.map(data => data.name).join(',')
        this.minutesExpression = seledtedTimes.map(data => data.name).join(',')
        this.initTimingExpressionMinute()
    }
    initTimingExpressionMinute() {
        this.timingExpression = '0' + ' ' + this.minutesExpression + ' ' + this.hoursExpression + ' ' + this.daysExpression + ' ' + this.monthsExpression + ' ' + this.weeksExpression;
        this.cronChange.emit(this.timingExpression)
    }
    initTimingExpression() {
        this.minutesExpression = this.minutes1 + '/' + this.minutes2
        this.timingExpression = '0' + ' ' + this.minutesExpression + ' ' + this.hoursExpression + ' ' + this.daysExpression + ' ' + this.monthsExpression + ' ' + this.weeksExpression;
        this.cronChange.emit(this.timingExpression)
    }



    ngOnDestroy() {

    }
}