/**
 * Struct for app version object
 */
export interface AppVersion {
	id: number;
	platform: string;
	code: string;
	release_notes: string;
	force_upgrade: string | boolean;
	publish_date: string;
}