import { action } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

export const $user = persistentAtom("user", "", {
  encode(value) {
    return JSON.stringify(value);
  },
  decode(value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
});

export const setUser = action($user, "setUser", (store, email) => {
  store.set(email);
  return store.get();
});
