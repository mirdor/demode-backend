import { Request, Response } from "express";
import Event from "../models/Event";
import Post from "../models/Post";
import Product from "../models/Product";

export const getPreviewData = async (req: Request, res: Response) => {
  const eventsPromise = Event.find().sort({ createdAt: -1 }).limit(2);
  const postsPromise = Post.find().sort({ createdAt: -1 }).limit(2);
  const productsPromise = Product.find().sort({ createdAt: -1 }).limit(2);

  try {
    const resp = await Promise.all([
      eventsPromise,
      postsPromise,
      productsPromise,
    ]);

    return res.json({
      events: resp[0],
      posts: resp[1],
      products: resp[2],
    });
  } catch (error) {
    res.status(503).json({
      error: { message: "No se logró la extracción de datos: " + error },
    });
  }
};
