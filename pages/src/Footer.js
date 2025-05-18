import Link from "next/link";
import { useState, useEffect } from "react";
import Script from "next/script";

export default function Footer() {
  const [ismobile, setMobile] = useState(false);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    setMobile(screenWidth < 768);
  }, []);

  return (
    <>
      <footer className="footer footer-black footer-big">
        <div className="container">
          <div
            className="copyright pull-left"
            style={{ fontSize: ismobile ? 11 : undefined }}
          >
            We are on{" "}
            <Link
              href="https://www.facebook.com/Jesus-Loves-you-Ministries-JLUM-235036396947583/"
              legacyBehavior
            >
              <a target="_blank" rel="noopener noreferrer">
                <i
                  className="_mi _before dashicons dashicons-facebook"
                  aria-hidden="true"
                  style={{ color: "lightblue" }}
                ></i>
              </a>
            </Link>{" "}
            and{" "}
            <Link
              href="https://www.youtube.com/channel/UC26_CXwwmhackoB_H8hjtPQ"
              legacyBehavior
            >
              <a target="_blank" rel="noopener noreferrer">
                <i
                  className="_mi _before dashicons dashicons-youtube"
                  aria-hidden="true"
                  style={{ color: "red", fontSize: 24 }}
                ></i>
              </a>
            </Link>{" "}
            — please like us, follow us
          </div>

          <div
            className="copyright pull-right"
            style={{ fontSize: ismobile ? 10 : undefined }}
          >
            <Link href="/" legacyBehavior>
              <a>
                2011 - {new Date().getFullYear()} ©{" "}
                <b>Jesus Loves You Ministries</b>
              </a>
            </Link>{" "}
            |{" "}
            <span
              data-toggle="tooltip"
              title="Hello I am Sudheer, Fullstack Web App Developmement expert. Follow us to get your awesome projects like this - Best Regards"
            >
              <a
                href="https://sudheerneo.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Made with{" "}
                <i
                  className="_mi _before dashicons dashicons-heart"
                  style={{ color: "green" }}
                ></i>
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* Include scripts properly using Next.js Script component */}
      <Script src="/srcData_files/windowdom.js" strategy="afterInteractive" />
      <Script
        src="/srcData_files/jquery.waypoints.min.js.download"
        strategy="afterInteractive"
      />
      <Script
        src="/srcData_files/bootstrap.min.js.download"
        strategy="afterInteractive"
      />
      <Script
        src="/srcData_files/material.js.download"
        strategy="afterInteractive"
      />
      <Script
        src="/srcData_files/jquery.matchHeight.js.download"
        strategy="afterInteractive"
      />
      <Script
        src="/srcData_files/scripts.js.download"
        strategy="afterInteractive"
      />
    </>
  );
}
