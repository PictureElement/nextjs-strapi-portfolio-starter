## 1. Start Strapi

- `cd strapi`
- `npm install`
- `npm run develop`

## 2. Start Next.js

- `cd next`
- `npm install`
- `npm run dev`

# When connecting Strapi to a PostgreSQL database, the database user requires SCHEMA permissions. While the database admin has this permission by default, a new database user explicitly created for the Strapi application will not. This would result in a 500 error when trying to load the admin console.

To create a new PostgreSQL user with the SCHEMA permission, use the following steps:

## Step 1: Log in to PostgreSQL
psql -U postgres

## Step 2: Create a new database (if not already created)
CREATE DATABASE my_strapi_db_name;

## Step 3: Create a new user with a secure password
CREATE USER my_strapi_db_user WITH PASSWORD 'password';

## Step 4: Connect to the target database
\c my_strapi_db_name postgres

## Step 5: Grant schema privileges to the new user
GRANT ALL ON SCHEMA public TO my_strapi_db_user;




# transfer files securely over SSH.
scp /path/to/local/file username@remote_host:/path/to/remote/directory



# ssh root@xxx.xxx.xxx.xxx


# Upgrade Strapi to the latest version
npx @strapi/upgrade latest







# Installing Strapi.

1. Choose the Strapi image for Coolify
2. Change Strapi Node Env. to production
3. Edit Compose File.
Under volumes change: - 'strapi-uploads:/opt/app/public/uploads' to - 'strapi-public:/opt/app/public'
4. For Strapi Domains remove the port 1337 from the domain.
5. Deploy.
6. Afer deployment don't register and stop the service. Follow the next instructions.

# The source and target schemas must match to successfully use strapi import, meaning all content types must be identical. Let's do that:

0. Make sure both target and source Strapi instances have the same version.
1. Stop the container/service.
2. Identify Strapi src volume name under Storages. In my case is i0wggsgwkw4gwokc8cg0k8w8_strapi-src
3. Access the Volume on the Host Server: cd /var/lib/docker/volumes/i0wggsgwkw4gwokc8cg0k8w8_strapi-src/_data/
4. Remove Old Files: rm -rf *
5. Copy new files:
scp -r /path/to/local/src/* root@<your-server-ip>:/var/lib/docker/volumes/i0wggsgwkw4gwokc8cg0k8w8_strapi-src/_data/
6. Restart the Application in Coolify

# Data transfer from local to remote
0. Make sure both target and source Strapi instances have the same version. (see Upgrade Strapi to the latest version)
1. Generate a transfer token on remote Strapi instace.
2. Make sure the source and target schemas match. (see The source and target schemas must match to successfully use strapi import, meaning all content types must be identical. Let's do that)
3. Push data to remote: npm run strapi transfer -- --to destinationURL/admin









https://docs.strapi.io/dev-docs/api/rest/interactive-query-builder

{
populate: {
  contactInformation: true,
  footer: {
    fields: ['statement'],
    populate: {
      socialChannels: {
        fields: ['label']
      }
    }
  },
},
}

or

{
populate: {
  contactInformation: {
    fields: ['email', 'phone']
  },
  footer: {
    fields: ['statement'],
    populate: {
      socialChannels: {
        fields: ['label']
      }
    }
  },
},
}







JSOn_LD for home:

{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "Your Experienced Web Developer",
      "description": "Crafting tailored web solutions with technical expertise in HTML, CSS, JavaScript, React, and PHP, and a deep understanding of WordPress.",
      "url": "https://yourwebsite.com/",
      "author": {
        "@id": "#person"
      }
    },
    {
      "@type": "Person",
      "@id": "#person",
      "name": "Marios Sofokleous",
      "description": "Web Developer based in Cyprus with expertise in React, WordPress, and custom web solutions. I craft tailored web solutions with technical expertise in HTML, CSS, JavaScript, React, and PHP.",
      "url": "https://yourwebsite.com/",
      "email": "marios@example.com",
  "telephone": "+1234567890",
      "image" about image
      "job title" job title
      "logo": "https://yourwebsite.com/logo.png",
      "sameAs": [
        "https://linkedin.com/in/mariossofokleous",
        "https://github.com/mariossofokleous"
      ],
      "knowsAbout": [
        "HTML", 
        "CSS", 
        "JavaScript", 
        "React", 
        "WordPress", 
        "PHP"
      ],
      "worksFor": [
        {
          "@type": "Organization",
          "name": "IronFX",
          "url": "https://ironfx.com/",
          "jobTitle": "WordPress Developer",
          "description": "Developed custom WordPress plugins and optimized workflows. Duration: Jan 2022 - Present.",
          "location": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Paphos, Cyprus"
            }
          }
        },
        {
          "@type": "Organization",
          "name": "IronFX",
          "jobTitle": "WordPress Developer",
          "description": "Developed custom WordPress plugins and optimized workflows. Duration: Jan 2022 - Present. Location: Remote."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services do you offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I offer custom web development services including React applications, WordPress themes, and plugins."
          }
        },
        {
          "@type": "Question",
          "name": "Where are you based?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I am based in Cyprus but work with clients globally."
          }
        }
      ]
    },
    {
      "@type": "ItemList",
      "@id": "#reviews",
      "name": "Testimonials",
      "itemListElement": [
        {
          "@type": "Review",
          "reviewBody": "Marios is an exceptional developer who delivered our project on time with outstanding quality.",
          "author": {
            "@type": "Person",
            "name": "John Doe"
          },
          "datePublished": "2025-01-01"
        },
      ]
    },
    {
      "@type": "ItemList",
      "@id": "#latest-posts",
      "name": "Latest Posts",
      "itemListElement": [
        {
          "@type": "BlogPosting",
          "headline": "How to Use JSON-LD for SEO",
          "url": "https://yourwebsite.com/blog/how-to-use-json-ld/",
          "datePublished": "2023-10-01",
          "description": "Learn how to implement JSON-LD structured data to improve your website's SEO."
        },
        {
          "@type": "BlogPosting",
          "headline": "Understanding Schema.org",
          "url": "https://yourwebsite.com/blog/understanding-schema-org/",
          "datePublished": "2023-09-15",
          "description": "A comprehensive guide to Schema.org and its role in structured data."
        }
      ]
    },
    {
      "@type": "ItemList",
      "@id": "#featured-projects",
      "name": "Featured Projects",
      "itemListElement": [
        {
          "@type": "CreativeWork",
          "name": "Portfolio Website",
          "url": "https://yourwebsite.com/projects/portfolio-website/",
          "description": "A case study on building my personal portfolio website using React and WordPress."
        },
        {
          "@type": "CreativeWork",
          "name": "E-commerce Platform",
          "url": "https://yourwebsite.com/projects/ecommerce-platform/",
          "description": "A scalable e-commerce platform built with modern technologies."
        }
      ]
    }
  ]
}
