import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

    displayedColumns = ['user', 'title', 'body'];
    dataSource: MatTableDataSource<Post> = new MatTableDataSource<Post>([]);
    resultsLength = 0;
    isLoading = true;
    hasError = false;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(private postService: PostService, private router: Router) {

    }

    ngOnInit() {
        // get list of post
        this.postService.getPostsWithUsers()
            .subscribe((posts: Post[]) => {
                this.dataSource = new MatTableDataSource<any>(posts);
                this.resultsLength = posts.length;
                // set page index
                this.paginator.pageIndex = this.postService.pageIndex;
                this.dataSource.paginator = this.paginator;
                this.isLoading = false;
            }, (error) => {
                this.hasError = true;
                this.isLoading = false;
            });
    }

    showUserDetails(id: number) {
        // redirect to the user detail
        this.router.navigate(['user', id]);
        this.postService.pageIndex = Number(this.paginator.pageIndex);
    }
}
