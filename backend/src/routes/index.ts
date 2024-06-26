import express from "express";
import AvaliadorRoutes from "./AvaliadorRoutes";
import EquipeRoutes from "./EquipeRoutes";

const appRouter = express();

appRouter.use("/avaliadores", AvaliadorRoutes);
appRouter.use("/equipes", EquipeRoutes);


export default appRouter;
