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
            },
            {
                key: 'payment_method',
                fields: [
					{
						id: 0,
						option_zh: '現金',
						option_en: 'Cash',
						value: 'cash'
					},
					{
						id: 1,
						option_zh: '過數',
						option_en: 'Bank Transfer',
						value: 'transfer'
					},
					{
						id: 2,
						option_zh: '支票',
						option_en: 'Cheque',
						value: 'cheque'
					}
                ]
            },
            {
                key: 'gender',
                fields: [
					{
						id: 0,
						option_zh: '男',
						option_en: 'Male',
						value: 'male'
					},
					{
						id: 1,
						option_zh: '女',
						option_en: 'Female',
						value: 'female'
					}
                ]
            },
            {
                key: 'education_level',
                fields: [
					{
						id: 0,
						option_zh: '從未',
						option_en: 'Never',
						value: 'never'
					},
					{
						id: 1,
						option_zh: '小學或以下',
						option_en: 'Primary school or below',
						value: 'primary'
					},
					{
						id: 2,
						option_zh: '中學',
						option_en: 'Secondary school',
						value: 'secondary'
					},
					{
						id: 3,
						option_zh: '大專 / 副學士 / 文憑',
						option_en: 'Post-secondary school / Associate Degree / Diploma',
						value: 'post_secondary'
					},
					{
						id: 4,
						option_zh: '大學或以上',
						option_en: 'University or above',					
						value: 'university'
					}
                ]
            },
            {
                key: 'related_experience',
                fields: [
					{
						id: 0,
						option_zh: '沒有經驗',
						option_en: 'None',
						value: 'none'
					},
					{
						id: 1,
						option_zh: '半年或以內',
						option_en: '6 months or less',
						value: 'half_year'
					},
					{
						id: 2,
						option_zh: '半年至1年',
						option_en: '6 months to 1 year',
						value: '1_year'
					},
					{
						id: 3,
						option_zh: '1年至3年',
						option_en: '1 year to 3 years',
						value: '3_year'
					},
					{
						id: 4,
						option_zh: '3年以上',
						option_en: '3 years or more',
						value: '3_year_above'
					}
                ]
            },
        ];
    }

    public translatePrefKey(pref_key) {
        switch(pref_key) {
            // Fields need translation
            case 'employment_type':
                return 'type';
            case 'employer_scale':
                break;
            default:
                return pref_key;
        }
    }

    public translatePrefValue(pref_key, pref_value) {
        let pref_selection = [];
        let pref_model = _.find(this.preference_model, {'key': pref_key});
        console.log('pref_model', pref_model);
        if (pref_model) {
            _.each(pref_value, (value) => {
                let field_value = pref_model.fields[value].value;
                pref_selection.push(field_value);
            })
        }
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

    public translatePrefContent(pref_key, text_value) {
        let pref_model = _.find(this.preference_model, {'key': pref_key});
        if (pref_model) {
            let field_content = _.find(pref_model.fields, {'value': text_value});
            return field_content; 
        }
    }
}
