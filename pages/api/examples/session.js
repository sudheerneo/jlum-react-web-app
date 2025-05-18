// This is an example of how to access a session from an API route
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  res.send(JSON.stringify(session, null, 2));
};
