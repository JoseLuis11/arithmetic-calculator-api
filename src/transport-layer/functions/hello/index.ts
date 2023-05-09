import { handlerPath } from '@utils/handler-resolver';
import { HttpMethods } from '../../enums/httpMethods';
import { versions } from '../../constants/versions';

const { V1 } = versions;

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: HttpMethods.GET,
        path: `/${V1}/hello`
      },
    },
  ],
};
