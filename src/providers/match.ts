import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Utils } from '../core/providers/utils';
import { BaseService } from '../core/base-service';
import { Config } from '../config';
import _ from 'lodash';

@Injectable()
export class Match extends BaseService {

    preference_model: any;
	constructor(platform: Platform, utils: Utils) {
        super(platform, utils);

        this.preference_model = [
            {
                key: 'employment_type',
                fields: [
                    {
						id: 0,
						option_zh: '全職',
						option_en: 'Full time',
						value: 'fulltime'
					},
					{
						id: 1,
						option_zh: '兼職',
						option_en: 'Part time',
						value: 'parttime'
					},
					{
						id: 2,
						option_zh: '臨時工作',
						option_en: 'Temporary work',
						value: 'temporary'
					}
                ]
            }
        ];
    }

    public translatePrefKey(pref_key) {
        switch(pref_key) {
            // Fields need translation
            case 'employment_type':
                return 'type';
            case 'employer_scale':
                break;
            case 'monthly_wage':
            case 'hourly_wage':
            case 'payment_method':
                return pref_key;
        }
    }

    public translatePrefValue(pref_key, pref_value) {
        let pref_selection = [];
        let pref_model = _.find(this.preference_model, {'key': pref_key});
        console.log('pref_model', pref_model);
        _.each(pref_value, (value) => {
            let field_value = pref_model.fields[value].value;
            pref_selection.push(field_value);
        })
        return pref_selection;
    }

    public translatePrefAllValue(pref_key) {
        let pref_options = [];
        let pref_model = _.find(this.preference_model, {'key': pref_key});
        if (pref_model) {
            _.each(pref_model.fields, (field) => {
                pref_options.push(field.value);
            })
        }
        return pref_options;
    }
}
