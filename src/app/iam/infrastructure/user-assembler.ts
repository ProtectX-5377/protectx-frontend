import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import { User } from '../domain/model/user.entity';
import { UserResource, UsersResponse } from './users-response';

export class UserAssembler implements BaseAssembler<User, UserResource, UsersResponse> {
    /**
     * Converts a UsersResponse to an array of User entities.
     * @param response - The API response containing categories.
     * @returns An array of User entities.
     */
    toEntitiesFromResponse(response: UsersResponse): User[] {
    return response.users.map(resource => this.toEntityFromResource(resource as UserResource));
    }

    /**
     * Converts a UserResource to a User entity.
     * @param resource - The resource to convert.
     * @returns The converted User entity.
     */
    toEntityFromResource(resource: UserResource): User {
    return new User({
        id: resource.id,
        name: resource.name,
        username: resource.username,
        password: resource.password,
        email: resource.email
    });
    }

    /**
     * Converts a User entity to a UserResource.
     * @param entity - The entity to convert.
     * @returns The converted UserResource.
     */
    toResourceFromEntity(entity: User): UserResource {
    return {
        id: entity.id,
        name: entity.name,
        username: entity.username,
        password: entity.password,
        email: entity.email

    } as UserResource;
    }
}
