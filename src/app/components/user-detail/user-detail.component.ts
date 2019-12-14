import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../../models/user';
import { PostService } from './../../services/post.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

    user: User;
    isLoading = true;
    hasError = false;
    constructor(private route: ActivatedRoute, private router: Router, private postService: PostService) { }

    ngOnInit() {
        // get user from url params
        const user$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.postService.getUserById(Number(params.get('id')))
            ));
        user$.subscribe(user => {
            if (user) {
                this.user = user;
                this.isLoading = false;
            }
        }, (error) => {
            this.hasError = true;
            this.isLoading = false;
        });
    }
}
