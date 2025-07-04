import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      'x-api-key': environment.X_API_KEY,
    },
  });

  return next(authReq);
};
