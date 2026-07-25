import bcrypt from "bcrypt";

import { eq } from "drizzle-orm";

import { db } from "../../db";
import { users } from "../../db/schema/user";

import type { RegisterInput, LoginInput } from "./auth.validation";
import type { AuthResponse, JwtPayload } from "./auth.types";
import { ValidationError } from "../../common/errors/validation-error";
import { AuthorizationError } from "../../common/errors/authorization-error";
import { generateAccessToken } from "./auth.utils";

export class AuthService {
  async register(data: RegisterInput): Promise<AuthResponse> {
    const existingUser = (
      await db.select().from(users).where(eq(users.email, data.email))
    )[0];
    if (existingUser) {
      throw new ValidationError("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const insertedUsers = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        passwordHash: hashedPassword,
      })
      .returning();

    const user = insertedUsers[0];

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    };
  }
  async login(data: LoginInput): Promise<AuthResponse> {
    const user = (
      await db.select().from(users).where(eq(users.email, data.email))
    )[0];

    if (!user) {
      throw new AuthorizationError("Invalid email or password");
    }
    const passwordMatched = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );
    if (!passwordMatched) {
      throw new AuthorizationError("Invalid email or password");
    }
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    };
  }
  async me(userId: string) {
    const user = (await db.select().from(users).where(eq(users.id, userId)))[0];
    if (!user) {
      throw new AuthorizationError("Authenticated user not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
