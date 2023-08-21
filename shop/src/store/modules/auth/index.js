import axios from "axios";
import { FIREBASE_API_KEY } from "../../../config/firebase";

let timer;

const state = {
  userId: null,
  token: null,
};
const mutations = {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.token = payload.token;
  },
};
const actions = {
  auth(context, payload) {
    let url = "";
    if (payload.mode === "signin") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    } else if (payload.mode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
    } else {
      url = "";
    }

    const authDO = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };

    return axios
      .post(url, authDO)
      .then((response) => {
        // Daten im localStorage speichern (Token)
        const expiresIn = Number(response.data.expiresIn) * 1000;
        const expDate = new Date().getTime() + expiresIn;

        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("expiresIn", expDate);

        timer = setTimeout(() => {
          context.dispatch("autoSignOut");
        }, expiresIn);

        context.commit("setUser", {
          userId: response.data.localId,
          token: response.data.idToken,
        });
      })
      .catch((error) => {
        const errorMessage = new Error(error.response.data.error.message || "UNKNOWN_ERROR");
        throw errorMessage;
      });
  },
  signUp(context, payload) {
    const signupDO = {
      ...payload,
      mode: "signup",
    };
    return context.dispatch("auth", signupDO);
  },
  signIn(context, payload) {
    const signinDO = {
      ...payload,
      mode: "signin",
    };
    return context.dispatch("auth", signinDO);
  },
  autoSignIn(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expiresIn = localStorage.getItem("expiresIn");
    const timeLeft = Number(expiresIn) - new Date().getTime();

    if (timeLeft < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch("autoSignOut");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },
  signOut(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiresIn");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  autoSignOut(context) {
    context.dispatch("signOut");
  },
};
const getters = {};

const authModule = {
  state,
  mutations,
  actions,
  getters,
};

export default authModule;
