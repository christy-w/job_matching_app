import { Component } from '@angular/core';

@Component({
  selector: 'search-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilter {

  filters: any = [];
  buttonToggle: boolean = false;

  constructor() {
    console.log('Hello SearchFilter Component');

		this.filters = [
			{
				name: '工作類別',
				options: [
					{
						sub_name: '',
						sub_options: ['兼職', '全職', '臨時工作']
					},
				]
			},
			{
				name: '地區',
				options: [
					{
						sub_name: '香港島',
						sub_options: ['中西區', '灣仔區', '東區', '南區']
					},
					{
						sub_name: '九龍',
						sub_options: ['九龍城區', '觀塘區', '黃大仙區', '深水埗區', '油尖旺區']
					},
					{
						sub_name: '新界',
						sub_options: ['葵青區', '荃灣區', '西貢區', '屯門區', '北區', '沙田區', '大埔區']
					},
				]
			},
			{
				name: '刊登日期',
				options: [
					{
						sub_name: '',
						sub_options: ['一星期內', '一個月內', '半年內']
					}
				]
			}
		];
  }

  selectFilter(option) {
    option.selected = !option.selected;
  }

}
