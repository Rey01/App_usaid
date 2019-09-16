import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TikectsService } from './service/tikects.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public ticketsServicesService: TikectsService,
  ) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.ticketsServicesService.createdatabase().then(()=>{
        this.opentabs( splashScreen );
      }).catch(e => {
        console.log(e);
      });
    });
  }
  public opentabs(splashScreen: SplashScreen){
    this.splashScreen.hide();
  }
}
