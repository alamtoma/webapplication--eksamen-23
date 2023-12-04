import  { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string(),
  gender: z.string(),
  sport: z.string(),
});

export default schema;