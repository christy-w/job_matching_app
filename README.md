
Last Updated: 3 Nov 2016 by Michael Chan


## JuicyLauncher 2

Base project setup on top of [Ionic 2](http://ionicframework.com/docs/v2/) written in [TypeScript](http://www.typescriptlang.org/) language. 

This repo aims for internal use within Juicyapp Limited at this moment, and integrate well with [JuicyLauncher 2 Web](https://gitlab.com/juicyapp/juicylauncher2_web) to provide common features for different app projects. 

After Ionic 2 stable version is launched, more sample code will be implemented in a separate repo - [JuicyLauncher 2 Demo](https://gitlab.com/juicyapp/juicylauncher2_app_demo).


### Features

JuicyLauncher 2 provides codebase from Ionic 2 app, plus core files to extends features include:

- BaseApp class (to be inherited from MyApp)
- BasePage class (to be inherited from page components)
- BaseService class (to be inherited from service classes which require API calls)
- Localization setup for multilingual App (using [ng2-translate](https://github.com/ocombe/ng2-translate))
- Config class to store values for quick app configuration
- Utils class to provide shortcut functions which allow avoidance of repeated dependencies from pages/components
- Preload third-party libraries:
    - [Lodash](https://lodash.com/) for utility functions
    - [Moment.js](http://momentjs.com/)) for date/time manipulation and formatting
- Preload plugins from [Ionic Native](https://ionicframework.com/docs/v2/native/):
    - [App Version](https://ionicframework.com/docs/v2/native/app-version/) for version checking logic
    - [Google Analytics](https://ionicframework.com/docs/v2/native/google-analytics/) for tracking views
    - [Network](https://ionicframework.com/docs/v2/native/network/) for checking connection
    - [OneSignal](https://ionicframework.com/docs/v2/native/onesignal/) for push notifications
    - [ThemeableBrowser](https://ionicframework.com/docs/v2/native/themeablebrowser/) for customizable in-app browser
- Sample scripts to build Android Signed APK before publishing

More features will be developed in future for better code reuse, productivity and ease of maintenance. 


### Core Files

These files will be updated from [JuicyLauncher 2 Repo](https://gitlab.com/juicyapp/juicylauncher2_app), which aims at reusable code and reduce common implementation. 

Developers should avoid changing these files so as to maintain smooth upgrade for each project.

- /scripts/: Sample scripts to generate signed Android APK for publishing
- /src/core/
    - components/: Angular 2 Components
    - pipes/: Angular 2 Pipes
    - providers/: Angular 2 Directives
        - utils.ts: Utils class for shortcut functions
    - base-app.ts: Base class for MyApp
    - base-page.ts: Base class for page components
    - base-service.ts: Base class for service classes which require API calls


### Project Files

These files should be changed according to project requirements. 

- /src/app/: Ionic 2 App files
    - app.html: Basic App HTML structure
    - app.scss: Global styles
    - app.component.ts: MyApp class (extends from BaseApp)
    - app.module.ts: Define dependencies of the App
- /src/assets/: App asset files
    - i18n/: Localization files
- /src/components/: Ionic 2 components
- /src/models/: customly defined classes
- /src/pages/: Ionic 2 page components
- /src/providers/: Ionic 2 providers
    - api-service/: ApiService class (extends from BaseService) which should link to endpoints from JuicyLauncher 2 Web
- /src/theme/: Theme files which contains common variables, override Ionic 2 styles, etc. 
- /src/config.ts: Global constants and configuration values

**Do NOT** update the /www/ folder directly, since it will update everytime when the project is bundles by Ionic Cli. 


### Setup

Before app development on top of JuicyLauncher 2, developers may need to check the follow setup procedure first:

1. Setup Node.js (prefer using [Node Version Manager](https://github.com/creationix/nvm))
2. Use npm to install **cordova**, **ionic**, **typescript** (for iOS development - require **ios-deploy**)
3. Git clone this repo
4. Run **npm install** and **ionic state restore** inside the repo folder
5. By default, JuicyLauncher 2 includes version checking logic which requires endpoints from **JuicyLauncher 2 Web**, so please make sure the ApiService class has linked to the correct website accordingly
6. Try **ionic serve** and see if the app works well
7. If everything is fine, use **ionic run android** or **ionic build ios** to test on real devices


At the time of writing, JuicyLauncher 2 works well under below environment:

- Node.js: 6.9.1 LTS
- Cordova Cli: 6.0.0 (6.4.0 will have issues building APK)
- Ionic Cli: 2.1.4
- Typescript: 2.0.6
- Node Modules:
    - ionic-angular: 2.0.0-rc.1
    - ionic-native: 2.2.6
    - ionicons: 3.0.0
    - lodash: 4.16.5
    - moment: 2.15.2
    - ng2-translate: 3.2.0
    - @ionic/app-scripts: 0.0.39
    - typescript: 2.0.6


### Resources & Tutorials

- Ionic 2 Documentation: http://ionicframework.com/docs/v2/
- Ionic Native: https://github.com/driftyco/ionic-native/
- TypeScript: http://www.typescriptlang.org/
- Awesome Ionic 2: https://github.com/candelibas/awesome-ionic2


### Recommended Blogs for Hybrid Apps

- http://gonehybrid.com/
- http://www.joshmorony.com/category/ionic-tutorials/
- http://www.gajotres.net/
- https://www.thepolyglotdeveloper.com/category/apache-cordova-2/
