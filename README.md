### 👷‍♂️ Files to work in

- [x] src/pages/\_document.tsx
- [x] src/pages/index.tsx
- [x] src/pages/home.module.scss
- [ ] src/pages/post/[slug.tsx]
- [ ] src/pages/posts/post.module.scss
- [x] src/components/Header/index.tsx
- [x] src/components/Header/header.module.scss
- [x] src/styles/global.scss
- [ ] src/styles/common.module.scss

### 📝 Functionalities

#### Home page

- [x] List all posts from prismic
- [x] Render a button in the end of the list if there's more posts to be rendered
- [x] If there's no more posts to be rendered, the button will not be rendered
- [x] When clicking on a post, the user has to be redirected to the post page
- [x] The page has to be statically generated

### Post

- [ ] Render the post content and header component
- [ ] Estimated reading time based on the number of words present in the post, taking into account the words present in the heading and body
- [ ] Save Spacetraveling logo in public folder, use in alt attribute the word "logo"
- [ ] Generate a static page using getStaticProps
- [ ] Use getStaticPaths to generate some static pages and use the fallback as true to generate the other pages when the user accesses the post
