import { getProviders, signIn, signOut, getSession } from "next-auth/react";

import BodyClass from "./BodyClass";
import Header from "./src/Header";
import Footer from "./src/Footer";

export default function SignIn({ providers }) {
  return (
    <div className="root conatainer-fluid">
      <BodyClass />
      <div className="wrapper">
        <Header />
        <div className="main main-raised">
          <div>
            <section className="blogs" id="blog" data-sorder="hestia_blog">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <div id="pl-30" className="panel-layout">
                      <div id="pg-30-0" className="panel-grid panel-has-style">
                        <div
                          className="siteorigin-panels-stretch panel-row-style panel-row-style-for-30-0"
                          data-stretch-type="full"
                        >
                          <div id="pgc-30-0-0" className="panel-grid-cell">
                            <div
                              id="panel-30-0-0-0"
                              className="so-panel widget widget_sow-editor panel-first-child"
                              data-index="0"
                            >
                              <div className="panel-widget-style panel-widget-style-for-30-0-0-0">
                                <div className="so-widget-sow-editor so-widget-sow-editor-base">
                                  <h3 className="widget-title">
                                    One Touch access
                                  </h3>
                                  <div className="siteorigin-widget-tinymce textwidget">
                                    <p>
                                      You can can access this website social
                                      login feature. So need to signup.
                                    </p>

                                    <>
                                      {Object.values(providers).map(
                                        (provider) => (
                                          <div key={provider.name}>
                                            <button
                                              className="btn btn-primary"
                                              onClick={() =>
                                                signIn(provider.id)
                                              }
                                            >
                                              Sign in with {provider.name}
                                            </button>
                                          </div>
                                        )
                                      )}
                                    </>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
