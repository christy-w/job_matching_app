
Last Updated: 12 July 2017 by Michael Chan


## JuicyLauncher 2

Base project setup on top of [Ionic 3](http://ionicframework.com/docs/) written in [TypeScript](http://www.typescriptlang.org/) language. 

This repo aims for internal use within Juicyapp Limited at this moment, and integrate well with [JuicyLauncher 2 Web](https://gitlab.com/juicyapp/juicylauncher2_web) to provide common features for different app projects. 

After Ionic 3 stable version is launched, more sample code will be implemented in a separate repo - [JuicyLauncher 2 Demo](https://gitlab.com/juicyapp/juicylauncher2_app_demo).


### Features

JuicyLauncher 2 provides codebase from Ionic 3 app, plus core files to extends features include:

- BaseApp class (to be inherited from MyApp)
- BasePage class (to be inherited from page components)
- BaseService class (to be inherited from service classes which require API calls)
- Localization setup for multilingual App (using [ngx-translate](https://github.com/ngx-translate/core))
- Config class to store values for quick app configuration
- Utils class to provide shortcut functions which allow avoidance of repeated dependencies from pages/components
- Preload third-party libraries:
    - [Lodash](https://lodash.com/) for utility functions
    - [Moment.js](http://momentjs.com/) for date/time manipulation and formatting
- Preload plugins from [Ionic Native](https://ionicframework.com/docs/native/):
    - [App Version](https://ionicframework.com/docs/native/app-version/) for version checking logic
    - [Google Analytics](https://ionicframework.com/docs/native/google-analytics/) for tracking views
    - [Network](https://ionicframework.com/docs/native/network/) for checking connection
    - [OneSignal](https://ionicframework.com/docs/native/onesignal/) for push notifications
    - [ThemeableBrowser](https://ionicframework.com/docs/native/themeablebrowser/) for customizable in-app browser
- Sample scripts to build Android Signed APK before publishing

More features will be developed in future for better code reuse, productivity and ease of maintenance. 


### Core Files

These files will be updated from [JuicyLauncher 2 Repo](https://gitlab.com/juicyapp/juicylauncher2_app), which aims at reusable code and reduce common implementation. 

Developers should avoid changing these files so as to maintain smooth upgrade for each project.

- **/scripts/**: Sample scripts to generate signed Android APK for publishing
- **/src/core/**
    - **components/**: Angular 4 Components
    - **pipes/**: Angular 4 Pipes
    - **providers/**: Angular 4 Directives
        - **utils.ts**: Utils class for shortcut functions
    - **base-app.ts**: Base class for MyApp
    - **base-page.ts**: Base class for page components
    - **base-service.ts**: Base class for service classes which require API calls


### Project Files

These files should be changed according to project requirements. 

- **/src/app/**: Ionic 3 App files
    - **app.html**: Basic App HTML structure
    - **app.scss**: Global styles
    - **app.component.ts**: MyApp class (extends from BaseApp)
    - **app.module.ts**: Define dependencies of the App
- **/src/assets/**: App asset files
    - **i18n/**: Localization files
- **/src/components/**: Ionic 3 components
- **/src/models/**: customly defined classes
- **/src/pages/**: Ionic 3 page components
- **/src/providers/**: Ionic 3 providers
    - **api**: Api class (extends from BaseService) which should link to endpoints from JuicyLauncher 2 Web
- **/src/theme/**: Theme files which contains common variables, override Ionic 3 styles, etc. 
- **/src/config.ts**: Global constants and configuration values

**Do NOT** update the /www/ folder directly, since it will update everytime when the project is bundles by Ionic Cli. 


### Setup

Before app development on top of JuicyLauncher 2, developers may need to check the follow setup procedure first:

1. Setup Node.js (prefer using [Node Version Manager](https://github.com/creationix/nvm))
2. Install core node programs globally: **npm install -g cordova ionic typescript** (for iOS development - require **ios-deploy**)
3. Git clone this repo
4. Run **npm install** inside the repo folder (Note: we **don't** need to execute ionic state restore since the default plugins have fixed version in config.xml)
5. By default, JuicyLauncher 2 includes version checking logic which requires endpoints from **JuicyLauncher 2 Web**, so please make sure the ApiService class has linked to the correct website accordingly
6. Try **ionic serve** and see if the app works well
7. If everything is fine, use **ionic run android** or **ionic build ios** to test on real devices
8. For production builds, use **ionic run android --prod** or **ionic build ios --prod** instead

At the time of writing, JuicyLauncher 2 works well under below environment:

- Node.js: 6.11.0 LTS
- Cordova Cli: 7.0.1
- Ionic Cli: 3.5.0
- Node Modules:
    - ionic-angular: 3.5.3
    - ionic-native: 3.12.1
    - ionicons: 3.0.0
    - lodash: 4.17.4
    - moment: 2.18.1
    - ngx-translate: 6.0.1
    - ngx-translate/http-loader: 0.0.3
    - @ionic/app-scripts: 2.0.2
    - typescript: 2.3.4


### Resources & Tutorials

- Ionic 3 Documentation: http://ionicframework.com/docs/
- Ionic Native: https://github.com/driftyco/ionic-native/
- TypeScript: http://www.typescriptlang.org/
- Awesome Ionic 2: https://github.com/candelibas/awesome-ionic2


### Recommended Blogs for Hybrid Apps

- http://gonehybrid.com/
- http://www.joshmorony.com/category/ionic-tutorials/
- http://www.gajotres.net/
- https://www.thepolyglotdeveloper.com/category/apache-cordova-2/
