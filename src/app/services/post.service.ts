import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Post } from '../models/post';
@Injectable({
    providedIn: 'root'
})
export class PostService {

    pageIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
    constructor(private httpClient: HttpClient) { }

    getPostsWithUsers(): Observable<Post[]> {
        return forkJoin(
            // get list of post and get list of user at the same time
            this.getPosts(),
            this.getUsers()
        ).pipe(
            map(([posts, users]) =>
                // get user for each post
                posts.map(post => {
                    const user = users.find(u => u.id === post.userId);
                    if (user) {
                        // fill user post
                        post.user = {
                            id: user.id,
                            name: user.name,
                            username: user.username
                        };
                        return post;
                    }
                    return post;
                })
            ),
            catchError(this.manageError),
        );
    }

    /**
     * Get list of post
     */
    getPosts(): Observable<any> {
        return this.httpClient.get(`${environment.apiUrl}/posts`).pipe(
            catchError(this.manageError),
        );
    }

    /**
     * Get list of post
     */
    getUsers(): Observable<any> {
        return this.httpClient.get(`${environment.apiUrl}/users`)
            .pipe(
                catchError(this.manageError),
        );
    }

    getUserById(id: number): Observable<any> {
        return this.httpClient.get(`${environment.apiUrl}/users/${id}`).pipe(
            catchError(this.manageError),
        );
    }
    /** Manage error from API
     */
    manageError(error: any) {
        console.error(error);
        return throwError(error);
    }

    get pageIndex(): any {
        return this.pageIndex$.getValue();
    }

    set pageIndex(value: any) {
        this.pageIndex$.next(value);
    }
}
