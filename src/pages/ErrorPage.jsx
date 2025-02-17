import '../pages/Error.css'
function ErrorPage() {
  return (
    <div>
      <h1>Error</h1>
      <div className="notebook">
        <div className="page left-page">
          Error page in the form of a Notebook
        </div>
        <div className="page right-page">Sorry about that!
          <div className="smiley-icon">🤭</div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
