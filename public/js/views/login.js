const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const json = {
    username: document.querySelector("#username").value,
    firstname: document.querySelector("#firstname").value,
    lastname: document.querySelector("#lastname").value,
    dateofbirth: document.querySelector("#dateofbirth").value,
    password: document.querySelector("#password").value,
  };
  const body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  // accepts the entire apps data as a response
  const text = await response.text();
  const data = JSON.parse(text);

  return data;
};

const Login = {
  render: async () => {
    return `
<div id="main" class="body-section">
<form class="login-form">
<div class="form-box">
<label class="form-label" for="username">Username </label>
<input class="form-input" type="text" id="username" value="username">
</div>
<div class="form-group">
<div class="form-box">
<label class="form-label" for="firstname">First Name</label>
<input class="form-input" type="text" id="firstname" value="first name">
</div>
<div class="form-box">
<label class="form-label" for="lastname">Last Name</label>
<input class="form-input" type="text" id="lastname" value="last name">
</div>
</div>
<div class="form-box">
<label class="form-label" for="dob">Date of Birth</label>
<input class="form-input" type="date" id="dateofbirth" value="date of birth">
</div>
<div class="form-box">
<label class="form-label" for="lastname">Password</label>
<input class="form-input" type="text" id="password" value="password">
</div>
<div class="form-box" id="form-submission">
<input class="form-trigger" type="button" id="form-button" value="submit">
</div>
</form>
</div>
`;
  },
  after_render: async () => {
    const button = document.getElementById("form-button");
    button.onclick = submit;

    // behaviours for the form input
    let defaultValue;
    const allInput = document.getElementsByClassName("form-input");
    for (let i = 0; i < allInput.length; i++) {
      const input = allInput[i];
      let defaultValue = input.defaultValue;

      input.onfocus = () => {
        defaultValue = input.defaultValue;
        input.value = "";
      };

      input.onblur = () => {
        if (input.value.length > 0) {
          input.classList.add("contains-data");
        } else if (input.value.length === 0) {
          if (input.classList[input.classList.length - 1] === "contains-data") {
            input.classList.remove("contains-data");
          }
          input.value = defaultValue;
        }
      };
    }

    // behaviours for the password component
    const passwordInput = document.getElementById("password");
    let password = "";

    // removes default text when clicked and changes input type to password
    passwordInput.onfocus = () => {
      defaultValue = passwordInput.defaultValue;
      passwordInput.defaultValue = "";
      passwordInput.type = "password";
    };

    passwordInput.oninput = (event) => {
      if (event.inputType === "insertText") {
        password = passwordInput.value;
      }
    };

    passwordInput.onblur = () => {
      passwordInput.defaultValue = defaultValue;
      if (password.length === 0) {
        passwordInput.type = "type";
      }
    };
  },
};

export default Login;
