import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Subscribers from './collections/Subscribers';
import Lists from './collections/Lists';
import Campaigns from './collections/Campaigns';
import Templates from './collections/Templates';

export default buildConfig({
  serverURL: process.env.PAYLOAD_APP_URL,
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Subscribers,
    Lists,
    Campaigns,
    Templates,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
