import Link from "next/link";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "./header.module.css";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession();

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url(${session.user.image})` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/" legacyBehavior>
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem} legacyBehavior>
            <Link href="/client" legacyBehavior>
              <a>Client</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/server" legacyBehavior>
              <a>Server</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/protected" legacyBehavior>
              <a>Protected</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/api-example" legacyBehavior>
              <a>API</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
