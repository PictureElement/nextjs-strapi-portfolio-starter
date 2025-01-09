RSS: See tailwind blog, RSS on the banner https://pepelsbey.dev/articles/, RSS on the menu https://pepelsbey.dev/
Read more about <Image>. Specify width and height and setup responsive images with srcset and sizes + Add image instruction (size, aspect ratio) in Strapi. Add sizes to about image.
Implement form submission
Navlinks
Implement Mobile menu
Refine backend field descriptions and labels.
Inlcude "json-ld (npm schema-dts)"
Check why routes such as /blog/dadadad and /projects/dklahdakhdad don't return 404


Future Todo:
1. Implement pagination to Blog and Projects (use Hyper UI)
2. Add a breadcrump component (use Hyper UI)
3. Book a call with Cal.: see Gittings studdio
4. Limit media upload to specific types if possible





<head>

<!-- Basic Meta Tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title></title>
<meta name="description" content="">

<!-- Open Graph Tags -->
<meta property="og:site_name" content="">
<meta property="og:title" content="">
<meta property="og:description" content="">
<meta property="og:image" content="">
<meta property="og:url" content="">
<meta property="og:type" content="">
<meta property="og:locale" content="en_US" />

<!-- App icons -->
<link rel="icon" href="" sizes="32x32">
<link rel="icon" href="" type="image/svg+xml">
<link rel="apple-touch-icon" href="">

<!-- Optional -->
<link rel="canonical" href="">
<meta name="theme-color" content="">

<!-- Schema -->
<script type="application/ld+json"></script>

</head>


----------------


og:site_name: website name
og:title: <= 40 characters, Use the raw title. Don’t include branding (e.g., your site name).
og:image: 1200 X 630 pixels (1.91:1)
og:type: use 'article' for articles and 'website' for the rest of your pages.
apple-touch-icon.png: 180×180

<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<meta property="og:title" content="">					-> SEO title
<meta property="og:description" content="">				-> Meta description
<meta property="og:image" content="">					-> Featured image
<meta property="og:url" content="">						-> URL of the post