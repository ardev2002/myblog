import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Post: a.model({
    title: a.string().required(),
    slug: a.string().required(), // SEO-friendly URL
    category: a.enum([
      'MOBILES',
      'TECHNOLOGY',
      'TIPS_AND_TRICKS',
      'LIFESTYLE',
      'HEALTH_AND_WELLNESS',
      'ENTERTAINMENT',
      'SPORTS',
    ]),
    author: a.string(),
    sections: a.hasMany('ContentSection', 'postSlug'),
  })
    .identifier(['slug'])
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['create', 'read', 'update', 'delete']),
    ]),

  ContentSection: a.model({
    postSlug: a.string(),
    post: a.belongsTo('Post', 'postSlug'),
    imgUrl: a.string(),
    subheading: a.string(),
    paragraph: a.string().required(),
    order: a.integer(),
  })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['create', 'read', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
  },
});
