import userRouter from "./modules/user/user_router.js";
import noteRouter from "./modules/note/note_router.js";

export const routerApp = (app, express) => {
  app.use(express.json());
  app.use(`/user`, userRouter);
  app.use(`/note`, noteRouter);

  //global error handling
  app.use((error, req, res, next) => {
    return res.json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  });

  app.use((req, res) => {
    res.status(404).json({ success: false, message: "Cannot Found Path" });
  });
};
