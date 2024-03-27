# [Stylesync 🔗](https://style-sync.vercel.app/)

Welcome to  **Stylesync**, the innovative AI-powered web application that revolutionizes the way you choose your perfect outfit. Leveraging cutting-edge technology, Stylesync offers personalized outfit suggestions based on your own wardrobe.

## What is Stylesync? 🤫

Stylesync is a SaaS platform that helps users find the perfect outfit combinations from their existing clothing items. With an easy-to-use interface and intelligent AI suggestions, it takes the hassle out of deciding what to wear.

<img src="/public/create.png" width="400" />
<img src="/public/suggest.png" width="400" />
<img src="/public/view.png" width="400" />

## How It Works 🫣

1.  **User Account**: Create an account or sign in using Google via NextAuth for a seamless authentication experience.
2.  **Uploading Form**: Once logged in, you're presented with a simple form to upload new clothing items to your virtual wardrobe.
3.  **AI Background Removal**: Uploaded photos are processed by Replicate AI to remove backgrounds, leaving just the clothing item.
4.  **AWS S3 Storage**: The processed images are securely stored in an AWS S3 bucket for reliable and scalable access.
5.  **Categorization and Description**: Assign categories, colors, patterns, and descriptions to your clothing items, ensuring all details are captured with the help of React Hook Form.
6.  **MongoDB Integration**: Your wardrobe is stored in MongoDB, and after uploading 10 items, the magic begins.
7.  **AI-Powered Outfit Suggestions**: OpenAI uses your wardrobe and current weather conditions (via a weather API) to suggest customized outfits.
8.  **Favorites**: Save your favorite outfits for quick access and future inspiration.
9.  **SaaS Model**: Enjoy free usage up to 20 items, after which a monthly subscription is available for unlimited access.

## Technologies Used 💻

-   **Frontend**: Built with Next.js 14 and styled using TailwindCSS, ensuring a responsive and modern user interface.
-   **AI Processing**: Replicate AI for image processing and OpenAI for outfit suggestions.
-   **Authentication**: Securely handled by NextAuth.
-   **Storage**: Images are stored in AWS S3, and user data is managed in MongoDB.
-   **State Management**: Global state is managed with Jotai, synced with MongoDB.
-   **Payment Processing**: Integrated with Stripe for subscription management.
-   **UI Components**: ShadCN UI library provides a polished look with support for light and dark modes.

## Problem Solved 😌

Stylesync addresses the common dilemma of choosing what to wear by automating outfit selection based on your personal wardrobe, the current weather, and occasion. It's perfect for those who want a hassle-free approach to styling and those interested in making the most out of their clothing collection.

## Get Started 🚀

To start using Stylesync, simply sign up, upload your clothing items, and let our AI assist you in creating stylish and weather-appropriate outfits every day.

## Deployed on Vercel

Hosted on the Vercel Platform, Stylesync is designed to offer a seamless and efficient user experience. Visit us  [here](https://style-sync.vercel.app/)  and transform the way you dress!

Thank you for considering Stylesync as your personal wardrobe assistant. We can't wait to help you dress your best with ease and confidence!