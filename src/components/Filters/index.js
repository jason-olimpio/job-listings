import './index.css';

const Filters = ({ activeFilters, onRemove, onClear }) => {
  const container = document.createElement('div');

  container.className = 'filters-container';

  container.innerHTML = `
    <div class="filter-tags">
      ${activeFilters
        .map(
          tag => `
        <div class="filter-pill">
          <span class="tag-name">${tag}</span>

          <button class="remove-btn" data-tag="${tag}">
            <img src="./images/icon-remove.svg" alt="remove" width="10" height="10">
          </button>
        </div>
      `
        )
        .join('')}
    </div>

    <button class="clear-btn">Clear</button>
  `;

  container.querySelector('.clear-btn').onclick = onClear;

  container.querySelectorAll('.remove-btn').forEach(btn => {
    btn.onclick = () => onRemove(btn.dataset.tag);
  });

  return container;
};

export default Filters;
