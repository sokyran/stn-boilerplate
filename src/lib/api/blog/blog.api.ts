/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { ContentType } from './blog.api-types';

const CONTENT_PATH = join(process.cwd(), './src/content');

export const getPostById = async (id: string): Promise<ContentType> => {
  const realId = id.replace(/\.md$/, '');
  const fullPath = join(CONTENT_PATH, `${realId}.md`);

  const { data, content } = matter(await fs.promises.readFile(fullPath, 'utf8'));

  return {
    ...data,
    slug: realId,
    title: data.title ?? '',
    author: data.author ?? '',
    description: data.description ?? '',
    image: data.image ?? '',
    date: `${data.date?.toISOString().slice(0, 10)}`,
    html: content,
  };
};

export const getAllPosts = async (): Promise<ContentType[]> => {
  const posts = await Promise.all(fs.readdirSync(CONTENT_PATH).map((id) => getPostById(id)));
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
};
