import { AppVersionModel, AppConfigModel } from '.';

export interface InitModel {
    token: string;
    curr_version: string,
    latest_version: string;
    force_update: string | boolean;
    new_versions: AppVersionModel[];
    app_config: AppConfigModel;
}