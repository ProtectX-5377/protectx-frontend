import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { User } from '../domain/model/user.entity';
import { UsersApiEndpoint } from './users-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IamApi extends BaseApi {

  private readonly usersEndpoint: UsersApiEndpoint;

  constructor(private http: HttpClient) {
    super();
    this.usersEndpoint = new UsersApiEndpoint(this.http);
  }
  
  /**
   * Retrieves all users from the API.
   * @returns An Observable for an array of Category objects.
   */
  getUsers(): Observable<User[]> {
    return this.usersEndpoint.getAll();
  }

  /**
 * Retrieves a single user by ID.
 * @param id - The ID of the user.
 * @returns An Observable of the User object.
 */
  getUser(id: number): Observable<User> {
    return this.usersEndpoint.getById(id);
  }

  /**
 * Creates a new user.
 * @param category - The user to create.
 * @returns An Observable of the created user object.
 */
  createUser(user: User): Observable<User> {
    return this.usersEndpoint.create(user);
}

/**
 * Updates an existing user.
 * @param user - The user to update.
 * @returns An Observable of the updated User object.
 */
updateUser(user: User): Observable<User> {
  return this.usersEndpoint.update(user, user.id);
}

/**
 * Deletes a user by ID.
 * @param id - The ID of the user to delete.
 * @returns An Observable of void.
 */
deleteUser(id: number): Observable<void> {
  return this.usersEndpoint.delete(id);
}
  
}
