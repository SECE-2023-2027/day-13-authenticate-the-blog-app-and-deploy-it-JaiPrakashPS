"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className={styles.nav}>
      {/* Group for primary navigation links */}
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        {session && (
          <>
            <Link href="/profile">Profile</Link>
            {session.user.role === "admin" && <Link href="/admin">Admin</Link>}
          </>
        )}
      </div>

      {/* Group for authentication controls */}
      <div className={styles.navAuth}>
        {session ? (
          <button onClick={() => signOut()}>Logout</button>
        ) : (
          <>
            <button onClick={() => signIn("github")}>User Login</button>
            <Link href="/auth/login">Admin Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}