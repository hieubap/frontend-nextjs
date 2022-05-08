import { useRouter } from "next/router";

function useQueryUrlWithKey(keyQuery) {
  const router = useRouter();
  return new URLSearchParams(router.query[`search${keyQuery}`]);
}

export default useQueryUrlWithKey;
