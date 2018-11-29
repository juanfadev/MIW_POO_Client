import RequestService from './RequestService.mjs'

const BASE_URL = "http://localhost:3000"
const SCHEMA = "LandmarksOrHistoricalBuildings"
const PLACES = "Places"
//const API_KEY = "?api-key=GET-YOUR-FREE-API-KEY:)"

class NetworkService {

  constructor(baseUrl){
    this.baseUrl = baseUrl;
  }

  getTemplates() {
    let url = `${this.baseUrl}/`
    return RequestService.getRequest(url, true);
  }

  getAllLandmarks() {
    let url = `${this.baseUrl}/${SCHEMA}`
    return RequestService.getRequest(url, true);
  }

  getLandMark(id) {
    let url = `${this.baseUrl}/${SCHEMA}/${id}`
    return RequestService.getRequest(url, true);
  }

  postLandMark(data) {
    let url = `${this.baseUrl}/${SCHEMA}`
    return RequestService.postRequest(url, true, data);
  }

  putLandMark(data, id) {
    let url = `${this.baseUrl}/${SCHEMA}/${id}`
    return RequestService.putRequest(url, true, data);
  }

  deleteLandMark(data, id) {
    let url = `${this.baseUrl}/${SCHEMA}/${id}`
    return RequestService.deleteRequest(url, true, data);
  }

  getAllPlaces() {
    let url = `${this.baseUrl}/${PLACES}`
    return RequestService.getRequest(url, true);
  }

  getPlace(id) {
    let url = `${this.baseUrl}/${PLACES}/${id}`
    return RequestService.getRequest(url, true);
  }

  postPlace(data) {
    let url = `${this.baseUrl}/${PLACES}`
    return RequestService.postRequest(url, true, data);
  }

  putPlace(data, id) {
    let url = `${this.baseUrl}/${PLACES}/${id}`
    return RequestService.putRequest(url, true, data);
  }

  deletePlace(data, id) {
    let url = `${this.baseUrl}/${PLACES}/${id}`
    return RequestService.deleteRequest(url, true, data);
  }
}

export default new NetworkService(BASE_URL)