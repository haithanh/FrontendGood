import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../../guards/auth.guard';


const routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        //  canActivateChild: [AuthGuard],
        component: DashboardComponent
    }
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule
    ],
    exports: [],
    providers: []
})

export class HomeModule {
}
