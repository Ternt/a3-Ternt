import Login from "./views/login.js";
import Results from "./views/results.js";

// Routing
document.addEventListener("DOMContentLoaded", () => {
  document.body.onclick = (event) => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      navigateTo(event.target.href);
    }
  };
  router();
});

const routes = [
  {
    path: 404,
    title: "Error",
    view: () => {
      console.log("error");
    },
  },
  {
    path: "/",
    title: "Login",
    view: Login,
  },
  {
    path: "/results",
    title: "Results",
    view: Results,
  },
];

const navigateTo = (url) => {
  history.pushState({}, "", url);
  router();
};

const router = async () => {
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      ismatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.ismatch);
  if (!match) {
    match = {
      route: routes[0],
      ismatch: true,
    };
  }

  let html = await match.route.view.render();
  document.querySelector("#content").innerHTML = html;
  await match.route.view.after_render();
};

window.onpopstate = router;
