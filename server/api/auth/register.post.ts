import { prisma } from "~~/db";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { name, surname, email, phone, password, is_item_owner } =
    await readBody(event);

  // Check if all fields are present
  if (
    !name ||
    !surname ||
    !email ||
    !phone ||
    !password ||
    is_item_owner === undefined
  ) {
    prisma.$disconnect();

    return {
      statusMessage: "All fields are required",
      statusCode: 500,
      success: false,
    };
  }

  // Check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    // Disconnect Prisma
    prisma.$disconnect();

    return {
      statusCode: 500,
      statusMessage: `The user with email "${email}" already exists`,
      success: false,
    };
  } else {
    // Successfully login

    // Hash password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const createUser: any = await prisma.user.create({
      data: {
        name: name,
        surname: surname,
        email: email,
        phone: phone,
        password: hash,
        is_item_owner: is_item_owner,
        salt: salt,
        last_login_ip_address: "",
        last_logged_in_at: new Date(),
        current_logged_in_at: new Date(),
      },
    });

    // Remove the password and salt from the object
    delete createUser.password;
    delete createUser.salt;

    // Disconnect Prisma
    prisma.$disconnect();

    // Add success attributes to the object
    createUser.success = true;

    return {
      success: true,
      statusMessage: `Successfully registered`,
      statusCode: 200,
      data: createUser,
    };
  }
});
