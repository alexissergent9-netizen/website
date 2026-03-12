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

  // ==================== PRESS METHODS ====================
  
  /**
   * Obtiene artículos de prensa
   * @returns {Promise<Array>} Array de artículos
   */
  async getPress() {
    return this.getSheetData('Press');
  }

  /**
   * Obtiene artículos de prensa filtrados por tipo
   * @param {string} type - Tipo de artículo: 'current' o 'past'
   * @returns {Promise<Array>} Array de artículos filtrados
   */
  async getPressByType(type) {
    const articles = await this.getSheetData('Press');
    return articles.filter(article => 
      article.type && article.type.toLowerCase() === type.toLowerCase()
    );
  }

  /**
   * Obtiene artículos de prensa actuales
   * @returns {Promise<Array>} Array de artículos actuales
   */
  async getCurrentPress() {
    return this.getPressByType('current');
  }

  /**
   * Obtiene artículos de prensa pasados
   * @returns {Promise<Array>} Array de artículos pasados
   */
  async getPastPress() {
    return this.getPressByType('past');
  }

  /**
   * Obtiene artículos de prensa filtrados por año
   * @param {string|number} year - Año a filtrar
   * @returns {Promise<Array>} Array de artículos del año especificado
   */
  async getPressByYear(year) {
    const articles = await this.getSheetData('Press');
    return articles.filter(article => 
      article.year && article.year.toString() === year.toString()
    );
  }

  // ==================== EXHIBITIONS METHODS ====================

  /**
   * Obtiene todas las exposiciones
   * @returns {Promise<Array>} Array de exposiciones
   */
  async getExhibitions() {
    return this.getSheetData('Exhibitions');
  }

  /**
   * Obtiene exposiciones filtradas por tipo (current, past, upcoming)
   * @param {string} type - Tipo de exposición
   * @returns {Promise<Array>} Array de exposiciones filtradas
   */
  async getExhibitionsByType(type) {
    const exhibitions = await this.getSheetData('Exhibitions');
    
    // Si la columna 'type' existe en el sheet, usar directamente
    const hasTypeColumn = exhibitions.length > 0 && exhibitions[0].hasOwnProperty('type');
    
    if (hasTypeColumn) {
      return exhibitions.filter(exhibition => 
        exhibition.type && exhibition.type.toLowerCase() === type.toLowerCase()
      );
    }
    
    // Fallback: calcular por fechas si no existe la columna 'type'
    const today = new Date();
    
    return exhibitions.filter(exhibition => {
      if (!exhibition.startDate || !exhibition.endDate) {
        return false;
      }
      
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
   * Obtiene exposiciones actuales
   * @returns {Promise<Array>} Array de exposiciones actuales
   */
  async getCurrentExhibitions() {
    return this.getExhibitionsByType('current');
  }

  /**
   * Obtiene exposiciones pasadas
   * @returns {Promise<Array>} Array de exposiciones pasadas
   */
  async getPastExhibitions() {
    return this.getExhibitionsByType('past');
  }

  /**
   * Obtiene próximas exposiciones
   * @returns {Promise<Array>} Array de próximas exposiciones
   */
  async getUpcomingExhibitions() {
    return this.getExhibitionsByType('upcoming');
  }

  // ==================== WORKS METHODS ====================

  /**
   * Obtiene todas las obras
   * @returns {Promise<Array>} Array de obras
   */
  async getWorks() {
    return this.getSheetData('Works');
  }

  /**
   * Obtiene obras filtradas por categoría
   * @param {string} category - Categoría de obras
   * @returns {Promise<Array>} Array de obras filtradas
   */
  async getWorksByCategory(category) {
    const works = await this.getSheetData('Works');
    return works.filter(work => 
      work.category && work.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Obtiene obras filtradas por categoría y subcategoría
   * @param {string} category - Categoría de obras
   * @param {string} subcategory - Subcategoría de obras
   * @returns {Promise<Array>} Array de obras filtradas
   */
  async getWorksByCategoryAndSubcategory(category, subcategory) {
    const works = await this.getSheetData('Works');
    return works.filter(work => 
      work.category && work.category.toLowerCase() === category.toLowerCase() &&
      work.subcategory && work.subcategory.toLowerCase() === subcategory.toLowerCase()
    );
  }

  /**
   * Obtiene obras digitales
   * @param {string} subcategory - Subcategoría opcional (computer-drawings, iphone, ipad, etc.)
   * @returns {Promise<Array>} Array de obras digitales
   */
  async getDigitalWorks(subcategory = null) {
    if (subcategory) {
      return this.getWorksByCategoryAndSubcategory('digital', subcategory);
    }
    return this.getWorksByCategory('digital');
  }

  /**
   * Obtiene dibujos
   * @returns {Promise<Array>} Array de dibujos
   */
  async getDrawings() {
    return this.getWorksByCategory('drawings');
  }

  /**
   * Obtiene gráficos
   * @param {string} subcategory - Subcategoría opcional (lithographs, etchings, etc.)
   * @returns {Promise<Array>} Array de gráficos
   */
  async getGraphics(subcategory = null) {
    if (subcategory) {
      return this.getWorksByCategoryAndSubcategory('graphics', subcategory);
    }
    return this.getWorksByCategory('graphics');
  }

  /**
   * Obtiene pinturas
   * @returns {Promise<Array>} Array de pinturas
   */
  async getPaintings() {
    return this.getWorksByCategory('paintings');
  }

  /**
   * Obtiene fotografías
   * @param {string} subcategory - Subcategoría opcional
   * @returns {Promise<Array>} Array de fotografías
   */
  async getPhotos(subcategory = null) {
    if (subcategory) {
      return this.getWorksByCategoryAndSubcategory('photos', subcategory);
    }
    return this.getWorksByCategory('photos');
  }

  /**
   * Obtiene cuadernos de bocetos
   * @returns {Promise<Array>} Array de sketchbooks
   */
  async getSketchbooks() {
    return this.getWorksByCategory('sketchbooks');
  }

  /**
   * Obtiene diseños de escenario
   * @param {string} subcategory - Subcategoría opcional
   * @returns {Promise<Array>} Array de diseños de escenario
   */
  async getStageDesign(subcategory = null) {
    if (subcategory) {
      return this.getWorksByCategoryAndSubcategory('stage_design', subcategory);
    }
    return this.getWorksByCategory('stage_design');
  }

  /**
   * Obtiene obras misceláneas (etcetera)
   * @param {string} subcategory - Subcategoría opcional
   * @returns {Promise<Array>} Array de obras misceláneas
   */
  async getEtcetera(subcategory = null) {
    if (subcategory) {
      return this.getWorksByCategoryAndSubcategory('etcetera', subcategory);
    }
    return this.getWorksByCategory('etcetera');
  }

  // ==================== RESOURCES METHODS ====================

  /**
   * Obtiene recursos
   * @returns {Promise<Array>} Array de recursos
   */
  async getResources() {
    return this.getSheetData('Resources');
  }

  /**
   * Obtiene recursos filtrados por categoría
   * @param {string} category - Categoría de recursos
   * @returns {Promise<Array>} Array de recursos filtrados
   */
  async getResourcesByCategory(category) {
    const resources = await this.getSheetData('Resources');
    return resources.filter(resource => 
      resource.category && resource.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Obtiene información de galerías
   * @returns {Promise<Array>} Array de galerías
   */
  async getGalleries() {
    return this.getResourcesByCategory('galleries');
  }

  /**
   * Obtiene publicaciones
   * @returns {Promise<Array>} Array de publicaciones
   */
  async getPublications() {
    return this.getResourcesByCategory('publications');
  }

  /**
   * Obtiene colecciones públicas
   * @returns {Promise<Array>} Array de colecciones públicas
   */
  async getPublicCollections() {
    return this.getResourcesByCategory('public_collections');
  }
}

export default new GoogleSheetsService();
