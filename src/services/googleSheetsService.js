import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID;
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

class GoogleSheetsService {
  /**
   * Obtiene datos de una hoja específica
   * @param {string} sheetName - Nombre de la pestaña en Google Sheets
   * @returns {Promise<Array>} Array de objetos con los datos
   */
  async getSheetData(sheetName) {
    try {
      const url = `${BASE_URL}/${SPREADSHEET_ID}/values/${sheetName}?key=${API_KEY}`;
      const response = await axios.get(url);
      
      if (!response.data.values || response.data.values.length === 0) {
        return [];
      }

      // Primera fila contiene los headers
      const headers = response.data.values[0];
      const rows = response.data.values.slice(1);

      // Convertir cada fila en un objeto usando los headers como keys
      return rows.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });
    } catch (error) {
      console.error(`Error fetching data from sheet "${sheetName}":`, error);
      return [];
    }
  }

  /**
   * Obtiene todas las obras
   */
  async getWorks() {
    return this.getSheetData('Works');
  }

  /**
   * Obtiene obras filtradas por categoría
   * @param {string} category - Categoría de obras
   */
  async getWorksByCategory(category) {
    const works = await this.getSheetData('Works');
    return works.filter(work => 
      work.category && work.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Obtiene todas las exposiciones
   */
  async getExhibitions() {
    return this.getSheetData('Exhibitions');
  }

  /**
   * Obtiene exposiciones filtradas por tipo (current, past, upcoming)
   */
  async getExhibitionsByType(type) {
    const exhibitions = await this.getSheetData('Exhibitions');
    const today = new Date();
    
    return exhibitions.filter(exhibition => {
      const startDate = new Date(exhibition.startDate);
      const endDate = new Date(exhibition.endDate);
      
      if (type === 'current') {
        return startDate <= today && endDate >= today;
      } else if (type === 'past') {
        return endDate < today;
      } else if (type === 'upcoming') {
        return startDate > today;
      }
      return true;
    });
  }

  /**
   * Obtiene artículos de prensa
   */
  async getPress() {
    return this.getSheetData('Press');
  }

  /**
   * Obtiene recursos
   */
  async getResources() {
    return this.getSheetData('Resources');
  }
}

export default new GoogleSheetsService();
