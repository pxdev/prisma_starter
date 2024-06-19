import { createJwtToken } from "~~/jwt";
import { prisma } from "~~/db";
import bcrypt from "bcrypt";
const moduleName = "User";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  //Check if the user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    // Check if the password hash matched
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      //Successfully login

      //Create a JWT token
      const token = await createJwtToken();

      setCookie(event, "token", token);

      const lastLoginIpAddress =
        (
          event.req.headers["x-forwarded-for"] as string | undefined
        )?.toString() || "127.0.0.1";

      const updateUser: any = await prisma.user.update({
        where: {
          email,
        },
        data: {
          last_login_ip_address: lastLoginIpAddress,
          last_logged_in_at: new Date(),
        },
      });

      // Remove the password and salt from the object
      delete updateUser.password;
      delete updateUser.salt;

      // Store encrypted user data in cookie
      setCookie(event, "user", JSON.stringify(updateUser));

      // Disconnect Prisma
      prisma.$disconnect();

      //Add token and success attributes to the object
      updateUser.token = token;

      return {
        statusCode: 200,
        success: true,
        statusMessage: `Successfully logged in`,
        data: updateUser,
      };
    } else {
      return {
        statusCode: 500,
        success: false,
        statusMessage: `The user with email "${email}" does not exist or the password does not match`,
      };
    }
  } else {
    // Disconnect Prisma
    prisma.$disconnect();

    return {
      statusCode: 500,
      statusMessage: `The user with email ${email} does not exist or the password does not match`,
      success: false,
    };
  }
});
