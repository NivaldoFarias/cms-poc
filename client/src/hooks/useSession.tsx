import useLocalStorage from "use-local-storage";

export default function useSession() {
  const [token, setToken] = useLocalStorage("token", "");
  return { session: token, setSession: setToken };
}
