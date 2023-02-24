import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"

class AdsService {
    async getAds() {
        const res = await api.get('api/ads')
        logger.log(res.data)
        AppState.ads = res.data
    }
}

export const adsService = new AdsService()