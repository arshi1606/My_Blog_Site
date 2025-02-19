import type { NextApiRequest, NextApiResponse } from 'next';
import { getBlogs, getLatestBlogs, getPopularBlogs } from '../../../lib/sanity/queries/blogQueries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filter } = req.query;
  let blogs;
  try {
    if (filter === 'Latest') {
      blogs = await getLatestBlogs();
    } else if (filter === 'Popular') {
      blogs = await getPopularBlogs();
    } else {
      blogs = await getBlogs();
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
}
