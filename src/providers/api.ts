import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { Utils } from '../core/providers/utils';
import { BaseService } from '../core/base-service';

@Injectable()
export class Api extends BaseService {
	
	// override API URL prefix and anonymous API key
	//protected api_prefix: string = 'http://localhost/juicylauncher2_web/api';
	protected api_prefix: string = 'https://dev.juicyapphk.com/juicylauncher2_web/api';
	
	constructor(http: HttpClient, platform: Platform, utils: Utils) {
		super(http, platform, utils);
	}
}