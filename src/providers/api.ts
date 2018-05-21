import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Utils } from '../core/providers/utils';
import { BaseService } from '../core/base-service';

@Injectable()
export class Api extends BaseService {
	
	// override API URL prefix and anonymous API key
	//protected api_prefix: string = 'http://localhost/juicycore/api';
	protected api_prefix: string = 'https://dev.juicyapphk.com/juicycore/api';
	
	constructor(platform: Platform, utils: Utils) {
		super(platform, utils);
	}
}