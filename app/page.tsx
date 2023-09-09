
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "./(components)/user";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return(
    <section className="text-white">
      <h1>
        <Link href='./login'>
          Log In
        </Link>
      </h1>
      <h1>
      <Link href='./register'>
          Register
        </Link>
      </h1>
      <pre>
        {JSON.stringify(session)}
      </pre>
      <h1>Client Side Rendered</h1>
      <User/>
    </section>
  )
}