export default function ({ store, redirect }) {
  if (!(store.state && store.state.auth && store.state.auth.user)) {
    return redirect("/login");
  }
}
