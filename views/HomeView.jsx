const React = require("react");
const Layout = require("./components/Layout");

const HomeView = () => {
  return (
    <Layout>
      <header>
        <article>
          <h1>🎯 Land the Right Job — Faster, Smarter.</h1>
          <p>
            PromptHire helps you create tailored resumes, cover letters, and
            outreach messages using AI — all based on your experience and the
            job you want.
          </p>
          <a href="/positions" role="button">
            Try the Beta
          </a>
        </article>
      </header>

      <article>
        <h2>How It Works</h2>
        <article>
          <h3>1. Paste a Job Description</h3>
          <p>PromptHire extracts key skills and role expectations using AI.</p>
        </article>
        <article>
          <h3>2. Add your existing resume</h3>
          <p>It will be used as a source for further customization</p>
        </article>
        <article>
          <h3>3. Generate Tailored Resume and Cover Letter</h3>
          <p>
            Get a customized resume summary, skills article, bullet points, and
            a cover letter — all aligned with the job.
          </p>
        </article>
        <article>
          <h3>4. Send Better Outreach Messages</h3>
          <p>
            Let PromptHire write authentic connection requests and follow-ups on
            LinkedIn.
          </p>
        </article>
      </article>

      <article>
        <h2>Why PromptHire?</h2>
        <div className="grid">
          <article>
            <h3>🧠 Smarter Tailoring</h3>
            <p>
              We use AI to highlight the overlap between your experience and
              what the job really needs.
            </p>
          </article>
          <article>
            <h3>📄 Better Documents</h3>
            <p>
              Stand out with job-specific resumes and cover letters that pass
              ATS filters and impress real humans.
            </p>
          </article>
          <article>
            <h3>⏱️ Save Hours Per Application</h3>
            <p>
              No more rewriting from scratch. Let PromptHire do the heavy
              lifting — you just approve and send.
            </p>
          </article>
        </div>
      </article>

      <article>
        <h2>Join now and start sending better job applications today.</h2>
        <a href="/positions" role="button">
          Try the Beta
        </a>
      </article>
    </Layout>
  );
};

module.exports = HomeView;
