import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { MultSortPipe } from '../pipes/mult-sort.pipe'

@Injectable()
export class MultSortInterceptor implements NestInterceptor {
  private multiSortPipe = new MultSortPipe()

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()

    if (req.query && req.query.sort) {
      try {
        req.query.sort = this.multiSortPipe.transform(req.query.sort)
      } catch (error) {}
    }

    return next.handle()
  }
}
