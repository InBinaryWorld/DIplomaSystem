import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/root/app.component';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModuleConfig } from "@ngx-translate/core/public_api";
import { AppRoutingModule } from "./app-routing.module";
import { LoginModule } from "../modules/login/login.module";
import { CoreModule } from "../core/core.module";
import { AppHeaderComponent } from "./components/header/app-header.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppLanguage } from "../core/models/app-language.model";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { SharedModule } from "../modules/shared/shared.module";
import { AdminModule } from "../modules/admin/admin.module";
import { StudentModule } from "../modules/student/student.module";
import { localStorageSync } from "ngrx-store-localstorage";
import { SessionFeatureName } from "../modules/login/store/session.reducer";
import { DeanModule } from "../modules/dean/dean.module";
import { LecturerModule } from "../modules/lecturer/lecturer.module";
import { CoordinatorModule } from "../modules/coordinator/coordinator.module";
import { DiplomaSectionModule } from "../modules/section/diploma-section.module";
import { ProgramCommitteeModule } from "../modules/commitee/program-committee.module";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const translateConfig: TranslateModuleConfig = {
  defaultLanguage: AppLanguage.POLISH,
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
}

const localStorageSyncReducer = localStorageSync({
  keys: [{ [SessionFeatureName]: ['sessionData', 'contextRole'] }],
  rehydrate: true
});

const metaReducers = [localStorageSyncReducer];


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(translateConfig),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, { metaReducers }),
    NgxSpinnerModule,
    SharedModule,
    CoreModule,
    LoginModule,
    AdminModule,
    StudentModule,
    DeanModule,
    LecturerModule,
    CoordinatorModule,
    DiplomaSectionModule,
    ProgramCommitteeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
