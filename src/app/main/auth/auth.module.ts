import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {LoginComponent} from './login/login.component';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatChipsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule
} from '@angular/material';
import {AccountComponent} from './account/account.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgPipesModule} from 'ngx-pipes';
import {CalendarModule} from 'angular-calendar';


const routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'account',
        component: AccountComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent,
        AccountComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatTabsModule,
        MatIconModule,
        MatFormFieldModule,
        MatChipsModule,
        FlexLayoutModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
        NgPipesModule,
        CalendarModule,
        FuseSharedModule,
        TranslateModule

    ],
    exports: []
})

export class AuthModule {
}
