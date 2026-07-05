import { Link } from 'react-router-dom';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export default function WorkList({ works, label }) {
  if (!works.length) {
    return <p className="empty-state">Nothing here yet.</p>;
  }

  return (
    <>
      {label && <p className="section-label">{label}</p>}
      <ul className="work-list">
        {works.map((work) => (
          <li key={work.slug} className="work-row">
            <Link to={`/${work.kind === 'poem' ? 'poems' : 'prose'}/${work.slug}`} className="work-link">
              <span className="work-kind">{work.kind}</span>
              <h2 className="work-title">{work.title}</h2>
              <p className="work-excerpt">{work.excerpt}</p>
              <p className="work-meta">{formatDate(work.date)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
