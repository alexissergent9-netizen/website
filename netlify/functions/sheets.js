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

    if (!response.ok) {
      console.error(`Google Sheets API error for "${sheetName}":`, JSON.stringify(data))
    }

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.error('Failed to fetch sheet data:', err.message)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch sheet data' }),
    }
  }
}
