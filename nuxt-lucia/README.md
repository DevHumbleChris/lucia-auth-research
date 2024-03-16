# Nuxt.js with Lucia Auth

This directory contains research and implementation of Lucia auth in a Nuxt.js application.

## Introduction

Lucia is an authentication library for your server that abstracts away the complexity of handling sessions. It works alongside your database to provide an API that's easy to use, understand, and extend. This research aims to explore the integration of Lucia auth into a Nuxt.js application.

## Getting Started

To get started with Lucia auth in your Nuxt.js project, follow the instructions below:

1. Clone this repository:

   ```bash
   git clone https://github.com/DevHumbleChris/lucia-auth-research.git
   ```

2. Navigate to the `nuxt-lucia` directory:

   ```bash
   cd nuxt-lucia
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the Nuxt.js server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Directory Structure

- `pages/`: Contains the pages of the Nuxt.js application.
  - `index.vue`: Main page of the application.
  - Other pages as needed.

- `prisma/`: Contains the prisma ORM settings for the application.
  - `db.ts`: Prisma Client configuration file for the application.
  - `schema.prisma` Contains Database Setup and Schema.

   ```typescript
   generator client {
      provider = "prisma-client-js"
   }

   datasource db {
      provider = "mysql"
      url      = env("DATABASE_URL")
   }

   model User {
      id           String        @id
      email        String?
      password String?
      oauthAccount OauthAccount?
      sessions     Session[]
      createdAt    DateTime      @default(now())
      updatedAt    DateTime      @updatedAt
   }

   model OauthAccount {
      providerId     String
      providerUserId String
      userId         String?  @unique
      user           User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
      createdAt      DateTime @default(now())
      updatedAt      DateTime @updatedAt

      @@unique([providerId, providerUserId])
      @@map("oauth_account")
   }

   model Session {
      id        String   @id
      userId    String
      expiresAt DateTime
      user      User     @relation(references: [id], fields: [userId], onDelete: Cascade)
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
   }

   ```

- `server/utils/auth.ts`: Lucia Auth Setup configuration file for the application file.

- `server/api/`: Contains the REST API of the Nuxt.js application.
  - `signin.post.ts`:  `/api/signin` signin API POST request to sign in users to the application.
  - `signup.post.ts`:  `/api/signup` signup API POST request to create account for the users of the application.
  - `signout.post.ts`:  `/api/signout` signout API POST request to sign out users in the application.

- `nuxt.config.ts`: Nuxt.js configuration file, including plugins and modules.

- `package.json`: Node.js package configuration file, including dependencies and scripts.

## Schema.prisma

### User Model

- `id`: A unique identifier for each user, defined as a String and marked with `@id`.
- `email`: A field to store the user's email address, marked with `String?` to indicate it's optional.
- `password`: A field to store the hashed password of the user, also marked as optional (`String?`).
- `oauthAccount`: A reference to the `OauthAccount` model, allowing users to have an associated OAuth account.
- `sessions`: An array of `Session` objects representing the sessions associated with the user.
- `createdAt`: A DateTime field marking when the user was created, with a default value set to the current timestamp using `@default(now())`.
- `updatedAt`: A DateTime field marking the last time the user object was updated, automatically updated with the current timestamp using `@updatedAt`.

### OauthAccount Model

- `providerId`: A field to store the OAuth provider's ID for the account.
- `providerUserId`: A field to store the user's ID provided by the OAuth provider.
- `userId`: A reference to the associated user's ID, marked as optional (`String?`) and unique (`@unique`) to ensure each user has at most one OAuth account.
- `user`: A reference to the `User` model, establishing a relationship between `User` and `OauthAccount` models. It's marked with `@relation` to specify the fields involved in the relationship, and `onDelete: Cascade` to specify that if the user is deleted, associated OAuth accounts should also be deleted.
- `createdAt`: A DateTime field marking when the OAuth account was created, with a default value set to the current timestamp using `@default(now())`.
- `updatedAt`: A DateTime field marking the last time the OAuth account was updated, automatically updated with the current timestamp using `@updatedAt`.
- `@@unique([providerId, providerUserId])`: Specifies a unique constraint ensuring that the combination of `providerId` and `providerUserId` is unique across all OAuth accounts.
- `@@map("oauth_account")`: Maps the model to a specific database table named "oauth_account".

### Session Model

- `id`: A unique identifier for each session.
- `userId`: A field to store the ID of the associated user.
- `expiresAt`: A DateTime field indicating when the session expires.
- `user`: A reference to the associated user, establishing a relationship between `Session` and `User` models.
- `createdAt`: A DateTime field marking when the session was created, with a default value set to the current timestamp using `@default(now())`.
- `updatedAt`: A DateTime field marking the last time the session was updated, automatically updated with the current timestamp using `@updatedAt`.

## Contributing

Contributions to this research project are welcome! If you have any insights, improvements, or additional implementations to share, feel free to open an issue or submit a pull request.

## Author

- **The Coding Montana**
  - Twitter: [@AmChrisKE](https://twitter.com/AmChrisKE)

## Lucia Documentation

For more information about Lucia auth, refer to the [Lucia Auth Documentation](https://lucia-auth.com/).

## License

This research project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
