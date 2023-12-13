function updateApiUrl() {
  const productTypeSelect = document.getElementById('product-type');
  const productIdInput = document.getElementById('product-id');
  const apiUrlInput = document.getElementById('api-url');

  // Reset the apiUrl input
  apiUrlInput.value = '';

  // Check if the user has input a product ID
  if (productIdInput.value) {
    // Disable and clear other inputs
    disableAndClearInputs([
      'sort-select',
      'order-select',
      'filter-select',
      'filter-type-select',
      'filter-value-input',
      'start-input',
      'end-input',
      'limit-input',
    ]);
  } else {
    // Enable all inputs
    enableInputs([
      'sort-select',
      'order-select',
      'filter-select',
      'filter-type-select',
      'filter-value-input',
      'start-input',
      'end-input',
      'limit-input',
    ]);
  }

  // Get values from the product type and product ID inputs
  const productType = productTypeSelect.value;
  const productId = productIdInput.value;

  // Get selected values from the sort, order, filter, and filter type selects
  const sortOption = getSelectedValue('sort-select');
  const orderOption = getSelectedValue('order-select');
  const filterOption = getSelectedValue('filter-select');
  const filterTypeOption = getSelectedValue('filter-type-select');

  // Get input values for filter value, start, end, and limit
  const filterValueInput = document.getElementById('filter-value-input').value;
  const startInput = document.getElementById('start-input').value;
  const endInput = document.getElementById('end-input').value;
  const limitInput = document.getElementById('limit-input').value;

  // Construct the API URL with selected options
  const apiUrl = `/api/${productType}/${productId}?${buildQueryString({
    sort: sortOption,
    order: orderOption,
    filterBy: filterOption,
    filterType: filterTypeOption,
    filterValue: filterValueInput,
    start: startInput,
    end: endInput,
    limit: limitInput,
  })}`;

  // Update the apiUrl input
  apiUrlInput.value = apiUrl;
}

async function sendGetRequest(apiUrl) {
  try {
    // Fetch JSON data
    const response = await fetch(`https://elitetech.lordy.tech${apiUrl}`);
    const data = await response.json();

    // Create an HTML table
    const table = createHtmlTable(data);

    // Display the table in the product-data div
    document.getElementById('product-data').innerHTML = '';
    document.getElementById('product-data').appendChild(table);
  } catch (error) {
    console.log(error);
  }
}

function getSelectedValue(selectId) {
  const selectedOption = document.getElementById(selectId).value;
  return selectedOption === '' ? null : selectedOption;
}

function buildQueryString(params) {
  return Object.entries(params)
    .filter(([key, value]) => value !== null && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
}

function disableAndClearInputs(inputIds) {
  inputIds.forEach((id) => {
    const input = document.getElementById(id);
    input.disabled = true;
    input.value = '';
  });
}

function enableInputs(inputIds) {
  inputIds.forEach((id) => {
    const input = document.getElementById(id);
    input.disabled = false;
  });
}

function createHtmlTable(data) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Assume the data is an array of objects with consistent structure
  if (data.length > 0) {
    const headers = Object.keys(data[0]);

    // Create table header
    const headerRow = document.createElement('tr');
    headers.forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table rows
    data.forEach((item) => {
      const row = document.createElement('tr');
      headers.forEach((header) => {
        const cell = document.createElement('td');
        // Check if the property is imageURL and create an img element
        if (header === 'imageURL') {
          const img = document.createElement('img');
          img.src = item[header];
          img.alt = 'Product Image';
          img.style.width = '50px'; // Set the desired width
          cell.appendChild(img);
        } else {
          // For other properties, just set the text content
          cell.textContent = item[header];
        }
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
  } else {
    // If data is empty, create a single row indicating no data
    const noDataRow = document.createElement('tr');
    const noDataCell = document.createElement('td');
    noDataCell.textContent = 'No data available';
    noDataRow.appendChild(noDataCell);
    tbody.appendChild(noDataRow);
  }

  table.appendChild(thead);
  table.appendChild(tbody);

  return table;
}
