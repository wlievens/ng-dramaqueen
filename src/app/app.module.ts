import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularResizedEventModule} from 'angular-resize-event';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DqCubeComponent} from './dq-cube/dq-cube.component';
import {DqGroupComponent} from './dq-group/dq-group.component';
import {DqLightAmbientComponent} from './dq-light-ambient/dq-light-ambient.component';
import {DqLightPointComponent} from './dq-light-point/dq-light-point.component';
import {DqSceneComponent} from './dq-scene/dq-scene.component';
import {DqSphereComponent} from './dq-sphere/dq-sphere.component';
import { DqGridComponent } from './dq-grid/dq-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    DqCubeComponent,
    DqGroupComponent,
    DqLightAmbientComponent,
    DqLightPointComponent,
    DqSceneComponent,
    DqSphereComponent,
    DqGridComponent,
  ],
  imports: [
    AngularResizedEventModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
