import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Category: a.model({
    name: a.enum(['MOBILES', 'TECHNOLOGY', 'TIPS_AND_TRICKS', 'LIFESTYLE', 'HEALTH_AND_WELLNESS', 'ENTERTAINMENT', 'SPORTS']),
    posts: a.hasMany('Post', 'categoryId'),
  })
    .authorization(allow => [allow.guest().to(['read'])]),

  Post:
    a.model({
      title: a.string().required(),
      slug: a.string().required(), // SEO-friendly URL
      categoryId: a.id(),
      category: a.belongsTo('Category', 'categoryId'),
      filterTag: a.enum(['LATEST', 'POPULAR']), // For filtering
      author: a.string(),
      sections: a.hasMany('ContentSection', 'postId'),
    })
      .authorization((allow) => [allow.guest().to(['read'])]),

  ContentSection: a.model({
    postId: a.id(),
    post: a.belongsTo('Post', 'postId'),
    imgUrl: a.string(),
    subheading: a.string(), // Optional image
    paragraph: a.string().required(),
    order: a.integer(), // For sequencing blocks
  })
    .authorization((allow) => [allow.guest().to(['read'])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
