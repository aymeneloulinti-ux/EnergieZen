import { getAllServices, getServiceBySlug } from "../services/service.service.js";


export const getServices = async (req, res) =>{
    try{
        const services = await getAllServices();

        res.json(services);

    }catch (error) {
        console.error(error);

        res.status(500).json({
            error : "Impossible de récupérer les prestations"
        })
    }
}

export const getService = async (req,res) => {
    try {
        const {slug} = req.params
        const service = await getServiceBySlug(slug)

        if (!service) {
            return res.status(404).json({
                error: "Prestation Introuvable"
            })
        }
        
        res.json(service)

    } catch (error) {
        console.error(error)

        res.status(500).json({
            error : "Impossible de récupérer la prestation"
        })
    }
}