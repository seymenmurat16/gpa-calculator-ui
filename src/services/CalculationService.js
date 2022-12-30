import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api";

class CalculationService {
  getDepartments() {
    return axios.get(EMPLOYEE_API_BASE_URL + "/departments");
  }

  getNotes() {
    return axios.get(EMPLOYEE_API_BASE_URL + "/notes");
  }

  getLectures(id) {
    return axios.get(
      EMPLOYEE_API_BASE_URL + "/departments/" + id + "/lectures"
    );
  }

  calculateGpa(values) {
    return axios.post(EMPLOYEE_API_BASE_URL + "/getGPA", values);
  }
}

export default new CalculationService();
