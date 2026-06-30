import { prisma } from './prisma';
import { services as staticServices } from '../data/services';

const staticProjects = [
  { name: "Idemitsu Lube Pakistan Dealers Meet 2026", sector: "Lubricants & Events", logo: "idemitsu.com.pk", youtubeId: "3fMrYlwwfYI", desc: "Idemitsu Lube Pakistan Private Limited Dealers Meet 2026 in Sheikhupura, showcasing corporate excellence and dealer engagement events." },
  { name: "BMW Dewan Motors (Grand Opening)", sector: "Luxury Automotive", logo: "dewanmotors.com.pk", youtubeId: "g9eQ8jU-wJg", desc: "Grand opening of BMW by Dewan Motors, showcasing premium brand positioning and elite customer engagement events." },
  { name: "Dewan Motors MINI (Launching Ceremony)", sector: "Luxury Automotive", logo: "dewanmotors.com.pk", youtubeId: "kCUwvT6nokc", desc: "Official MINI launching ceremony by Dewan Motors, highlighting premium style and brand innovation." },
  { name: "Young's Food", sector: "FMCG Campaign", logo: "youngsfood.com", youtubeId: "ntIAakOpHr4", desc: "Engaging digital content and recipe series designed to build community." },
  { name: "Chase Up", sector: "Retail Marketing", logo: "chaseup.com.pk", youtubeId: "68bC80ZdzfY", desc: "Targeted seasonal promotional campaigns that resulted in record-breaking sales." },
  { name: "GFS Builders", sector: "Real Estate & TVC", logo: "gfsbuilders.com.pk", youtubeId: "WoAeLUmc3xo", desc: "Extensive real estate marketing, including TVC production and 3D visualization." },
  { name: "Diners", sector: "Apparel Marketing", logo: "diners.com.pk", youtubeId: "eWxt66xPk-U", desc: "Premium menswear catalog shoots and targeted performance marketing." },
  { name: "Oxford", sector: "E-commerce", logo: "oxford.com.pk", youtubeId: "fV97GrCtuYc", desc: "E-commerce optimization and paid social scaling to increase transactions." },
  { name: "Imtiaz Super Market", sector: "Retail Giant", logo: "imtiaz.com.pk", youtubeId: "4nAkivqPt1U", desc: "Mega-store launch event management and widespread OOH advertising." },
  { name: "Sunridge", sector: "Food & Agriculture", logo: "sunridgefoods.com", youtubeId: "6_x2Gy7m0Zk", desc: "Nationwide health awareness campaigns and premium packaging rollout." },
  { name: "Sumsum Group", sector: "Builders & Developers", logo: "sumsumgroup.com", youtubeId: "ZPCBua_tSz8", desc: "Comprehensive brand identity and property showcase campaigns." },
  { name: "HMR Waterfront", sector: "Luxury Real Estate", logo: "hmrwaterfront.com", youtubeId: "R1Xg_HQ7hUc", desc: "Exclusive launch event and premium digital branding for waterfront living." },
  { name: "Honda Motorcycles", sector: "Automotive", logo: "atlashonda.com.pk", youtubeId: "In2AcIr-jMY", desc: "Dynamic product launch campaigns and interactive digital ads for new models." },
  { name: "Sindh Police", sector: "Public Service", logo: "sindhpolice.gov.pk", youtubeId: "d2T9vqyqngQ", desc: "Public awareness campaigns and official communication strategy design." }
];

export async function seedDatabase() {
  try {
    // 1. Seed Services
    const serviceCount = await prisma.service.count();
    if (serviceCount === 0) {
      console.log('Seeding database: services...');
      for (const service of staticServices) {
        await prisma.service.create({
          data: {
            slug: service.slug,
            number: service.number,
            title: service.title,
            shortTitle: service.shortTitle,
            tagline: service.tagline,
            description: service.description,
            image: service.image,
            images: service.images ? JSON.stringify(service.images) : null,
            features: service.features ? JSON.stringify(service.features) : null,
            whyChoose: service.whyChoose ? JSON.stringify(service.whyChoose) : null,
          }
        });
      }
      console.log('Seeding database: services completed successfully.');
    }

    // 2. Seed Projects
    const projectCount = await prisma.project.count();
    if (projectCount === 0) {
      console.log('Seeding database: projects...');
      for (const project of staticProjects) {
        await prisma.project.create({
          data: {
            name: project.name,
            sector: project.sector,
            logo: project.logo,
            youtubeId: project.youtubeId,
            desc: project.desc,
          }
        });
      }
      console.log('Seeding database: projects completed successfully.');
    }

    // 3. Seed Default Popup Settings
    const settingCount = await prisma.setting.count();
    if (settingCount === 0) {
      console.log('Seeding database: default popup setting...');
      await prisma.setting.create({
        data: {
          key: 'active_popup_video',
          value: '/AdPulse 5 Years Celebration.mp4'
        }
      });
      console.log('Seeding database: default popup setting completed successfully.');
    }

  } catch (error) {
    console.error('Database seeding failed:', error);
  }
}
