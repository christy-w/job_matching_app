import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';
import _ from 'lodash';

@Component({
  selector: 'search-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilter {
	language: string = '';
	filters_employment_types: any = [];
	all_districts: any;
	selected_districts: any = [];
	selected_types: any = [];
	search_input: string = '';
  constructor(
		private utils: Utils,
		private api: Api,
		private view: ViewController
	) {
	}

	ionViewWillEnter() {
		this.language = this.utils.currentLang();
		this.initDistricts();
		this.filters_employment_types = [
			{
				name_zh: '兼職',
				name_en: 'Part Time',
				value: 'parttime'
			},
			{
				name_zh: '全職',
				name_en: 'Full Time',
				value: 'fulltime'
			},
			{
				name_zh: '臨時工作',
				name_en: 'Temporary Work',
				value: 'temporary'
			}
		];
		this.filters_employment_types.forEach(type => {
			// Default all filters are ON
			type.selected = true;
			// Save all filters
			this.selected_types.push(type.value);
		})

	}
	
	initDistricts() {
		this.api.startQueue([
			this.api.getSystemInfo('districts')
		]).then(response => {
			var all_districts = response[0];
			
			all_districts = _.chain(all_districts)
				.groupBy('area')
				.map((locations, area) => ({ locations, area }))
				.value();

			all_districts.forEach(area => {
				switch(area.area) {
					case 'hk':
						area.area_zh = '香港島'
						area.area_en = 'Hong Kong Island'
						break;
					case 'kln':
						area.area_zh = '九龍'
						area.area_en = 'Kowloon'
						break;
					case 'nt':
						area.area_zh = '新界'
						area.area_en = 'New Territories'
						break;
				}
				
				area.locations.forEach(location => {
					// Default all filters are ON
					location.selected = true;
					// Save all filters
					this.selected_districts.push(location.id);
				})
			});
			this.all_districts = all_districts;
		});
	}

  selectType(type) {
		type.selected = !type.selected;

		if (_.includes(this.selected_types, type.value)) {
			// Remove selected if it exits in collection
			_.pull(this.selected_types, type.value);
		} else {
			// Add selected if it does not exist in collection
			this.selected_types.push(type.value);
		}
	}
	
	selectDistrict(district) {
		district.selected = !district.selected;

		if (_.includes(this.selected_districts, district.id)) {
			// Remove selected if it exits in collection
			_.pull(this.selected_districts, district.id);
		} else {
			// Add selected if it does not exist in collection
			this.selected_districts.push(district.id);
		}
	}

	confirmFilter() {
		let data = { 'search_input': this.search_input, 'types': this.selected_types, 'districts': this.selected_districts };
		console.log('filter data', data);
		this.view.dismiss(data);
	}

	selectAllFilter() {
		this.selected_districts = [];
		this.selected_types = [];
		_.each(this.all_districts, (area) => {
			_.each(area.locations, (district) => {
				district.selected = true;
				this.selected_districts.push(district.id);
			})
		});
		_.each(this.filters_employment_types, (type) => {
			type.selected = true;
			this.selected_types.push(type.value);
		});
	}

	deselectAllFilter() {
		_.each(this.all_districts, (area) => {
			_.each(area.locations, (district) => {
				district.selected = false;
			})
		});
		_.each(this.filters_employment_types, (type) => {
			type.selected = false;
		});
		this.selected_districts = [];
		this.selected_types = [];
		this.search_input = '';
	}
}
