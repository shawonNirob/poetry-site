import WorkList from '../components/WorkList';
import { getWorksByKind } from '../data/works';

const KIND_BY_PATH = {
  poems: 'poem',
  prose: 'prose',
  fiction: 'fiction',
  document: 'document'
};

const LABEL_BY_PATH = {
  all: 'everything',
  poems: 'poems',
  prose: 'prose',
  fiction: 'fiction',
  document: 'document'
};

export default function Home({ section = 'all' }) {
  const kind = KIND_BY_PATH[section] ?? 'all';
  const works = getWorksByKind(kind);

  return (
    <div className="container">
      <WorkList works={works} label={LABEL_BY_PATH[section]} />
    </div>
  );
}
