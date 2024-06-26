import express from "express";
import AvaliadorRoutes from "./AvaliadorRoutes";
import EquipeRoutes from "./EquipeRoutes";
import AvaliacaoRoutes from "./AvaliacaoRoutes";


const appRouter = express();

appRouter.use("/avaliadores", AvaliadorRoutes);
appRouter.use("/equipes", EquipeRoutes);
appRouter.use("/avaliacoes", AvaliacaoRoutes);



export default appRouter;
