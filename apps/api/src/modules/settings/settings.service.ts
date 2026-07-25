import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export class SettingsService {
  async getSettings(userId: string) {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      throw new Error("User not found");
    }

    return {
      ...user,

      theme: "light",

      notifications: true,
    };
  }

  async updateProfile(userId: string, input: { name: string }) {
    await db
      .update(users)
      .set({
        name: input.name,
      })
      .where(eq(users.id, userId));

    return this.getSettings(userId);
  }

  async updatePreferences(
    userId: string,
    input: {
      theme: "light" | "dark";

      notifications: boolean;
    },
  ) {
    return {
      ...(await this.getSettings(userId)),

      theme: input.theme,

      notifications: input.notifications,
    };
  }

  async changePassword(
    userId: string,
    input: {
      currentPassword: string;

      newPassword: string;
    },
  ) {
    console.log("Password updated requested", {
      userId,
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
    });

    return;
  }
}
