// schemas/privacyPolicy.js
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'privacyPolicy',
  title: 'Privacy Policy',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the privacy policy page',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'The main text content of the privacy policy page',
    }),
  ],
});
