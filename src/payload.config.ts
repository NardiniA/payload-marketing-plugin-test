import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Subscribers from './collections/Subscribers';

export default buildConfig({
  serverURL: process.env.PAYLOAD_APP_URL,
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Subscribers,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
