import './style.css';
import { Filters, JobCard } from './components';

let jobs = [];
let activeFilters = [];

document.querySelector('#app').innerHTML = `
  <header>
    <img src="images/bg-header-desktop.svg" alt='Header Background'>
  </header>

  <main>
    <div id='filters-wrapper'></div>
    <div id='jobs-list'></div>
  </main>
`;

const loadJobs = async () => {
  const result = await fetch('/data.json');

  if (!result.ok) throw new Error(`Failed to load data.json`);

  const data = await result.json();

  return data.map(({ role, level, languages = [], tools = [], ...rest }) => ({
    ...rest,
    role,
    level,
    languages,
    tools,
    keywords: [role, level, ...languages, ...tools]
  }));
};

const updateUI = () => {
  const filtersTarget = document.getElementById('filters-wrapper');
  const jobsTarget = document.getElementById('jobs-list');

  const filteredJobs = activeFilters.length
    ? jobs.filter(job => activeFilters.every(tag => job.keywords.includes(tag)))
    : jobs;

  filtersTarget.innerHTML = '';

  if (activeFilters.length > 0) {
    const filterBar = Filters({
      activeFilters,
      onRemove: tag => {
        activeFilters = activeFilters.filter(filter => filter !== tag);
        updateUI();
      },
      onClear: () => {
        activeFilters = [];
        updateUI();
      }
    });

    filtersTarget.appendChild(filterBar);
  }

  jobsTarget.innerHTML = '';

  filteredJobs.forEach(job => {
    const card = JobCard(job, selectedTag => {
      if (activeFilters.includes(selectedTag)) return;

      activeFilters.push(selectedTag);
      updateUI();
    });

    jobsTarget.appendChild(card);
  });
};

jobs = await loadJobs();
updateUI();
