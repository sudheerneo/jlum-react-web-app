import { Component } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const withSession = (Component) => (props) => {
  // const [session, loading] = useSession();
  var loading = 0; // or true/false if it's a boolean flag
  const { data: session, status } = useSession();
  loading = status === "loading";

  // if the component has a render property, we are good
  if (Component.prototype.render) {
    return <Component session={session} loading={loading} {...props} />;
  }

  // if the passed component is a function component, there is no need for this wrapper
  throw new Error(
    [
      "You passed a function component, `withSession` is not needed.",
      "You can `useSession` directly in your component.",
    ].join("\n")
  );
};

class Rawcarousal extends Component {
  constructor() {
    super();
    this.state = {
      isshown: false,
      mobilePadding: 140,
      caniShow: "none",
      carousalImage: "/images/home.jpg",
      carousalBtn: "block",
      carousalHeading: "JESUS LOVES YOU MINISTRIES",
    };
    this.state.staticdata = {
      carousals: {
        about: "/images/abouty.jpg",
        contact: "/images/hands-coffee-smartphone-technology.jpg",
        preq: "/images/prayer.jpg",
        donate: "/images/donation.jpg",
      },
    };
  }

  hideCarousalOnPhone(url) {
    url === "/" ? this.setState({ caniShow: "block", mobilePadding: 0 }) : 0;
  }

  componentDidMount() {
    const url = window.location.pathname;
    const headings = url.replace(/[\/\\]/g, "");
    const photo = this.state.staticdata.carousals;
    url === "/about" ? this.setState({ carousalImage: photo.about }) : 0;
    url === "/contact" ? this.setState({ carousalImage: photo.contact }) : 0;
    url === "/prayer-request"
      ? this.setState({ carousalImage: photo.preq })
      : 0;
    url === "/donate" ? this.setState({ carousalImage: photo.donate }) : 0;
    url === "/" ? 0 : this.setState({ carousalHeading: headings });
    url === "/" ? 0 : this.setState({ carousalBtn: "none" });
    window.innerWidth < 768
      ? this.hideCarousalOnPhone(url)
      : this.setState({ caniShow: "block", mobilePadding: 0 });

    window.innerWidth < 768 && url === "/"
      ? this.setState({ carousalImage: "/images/mobileSlider.jpg" })
      : 0;
  }

  render() {
    const { session, loading } = this.props;
    return (
      <div
        id="carousel-hestia-generic"
        className="carousel slide"
        data-ride="carousel"
      >
        <div
          className="carousel slide"
          data-ride="carousel"
          style={{ paddingTop: this.state.mobilePadding }}
        >
          <div className="carousel-inner">
            <div className="item active">
              <div
                className="page-header header-filter"
                style={{
                  display: this.state.caniShow,
                  backgroundImage: "url('" + this.state.carousalImage + "')",
                }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 col-md-offset-2 text-center">
                      <h2 className="title">{this.state.carousalHeading}</h2>
                      <h3 style={{ display: this.state.carousalBtn }}>
                        {" "}
                        heartily welcomes you{" "}
                      </h3>
                      <div
                        className="buttons"
                        onClick={
                          this.props.session
                            ? null
                            : () => {
                                signIn("google");
                              }
                        }
                        style={{ display: this.state.carousalBtn }}
                      >
                        {" "}
                        <a className="btn btn-primary btn-lg">
                          {this.props.session
                            ? this.props.session.user.name ||
                              this.props.session.user.email
                            : "Join with us"}
                        </a>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Carousal = withSession(Rawcarousal);
export default Carousal;
