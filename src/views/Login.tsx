import { createSignal, JSX } from "solid-js";
import Parse from "parse";
import throwError from "../functions/throwError";

function Login (): JSX.Element {
  const [password, setPassword] = createSignal("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        Parse.User.logIn("admin", password())
          .then(() => { window.location.href = "/observations"; })
          .catch(throwError);
      }}
      action="/login"
    >
      <input type="hidden" value="admin" name="username" />
      <label for="password">Enter Password</label>
      <input type="password" name="password" value={password()} onChange={(e) => setPassword(e.currentTarget.value)} />
      <label for="submit" />
      <input type="submit" value="Submit" name="submit" />
    </form>
  );
};

export default Login;
