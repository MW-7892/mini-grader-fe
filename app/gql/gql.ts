/* eslint-disable */
import * as types from "./graphql"
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  "\n  query ProfileAuth {\n    me {\n      id\n      name\n      role\n    }\n  }\n":
    types.ProfileAuthDocument,
  "\n  query Tasks {\n    tasks(\n      permissions: [read, write]\n    ) {\n      display_id\n      name\n      full_name\n      time_limit\n      statement\n      memory_limit\n      is_public\n    }\n  }\n":
    types.TasksDocument,
  "\n  mutation DeleteTask($id: String!) {\n    deleteTask(display_id: $id) {\n      display_id\n    }\n  }\n":
    types.DeleteTaskDocument,
  "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n":
    types.LoginDocument,
  '\n  mutation RegisterUser($username: String!, $password: String!, $email: String!) {\n    createUser(input: { name: $username, email: $email, password: $password, role: "user" }) {\n      id\n      name\n      email\n    }\n  }\n':
    types.RegisterUserDocument,
  "\n  mutation CreateTask(\n    $name: String!\n    $full_name: String!\n    $time_limit: Int!\n    $memory_limit: Int!\n    $is_public: Boolean!\n  ) {\n    createTask(\n      input: {\n        name: $name\n        full_name: $full_name\n        time_limit: $time_limit\n        memory_limit: $memory_limit\n        is_public: $is_public\n      }\n    ) {\n      display_id\n      name\n      full_name\n      statement\n      time_limit\n      memory_limit\n      is_public\n    }\n  }\n":
    types.CreateTaskDocument,
  "\n  query Dashboard {\n    me {\n      id\n      name\n      email\n      role\n    }\n  }\n":
    types.DashboardDocument,
  "\n  mutation EditTask(\n    $id: String!\n    $name: String\n    $full_name: String\n    $statement: String\n    $time_limit: Int\n    $memory_limit: Int\n    $is_public: Boolean\n  ) {\n    updateTask(\n      input: {\n        display_id: $id\n        name: $name\n        full_name: $full_name\n        statement: $statement\n        time_limit: $time_limit\n        memory_limit: $memory_limit\n        is_public: $is_public\n      }\n    ) {\n      display_id\n      name\n      full_name\n      statement\n      time_limit\n      memory_limit\n      is_public\n    }\n  }\n":
    types.EditTaskDocument,
  "\n  query TaskEditData($id: String!) {\n    task(display_id: $id) {\n      display_id\n      name\n      full_name\n      statement\n      time_limit\n      memory_limit\n      is_public\n    }\n  }\n":
    types.TaskEditDataDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ProfileAuth {\n    me {\n      id\n      name\n      role\n    }\n  }\n",
): (typeof documents)["\n  query ProfileAuth {\n    me {\n      id\n      name\n      role\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Tasks {\n    tasks(\n      permissions: [read, write]\n    ) {\n      display_id\n      name\n      full_name\n      time_limit\n      statement\n      memory_limit\n      is_public\n    }\n  }\n",
): (typeof documents)["\n  query Tasks {\n    tasks(\n      permissions: [read, write]\n    ) {\n      display_id\n      name\n      full_name\n      time_limit\n      statement\n      memory_limit\n      is_public\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteTask($id: String!) {\n    deleteTask(display_id: $id) {\n      display_id\n    }\n  }\n",
): (typeof documents)["\n  mutation DeleteTask($id: String!) {\n    deleteTask(display_id: $id) {\n      display_id\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n",
): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RegisterUser($username: String!, $password: String!, $email: String!) {\n    createUser(input: { name: $username, email: $email, password: $password, role: "user" }) {\n      id\n      name\n      email\n    }\n  }\n',
): (typeof documents)['\n  mutation RegisterUser($username: String!, $password: String!, $email: String!) {\n    createUser(input: { name: $username, email: $email, password: $password, role: "user" }) {\n      id\n      name\n      email\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateTask(\n    $name: String!\n    $full_name: String!\n    $time_limit: Int!\n    $memory_limit: Int!\n    $is_public: Boolean!\n  ) {\n    createTask(\n      input: {\n        name: $name\n        full_name: $full_name\n        time_limit: $time_limit\n        memory_limit: $memory_limit\n        is_public: $is_public\n      }\n    ) {\n      display_id\n      name\n      full_name\n      statement\n      time_limit\n      memory_limit\n      is_public\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateTask(\n    $name: String!\n    $full_name: String!\n    $time_limit: Int!\n    $memory_limit: Int!\n    $is_public: Boolean!\n  ) {\n    createTask(\n      input: {\n        name: $name\n        full_name: $full_name\n        time_limit: $time_limit\n        memory_limit: $memory_limit\n        is_public: $is_public\n      }\n    ) {\n      display_id\n      name\n      full_name\n      statement\n      time_limit\n      memory_limit\n      is_public\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Dashboard {\n    me {\n      id\n      name\n      email\n      role\n    }\n  }\n",
): (typeof documents)["\n  query Dashboard {\n    me {\n      id\n      name\n      email\n      role\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation EditTask(\n    $id: String!\n    $name: String\n    $full_name: String\n    $statement: String\n    $time_limit: Int\n    $memory_limit: Int\n    $is_public: Boolean\n  ) {\n    updateTask(\n      input: {\n        display_id: $id\n        name: $name\n        full_name: $full_name\n        statement: $statement\n        time_limit: $time_limit\n        memory_limit: $memory_limit\n        is_public: $is_public\n      }\n    ) {\n      display_id\n      name\n      full_name\n      statement\n      time_limit\n      memory_limit\n      is_public\n    }\n  }\n",
): (typeof documents)["\n  mutation EditTask(\n    $id: String!\n    $name: String\n    $full_name: String\n    $statement: String\n    $time_limit: Int\n    $memory_limit: Int\n    $is_public: Boolean\n  ) {\n    updateTask(\n      input: {\n        display_id: $id\n        name: $name\n        full_name: $full_name\n        statement: $statement\n        time_limit: $time_limit\n        memory_limit: $memory_limit\n        is_public: $is_public\n      }\n    ) {\n      display_id\n      name\n      full_name\n      statement\n      time_limit\n      memory_limit\n      is_public\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query TaskEditData($id: String!) {\n    task(display_id: $id) {\n      display_id\n      name\n      full_name\n      statement\n      time_limit\n      memory_limit\n      is_public\n    }\n  }\n",
): (typeof documents)["\n  query TaskEditData($id: String!) {\n    task(display_id: $id) {\n      display_id\n      name\n      full_name\n      statement\n      time_limit\n      memory_limit\n      is_public\n    }\n  }\n"]

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
