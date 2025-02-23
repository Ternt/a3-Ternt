import { calculateUUID } from '../util.js'

const auth = async function (event) {
    event.preventDefault();


    // localStrategy solution
    const json = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value,
    };

    // localStorage solution
    const userId = calculateUUID(json);
    const userData = JSON.parse(localStorage.getItem(userId));

    const body = JSON.stringify(json);
    const response = await fetch("/user/auth/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: body,
    });

    if (!response.ok) {
        const labelGroup = document.getElementById('login-error');
        const errorDiv = document.getElementsByClassName('error-message');
        if (errorDiv.length < 1) {
            const errorMessage = document.createElement('a');
            errorMessage.classList.add('error-message');
            errorMessage.innerHTML = "Incorrect user/pass"
            labelGroup.appendChild(errorMessage);

            setTimeout(() => {
                const labelGroup = document.getElementById('login-error');
                labelGroup.removeChild(labelGroup.lastElementChild);
            }, 10000);
        }
    } else {
        const origin = window.location.origin;
        const virtualPath = '';
        window.location.replace(`${origin}/${virtualPath}`);
    }
};

const Login = {
    render: async () => {
        return `
            <div id="main" class="body-section">
                <form class="login-form">
                    <div class="auth-tabs">
                        <button class="tab">
                            <a href="/login">Login</a>
                        </button>
                        <button class="tab">
                            <a href="/signup">Sign Up</a>
                        </button>
                    </div>
                    <div class="form-area">
                    <div class="form-box">
                        <label class="form-label" for="username">Username </label>
                        <input class="form-input" type="text" id="username" value="username">
                    </div>
                    <div class="form-box">
                        <label class="form-label" for="password">Password</label>
                        <input class="form-input" type="text" id="password" value="password">
                    </div>
                    <div class="form-box" id="form-submission">
                        <button class="form-trigger" type="submit" id="form-button">Login</button>
                    </div>
                    <div id="login-error" class="form-label-group">
                    </div> 
                    </div>
                </form>
            </div>`;
    },
    after_render: async () => {
        const button = document.getElementById("form-button");
        button.onclick = auth;

        // behaviours for the form input
        let defaultValue;
        const allInput = document.getElementsByClassName("form-input");
        for (let i = 0; i < allInput.length; i++) {
            const input = allInput[i];
            let defaultValue = input.defaultValue;

            input.onkeydown = (event) => {
                if (event.key === "Escape") {
                    if (input.classList[input.classList.length - 1] === "contains-data") {
                        input.classList.remove("contains-data");
                    }
                    input.value = defaultValue;
                    input.addEventListener("input", removeDefault, { once: true });
                    input.blur();
                }
            };

            const removeDefault = (event) => {
                if (event.inputType === "insertText") {
                    defaultValue = input.defaultValue;
                    input.value = event.data;
                }
            };

            input.addEventListener("input", removeDefault, { once: true });

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


        passwordInput.onkeydown = (event) => {
            if (event.key === "Escape") {
                passwordInput.blur();
            }
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
