import { handlerPath } from '@utils/handlerResolver';
import { HttpMethods } from '../../enums/httpMethods';
import { versions } from '../../constants/versions';

const { V1 } = versions;

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: HttpMethods.POST,
        path: `/${V1}/run-migrations`
      },
    },
  ],
};
