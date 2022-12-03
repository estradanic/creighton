import { createSignal } from "solid-js";
import Parse from "parse";

function Login() {
  const [password, setPassword] = createSignal("");
  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      try {
        await Parse.User.logIn("admin", password());
      } catch (e) {
        console.error(e);
      }
      window.location.href = "/observations";
    }} action="https://creighton.b4a.app/login">
      <input type="hidden" value="admin" name="username" />
      <label for="password">Enter Password</label>
      <input type="password" name="password" value={password()} onChange={(e) => setPassword(e.currentTarget.value)} />
      <label for="submit" />
      <input type="submit" value="Submit" name="submit" />
    </form>
  );
};

export default Login;
