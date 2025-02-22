import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const flickrResponseSchema = z.object({
  photos: z.object({
    photo: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        owner: z.string(),
        server: z.string(),
        secret: z.string(),
      }),
    ),
  }),
});

export const postRouter = createTRPCRouter({
  getPics: publicProcedure.query(async () => {
    //TODO Add pagination
    const pics = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${process.env.AUTH_FLICKR_API_KEY}&user_id=${process.env.AUTH_FLICKR_USER_ID}&tags=cat&per_page=10&format=json&nojsoncallback=1`,
    );
    const rawData: unknown = await pics.json();
    // Validate the API response
    const validatedData = flickrResponseSchema.parse(rawData);

    // Transform the data to match flickrResponseSchema
    return validatedData.photos.photo.map((photo) => ({
      id: photo.id,
      title: photo.title,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      flickrUrl: `https://www.flickr.com/photos/${photo.owner}/${photo.id}`,
      owner: photo.owner,
    }));
  }),
});
