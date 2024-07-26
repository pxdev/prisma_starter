import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const cities = [
      { name: 'Riyadh', districts: ['Olaya', 'Al Malaz', 'Shemaysi'] },
      { name: 'Jeddah', districts: ['Al Balad', 'Al Salamah', 'Al Aziziyah'] },
      { name: 'Dammam', districts: ['Al Khobar', 'Al Olayya', 'Al Faisaliyah'] },
  ];
  for (const city of cities) {
      const createdCity = await prisma.city.create({
          data: {
              name: city.name,
              districts: {
                  create: city.districts.map((districtName) => ({ name: districtName })),
              },
          },
      });
   }

  // await prisma.user.create({
  //     data: {
  //         name: "Ahmed",
  //         surname: "Amin",
  //         email: "admin@admin.com",
  //         password: "p123321",
  //         phone: "01000000000",
  //         is_admin: true,
  //         is_item_owner: true,
  //     },
  // });
  //
  // await prisma.setting.create({
  //     data: {
  //       business_name: 'Demo Business',
  //       business_logo: 'https://example.com/logo.png',
  //       business_email: 'contact@demobusiness.com',
  //       business_phone: '123-456-7890',
  //       business_address: '123 Demo Street, Demo City, DC 12345',
  //       business_description: 'This is a demo business description.',
  //       business_meta_title: 'Demo Business Meta Title',
  //       business_meta_description: 'Demo business meta description for SEO purposes.',
  //       business_meta_keywords: 'demo, business, example',
  //       business_facebook: 'https://facebook.com/demobusiness',
  //       business_twitter: 'https://twitter.com/demobusiness',
  //       business_instagram: 'https://instagram.com/demobusiness',
  //       business_linkedin: 'https://linkedin.com/company/demobusiness',
  //       business_youtube: 'https://youtube.com/demobusiness',
  //       business_whatsapp: 'https://wa.me/1234567890',
  //       business_pinterest: 'https://pinterest.com/demobusiness',
  //       business_tiktok: 'https://tiktok.com/@demobusiness',
  //       business_snapchat: 'https://snapchat.com/add/demobusiness',
  //       business_github: 'https://github.com/demobusiness',
  //       business_google: 'https://google.com/demobusiness',
  //       location_latitude: 37.7749,
  //       location_longitude: -122.4194,
  //       location_zoom: 12,
  //       currency: 'USD',
  //       currency_symbol: '$',
  //       timezone: 'UTC',
  //       allow_agent_registration: true,
  //     }
  // });
  await prisma.ItemCategory.createMany({
      data: [
          {
              name: "Apartment",
              icon: "material-symbols:home-and-garden-outline-rounded",
          },
          {
              name:  "House",
              icon: "material-symbols:home-and-garden-outline-rounded",
          },
          {
              name: "Villa",
              icon: "material-symbols:home-and-garden-outline-rounded",
          },
          {
              name: "Office",
              icon: "material-symbols:home-and-garden-outline-rounded",
          },
          {
              name: "Shop",
              icon: "material-symbols:home-and-garden-outline-rounded",
          },
          {
              name: "Land",
              icon: "material-symbols:home-and-garden-outline-rounded",
          },
          {
              name: "Warehouse",
              icon: "material-symbols:home-and-garden-outline-rounded",
          },
          {
              name: "Building",
              icon: "material-symbols:home-and-garden-outline-rounded",
          },
          {
              name: "Hotel",
              icon: "material-symbols:home-and-garden-outline-rounded",
          },
          {
              name: "Farm",
              icon: "material-symbols:home-and-garden-outline-rounded",
          },
          {
              name: "Factory",
              icon: "material-symbols:home-and-garden-outline-rounded",
          },
          {
              name: "Other",
              icon: "material-symbols:home-and-garden-outline-rounded",
          }
      ]
  });
}

try {
  await seed();
  await prisma.$disconnect();
} catch (error) {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
}
