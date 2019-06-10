# Nextproject (todo list)

> This is a small test application which includes the following technologies: Next.js, React.js/ Redux, Express.js, Passport.js, Ant design, Styles-component. The application also uses cookie-based authorization because cookies are available both on the server side and on the client side , this  allows you to save the authenticated user even after he closed the tab and soon returned to the site. This is a great alternative to local storage on a regular SPA application which works only client side.

![](https://github.com/Nikitagizatulin/tab-tracker/blob/ssr/readme_img.png)

## Build Setup

``` bash
# first what you need - install package dependencies
npm install / yarn install

# rename .env.example to .env and pass in this file settings
mv .env.example .env

# now we can start the server
npm run dev / yarn dev

# build for production
npm run build / yarn build

# after build success start the server 
npm run start / yarn start
```