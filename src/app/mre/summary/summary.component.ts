import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SummaryService } from './summary.service'
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export type ChartOptions = {
	series: ApexAxisChartSeries | ApexNonAxisChartSeries;
	colors: string[],
	chart: ApexChart;
	xaxis: ApexXAxis;
	yaxis: ApexYAxis | ApexYAxis[],
	title: ApexTitleSubtitle;
	dataLabels: ApexDataLabels,
	stroke: ApexStroke,
	grid: ApexGrid,
	legend?: ApexLegend,
	tooltip?: ApexTooltip,
	plotOptions?: ApexPlotOptions,
	labels?: string[],
	fill: ApexFill,
	markers?: ApexMarkers,
	theme: ApexTheme,
	responsive: ApexResponsive[]
};

var $primary = "#2F8BE6";

var themeColors = [$primary];




@Component({
	selector: 'app-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss']
})


export class SummaryComponent implements OnInit {
	barChartOptions: Partial<ChartOptions>;
	years = ["2022", "2023", "2024", "2025"];
	vertical_chart_opt = {
	
		showXAxis: true,
		showYAxis: true,
		gradient: false,
		showLegend: true,
		showXAxisLabel: true,
		legendTitle: 'CLIENTS',
		xAxisLabel: 'PROVINCES',
		showYAxisLabel: true,
		yAxisLabel: 'COUNT',
		view: [700, 400],
	};

	totalEmployee;
	totalUser;
	totalSells;
	totalExpenses;
	chartData = [];


	newForm: FormGroup;
	products = [];
	product;
	stock;
	selectedProductId;
	stockValue;
	cerror = false;

	constructor(private router: Router,
		public translate: TranslateService,
		private spinner: NgxSpinnerService,
		private summaryService: SummaryService,
		private formBuilder: FormBuilder,

	) {
		this.refreshChart()
	}

	ngOnInit(): void {
		this.newForm = this.formBuilder.group({
			product_id: [null, [Validators.required]],
		});

		this.getChartData('2022');
		this.getCounts();

	}

	getCounts() {
		this.spinner.show();
		this.summaryService.getCounts().subscribe((res: any) => {

			if (res != null) {
				this.totalEmployee = res.totalEmp
				this.totalUser = res.totalUser
				this.totalSells = res.totalSells;
				this.totalExpenses = res.totalExpenses
			}
			this.spinner.hide();
		})
	}

	getChartData(yr) {
		this.spinner.show();
		this.summaryService.getChart(yr).subscribe((data: any) => {
			console.log(data);
			if (data != null && data != []) {
				this.chartData = data;
				this.refreshChart()
			}
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
			console.log(error);

		});
	}


	refreshChart() {
		this.barChartOptions = {
			chart: {
				height: 350,
				type: 'bar',
			},
			colors: themeColors,
			plotOptions: {
				bar: {
					horizontal: true,
				}
			},
			dataLabels: {
				enabled: false
			},
			series: [{
				data: this.chartData
			}],
			xaxis: {
				categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				tickAmount: 5
			}
		}
	}


	setYear(val) {
		if(val != null)
		this.getChartData(val)
	}
}
