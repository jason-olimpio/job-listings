import './style.css';
import { Filters, JobCard } from './components';

let jobs = [];
let activeFilters = [];
let visibleCount = 4;

const PAGE_SIZE = 4;

let observer;

document.querySelector('#app').innerHTML = `
  <header>
    <picture>
      <source media="(max-width: 500px)" srcset="images/bg-header-mobile.svg">
      <img src="images/bg-header-desktop.svg" alt="Header Background">
    </picture>
  </header>

  <main>
    <div id="filters-wrapper"></div>
    <div id="jobs-list"></div>
    <div id="jobs-sentinel" aria-hidden="true"></div>
  </main>
`;

const loadJobs = async () => {
  const result = await fetch('./data.json');

  if (!result.ok) throw new Error('Failed to load data.json');

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

const getFilteredJobs = () =>
  activeFilters.length
    ? jobs.filter(job => activeFilters.every(tag => job.keywords.includes(tag)))
    : jobs;

const renderFilters = () => {
  const filtersTarget = document.getElementById('filters-wrapper');

  filtersTarget.innerHTML = '';

  if (activeFilters.length === 0) return;

  const filterBar = Filters({
    activeFilters,
    onRemove: tag => {
      activeFilters = activeFilters.filter(f => f !== tag);
      visibleCount = PAGE_SIZE;
      updateUI();
    },
    onClear: () => {
      activeFilters = [];
      visibleCount = PAGE_SIZE;
      updateUI();
    }
  });

  filtersTarget.appendChild(filterBar);
};

const renderJobs = list => {
  const jobsTarget = document.getElementById('jobs-list');

  jobsTarget.innerHTML = '';

  const slice = list.slice(0, visibleCount);

  slice.forEach(job => {
    const card = JobCard(job, selectedTag => {
      if (activeFilters.includes(selectedTag)) return;

      activeFilters.push(selectedTag);
      visibleCount = PAGE_SIZE;
      
      updateUI();
    });

    jobsTarget.appendChild(card);
  });
};

const setupInfiniteScroll = filteredJobs => {
  const sentinel = document.getElementById('jobs-sentinel');

  if (observer) observer.disconnect();

  observer = new IntersectionObserver(
    entries => {
      if (!entries[0].isIntersecting) return;

      if (visibleCount < filteredJobs.length) {
        visibleCount = Math.min(visibleCount + PAGE_SIZE, filteredJobs.length);
        renderJobs(filteredJobs);
      }
    },
    {
      root: null,
      rootMargin: '200px',
      threshold: 0
    }
  );

  observer.observe(sentinel);
};

const updateUI = () => {
  renderFilters();
  const filteredJobs = getFilteredJobs();
  renderJobs(filteredJobs);
  setupInfiniteScroll(filteredJobs);
};

jobs = await loadJobs();
updateUI();
