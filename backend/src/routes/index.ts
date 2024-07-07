import express from "express";
import AvaliadorRoutes from "./AvaliadorRoutes";
import EquipeRoutes from "./EquipeRoutes";
import AvaliacaoRoutes from "./AvaliacaoRoutes";
import DashboardRoutes from "./DashboardRoutes";
import EquipeAvaliadorRoutes from "./EquipeAvaliadorRoutes";

const appRouter = express();
appRouter.use(express.json()); 


appRouter.use("/avaliadores", AvaliadorRoutes);
appRouter.use("/equipes", EquipeRoutes);
appRouter.use("/avaliacoes", AvaliacaoRoutes);
appRouter.use("/dashboard", DashboardRoutes);
appRouter.use('/equipe-avaliador', EquipeAvaliadorRoutes);



export default appRouter;
