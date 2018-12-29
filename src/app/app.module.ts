import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule, MomentDateAdapter, MomentDateModule} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_LOCALE, MatButtonModule, MatDialogModule, MatIconModule, MatNativeDateModule, MatSnackBarModule, MAT_DATE_FORMATS} from '@angular/material';
import {TranslateModule, TranslateStore} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {HomeModule} from './main/home/home.module';
import {AuthGuard} from './guards/auth.guard';
import {AuthenticationService} from './services/authentication.service';
import {LocalStoreManagerService} from './services/local-store-manager.service';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {environment} from '../environments/environment';
import * as Raven from 'raven-js';
import {HttpCacheService} from './services/http-cache.service';
import {DialogConfirmComponent} from './layout/dialogs/dialog-confirm/dialog-confirm';
import {DialogAlertComponent} from './layout/dialogs/dialog-alert/dialog-alert';
import {SelectivePreloadingStrategy} from './adapter/selective-preloading-strategy';
import {ShareService} from './services/share.service';
import {SettingService} from './services/setting.service';
import {CommonModule} from '@angular/common';
import {FuseSplashScreenService} from '../@fuse/services/splash-screen.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './services/user.service';

export class RavenErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        if (environment.production) {
            Raven.setExtraContext({data: JSON.stringify(err)});
            Raven.captureException(err.toString());
        }
    }
}

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: 'app/main/auth/auth.module#AuthModule'
    },
    {
        path: 'users',
        loadChildren: 'app/main/users/users.module#UsersModule',
        canLoad: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

const Routing: ModuleWithProviders = RouterModule.forRoot(
    appRoutes, {
        enableTracing: environment.production ? false : true,
        preloadingStrategy: SelectivePreloadingStrategy,
        useHash: true
    },
);

export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MM/YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    declarations: [
        AppComponent,
        DialogConfirmComponent,
        DialogAlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        Routing,
        MomentDateModule,

        TranslateModule,

        // Material moment date module
        MatMomentDateModule,
        MatNativeDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        MatSnackBarModule,
        MatDialogModule,

        // App modules
        LayoutModule,
        HomeModule

    ],
    entryComponents: [
        DialogConfirmComponent,
        DialogAlertComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }, {
        provide: ErrorHandler,
        useClass: RavenErrorHandler
    },
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
        AuthGuard,
        AuthenticationService,
        LocalStoreManagerService,
        HttpCacheService,
        UserService,
        TranslateStore,
        SelectivePreloadingStrategy,
        ShareService,
        FuseSplashScreenService,

        SettingService,
    ]
})
export class AppModule {
}
