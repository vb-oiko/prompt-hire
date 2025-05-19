const React = require("react");
const Layout = require("./components/Layout");

const HomeView = () => {
  return (
    <Layout>
      <article>
        <header>
          <h1>Welcome to PromptHire</h1>
          <p>Your AI-Powered Hiring Solution</p>
        </header>

        <section>
          <h2>Why Choose PromptHire?</h2>
          <div className="grid">
            <article>
              <h3>Smart Matching</h3>
              <p>AI-powered candidate matching for your job requirements</p>
            </article>
            <article>
              <h3>Time Saving</h3>
              <p>Automate your hiring process and save valuable time</p>
            </article>
            <article>
              <h3>Quality Hiring</h3>
              <p>Find the best candidates with our advanced screening</p>
            </article>
          </div>
        </section>

        <section>
          <h2>Ready to Transform Your Hiring Process?</h2>
          <a href="/positions" role="button">
            Get Started
          </a>
        </section>
      </article>
    </Layout>
  );
};

module.exports = HomeView;
