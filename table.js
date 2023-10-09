document.addEventListener('DOMContentLoaded', () => {
  fetch('./output.json')
      .then(response => response.json())
      .then(data => {
          const dataTable = document.getElementById('data-table');
          const tbody = document.createElement('tbody'); // Create a tbody element

          // Populate table with data
          data.forEach(rowData => {
              const row = document.createElement('tr');
              Object.values(rowData).forEach(value => {
                  const cell = document.createElement('td');
                  cell.textContent = value;
                  row.appendChild(cell);
              });
              tbody.appendChild(row); // Append rows to the tbody
          });

          dataTable.appendChild(tbody); // Append the tbody to the table

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
    filters.every((f, i) => f.test(row.cells[i].textContent)) ? '' : 'none');
}



