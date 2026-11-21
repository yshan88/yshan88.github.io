const filters = document.querySelector('#publication-filters');
const search = document.querySelector('#paper-search');
const year = document.querySelector('#paper-year');
const type = document.querySelector('#paper-type');
const count = document.querySelector('#paper-count');
const empty = document.querySelector('#paper-empty');

const papers = Array.from(document.querySelectorAll('.paper-row'), (row) => ({
  row,
  year: row.dataset.year,
  type: row.dataset.type,
  text: row.textContent.toLowerCase().replace(/\s+/g, ' ').trim(),
}));

function updatePublications() {
  const words = search.value.toLowerCase().trim().split(/\s+/);
  let visible = 0;
  for (const paper of papers) {
    const matches = (!year.value || year.value === paper.year) &&
      (!type.value || type.value === paper.type) &&
      words.every((word) => paper.text.includes(word));

    paper.row.hidden = !matches;
    if (matches) visible += 1;
  }
  count.textContent = visible + (visible === 1 ? ' publication' : ' publications');
  empty.hidden = visible > 0;
}

filters.hidden = false;
search.addEventListener('input', updatePublications);
year.addEventListener('change', updatePublications);
type.addEventListener('change', updatePublications);
updatePublications();
