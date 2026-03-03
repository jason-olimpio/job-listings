import './index.css'

const JobCard = (
  {
    company,
    logo,
    position,
    postedAt,
    contract,
    location,
    keywords,
    featured,
    new: isNew
  },
  onTagClick
) => {
  const article = document.createElement('article');

  article.className = `job-card ${isNew ? 'new' : ''}`;

  article.innerHTML = `
    <div class="job-info">
      <img class="logo" src="${logo}" alt="${company}" width="80" height="80"/>

      <div class="details">
        <div class="company-row">
          <span class="company-name">${company}</span>
          ${isNew ? '<span class="badge new">NEW!</span>' : ''}
          ${featured ? '<span class="badge featured">FEATURED</span>' : ''}
        </div>

        <h2 class="position">${position}</h2>
        <p class="meta">${postedAt} • ${contract} • ${location}</p>
      </div>
    </div>

    <div class="tags">
      ${keywords.map(tag => `<button class="tag">${tag}</button>`).join('')}
    </div>
  `;

  article
    .querySelectorAll('.tag')
    .forEach(button => (button.onclick = () => onTagClick(button.textContent)));

  return article;
};

export default JobCard;
