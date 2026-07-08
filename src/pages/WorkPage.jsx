import { Link, useParams } from 'react-router-dom';
import { getWorkBySlug } from '../data/works';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const routes = {
  poem: '/poems',
  prose: '/prose',
  fiction: '/fiction',
  document: '/documents'
};

export default function WorkPage() {
  const { slug } = useParams();
  const work = getWorkBySlug(slug);

  if (!work) {
    return (
      <div className="container">
        <p className="empty-state">
          This one doesn&rsquo;t exist. Maybe it hasn&rsquo;t been written yet.
        </p>
        <Link to="/" className="back-link">
          &larr; back
        </Link>
      </div>
    );
  }

  const backRoute = routes[work.kind] || '/';

  return (
    <div className="container">
      <Link to={backRoute} className="back-link">
        &larr; back to {work.kind}
      </Link>

      <div className="work-header">
        <span className="work-kind">{work.kind}</span>
        <h1>{work.title}</h1>
      </div>

      <div className="title-rule" aria-hidden="true" />

      <div
        className={`work-body ${
          ['prose', 'fiction', 'document'].includes(work.kind) ? 'prose' : ''
        }`}
      >
        {work.body.trim()}
      </div>

      <p className="work-footer-meta">
        published {formatDate(work.date)}
      </p>
    </div>
  );
}