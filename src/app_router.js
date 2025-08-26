import userRouter from "./modules/user/user_router.js";
import noteRouter from "./modules/note/note_router.js";


export const routerApp = (app, express) => {
  app.use(express.json());
  app.use(`/user`, userRouter);
  app.use(`/note`, noteRouter);
};
