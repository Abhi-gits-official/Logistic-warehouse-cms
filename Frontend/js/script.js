const form = document.getElementById('inventory-form');
const tableBody = document.querySelector('#inventoryTable tbody');
const spinner = document.getElementById('spinner');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('theme-toggle');
let chart;
const items = [];

function showModule(event, id) {
  document.querySelectorAll('.module').forEach(mod => mod.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
  event.target.classList.add('active');
}

function renderChart() {
  const ctx = document.getElementById('categoryChart');
  const categoryMap = {};
  items.forEach(i => {
    categoryMap[i.category] = (categoryMap[i.category] || 0) + parseInt(i.quantity);
  });
  const labels = Object.keys(categoryMap);
  const data = Object.values(categoryMap);
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ label: 'Quantity by Category', data, backgroundColor: '#1E88E5' }]
    },
    options: { responsive: true }
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  spinner.classList.remove('hidden');
  setTimeout(() => {
    const item = {
      name: form.itemName.value,
      category: form.itemCategory.value,
      quantity: form.itemQuantity.value,
      location: form.itemLocation.value
    };
    items.push(item);

    const row = document.createElement('tr');
    row.innerHTML = `<td>${item.name}</td><td>${item.category}</td><td>${item.quantity}</td><td>${item.location}</td>
      <td><button onclick='deleteItem(this, ${items.length - 1})'>Delete</button></td>`;
    tableBody.appendChild(row);

    form.reset();
    spinner.classList.add('hidden');
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
    renderChart();
  }, 1000);
});

function deleteItem(btn, index) {
  items.splice(index, 1); // remove item from array
  btn.closest('tr').remove(); // remove row from table
  renderChart(); // re-render chart with updated data
}
