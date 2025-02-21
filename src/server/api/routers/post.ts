import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

let post = {
  id: 1,
  name: "Hello World",
};
const flickrResponseSchema = z.object({
  photos: z.object({
    photo: z.array(z.object({
      id: z.string(),
      title: z.string(),
      owner: z.string(),
      server: z.string(),
      secret: z.string(),
    }))
  })
});

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getPics: publicProcedure.query(async () => {
    //TODO Add pagination
    const pics = await fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${process.env.FLICKR_API_KEY}&user_id=${process.env.FLICKR_USER_ID}&tags=cat&per_page=10&format=json&nojsoncallback=1`)
    const rawData = await pics.json()
    // Validate the API response
    const validatedData = flickrResponseSchema.parse(rawData);
    
    // Transform the data to match flickrResponseSchema
    return validatedData.photos.photo.map(photo => ({
      id: photo.id,
      title: photo.title,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      owner: photo.owner,
    }));
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
