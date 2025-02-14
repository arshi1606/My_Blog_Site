import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter Heading',
      type: 'string',
      description: 'Heading for the newsletter section',
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email Placeholder',
      type: 'string',
      description: 'Placeholder text for the email input',
    }),
    defineField({
      name: 'newsletterButtonText',
      title: 'Newsletter Button Text',
      type: 'string',
      description: 'Text to display on the newsletter submit button',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              description: 'Name of the social platform (e.g. "Medium", "Twitter X")',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Link URL for the social platform',
            }),
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'page.title',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      of: [
        {
          name: 'menuItem',
          title: 'Menu Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
});
