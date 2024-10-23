/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.dummyjson.com",
      "netrinoimages.s3.eu-west-2.amazonaws.com",
      "www.renderhub.com",
      "media.sketchfab.com",
      "img.pikbest.com",
      "images.starfieldwiki.net", // Ensure this is added
      "aceternity.com",
      "templatemag.com",
      "www.hubspot.com",
      "i.pinimg.com",
      "fireart.studio",
      "cdn.dribbble.com",
      "i.ytimg.com",
      "cdn.vectorstock.com",
      "encrypted-tbn0.gstatic.com",
      "imgcdn.stablediffusionweb.com",
      "pictures.alignable.com",
    ],
  },
};

export default nextConfig;
