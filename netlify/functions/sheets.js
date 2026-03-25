exports.handler = async (event) => {
  const { sheetName } = event.queryStringParameters || {}

  if (!sheetName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'sheetName is required' }),
    }
  }

  const apiKey = process.env.VITE_GOOGLE_SHEETS_API_KEY
  const spreadsheetId = process.env.VITE_GOOGLE_SPREADSHEET_ID

  if (!apiKey || !spreadsheetId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration missing' }),
    }
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}?key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body: JSON.stringify(data),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch sheet data' }),
    }
  }
}
