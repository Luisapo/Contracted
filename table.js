document.addEventListener('DOMContentLoaded', () => {
  fetch('./contracted.json')
      .then(response => response.json())
      .then(data => {
          const dataTable = document.getElementById('data-table');
          const tbody = document.createElement('tbody'); // Create a tbody element
          dataTable.style.borderSpacing = "2px";
          dataTable.style.borderCollapse = "separate";
          tbody.style.display = "grid";                    

          // Populate table with data
          data.forEach((rowData, rowIndex) => {
            const row = document.createElement('tr');
            row.style.display = 'grid';
            row.style.gridAutoFlow = 'column';
            row.style.gridTemplateColumns = '1fr 1fr 3fr 0.5fr 1fr';
    
            // Add a class to each row based on its index
            row.classList.add(rowIndex % 2 === 0 ? 'even-row' : 'odd-row');
    
            Object.values(rowData).forEach((value, colIndex) => {
              const cell = document.createElement('td');
              cell.textContent = value;
              cell.style.border = '1px solid';
              cell.style.padding = '20px 20px';
              cell.style.height = '100%'
              cell.style.alignSelf = 'center';
              cell.style.gridColumn = colIndex + 1;
    
              row.appendChild(cell);
            });
            tbody.appendChild(row);
          });
    
          dataTable.appendChild(tbody);
    

          // Add event listeners to the filter input elements
          const filterInputs = document.querySelectorAll('th input');
          filterInputs.forEach(input => {
            input.addEventListener('input', filterTable);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
});

function filterTable() {
  const query = q => document.querySelectorAll(q);
  const filters = [...query('th input')].map(e => new RegExp(e.value, 'i'));

  query('tbody tr').forEach(row => row.style.display = 
    filters.every((f, i) => f.test(row.cells[i].textContent)) ? 'grid' : 'none');

    const visibleRows = [...query('tbody tr')].filter(row => row.style.display !== 'none');
    visibleRows.forEach((row, index) => {
      row.classList.remove('even-row', 'odd-row');
      row.classList.add(index % 2 === 0 ? 'even-row' : 'odd-row');
    });

}



