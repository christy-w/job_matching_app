
export interface AppVersionModel {
	platform: string;
	code: string;
	release_notes: string;
	force_update: string | boolean;
	publish_date: string;
}