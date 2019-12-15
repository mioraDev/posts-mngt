import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'posts', pathMatch: 'full' },
    { path: 'posts', component: PostListComponent },
    { path: 'user/:id', component: UserDetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
