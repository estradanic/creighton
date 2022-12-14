import { createSignal, JSX, onMount } from "solid-js";
import Parse from "parse";

function Login (): JSX.Element {
  onMount(() => {
    if (Parse.User.current()) window.location.href = "/observations";
  });
  const [password, setPassword] = createSignal("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        Parse.User.logIn("admin", password())
          .then(() => { window.location.href = "/observations"; })
          .catch((e) => console.error(e));
      }}
      action="https://creighton.b4a.app/login"
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
