import { Alert } from '../domain/model/alert.entity';
import { AlertResource } from './alert-response';

export class AlertAssembler {

  toEntityFromResource(resource: AlertResource): Alert {
    return {
      id: resource.id,
      type: resource.type,
      message: resource.message,
      location: resource.location,
      date: resource.date,
      time: resource.time,
      severity: resource.severity
    };
  }

  toResourceFromEntity(entity: Alert): AlertResource {
    return {
      id: entity.id,
      type: entity.type,
      message: entity.message,
      location: entity.location,
      date: entity.date,
      time: entity.time,
      severity: entity.severity
    };
  }
}
