
## JuicyLauncher 2

Base project setup on top of Ionic 2 in TypeScript.

Demo usage can be found from separate repo - [JuicyLauncher 2 Demo](https://gitlab.com/juicyapp/juicylauncher2_app_demo).


### Core Files

These files will be updated from [JuicyLauncher 2 Repo](https://gitlab.com/juicyapp/juicylauncher2_app), which aims at reusable code and reduce common implementation. 

Colleagues should avoid changing these files so as to maintain smooth upgrade for each project.

- /app/core/components/: Angular 2 Components ([official doc](https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html))
- /app/core/directives/: Angular 2 Directives ([official doc](https://angular.io/docs/ts/latest/api/core/DirectiveMetadata-class.html))
- /app/core/pipes/: Angular 2 Pipes ([official doc](https://angular.io/docs/ts/latest/guide/pipes.html))
- /app/core/BaseApp.ts: Base class for Ionic 2 Application
- /app/core/BasePage.ts: Base class for Ionic 2 Pages
- /app/core/BaseService.ts: Base class for Ionic 2 Services


### Project Files

These files can be changed according to project requirements. 

- /app/pages/: Ionic Page components
- /app/theme/: Theme files in SCSS
- /app/app.ts: Ionic App class
- /app/config.ts: Global constants and configuration values


### Resources & Tutorials

* Ionic 2 Documentation: http://ionicframework.com/docs/v2/
* Ionic Native: https://github.com/driftyco/ionic-native/
* TypeScript: http://www.typescriptlang.org/
* Awesome Ionic 2: https://github.com/candelibas/awesome-ionic2
* Adding 3rd-party libraries (e.g. lodash) with typings: http://mhartington.io/post/ionic2-external-libraries/


### Recommended Blogs for Hybrid Apps

* http://gonehybrid.com/
* http://www.joshmorony.com/category/ionic-tutorials/
* http://www.gajotres.net/
* https://www.thepolyglotdeveloper.com/category/apache-cordova-2/
